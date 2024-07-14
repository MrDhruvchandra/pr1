import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import { preventDefault } from 'ol/events/Event';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: fromLonLat([78.9629, 20.5937]), // Longitude and latitude of India
    zoom: 5 // Adjust the zoom level as needed
  })
});

//  search input box onclick
// const DropdownLinksOfSearchInput = [
//   { name: "Link 1", link: "link1" },
//   { name: "Link 2", link: "link2" },
//   { name: "Link 3", link: "link3" }
// ];


// dropdown buttom
const DropdownLinks = [
  { name: "Link 1", link: "link1" },
  { name: "Link 2", link: "link2" },
  { name: "Link 3", link: "link3" }
];

const dropdownLinksContainer = document.getElementById('dropdown-links');
DropdownLinks.forEach(data => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.className = 'dropdown-link';
  a.href = data.link;
  a.textContent = data.name;
  li.appendChild(a);
  dropdownLinksContainer.appendChild(li);
});
// for dropdown two
// search input dropdown 
const DropdownLinksTwo = [
  // { name: "Link 1", link: "link1" },
  // { name: "Link 2", link: "link2" },
  // { name: "Link 3", link: "link3" }
  {
    "type": "Feature",
    "properties": {
      "name": "xxyz"
    },
    "geometry": {
      "coordinates": [
        81.0040106777401,
        26.85667294631095
      ],
      "type": "Point"
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "sdsd"
    },
    "geometry": {
      "coordinates": [
        81.00459450607889,
        26.836227491236258
      ],
      "type": "Point"
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "dsdsd"
    },
    "geometry": {
      "coordinates": [
        80.98065754414642,
        26.8772448980921
      ],
      "type": "Point"
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "dff"
    },
    "geometry": {
      "coordinates": [
        80.89892157657397,
        26.86057930088498
      ],
      "type": "Point"
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "gsdg"
    },
    "geometry": {
      "coordinates": [
        80.9177500405325,
        26.84104617946359
      ],
      "type": "Point"
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "ghtr"
    },
    "geometry": {
      "coordinates": [
        80.92811299356345,
        26.88453532447693
      ],
      "type": "Point"
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "erwwe"
    },
    "geometry": {
      "coordinates": [
        80.94518997250287,
        26.87086538929907
      ],
      "type": "Point"
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "teh"
    },
    "geometry": {
      "coordinates": [
        80.96635374982179,
        26.826719748273078
      ],
      "type": "Point"
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "tyetytr"
    },
    "geometry": {
      "coordinates": [
        80.97350564698479,
        26.85419885198894
      ],
      "type": "Point"
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "asdasd"
    },
    "geometry": {
      "coordinates": [
        80.99992387936067,
        26.86904260638856
      ],
      "type": "Point"
    }
  }
];
const dropdownLinksContainerTwo = document.getElementById('dropdown-links-2');
// console.log(dropdownLinksContainerTwo);
DropdownLinksTwo.forEach(data => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.className =  data.geometry.type;
  a.id=data.properties.name;
  a.href = data.type;
  a.textContent = data.properties.name;
  li.appendChild(a);
  dropdownLinksContainerTwo.appendChild(li);
  // console.log(dropdownLinksContainerTwo);

});
const searchInput=document.getElementById('search-input');

const dynamicLi=document.getElementById('dropdown-links-2').querySelectorAll('li');
   console.log(dynamicLi);
   dynamicLi.forEach(li => {
     
     li.addEventListener('click',()=>{
   
   DropdownLinksTwo.forEach(data => {
     searchInput.value=data.geometry.coordinates;
     map.view.center=data.
   });
})
});

function liClick(){
   
   DropdownLinksTwo.forEach(data => {
     searchInput.value=data.geometry.coordinates;
   });
}








// Function to toggle the dropdown
   function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
   }

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
}
}

