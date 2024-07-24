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
            baseLayerGroup.getLayers().forEach(function(element, index, array){
                let baseLayerTitle = element.get('title');
                element.setVisible(baseLayerTitle === baseLayerElementValue);
            })
        })
    }

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


// measure tool
async function addStateGeoJSONLayer(map) {
    try {
        const response = await fetch('https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson');
        const geoJsonData = await response.json();
        
        const vectorSource = new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(geoJsonData, {
                dataProjection: 'EPSG:4326', // Assuming the GeoJSON data is in EPSG:4326 (WGS84)
                featureProjection: 'EPSG:3857' // The projection of your map
            })
        });

        const dataLayer = new ol.layer.Vector({
            source: vectorSource,
            visible: false,
            title: 'India States'
        });

        map.addLayer(dataLayer);
    } catch (error) {
        console.error('Error fetching or processing GeoJSON data:', error);
    }
}

// Assuming `map` is already defined as your OpenLayers map object
addStateGeoJSONLayer(map);

async function addDistrictGeoJSONLayer(map) {
    try {
        // Reliable source for India's districts GeoJSON data
        const response = await fetch('https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson');
        const geoJsonData = await response.json();
        
        const vectorSource = new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(geoJsonData, {
                dataProjection: 'EPSG:4326', // Assuming the GeoJSON data is in EPSG:4326 (WGS84)
                featureProjection: 'EPSG:3857' // The projection of your map
            })
        });

        const dataLayer = new ol.layer.Vector({
            source: vectorSource,
            visible: false,
            title: 'India Districts'
        });

        map.addLayer(dataLayer);
    } catch (error) {
        console.error('Error fetching or processing GeoJSON data:', error);
    }
}

// Assuming `map` is already defined as your OpenLayers map object
addDistrictGeoJSONLayer(map);

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

// addGeoJSONLayer(map);
// const data = new ol.layer.Vector({
//     source: new ol.source.Vector({
//         url: ' http://localhost:3000/geojson',
//         format: new ol.format.GeoJSON()
//     }),
//     visible: true,
//     title: 'data'
// });

// map.addLayer(data);



}