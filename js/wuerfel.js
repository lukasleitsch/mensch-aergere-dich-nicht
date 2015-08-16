// Würfel
// Erstellt die Scene auf der "gearbeitet" wird
var sceneWuerfel = new THREE.Scene();

// Erstellt eine Kamera mit den Attributen
var cameraWuerfel = new THREE.PerspectiveCamera(75,
        window.innerWidth / window.innerHeight, 0.1, 1000);
    
// Erstellt Lichter
var ambientLight = new THREE.AmbientLight(0x404040);
var directionalLight = new THREE.DirectionalLight(0xdfebff);


// Erstellt den Renderer
var rendererWuerfel = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

rendererWuerfel.shadowMapEnabled = true;   
rendererWuerfel.shadowMapSoft = true;
rendererWuerfel.shadowMapType = THREE.PCFShadowMap;

        
// Setzt die Kamera an den beschrieben Ort

cameraWuerfel.position.set(8, 8, 8);
cameraWuerfel.up.set( 0, 1, 0 );
cameraWuerfel.lookAt(sceneWuerfel.position);


rendererWuerfel.setSize(400, 300);
document.getElementById('wuerfel').appendChild( rendererWuerfel.domElement );

sceneWuerfel.add(ambientLight);


sceneWuerfel.add(cameraWuerfel);

// Maussteuerung

controlsWuerfel = new THREE.OrbitControls( cameraWuerfel );
controlsWuerfel.damping = 0.2;
controlsWuerfel.addEventListener( 'change', renderWuerfel );

var imagePrefix = "img/";
var directions  = ["eins", "sechs", "drei", "vier", "fuenf", "zwei"];
var imageSuffix = ".png";

var materialArray = [];
for (var i = 0; i < 6; i++)
  materialArray.push( new THREE.MeshBasicMaterial({
  map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix )
}));

var geometry = new THREE.BoxGeometry( 5, 5, 5 );
var material = new THREE.MeshFaceMaterial(materialArray);
var wuerfelCube = new THREE.Mesh( geometry, material );
sceneWuerfel.add( wuerfelCube );

// Loop-Funktion aufrufen
var renderWuerfel = function() {
  requestAnimationFrame(renderWuerfel);
  //cube.rotation.x += 0.1;

  rendererWuerfel.render(sceneWuerfel, cameraWuerfel);
  TWEEN.update();
};
renderWuerfel();