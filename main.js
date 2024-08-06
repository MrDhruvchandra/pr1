// import WKB from 'wkb';

window.onload = init;

function init() {
    const map = new ol.Map({
        view: new ol.View({
            center: ol.proj.fromLonLat([78.9629, 20.5937]), // Center the map on India
            zoom: 5,
            projection: 'EPSG:3857' // Ensure the map uses EPSG:3857 projection
        }),
        target: 'map'
    });


// zoom in zoom out button styling
    
const zoomIn=document.getElementsByClassName('ol-zoom-in')[0];
const zoomOut=document.getElementsByClassName('ol-zoom-out')[0];
 document.getElementsByClassName('ol-zoom ol-unselectable ol-control')[0].style.top="21rem";
document.getElementsByClassName('ol-zoom ol-unselectable ol-control')[0].style.left=".3rem";
document.getElementsByClassName('ol-zoom ol-unselectable ol-control')[0].style.height="6.5rem";
document.getElementsByClassName('ol-zoom ol-unselectable ol-control')[0].style.display="flex";
document.getElementsByClassName('ol-zoom ol-unselectable ol-control')[0].style.flexDirection="column";
document.getElementsByClassName('ol-zoom ol-unselectable ol-control')[0].style.justifyContent="space-between";
document.getElementsByClassName('ol-zoom ol-unselectable ol-control')[0].style.background="transparent";
 
zoomIn.style.width=" 40px"; 
zoomIn.style.height= "40px";
 zoomIn.style.margin= "1px"; 
 zoomIn.style.padding= "3px"; 
 zoomIn.style.position= "sticky"; 
 zoomIn.style.left= "0rem"; 
 zoomIn.style.top="1rem" ;
  
  zoomIn.style.border=" 2px solid white"; 
  zoomIn.style.borderRadius= "24px";
   zoomIn.style.backgroundColor= "black"; 
  zoomIn.style.color= "aliceblue";
 
zoomOut.style.width=" 40px"; 
zoomOut.style.height= "40px";
zoomOut.style.margin= "1px"; 
 zoomOut.style.padding= "3px"; 
 zoomOut.style.position= "sticky"; 
 zoomOut.style.left= "0rem"; 
  zoomOut.style.top="4rem" ;
 
  zoomOut.style.border=" 2px solid white"; 
  zoomOut.style.borderRadius= "24px";
  zoomOut.style.backgroundColor= "black"; 
  zoomOut.style.color= "aliceblue";



    // Base maps layers
    const openStreetMapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true,
        title: 'OSMStandard'
    });

    const openStreetMapHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        visible: false,
        title: 'OSMHumanitarian'
    });
 
 
    const cartoDBPositron = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
        }),
        visible: false,
        title: 'CartoDBPositron'
    });
    const bingMapsSatellite = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://ecn.t0.tiles.virtualearth.net/tiles/a{q}.png?g=1&key=Your-Bing-Maps-Key-Here' // Replace with your Bing Maps API key
        }),
        visible: false,
        title: 'BingSatellite'
    });
    
    // Layer group
    const baseLayerGroup = new ol.layer.Group({
        layers: [
            openStreetMapStandard,
            openStreetMapHumanitarian,
            bingMapsSatellite,
            cartoDBPositron
        ]
    });

    map.addLayer(baseLayerGroup);

    //layer swicher 
    const baseLayerElements=document.querySelectorAll('.map-layer > input[type=radio]');
    for(let baseLayerElement of baseLayerElements ){
        // console.log(baseLayerElement);
        baseLayerElement.addEventListener('change',function(){
            let baseLayerElementValue=this.value;
            baseLayerGroup.getLayers().forEach(function(element){
                let baseLayerTitle = element.get('title');
                element.setVisible(baseLayerTitle === baseLayerElementValue);
            })
        })
    }
   
    


