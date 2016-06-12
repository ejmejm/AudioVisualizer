var water;
var controls;


var separation = 15;
var amountX = 200; //Must be divisible by 2
var amountY = 200; //Must be divisible by 2
var amountWaves = 200;
var waveIndex = 0;

var width  = separation * amountX;
var height = separation * amountY;

var geometry, water, points = [];

function visualThreeDWavesSetup(){
  threejsSetup();

  controls = new THREE.OrbitControls(camera, renderer.domElement);
	//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
	controls.enableDamping = true;
	controls.dampingFactor = 1;
	controls.enableZoom = true;
  controls.enablePan = false;
  controls.maxZoom = 200;
  /*
  var geometry = new THREE.RingGeometry(0.0000000000001, 10000, 50, 50, 0, Math.PI * 2)
  var material = new THREE.MeshBasicMaterial({ color: 0x41b1d4, side: THREE.DoubleSide });
  water = new THREE.Mesh(geometry, material);
  water.position.set(0, 0, 0);
  scene.add(water);
  */
  var light = new THREE.PointLight(0xf9f9f9, 1.5, 100000);
  light.position.set(1000, 1000, -1000);
  scene.add(light);
  camera.position.z = 500;
  camera.position.y = 500;

  geometry = new THREE.PlaneGeometry(width, height, amountX, amountY);
  var material = new THREE.MeshBasicMaterial({ color: 0x41b1d4, wireframe: true });
  water = new THREE.Mesh(geometry, material);

  calculateInitialPoints();

  //water.rotation.x = Math.PI / -2;
  scene.add(water);
}

function visualThreeDWavesRender(){
  controls.update();
  updatePoints();
	renderer.render(scene, camera);
}

function calculateInitialPoints() {
  for(var i = 0; i < amountWaves; i++) {
    points[i] = new Array();
    for(var j = 0; j < bufferLength; j++) {
      points[i][j] = 0;
    }
  }
}

function updatePoints() {
  points.pop();
  points.unshift(dataArray.slice());

  for(var i = 0; i < geometry.vertices.length; i++) {
    var v = geometry.vertices[i];
    var vDist = Math.sqrt(Math.pow(v.x / separation, 2) + Math.pow(v.y / separation, 2)); //Distance from water center in terms of points (1/25 scale)
    var angle = Math.atan2(0, 1) - Math.atan2(v.y, v.x); //Angle between point and x axis
    if(angle < 0)
      angle += (2 * Math.PI); //Correct angle
    v.z = points[Math.floor(vDist)][Math.floor((angle * bufferLength) / (2 * Math.PI))];
  }
  //water.material = new THREE.MeshBasicMaterial({ color: 'rgb(' + points[Math.floor(vDist)][Math.floor((angle * bufferLength) / (2 * Math.PI))] + ', 50, 50)', wireframe: true });
  //water.material.needsUpdate = true;
  geometry.verticesNeedUpdate = true;
  waveIndex++;
}