document.getElementsByClassName('ol-overlaycontainer') ;
let searchButtom= document.getElementById("search-btn");
let searchText= document.getElementById("search-text");
let mesurementButtom= document.getElementById("measurement-btn");
let mesureText= document.getElementById("measure-text");
let gridButtom= document.getElementById("grid-btn");
let gridText= document.getElementById("grid-text");
let listButtom= document.getElementById("list-btn");
let listText= document.getElementById("list-text");
let zoomInText= document.getElementById("zoom-in-text");
let zoomOutText= document.getElementById("zoom-out-text");
let toggleButtom= document.getElementById("toggle-sidebar");
let toggleText= document.getElementById("toggle-text");
const divOlZoom=document.getElementsByClassName('ol-zoom ol-unselectable ol-control')[0];
 
divOlZoom.style.display="flex";
divOlZoom.style.justifyContent="space-around";
divOlZoom.style.gap="13px";
divOlZoom.style.flexDirection="column";
divOlZoom.style.margin="13px";
divOlZoom.style.backgroundColor=" transparent";
divOlZoom.style.border=" none";
divOlZoom.appendChild(toggleButtom);
divOlZoom.appendChild(toggleText);
divOlZoom.appendChild(searchButtom);
divOlZoom.appendChild(searchText);

divOlZoom.appendChild(mesurementButtom);
divOlZoom.appendChild(mesureText);
divOlZoom.appendChild(gridButtom);
divOlZoom.appendChild(gridText);
divOlZoom.appendChild(listButtom);
divOlZoom.appendChild(listText);
 

toggleButtom.style.top="0rem" ;
toggleButtom.style.width=" 40px"; 
toggleButtom.style.height= "40px";
toggleButtom.style.margin= "1px"; 
 toggleButtom.style.padding= "3px"; 
 toggleButtom.style.position= "sticky"; 
 toggleButtom.style.left= "29rem"; 
 toggleButtom.style.top="-5rem" ;
 
  toggleButtom.style.border=" 2px solid white"; 
  toggleButtom.style.borderRadius= "24px";
  toggleButtom.style.backgroundColor= "black"; 
  toggleButtom.style.color= "aliceblue";

 
const zoomIn=document.getElementsByClassName('ol-zoom-in')[0];
const zoomOut=document.getElementsByClassName('ol-zoom-out')[0];
document.getElementsByClassName('ol-zoom ol-unselectable ol-control')[0].style.gap=".5rem";
// const olMapMainDiv= document.getElementsByClassName('ol-overlaycontainer-stopevent');

// olMapMainDiv.appendChild(toggleButtom);
divOlZoom.appendChild(zoomIn);
divOlZoom.appendChild(zoomInText);
divOlZoom.appendChild(zoomOut);
divOlZoom.appendChild(zoomOutText);
zoomIn.style.width=" 40px"; 
zoomIn.style.height= "40px";
 zoomIn.style.margin= "1px"; 
 zoomIn.style.padding= "3px"; 
 zoomIn.style.position= "sticky"; 
 zoomIn.style.left= "0rem"; 
 zoomIn.style.top="1rem" ;
  
  zoomIn.style.border=" 2px solid white"; 
  zoomIn.style.borderRadius= "24px";
  toggleButtom.style.borderRadius= "5px";
  zoomIn.style.backgroundColor= "black"; 
  zoomIn.style.color= "aliceblue";
 
zoomOut.style.width=" 40px"; 
zoomOut.style.height= "40px";
zoomOut.style.margin= "1px"; 
 zoomOut.style.padding= "3px"; 
 zoomOut.style.position= "sticky"; 
 zoomOut.style.left= "0rem"; 
 toggleButtom.style.left= "0rem"; 
 zoomOut.style.top="4rem" ;
 
  zoomOut.style.border=" 2px solid white"; 
  zoomOut.style.borderRadius= "24px";
  zoomOut.style.backgroundColor= "black"; 
  zoomOut.style.color= "aliceblue";
 const divRightBtn=document.getElementsByClassName('div class="ol-overlaycontainer-stopevent')[0];
const iconBtn=document.getElementsByClassName('icon-btn')[0]
divRightBtn.appendChild(iconBtn)

//  search buttom input 

//  async function getInput(){
//  const data =await fetch('')
//  data.res.json({});
// }
 
 
 



   