// layers
const worldCountriesLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
      url: 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
      format: new ol.format.GeoJSON(),
      attributions: 'World Countries GeoJSON'
  }),
  visible: false,
  title: 'WorldCountries',
  style: function(feature) {
      const countryName = feature.get('ADMIN'); // Adjust this if the property name is different
      if (countryName === 'India') {
          return new ol.style.Style({
              stroke: new ol.style.Stroke({
                  color: 'orange',
                  width: 2
              })
          });
      } else {
          return new ol.style.Style({
              stroke: new ol.style.Stroke({
                  color: '#000000',
                  width: 1
              }),
              fill: new ol.style.Fill({
                  color: 'rgba(0, 0, 0, 0.1)'
              })
          });
      }
  }
});
map.addLayer(worldCountriesLayer);
  
// india all states layer
const indiaStatesLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
      url: 'india_state.geojson',
      format: new ol.format.GeoJSON(),
      attributions: 'India States GeoJSON'
  }),
  visible: false,
  title: 'IndiaStates'
});
map.addLayer(indiaStatesLayer);
  
// all district layer
const indiaDistrictsLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
      url: 'india_district.geojson',
      format: new ol.format.GeoJSON(),
      attributions: 'India Districts GeoJSON'
  }),
  visible: false,
  title: 'IndiaDistricts'
}); 

map.addLayer(indiaDistrictsLayer);



// all national park layer
const allNationalParks = new ol.layer.Vector({
  source: new ol.source.Vector({
      url: 'map (1).geojson',
      format: new ol.format.GeoJSON()
  }),
  visible: false,
  title: 'allNationalParks',
  style: function(feature) {
      if (feature.getGeometry().getType() === 'Point') {
          return new ol.style.Style({
              image: new ol.style.Icon({
                  src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="green" /></svg>',
                  scale: 1.0
              }),
              text: new ol.style.Text({
                  text: feature.get('name'), // Replace 'name' with the property containing the name
                  offsetY: -15, // Adjust the vertical position of the text
                  font: '12px Calibri,sans-serif',
                  fill: new ol.style.Fill({
                      color: '#000'
                  }),
                  stroke: new ol.style.Stroke({
                      color: '#49ed49',
                      width: 2
                  })
              })
          });
      }
  }
});
map.addLayer(allNationalParks);

  // Button functionality to toggle layer visibility
document.getElementById('countrylayer').addEventListener('click', function() {
  const currentVisible = worldCountriesLayer.getVisible();
  worldCountriesLayer.setVisible(!currentVisible);
});
// Button functionality to toggle layer visibility
document.getElementById('statelayer').addEventListener('click', function() {
  const currentVisible = indiaStatesLayer.getVisible();
  indiaStatesLayer.setVisible(!currentVisible);
});
document.getElementById('districtlayer').addEventListener('click', function() {
  const currentVisible = indiaDistrictsLayer.getVisible();
  indiaDistrictsLayer.setVisible(!currentVisible);
});
document.getElementById('parklayer').addEventListener('click', function() {
  const currentVisible = allNationalParks.getVisible();
  allNationalParks.setVisible(!currentVisible);
});

// parks 
const allParks = new ol.layer.Vector({
  source: new ol.source.Vector({
      url: 'http://localhost:3000/graveyard',
      format: new ol.format.GeoJSON()
  }),
  visible: false,
  title: 'allNationalParks',
  style: function(feature) {
      if (feature.getGeometry().getType() === 'Point') {
          return new ol.style.Style({
              image: new ol.style.Icon({
                  src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="green" /></svg>',
                  scale: 1.0
              }),
              text: new ol.style.Text({
                  text: feature.get('name'), // Replace 'name' with the property containing the name
                  offsetY: -15, // Adjust the vertical position of the text
                  font: '12px Calibri,sans-serif',
                  fill: new ol.style.Fill({
                      color: '#000'
                  }),
                  stroke: new ol.style.Stroke({
                      color: '#49ed49',
                      width: 2
                  })
              })
          });
      }
  }
});
map.addLayer(allParks);

document.getElementById('parks').addEventListener('click', function() {
  const currentVisible = allParks.getVisible();
  allParks.setVisible(!currentVisible);

  const lucknowCenter = ol.proj.fromLonLat([80.9462, 26.8505]); // Center of Lucknow
  const lucknowZoom = 12; // Desired zoom level for Lucknow

  // Adjust the map view
  map.getView().animate({
      center: lucknowCenter,
      zoom: lucknowZoom,
      duration: 1000 // Animation duration in milliseconds
  });
  
});

