// Mapa Leaflet
var mapa = L.map('mapid').setView([9.92, -84.20], 13);

// Definición de capas base
var osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
  {
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(mapa);	
var esri = L.tileLayer(
	  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
	  {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	  }
	).addTo(mapa);
	
var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(mapa);

var topo2 = L.tileLayer('https://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png', {
	maxZoom: 15,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa);

var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(mapa);

// Conjunto de capas base
	var mapas = {
	    "ESRI": esri,		
		"DARK": dark,
		"HIKE-BIKE ": topo2,
		"TOPOGRAFICO" : topo,
		"OSM": osm,
	};    
	    
// Control de capas
control_capas = L.control.layers(mapas).addTo(mapa);	

// Control de escala
L.control.scale({position: 'topright', imperial: false}).addTo(mapa);


$.getJSON("https://marcelocubero.github.io/capas/dis-sa.geojson", function(geodata) {
  var capa_dis = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#0000FF", 'weight': 1, 'fillOpacity': 0.20, 'fillColor':'#6495ED'}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Nombre Distrito:</strong> " + feature.properties.distrito + "<br>" + "<strong>Cantón:</strong> " + feature.properties.canton
	  + "<br>" + "<strong>Provincia:</strong> " + feature.properties.provincia;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);
  control_capas.addOverlay(capa_dis, 'Distritos de Santa Ana');
});

$.getJSON("https://marcelocubero.github.io/capas/24k-lindora.geojson", function(geodata) {
  var k_lindora = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#FF00FF", 'weight': 3}
    },			
  }).addTo(mapa);

  control_capas.addOverlay(k_lindora, '24K Lindora');
});

$.getJSON("https://marcelocubero.github.io/capas/fondo-lindora.geojson", function(geodata) {
  var fondo_lindora = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#FF4500", 'weight': 3}
    },			
  }).addTo(mapa);

  control_capas.addOverlay(fondo_lindora, 'Fondo Lindora');
});

$.getJSON("https://marcelocubero.github.io/capas/salitral.geojson", function(geodata) {
  var salitral = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#228B22", 'weight': 3}
    },			
  }).addTo(mapa);

  control_capas.addOverlay(salitral, 'Salitral');
});

$.getJSON("https://marcelocubero.github.io/capas/puntos.geojson", function(geodata) {
var puntos = L.geoJson(geodata, {
style: function(feature) {
return {'color': "#00FF00", 'weight': 5}
},
onEachFeature: function(feature, layer) {
var popupText = "<strong>Nombre:</strong> " + feature.properties.nombre;
layer.bindPopup(popupText);
}			
}).addTo(mapa);
control_capas.addOverlay(puntos, 'Puntos de Hidratación');
});








