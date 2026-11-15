# Fly With Friends — Firestore Security Rules & Authorization Guide

## Overview

Project ID: `flywithfriends-c5164`

The rules file [`firestore.rules`](file:///d:/Prateek/Travel-with-friends-V2-/firestore.rules) defines access controls for the Cloud Firestore database, ensuring customer privacy and restricting package modifications to authorized administrators.

---

## 1. Security Architecture & Principles

### A. Packages Collection (`packages/{packageId}`)
- **Public Read Access**: Any user can fetch published tour packages to view destinations, itineraries, and pricing on the website.
- **Write Restriction**: Only administrators may create, modify, or delete tour packages. Public visitors cannot create or modify packages.

### B. Leads Collection (`leads/{leadId}`)
- **Public Create Access**: Any customer can submit an enquiry lead via the website forms ("Drop Your Number — We'll Reach Out").
- **Payload Validation**: The rule strictly enforces that `name` is non-empty, `phone` contains at least 10 digits, and `sourcePage` is specified.
- **Zero Public Read Access**: Public users cannot list, read, or query leads. This protects customer contact information and privacy.
- **Admin Full Control**: Only verified administrators can list leads, read full form payloads, update lead status (New, Contacted, Interested, Converted, Closed), and delete leads.

---

## 2. Administrator Authorization Enforcement

Admin identity is verified using Firebase Authentication tokens:

1. **Custom Claims**: `request.auth.token.admin == true`
2. **Authorized Admin Emails**:
   - `admin@flywithfriends.com`
   - `flywithfriends06@gmail.com`

---

## 3. How to Deploy to Firebase Console

You can apply these rules in either of two simple ways:

### Option A: Firebase Console (Quickest)
1. Go to the [Firebase Console](https://console.firebase.google.com/project/flywithfriends-c5164/firestore/rules).
2. Select **Firestore Database** -> **Rules**.
3. Copy and paste the entire content of [`firestore.rules`](file:///d:/Prateek/Travel-with-friends-V2-/firestore.rules).
4. Click **Publish**.

### Option B: Firebase CLI
Run the following in the repository:
```bash
npx firebase-tools deploy --only firestore:rules --project flywithfriends-c5164
```