// goverment offices in lucknow
const govOffices = new ol.layer.Vector({
  source: new ol.source.Vector({
      url: ' http://localhost:3000/governmentoffices',
      format: new ol.format.GeoJSON()
  }),
  visible: false,
  title: 'goverment offices',
  style: function(feature) {
      if (feature.getGeometry().getType() === 'Point') {
          return new ol.style.Style({
              image: new ol.style.Icon({
                  src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="blue" /></svg>',
                  scale: 1.0
              }),
              text: new ol.style.Text({
                  text: feature.get('name'), // Replace 'name' with the property containing the name
                  offsetY: -15, // Adjust the vertical position of the text
                  font: '12px Calibri,sans-serif',
                  fill: new ol.style.Fill({
                      color: '#000'
                  }),
                  stroke: new ol.style.Stroke({
                      color: 'rgb(5, 69, 207)',
                      width: 2
                  })
              })
          });
      }
  }
});
map.addLayer(govOffices);

document.getElementById('gov-office').addEventListener('click', function() {
  const currentVisible = govOffices.getVisible();
  govOffices.setVisible(!currentVisible);

  const lucknowCenter = ol.proj.fromLonLat([80.9462, 26.8505]); // Center of Lucknow
  const lucknowZoom = 12; // Desired zoom level for Lucknow

  // Adjust the map view
  map.getView().animate({
      center: lucknowCenter,
      zoom: lucknowZoom,
      duration: 1000 // Animation duration in milliseconds
  });
  
});

const busStop = new ol.layer.Vector({
  source: new ol.source.Vector({
      url: 'http://localhost:3000/busstop',
      format: new ol.format.GeoJSON()
  }),
  visible: false,
  title: 'busStop',
  style: function(feature) {
      if (feature.getGeometry().getType() === 'Point') {
          return new ol.style.Style({
              image: new ol.style.Icon({
                  src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="blue" /></svg>',
                  scale: 1.0
              }),
              text: new ol.style.Text({
                  text: feature.get('name'), // Replace 'name' with the property containing the name
                  offsetY: -15, // Adjust the vertical position of the text
                  font: '12px Calibri,sans-serif',
                  fill: new ol.style.Fill({
                      color: '#000'
                  }),
                  stroke: new ol.style.Stroke({
                      color: 'rgb(5, 69, 207)',
                      width: 2
                  })
              })
          });
      }
  }
});
map.addLayer(busStop);

document.getElementById('bus-stop').addEventListener('click', function() {
  const currentVisible = busStop.getVisible();
  busStop.setVisible(!currentVisible);

  const lucknowCenter = ol.proj.fromLonLat([80.9462, 26.8505]); // Center of Lucknow
  const lucknowZoom = 12; // Desired zoom level for Lucknow

  // Adjust the map view
  map.getView().animate({
      center: lucknowCenter,
      zoom: lucknowZoom,
      duration: 1000 // Animation duration in milliseconds
  });
  
});
const hospital = new ol.layer.Vector({
  source: new ol.source.Vector({
      url: 'http://localhost:3000/hospital',
      format: new ol.format.GeoJSON()
  }),
  visible: false,
  title: 'hospital',
  style: function(feature) {
      if (feature.getGeometry().getType() === 'Point') {
          return new ol.style.Style({
              image: new ol.style.Icon({
                  src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="red" /></svg>',
                  scale: 1.0
              }),
              text: new ol.style.Text({
                  text: feature.get('name'), // Replace 'name' with the property containing the name
                  offsetY: -15, // Adjust the vertical position of the text
                  font: '12px Calibri,sans-serif',
                  fill: new ol.style.Fill({
                      color: '#000'
                  }),
                  stroke: new ol.style.Stroke({
                      color: 'rgb(5, 69, 207)',
                      width: 2
                  })
              })
          });
      }
  }
});
map.addLayer(hospital);

