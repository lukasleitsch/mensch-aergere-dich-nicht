/*
 * Diese Script Datei erstellt das Spielfeld bzw. das Spielbrett
 */

function erstelleSpielfeld() {
  var geometry = new THREE.BoxGeometry(11, 0.1, 11);
  var material = new THREE.MeshBasicMaterial({
    color: 0xDCC088
  });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}