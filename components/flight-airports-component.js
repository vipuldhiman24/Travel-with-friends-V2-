// flight-airports-component.js
(function loadFlightAirports() {
  if (document.getElementById("flight-airports")) return;

  const datalist = document.createElement("datalist");
  datalist.id = "flight-airports";

  const airports = [
    // INDIA
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

    // MIDDLE EAST
    "DXB – Dubai, UAE",
    "AUH – Abu Dhabi, UAE",
    "DOH – Doha, Qatar",
    "RUH – Riyadh, Saudi Arabia",
    "JED – Jeddah, Saudi Arabia",
    "MCT – Muscat, Oman",
    "KWI – Kuwait City, Kuwait",

    // EUROPE
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

    // USA
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

    // ASIA
    "SIN – Singapore",
    "BKK – Bangkok, Thailand",
    "HKG – Hong Kong",
    "NRT – Tokyo Narita, Japan",
    "HND – Tokyo Haneda, Japan",
    "ICN – Seoul Incheon, South Korea",
    "KUL – Kuala Lumpur, Malaysia",
    "CGK – Jakarta, Indonesia",
    "MNL – Manila, Philippines",

    // AUSTRALIA
    "SYD – Sydney, Australia",
    "MEL – Melbourne, Australia",
    "BNE – Brisbane, Australia",
    "PER – Perth, Australia",

    // AFRICA
    "JNB – Johannesburg, South Africa",
    "CPT – Cape Town, South Africa",
    "NBO – Nairobi, Kenya",
    "CAI – Cairo, Egypt"
  ];

  airports.forEach(airport => {
    const option = document.createElement("option");
    option.value = airport;
    datalist.appendChild(option);
  });

  document.body.appendChild(datalist);
})();