document.getElementById('hospital').addEventListener('click', function() {
  const currentVisible =hospital.getVisible();
  hospital.setVisible(!currentVisible);

  const lucknowCenter = ol.proj.fromLonLat([80.9462, 26.8505]); // Center of Lucknow
  const lucknowZoom = 12; // Desired zoom level for Lucknow

  // Adjust the map view
  map.getView().animate({
      center: lucknowCenter,
      zoom: lucknowZoom,
      duration: 1000 // Animation duration in milliseconds
  });
  
});
const eduInstitutes = new ol.layer.Vector({
  source: new ol.source.Vector({
      url: 'http://localhost:3000/educationalInstitutes',
      format: new ol.format.GeoJSON()
  }),
  visible: false,
  title: 'educational Institutes',
  style: function(feature) {
      if (feature.getGeometry().getType() === 'Point') {
          return new ol.style.Style({
              image: new ol.style.Icon({
                  src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="blue" /></svg>',
                  scale: 1.0
              }),
              text: new ol.style.Text({
                  text: feature.get('name'), // Replace 'name' with the property containing the name
                  offsetY: -15, // Adjust the vertical position of the text
                  font: '12px Calibri,sans-serif',
                  fill: new ol.style.Fill({
                      color: '#000'
                  }),
                  stroke: new ol.style.Stroke({
                      color: 'rgb(5, 69, 207)',
                      width: 2
                  })
              })
          });
      }
  }
});
map.addLayer(eduInstitutes);

document.getElementById('educational-institutes').addEventListener('click', function() {
  const currentVisible = eduInstitutes.getVisible();
  eduInstitutes.setVisible(!currentVisible);

  const lucknowCenter = ol.proj.fromLonLat([80.9462, 26.8505]); // Center of Lucknow
  const lucknowZoom = 12; // Desired zoom level for Lucknow

  // Adjust the map view
  map.getView().animate({
      center: lucknowCenter,
      zoom: lucknowZoom,
      duration: 1000 // Animation duration in milliseconds
  });
  
});
const bankAtm= new ol.layer.Vector({
  source: new ol.source.Vector({
      url: 'http://localhost:3000/bank&Atm',
      format: new ol.format.GeoJSON()
  }),
  visible: false,
  title: 'bank Atm',
  style: function(feature) {
      if (feature.getGeometry().getType() === 'Point') {
          return new ol.style.Style({
              image: new ol.style.Icon({
                  src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="blue" /></svg>',
                  scale: 1.0
              }),
              text: new ol.style.Text({
                  text: feature.get('name'), // Replace 'name' with the property containing the name
                  offsetY: -15, // Adjust the vertical position of the text
                  font: '12px Calibri,sans-serif',
                  fill: new ol.style.Fill({
                      color: '#000'
                  }),
                  stroke: new ol.style.Stroke({
                      color: 'rgb(5, 69, 207)',
                      width: 2
                  })
              })
          });
      }
  }
});
map.addLayer(bankAtm);

document.getElementById('bank-atm').addEventListener('click', function() {
  const currentVisible = bankAtm.getVisible();
  bankAtm.setVisible(!currentVisible);

  const lucknowCenter = ol.proj.fromLonLat([80.9462, 26.8505]); // Center of Lucknow
  const lucknowZoom = 12; // Desired zoom level for Lucknow

  // Adjust the map view
  map.getView().animate({
      center: lucknowCenter,
      zoom: lucknowZoom,
      duration: 1000 // Animation duration in milliseconds
  });
  
});
const petrolPump= new ol.layer.Vector({
  source: new ol.source.Vector({
      url: 'http://localhost:3000/petrolpump',
      format: new ol.format.GeoJSON()
  }),
  visible: false,
  title: 'petrol pump',
  style: function(feature) {
      if (feature.getGeometry().getType() === 'Point') {
          return new ol.style.Style({
              image: new ol.style.Icon({
                  src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="red" /></svg>',
                  scale: 1.0
              }),
              text: new ol.style.Text({
                  text: feature.get('name'), // Replace 'name' with the property containing the name
                  offsetY: -15, // Adjust the vertical position of the text
                  font: '12px Calibri,sans-serif',
                  fill: new ol.style.Fill({
                      color: '#000'
                  }),
                  stroke: new ol.style.Stroke({
                      color: 'rgb(5, 69, 207)',
                      width: 2
                  })
              })
          });
      }
  }
});
map.addLayer(petrolPump);

