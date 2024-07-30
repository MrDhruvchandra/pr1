
//  search input box onclick
const DropdownLinksTwo = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Ladakh",
    "Jammu and Kashmir"
  ];

const searchInput = document.getElementById('search-input');
const resultsBox = document.querySelector(".result-box");

let debounceTimeout;

searchInput.onkeyup = function () {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
      let result = [];
      let input = searchInput.value;

      if (input.length) {
          result = DropdownLinksTwo.filter((data) => {
              return data.toLowerCase().includes(input.toLowerCase());
          });
      }

      display(result);

      if (!result.length) {
          resultsBox.innerHTML = '';
          resultsBox.style.display = 'none';
      } else {
          resultsBox.style.display = 'block';
      }
  }, 100);
};

function display(results) {
  const content = results.map((list) => {
      return `<li onclick="selectInput(this)">${list}</li>`;
  }).join('');
  resultsBox.innerHTML = `<ul>${content}</ul>`;
}

function selectInput(list) {
  searchInput.value = list.innerHTML;
  resultsBox.innerHTML = '';
  resultsBox.style.display = 'none';
}


//  search inpur bor dropdown
 function openDropdown() {
            let dropdownList = document.getElementById("search-dropdown-list");
             let display = dropdownList.style.display;
             document.getElementById('search-dropdown-input-btn').style.transform = 'rotate(180deg)'

            if (display === 'none' || display === '') {
                dropdownList.style.display = 'block';
 
            } else {
                dropdownList.style.display = 'none';
                document.getElementById('search-dropdown-input-btn').style.transform = 'rotate(0deg)'

            }
        }
 
        const indianStatesAndUTs = [
            { name: "Andhra Pradesh", coordinates: { lat: 15.9129, lon: 79.74 } },
            { name: "Arunachal Pradesh", coordinates: { lat: 28.217, lon: 94.7278 } },
            { name: "Assam", coordinates: { lat: 26.2006, lon: 92.9376 } },
            { name: "Bihar", coordinates: { lat: 25.0961, lon: 85.3131 } },
            { name: "Chhattisgarh", coordinates: { lat: 21.2787, lon: 81.8661 } },
            { name: "Goa", coordinates: { lat: 15.2993, lon: 74.124 } },
            { name: "Gujarat", coordinates: { lat: 22.2587, lon: 71.1924 } },
            { name: "Haryana", coordinates: { lat: 29.0588, lon: 76.0856 } },
            { name: "Himachal Pradesh", coordinates: { lat: 31.1048, lon: 77.1734 } },
            { name: "Jharkhand", coordinates: { lat: 23.6102, lon: 85.2799 } },
            { name: "Karnataka", coordinates: { lat: 15.3173, lon: 75.7139 } },
            { name: "Kerala", coordinates: { lat: 10.8505, lon: 76.2711 } },
            { name: "Madhya Pradesh", coordinates: { lat: 22.9734, lon: 78.6569 } },
            { name: "Maharashtra", coordinates: { lat: 19.7515, lon: 75.7139 } },
            { name: "Manipur", coordinates: { lat: 24.6637, lon: 93.9063 } },
            { name: "Meghalaya", coordinates: { lat: 25.467, lon: 91.3662 } },
            { name: "Mizoram", coordinates: { lat: 23.1645, lon: 92.9376 } },
            { name: "Nagaland", coordinates: { lat: 26.1584, lon: 94.5624 } },
            { name: "Odisha", coordinates: { lat: 20.9517, lon: 85.0985 } },
            { name: "Punjab", coordinates: { lat: 31.1471, lon: 75.3412 } },
            { name: "Rajasthan", coordinates: { lat: 27.0238, lon: 74.2179 } },
            { name: "Sikkim", coordinates: { lat: 27.533, lon: 88.5122 } },
            { name: "Tamil Nadu", coordinates: { lat: 11.1271, lon: 78.6569 } },
            { name: "Telangana", coordinates: { lat: 18.1124, lon: 79.0193 } },
            { name: "Tripura", coordinates: { lat: 23.9408, lon: 91.9882 } },
            { name: "Uttar Pradesh", coordinates: { lat: 26.8467, lon: 80.9462 } },
            { name: "Uttarakhand", coordinates: { lat: 30.0668, lon: 79.0193 } },
            { name: "West Bengal", coordinates: { lat: 22.9868, lon: 87.855 } },
            { name: "Andaman and Nicobar Islands", coordinates: { lat: 11.7401, lon: 92.6586 } },
            { name: "Chandigarh", coordinates: { lat: 30.7333, lon: 76.7794 } },
            { name: "Dadra and Nagar Haveli and Daman and Diu", coordinates: { lat: 20.4283, lon: 72.8397 } },
            { name: "Lakshadweep", coordinates: { lat: 10.328, lon: 72.7846 } },
            { name: "Delhi", coordinates: { lat: 28.7041, lon: 77.1025 } },
            { name: "Puducherry", coordinates: { lat: 11.9416, lon: 79.8083 } },
            { name: "Ladakh", coordinates: { lat: 34.2268, lon: 77.5619 } },
            { name: "Jammu and Kashmir", coordinates: { lat: 33.7782, lon: 76.5762 } }
          ];
          
           const searchDropdownListUl = document.getElementById('search-dropdown-list-ul');
          const searchInputButtonA = document.getElementById('search-input-button-a');
          
           indianStatesAndUTs.forEach(state => {
             const li = document.createElement('li');
            
             const button = document.createElement('button');
            button.textContent = `${state.name} `;
            button.id = `search-dropdown-li-button`;
            button.className = `([${state.coordinates.lat}, ${state.coordinates.lon}])`;


            // Optionally, add an event listener to the button
            button.addEventListener('click', () => {
             if(searchInput.value===''  ){
                searchInput.value = button.textContent;
                searchInputButtonA.href = button.className;
               
            }else{
                searchInput.value='';
                searchInputButtonA.href = button.className;
             }
             });
            
            // Append the button to the list item
            li.appendChild(button);
            
            // Append the list item to the unordered list
            searchDropdownListUl.appendChild(li);
          });



       




  
  // query box buttons
  function attributeSwitch1() {
    document.getElementById('attribute-box1').style.display = 'block';
    document.getElementById('draw-box1').style.display = 'none';
}

