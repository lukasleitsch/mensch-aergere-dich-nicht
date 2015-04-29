/*
 * Diese Script Datei erstellt das Spielfeld bzw. das Spielbrett
 */

var spielfelder;
var gewinnfelder;
var hausfelder;

var radius = 0.6;
var segmente = 32;

/*
 * Erstellt das Spielfeld mit Huetchen im 'Haus'
 */
function erstelleSpielfeld() {
  var geometry = new THREE.BoxGeometry(11, 0.1, 11);
  var material = new THREE.MeshBasicMaterial({
    color: 0xDCC088
  });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

/*
 * Initialisiert ein Array mit geometrischen Kreisen
 */
function intialisiereSpielfelder (){
  var circleGeometry = new THREE.CircleGeometry(radius, segmente);
  var material = new THREE.MeshBasicMaterial({
    color: 0xFAFAD9
  });
  
  for(var i = 0; i < 40; i++){
    spielfelder[i] = new THREE.Mesh(circleGeometry, material);
  }
}