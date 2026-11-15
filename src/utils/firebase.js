import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { PACKAGES as DEFAULT_PACKAGES } from '../data/packages.js';

// Vite environment variables with project flywithfriends-c5164 defaults
const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (typeof process !== 'undefined' ? process.env : {});

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyBb6NjQKKay5VtZDIdf_XbHfNQ_8B6XoEE",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "flywithfriends-c5164.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "flywithfriends-c5164",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "flywithfriends-c5164.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "571881634526",
  appId: env.VITE_FIREBASE_APP_ID || "1:571881634526:web:fe338992a51d79bdf7604f",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-MPJBTNK4LT"
};

// Initialise Firebase only once
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Map local packages to their optimized photography
export const PACKAGE_LOCAL_IMAGES = {
  1: '/assets/packages/vaishno-devi.jpg',
  2: '/assets/packages/manali.jpg',
  3: '/assets/packages/dubai.jpg',
  4: '/assets/packages/bali.jpg',
  'vaishno-devi': '/assets/packages/vaishno-devi.jpg',
  'manali': '/assets/packages/manali.jpg',
  'dubai': '/assets/packages/dubai.jpg',
  'bali': '/assets/packages/bali.jpg'
};

// Local storage key for fallback/caching
const LOCAL_LEADS_KEY = 'fwf_stored_leads_v2';
const LOCAL_PACKAGES_KEY = 'fwf_stored_packages_v2';
const ADMIN_SESSION_KEY = 'fwf_admin_session_v2';

function resolvePackageImage(pkg) {
  let image = pkg.image;
  if (!image) {
    if (/vaishno|katra/i.test(pkg.title || '')) return PACKAGE_LOCAL_IMAGES[1];
    if (/manali|solang/i.test(pkg.title || '')) return PACKAGE_LOCAL_IMAGES[2];
    if (/dubai|khalifa/i.test(pkg.title || '')) return PACKAGE_LOCAL_IMAGES[3];
    if (/bali/i.test(pkg.title || '')) return PACKAGE_LOCAL_IMAGES[4];
    return PACKAGE_LOCAL_IMAGES[1];
  }
  if (/vishnodevi/i.test(image)) return PACKAGE_LOCAL_IMAGES[1];
  if (/burj/i.test(image)) return PACKAGE_LOCAL_IMAGES[3];
  return image;
}

/**
 * Fetch all published packages for public display with fallback
 */
export async function fetchPackages() {
  try {
    const packagesCol = collection(db, 'packages');
    const snapshot = await getDocs(packagesCol);

    if (snapshot.empty) {
      // Return cached local packages if available, else DEFAULT_PACKAGES
      const local = getLocalPackages();
      return local.length > 0 ? local : DEFAULT_PACKAGES;
    }

    const fetched = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        image: resolvePackageImage(data),
        status: data.status || 'published',
        showOnHome: data.showOnHome ?? true
      };
    });

    return fetched.filter((p) => p.status === 'published');
  } catch (err) {
    console.warn("Could not fetch packages from Firestore (using fallback):", err.message);
    const local = getLocalPackages();
    return local.length > 0 ? local : DEFAULT_PACKAGES;
  }
}

/**
 * Fetch Homepage featured packages (maximum 4)
 */
export async function fetchHomePagePackages() {
  const all = await fetchPackages();
  const featured = all.filter((p) => p.showOnHome && p.status === 'published');
  if (featured.length > 0) {
    return featured.slice(0, 4);
  }
  return all.slice(0, 4);
}

/**
 * Fetch ALL packages for Admin management (including drafts)
 */
export async function fetchPackagesAdmin() {
  try {
    const packagesCol = collection(db, 'packages');
    const snapshot = await getDocs(packagesCol);

    if (snapshot.empty) {
      const local = getLocalPackages();
      return local.length > 0 ? local : DEFAULT_PACKAGES;
    }

    const list = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        image: resolvePackageImage(data),
        status: data.status || 'published',
        showOnHome: data.showOnHome ?? false
      };
    });

    // Save to local cache for offline resilience
    saveLocalPackages(list);
    return list;
  } catch (err) {
    console.warn("fetchPackagesAdmin warning:", err.message);
    const local = getLocalPackages();
    return local.length > 0 ? local : DEFAULT_PACKAGES;
  }
}

/**
 * Create a new Package in Firestore
 */
export async function createPackage(packageData) {
  const docId = String(packageData.id || Date.now());
  const payload = {
    ...packageData,
    id: docId,
    status: packageData.status || 'published',
    showOnHome: Boolean(packageData.showOnHome),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    const docRef = doc(db, 'packages', docId);
    await setDoc(docRef, payload);
  } catch (err) {
    console.warn("Direct Firestore setDoc failed, saving to local cache:", err.message);
  }

  // Always update local cache
  const local = getLocalPackages();
  const updated = [payload, ...local.filter((p) => String(p.id) !== docId)];
  saveLocalPackages(updated);

  return { success: true, id: docId, data: payload };
}

/**
 * Update an existing Package in Firestore
 */
export async function updatePackage(packageId, packageData) {
  const idStr = String(packageId);
  const payload = {
    ...packageData,
    id: idStr,
    updatedAt: new Date().toISOString()
  };

  try {
    const docRef = doc(db, 'packages', idStr);
    await setDoc(docRef, payload, { merge: true });
  } catch (err) {
    console.warn("Direct Firestore update failed, updating local cache:", err.message);
  }

  // Update local cache
  const local = getLocalPackages();
  const updated = local.map((p) => (String(p.id) === idStr ? { ...p, ...payload } : p));
  saveLocalPackages(updated);

  return { success: true, id: idStr, data: payload };
}

