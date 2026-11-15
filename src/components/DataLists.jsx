import React from 'react';

export const CITIES = [
  "Delhi","Mumbai","Bengaluru","Hyderabad","Chennai","Kolkata","Pune",
  "Noida","Greater Noida","Gurgaon","Faridabad","Ghaziabad",
  "Sonipat","Panipat","Karnal","Rohtak","Bahadurgarh",
  "Meerut","Hapur","Bulandshahr","Alwar","Rewari",
  "Lucknow","Kanpur","Agra","Mathura","Vrindavan","Ayodhya",
  "Varanasi","Prayagraj","Gorakhpur","Jhansi","Bareilly",
  "Moradabad","Rampur","Shahjahanpur","Sitapur","Lakhimpur",
  "Etawah","Mainpuri","Firozabad","Aligarh","Hathras",
  "Dehradun","Haridwar","Rishikesh","Roorkee","Haldwani",
  "Ramnagar","Nainital","Almora","Pithoragarh","Rudrapur",
  "Kashipur","Kotdwar","Mussoorie","Tehri","Chamoli",
  "Shimla","Manali","Kullu","Solan","Una","Hamirpur",
  "Bilaspur","Chamba","Dalhousie","Dharamshala",
  "McLeod Ganj","Palampur","Kangra","Nurpur","Nahan",
  "Chandigarh","Amritsar","Ludhiana","Jalandhar","Patiala",
  "Bathinda","Moga","Firozpur","Faridkot","Barnala",
  "Sangrur","Hoshiarpur","Phagwara","Kapurthala","Muktsar",
  "Ambala","Yamunanagar","Kurukshetra","Kaithal","Sirsa",
  "Fatehabad","Hisar","Bhiwani","Charkhi Dadri","Mahendragarh",
  "Jaipur","Ajmer","Kota","Udaipur","Jodhpur","Bikaner",
  "Alwar","Bharatpur","Dausa","Sikar","Jhunjhunu",
  "Churu","Hanumangarh","Sri Ganganagar",
  "Jammu","Srinagar","Anantnag","Baramulla","Pulwama",
  "Kupwara","Leh","Kargil",
  "Patna","Gaya","Muzaffarpur","Darbhanga","Bhagalpur",
  "Begusarai","Ara","Chapra","Sitamarhi","Madhubani",
  "Indore","Bhopal","Raipur","Nagpur","Ahmedabad",
  "Surat","Vadodara","Rajkot"
];

export const AIRPORTS = [
  "DEL – Delhi, India",
  "BOM – Mumbai, India",
  "BLR – Bengaluru, India",
  "HYD – Hyderabad, India",
  "MAA – Chennai, India",
  "CCU – Kolkata, India",
  "PNQ – Pune, India",
  "AMD – Ahmedabad, India",
  "COK – Kochi, India",
  "TRV – Trivandrum, India",
  "JAI – Jaipur, India",
  "IXC – Chandigarh, India",
  "DXB – Dubai, UAE",
  "AUH – Abu Dhabi, UAE",
  "DOH – Doha, Qatar",
  "RUH – Riyadh, Saudi Arabia",
  "JED – Jeddah, Saudi Arabia",
  "MCT – Muscat, Oman",
  "KWI – Kuwait City, Kuwait",
  "LHR – London Heathrow, UK",
  "LGW – London Gatwick, UK",
  "CDG – Paris Charles de Gaulle, France",
  "AMS – Amsterdam, Netherlands",
  "FRA – Frankfurt, Germany",
  "MUC – Munich, Germany",
  "MAD – Madrid, Spain",
  "BCN – Barcelona, Spain",
  "FCO – Rome, Italy",
  "ZRH – Zurich, Switzerland",
  "VIE – Vienna, Austria",
  "JFK – New York, USA",
  "EWR – Newark, USA",
  "LAX – Los Angeles, USA",
  "SFO – San Francisco, USA",
  "ORD – Chicago O’Hare, USA",
  "DFW – Dallas, USA",
  "ATL – Atlanta, USA",
  "SEA – Seattle, USA",
  "BOS – Boston, USA",
  "IAD – Washington D.C., USA",
  "SIN – Singapore",
  "BKK – Bangkok, Thailand",
  "HKG – Hong Kong",
  "NRT – Tokyo Narita, Japan",
  "HND – Tokyo Haneda, Japan",
  "ICN – Seoul Incheon, South Korea",
  "KUL – Kuala Lumpur, Malaysia",
  "CGK – Jakarta, Indonesia",
  "MNL – Manila, Philippines",
  "SYD – Sydney, Australia",
  "MEL – Melbourne, Australia",
  "BNE – Brisbane, Australia",
  "PER – Perth, Australia",
  "JNB – Johannesburg, South Africa",
  "CPT – Cape Town, South Africa",
  "NBO – Nairobi, Kenya",
  "CAI – Cairo, Egypt"
];

export const COUNTRIES = [
  "India","Thailand","Indonesia","Maldives","Sri Lanka","Nepal","Bhutan",
  "Singapore","Malaysia","Vietnam","Cambodia","Laos","Japan","South Korea",
  "China","Philippines","UAE","Qatar","Oman","Turkey","Jordan","Israel",
  "France","Italy","Switzerland","Germany","Netherlands","Spain","Portugal",
  "Greece","Austria","Belgium","Czech Republic","Hungary","Poland",
  "United Kingdom","Ireland","Scotland","Norway","Sweden","Finland","Iceland",
  "United States","Canada","Mexico","Brazil","Argentina","Peru","Chile",
  "Colombia","Costa Rica","Panama",
  "South Africa","Kenya","Tanzania","Egypt","Morocco","Namibia",
  "Australia","New Zealand","Fiji","Tahiti"
];

export default function DataLists() {
  return (
    <>
      <datalist id="indian-cities">
        {CITIES.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <datalist id="flight-airports">
        {AIRPORTS.map((a) => (
          <option key={a} value={a} />
        ))}
      </datalist>

      <datalist id="countries-list">
        {COUNTRIES.map((co) => (
          <option key={co} value={co} />
        ))}
      </datalist>
    </>
  );
}
