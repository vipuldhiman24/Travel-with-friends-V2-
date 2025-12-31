// city-component.js
(function loadIndianCities() {
  if (document.getElementById("indian-cities")) return;

  const datalist = document.createElement("datalist");
  datalist.id = "indian-cities";

  const cities = [
    // Major Metros
    "Delhi","Mumbai","Bengaluru","Hyderabad","Chennai","Kolkata","Pune",

    // NCR & Delhi Region
    "Noida","Greater Noida","Gurgaon","Faridabad","Ghaziabad",
    "Sonipat","Panipat","Karnal","Rohtak","Bahadurgarh",
    "Meerut","Hapur","Bulandshahr","Alwar","Rewari",

    // Uttar Pradesh
    "Lucknow","Kanpur","Agra","Mathura","Vrindavan","Ayodhya",
    "Varanasi","Prayagraj","Gorakhpur","Jhansi","Bareilly",
    "Moradabad","Rampur","Shahjahanpur","Sitapur","Lakhimpur",
    "Etawah","Mainpuri","Firozabad","Aligarh","Hathras",

    // Uttarakhand
    "Dehradun","Haridwar","Rishikesh","Roorkee","Haldwani",
    "Ramnagar","Nainital","Almora","Pithoragarh","Rudrapur",
    "Kashipur","Kotdwar","Mussoorie","Tehri","Chamoli",

    // Himachal Pradesh
    "Shimla","Manali","Kullu","Solan","Una","Hamirpur",
    "Bilaspur","Chamba","Dalhousie","Dharamshala",
    "McLeod Ganj","Palampur","Kangra","Nurpur","Nahan",

    // Punjab
    "Chandigarh","Amritsar","Ludhiana","Jalandhar","Patiala",
    "Bathinda","Moga","Firozpur","Faridkot","Barnala",
    "Sangrur","Hoshiarpur","Phagwara","Kapurthala","Muktsar",

    // Haryana
    "Ambala","Yamunanagar","Kurukshetra","Kaithal","Sirsa",
    "Fatehabad","Hisar","Bhiwani","Charkhi Dadri","Mahendragarh",

    // Rajasthan (North)
    "Jaipur","Ajmer","Kota","Udaipur","Jodhpur","Bikaner",
    "Alwar","Bharatpur","Dausa","Sikar","Jhunjhunu",
    "Churu","Hanumangarh","Sri Ganganagar",

    // Jammu & Kashmir / Ladakh
    "Jammu","Srinagar","Anantnag","Baramulla","Pulwama",
    "Kupwara","Leh","Kargil",

    // Bihar (North influence)
    "Patna","Gaya","Muzaffarpur","Darbhanga","Bhagalpur",
    "Begusarai","Ara","Chapra","Sitamarhi","Madhubani",

    // Central / Others (kept from earlier)
    "Indore","Bhopal","Raipur","Nagpur","Ahmedabad",
    "Surat","Vadodara","Rajkot"
  ];

  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    datalist.appendChild(option);
  });

  document.body.appendChild(datalist);
})();
