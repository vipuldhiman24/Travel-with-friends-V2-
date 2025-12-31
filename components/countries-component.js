// countries-component.js
(function loadCountries() {
  if (document.getElementById("countries-list")) return;

  const datalist = document.createElement("datalist");
  datalist.id = "countries-list";

  const countries = [
    // Asia
    "India","Thailand","Indonesia","Maldives","Sri Lanka","Nepal","Bhutan",
    "Singapore","Malaysia","Vietnam","Cambodia","Laos","Japan","South Korea",
    "China","Philippines","UAE","Qatar","Oman","Turkey","Jordan","Israel",

    // Europe
    "France","Italy","Switzerland","Germany","Netherlands","Spain","Portugal",
    "Greece","Austria","Belgium","Czech Republic","Hungary","Poland",
    "United Kingdom","Ireland","Scotland","Norway","Sweden","Finland","Iceland",

    // Americas
    "United States","Canada","Mexico","Brazil","Argentina","Peru","Chile",
    "Colombia","Costa Rica","Panama",

    // Africa
    "South Africa","Kenya","Tanzania","Egypt","Morocco","Namibia",

    // Oceania
    "Australia","New Zealand","Fiji","Tahiti"
  ];

  countries.forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    datalist.appendChild(option);
  });

  document.body.appendChild(datalist);
})();