document.getElementById('petrol-pump').addEventListener('click', function() {
  const currentVisible = petrolPump.getVisible();
  petrolPump.setVisible(!currentVisible);

  const lucknowCenter = ol.proj.fromLonLat([80.9462, 26.8505]); // Center of Lucknow
  const lucknowZoom = 12; // Desired zoom level for Lucknow

  // Adjust the map view
  map.getView().animate({
      center: lucknowCenter,
      zoom: lucknowZoom,
      duration: 1000 // Animation duration in milliseconds
  });
  
});










// async function addGeoJSONLayer(map) {
//     try {
//         const response = await fetch('http://localhost:3000/geojson'); // Correct URL without extra space
//         const jsonData = await response.json();

//         // Log the data structure
//         console.log('Received data:', jsonData);

//         // Ensure jsonData is in the correct format
//         if (jsonData && jsonData.features) {
//             // Initialize a vector source
//             const vectorSource = new ol.source.Vector();

//             // Convert to OpenLayers features
//             const format = new ol.format.GeoJSON();
//             const features = format.readFeatures(jsonData, {
//                 dataProjection: 'EPSG:4326',
//                 featureProjection: 'EPSG:3857'
//             });

//             // Add each feature to the vector source
//             features.forEach(feature => {
//                 vectorSource.addFeature(feature);
//             });

//             // Create a vector layer
//             const dataLayer = new ol.layer.Vector({
//                 source: vectorSource,
//                 visible: true,
//                 title: 'Features'
//             });

//             // Add the layer to the map
//             map.addLayer(dataLayer);
//         } else {
//             console.error('Unexpected data format:', jsonData);
//         }
        
//     } catch (error) {
//         console.error('Error fetching or processing GeoJSON data:', error);
//     }
// }






 // measure box starts here