function drawSwitch1() {
    document.getElementById('attribute-box1').style.display = 'none';
    document.getElementById('draw-box1').style.display = 'block';
}
function attributeSwitch2() {
    document.getElementById('attribute-box2').style.display = 'block';
    document.getElementById('draw-box2').style.display = 'none';
}

function drawSwitch2() {
    document.getElementById('attribute-box2').style.display = 'none';
    document.getElementById('draw-box2').style.display = 'block';
}
function attributeSwitch3() {
    document.getElementById('attribute-box3').style.display = 'block';
    document.getElementById('draw-box3').style.display = 'none';
}

function drawSwitch3() {
    document.getElementById('attribute-box3').style.display = 'none';
    document.getElementById('draw-box3').style.display = 'block';
}



const roadButton = document.querySelector('#header-road-button');
const drainButton = document.querySelector('#header-drain-button');
const otherButton = document.querySelector('#header-other-button');
const roadSection = document.querySelector('#road-button');
const drainSection = document.querySelector('#drain-button');
const otherSection = document.querySelector('#other-button');
 // query box header buttons (road , drain, other)   

function roadClick() {
    if (roadSection.style.display === 'none') {
        roadSection.style.display = 'block';
        drainSection.style.display = 'none';
        otherSection.style.display = 'none';

    } else {
        drainSection.style.display = 'none';
        otherSection.style.display = 'none';
    }

};

function otherClick() {
    if (otherSection.style.display === 'none') {
        roadSection.style.display = 'none';
        drainSection.style.display = 'none';
        otherSection.style.display = 'block';

    } else {
        roadSection.style.display = 'none';
        drainSection.style.display = 'none';
    }

};


function drainClick() {
    if (drainSection.style.display === 'none') {
        roadSection.style.display = 'none';
        drainSection.style.display = 'block';
        otherSection.style.display = 'none';

    } else {
        roadSection.style.display = 'none';
        otherSection.style.display = 'none';
    }

};
 
  
//  ended here

// right arrow button top right corner
function goBack() {
    window.history.back();
}








// table navbar buttons functionality