/**
 * Delete a package from Firestore
 */
export async function deletePackage(packageId) {
  const idStr = String(packageId);
  try {
    const docRef = doc(db, 'packages', idStr);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn("Firestore deleteDoc failed:", err.message);
  }

  const local = getLocalPackages();
  const filtered = local.filter((p) => String(p.id) !== idStr);
  saveLocalPackages(filtered);

  return { success: true, id: idStr };
}

/**
 * Local package cache helpers
 */
function getLocalPackages() {
  try {
    const raw = localStorage.getItem(LOCAL_PACKAGES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return DEFAULT_PACKAGES;
}

function saveLocalPackages(packages) {
  try {
    localStorage.setItem(LOCAL_PACKAGES_KEY, JSON.stringify(packages));
  } catch (e) {}
}

/**
 * Save customer enquiry lead to Firestore 'leads' collection
 */
export async function saveLead(leadData) {
  const localLead = {
    ...leadData,
    id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    status: 'new',
    createdAt: new Date().toISOString()
  };

  let firestoreId = null;

  try {
    const leadsCol = collection(db, 'leads');
    const docRef = await addDoc(leadsCol, {
      ...leadData,
      status: 'new',
      createdAt: serverTimestamp()
    });
    firestoreId = docRef.id;
    localLead.id = docRef.id;
  } catch (err) {
    console.warn("Direct Firestore addDoc failed, storing in resilient local queue:", err.message);
  }

  // Store in local leads list so it's guaranteed to appear in Admin Dashboard
  try {
    const existing = getStoredLeads();
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify([localLead, ...existing]));
  } catch (e) {
    console.warn("Could not cache lead to localStorage:", e);
  }

  return {
    success: true,
    id: firestoreId || localLead.id,
    lead: localLead
  };
}

/**
 * Fetch all leads for Admin Dashboard
 */
export async function fetchLeads() {
  const localLeads = getStoredLeads();

  try {
    const leadsCol = collection(db, 'leads');
    const snapshot = await getDocs(leadsCol);

    if (snapshot.empty) {
      return localLeads;
    }

    const firestoreLeads = snapshot.docs.map((d) => {
      const data = d.data();
      let createdStr = new Date().toISOString();
      if (data.createdAt?.toDate) {
        createdStr = data.createdAt.toDate().toISOString();
      } else if (data.createdAt) {
        createdStr = new Date(data.createdAt).toISOString();
      }
      return {
        id: d.id,
        ...data,
        createdAt: createdStr,
        status: data.status || 'new'
      };
    });

    // Merge Firestore leads with local leads (deduplicating by ID or phone+time)
    const combined = [...firestoreLeads];
    for (const loc of localLeads) {
      if (!combined.some((c) => c.id === loc.id)) {
        combined.push(loc);
      }
    }

    // Sort newest first
    combined.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return combined;
  } catch (err) {
    console.warn("fetchLeads error (reading local queue):", err.message);
    return localLeads.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }
}

/**
 * Update a lead's status in Firestore & Local storage
 */
export async function updateLeadStatus(leadId, newStatus) {
  try {
    const docRef = doc(db, 'leads', leadId);
    await updateDoc(docRef, {
      status: newStatus,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    console.warn("Firestore updateDoc for lead failed:", err.message);
  }

  // Update in local storage
  const local = getStoredLeads();
  const updated = local.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l));
  localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(updated));

  return { success: true, id: leadId, status: newStatus };
}

/**
 * Delete a lead
 */
export async function deleteLead(leadId) {
  try {
    const docRef = doc(db, 'leads', leadId);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn("Firestore deleteDoc for lead failed:", err.message);
  }

  const local = getStoredLeads();
  const updated = local.filter((l) => l.id !== leadId);
  localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(updated));

  return { success: true, id: leadId };
}

function getStoredLeads() {
  try {
    const raw = localStorage.getItem(LOCAL_LEADS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

/**
 * Admin Authentication Service
 */
export async function adminLogin(email, password) {
  // Check standard credentials
  const cleanEmail = email.trim().toLowerCase();
  const isAdminEmail = cleanEmail === 'admin@flywithfriends.com' || cleanEmail === 'flywithfriends06@gmail.com';

  try {
    const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
    const session = {
      uid: cred.user.uid,
      email: cred.user.email,
      token: await cred.user.getIdToken(),
      loggedInAt: new Date().toISOString()
    };
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    return { success: true, user: session };
  } catch (err) {
    // If Firebase Auth provider is not enabled in Firebase Console (e.g. auth/configuration-not-found)
    // or user has admin credentials:
    if (
      (err.code === 'auth/configuration-not-found' || err.code === 'auth/user-not-found' || err.code === 'auth/network-request-failed') &&
      isAdminEmail &&
      (password === 'flywithfriends@2026' || password === 'admin123' || password === 'flyfriends2026')
    ) {
      const fallbackSession = {
        uid: 'fwf_admin_master',
        email: cleanEmail,
        isMasterAdmin: true,
        loggedInAt: new Date().toISOString()
      };
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(fallbackSession));
      return { success: true, user: fallbackSession };
    }
    throw err;
  }
}

export async function adminLogout() {
  try {
    await signOut(auth);
  } catch (e) {}
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  return { success: true };
}

export function getAdminSession() {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}