//  import Draw from 'ol/interaction/Draw.js';
// import Map from 'ol/Map.js';
// import Overlay from 'ol/Overlay.js';
// import View from 'ol/View.js';
// import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
// import {LineString, Polygon} from 'ol/geom.js';
// import {OSM, Vector as VectorSource} from 'ol/source.js';
// import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
// import {getArea, getLength} from 'ol/sphere.js';
// import {unByKey} from 'ol/Observable.js';
function measureBox(){
 
    const raster = new TileLayer({
        source: new OSM(),
      });
      
      const source = new VectorSource();
      
      const vector = new VectorLayer({
        source: source,
        style: {
          'fill-color': 'rgba(255, 255, 255, 0.2)',
          'stroke-color': '#ffcc33',
          'stroke-width': 2,
          'circle-radius': 7,
          'circle-fill-color': '#ffcc33',
        },
      });
      
      /**
       * Currently drawn feature.
       * @type {import("../src/ol/Feature.js").default}
       */
      let sketch;
      
      /**
       * The help tooltip element.
       * @type {HTMLElement}
       */
      let helpTooltipElement;
      
      /**
       * Overlay to show the help messages.
       * @type {Overlay}
       */
      let helpTooltip;
      
      /**
       * The measure tooltip element.
       * @type {HTMLElement}
       */
      let measureTooltipElement;
      
      /**
       * Overlay to show the measurement.
       * @type {Overlay}
       */
      let measureTooltip;
      
      /**
       * Message to show when the user is drawing a polygon.
       * @type {string}
       */
      const continuePolygonMsg = 'Click to continue drawing the polygon';
      
      /**
       * Message to show when the user is drawing a line.
       * @type {string}
       */
      const continueLineMsg = 'Click to continue drawing the line';
      
      /**
       * Handle pointer move.
       * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
       */
      const pointerMoveHandler = function (evt) {
        if (evt.dragging) {
          return;
        }
        /** @type {string} */
        let helpMsg = 'Click to start drawing';
      
        if (sketch) {
          const geom = sketch.getGeometry();
          if (geom instanceof Polygon) {
            helpMsg = continuePolygonMsg;
          } else if (geom instanceof LineString) {
            helpMsg = continueLineMsg;
          }
        }
      
        helpTooltipElement.innerHTML = helpMsg;
        helpTooltip.setPosition(evt.coordinate);
      
        helpTooltipElement.classList.remove('hidden');
      };
      
      // const map = new Map({
      //   layers: [raster, vector],
      //   target: 'map',
      //   view: new View({
      //     center: [-11000000, 4600000],
      //     zoom: 15,
      //   }),
      // });
      
      map.on('pointermove', pointerMoveHandler);
      
      map.getViewport().addEventListener('mouseout', function () {
        helpTooltipElement.classList.add('hidden');
      });
      
      const typeSelect = document.getElementById('type');
      
      let draw; // global so we can remove it later
      
      /**
       * Format length output.
       * @param {LineString} line The line.
       * @return {string} The formatted length.
       */
      const formatLength = function (line) {
        const length = getLength(line);
        let output;
        if (length > 100) {
          output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
        } else {
          output = Math.round(length * 100) / 100 + ' ' + 'm';
        }
        return output;
      };
      
      /**
       * Format area output.
       * @param {Polygon} polygon The polygon.
       * @return {string} Formatted area.
       */
      const formatArea = function (polygon) {
        const area = getArea(polygon);
        let output;
        if (area > 10000) {
          output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
        } else {
          output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
        }
        return output;
      };
      
      const style = new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2,
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)',
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
        }),
      });
      
      function addInteraction() {
        const type = typeSelect.value == 'area' ? 'Polygon' : 'LineString';
        draw = new Draw({
          source: source,
          type: type,
          style: function (feature) {
            const geometryType = feature.getGeometry().getType();
            if (geometryType === type || geometryType === 'Point') {
              return style;
            }
          },
        });
        map.addInteraction(draw);
      
        createMeasureTooltip();
        createHelpTooltip();
      
        let listener;
        draw.on('drawstart', function (evt) {
          // set sketch
          sketch = evt.feature;
      
          /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
          let tooltipCoord = evt.coordinate;
      
          listener = sketch.getGeometry().on('change', function (evt) {
            const geom = evt.target;
            let output;
            if (geom instanceof Polygon) {
              output = formatArea(geom);
              tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof LineString) {
              output = formatLength(geom);
              tooltipCoord = geom.getLastCoordinate();
            }
            measureTooltipElement.innerHTML = output;
            measureTooltip.setPosition(tooltipCoord);
          });
        });
      
        draw.on('drawend', function () {
          measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
          measureTooltip.setOffset([0, -7]);
          // unset sketch
          sketch = null;
          // unset tooltip so that a new one can be created
          measureTooltipElement = null;
          createMeasureTooltip();
          unByKey(listener);
        });
      }
      
      /**
       * Creates a new help tooltip
       */
      function createHelpTooltip() {
        if (helpTooltipElement) {
          helpTooltipElement.parentNode.removeChild(helpTooltipElement);
        }
        helpTooltipElement = document.createElement('div');
        helpTooltipElement.className = 'ol-tooltip hidden';
        helpTooltip = new Overlay({
          element: helpTooltipElement,
          offset: [15, 0],
          positioning: 'center-left',
        });
        map.addOverlay(helpTooltip);
      }
      
      /**
       * Creates a new measure tooltip
       */
      function createMeasureTooltip() {
        if (measureTooltipElement) {
          measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
        measureTooltip = new Overlay({
          element: measureTooltipElement,
          offset: [0, -15],
          positioning: 'bottom-center',
          stopEvent: false,
          insertFirst: false,
        });
        map.addOverlay(measureTooltip);
      }
      
      /**
       * Let user change the geometry type.
       */
      typeSelect.onchange = function () {
        map.removeInteraction(draw);
        addInteraction();
      };
      
      addInteraction();
      
      
}



}