// download button right navbar on table
function downloadAllTablesAsCSV() {
    const tableIds = ['summary', 'road', 'ward', 'view', 'zone'];
    let csv = [];

    tableIds.forEach(tableId => {
        let table = document.getElementById(tableId);
        let rows = table.rows;

        csv.push(`Table: ${tableId}`); // Add table name to the CSV
        for (let i = 0; i < rows.length; i++) {
            let row = [], cols = rows[i].querySelectorAll("td, th");

            for (let j = 0; j < cols.length; j++) {
                row.push(cols[j].innerText);
            }

            csv.push(row.join(","));
        }
        csv.push(""); // Add an empty line between tables
    });

    let csvString = csv.join("\n");
    let blob = new Blob([csvString], { type: "text/csv" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tables.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
//  tabel close button right navbar

function closeTable() {
    const tableContainer = document.getElementById('table-container');
    if (tableContainer.style.display === 'none' || tableContainer.style.display === '') {
        tableContainer.style.display = 'block';
        tableContainer.style.maxHeight = '200px';
    } else {
        tableContainer.style.display = 'none';
    }
}
//  summary button
const summaryLink = document.querySelector('#summary-link');
const summaryDiv = document.querySelector('#summary');

summaryLink.addEventListener('click', () => {
    if (summaryDiv.style.display === 'none') {
        summaryDiv.style.display = 'block';
        zoneDiv.style.display = 'none';
        wardDiv.style.display = 'none';
        viewDiv.style.display = 'none';
          roadDiv.style.display = 'none';
    } else {
      zoneDiv.style.display = 'none';
      wardDiv.style.display = 'none';
      viewDiv.style.display = 'none';
        roadDiv.style.display = 'none';    }

});

// zone button
const zoneLink = document.querySelector('#zone-link');
const zoneDiv = document.querySelector('#zone');

zoneLink.addEventListener('click', () => {
    if (zoneDiv.style.display === 'none') {
      summaryDiv.style.display = 'none';
      wardDiv.style.display = 'none';
      viewDiv.style.display = 'none';
        roadDiv.style.display = 'none';
        zoneDiv.style.display = 'block';
     } else {
      summaryDiv.style.display = 'none';
      wardDiv.style.display = 'none';
      viewDiv.style.display = 'none';
        roadDiv.style.display = 'none';
    }
});
// road button
const roadLink = document.querySelector('#road-link');
const roadDiv = document.querySelector('#road');

roadLink.addEventListener('click', () => {
    if (roadDiv.style.display === 'none') {
      summaryDiv.style.display = 'none';
      zoneDiv.style.display = 'none';
      wardDiv.style.display = 'none';
      viewDiv.style.display = 'none';
        roadDiv.style.display = 'block';
     } else {
      summaryDiv.style.display = 'none';
      zoneDiv.style.display = 'none';
      wardDiv.style.display = 'none';
      viewDiv.style.display = 'none';

 
    }
});
// ward button
const wardLink = document.querySelector('#ward-link');
const wardDiv = document.querySelector('#ward');

wardLink.addEventListener('click', () => {
    if (wardDiv.style.display === 'none') {
      summaryDiv.style.display = 'none';
      zoneDiv.style.display = 'none';
      roadDiv.style.display = 'none';
      viewDiv.style.display = 'none';
        wardDiv.style.display = 'block';
    } else {
      summaryDiv.style.display = 'none';
        zoneDiv.style.display = 'none';
        roadDiv.style.display = 'none';
        viewDiv.style.display = 'none';

    }
});
// view button 
const viewLink = document.querySelector('#view-link');
const viewDiv = document.querySelector('#view');
viewLink.addEventListener('click', () => {
    if (viewDiv.style.display === 'none') {
        summaryDiv.style.display = 'none';
        zoneDiv.style.display = 'none';
        roadDiv.style.display = 'none';
        wardDiv.style.display = 'none';
        viewDiv.style.display = 'block';
    } else {
      summaryDiv.style.display = 'none';
      zoneDiv.style.display = 'none';
      roadDiv.style.display = 'none';
      wardDiv.style.display = 'none';
    }
});
function minimizeWindow() {
     document.getElementById('table-container').style.maxHeight = '60px';
}
function maxmizeTable() {
     document.getElementById('table-container').style.maxHeight = '400px';
}
// bridge dropdown
const bridges = ['item1','item2','item3','item3','item3','item3','item3','item3'];
  
   const bridgeDropdownListUl = document.getElementById('bridge-dropdown-list-ul');
  const bridgeInputButtonA = document.getElementById('bridge-input-button-a');
  
   bridges.forEach(e => {
     const li = document.createElement('li');
    
    // Create a new button
    const button = document.createElement('button');
    button.textContent = `${e} `;
    button.id = `bridge-dropdown-li-button`;
    button.className = `${e}`;

    
     li.appendChild(button);
    
     bridgeDropdownListUl.appendChild(li);
  });
  function openBridgeDropdown() {
    let bridgeDropdownList = document.getElementById("bridge-dropdown-list");
     let display = bridgeDropdownList.style.display;
     document.getElementById('bridge-dropdown-input-btn').style.transform = 'rotate(180deg)'

    if (display === 'none' || display === '') {
        bridgeDropdownList.style.display = 'block';

    } else {
        bridgeDropdownList.style.display = 'none';
        document.getElementById('bridge-dropdown-input-btn').style.transform = 'rotate(0deg)'

    }
}

