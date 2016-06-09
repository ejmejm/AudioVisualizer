var cube;

function visualThreeDWavesSetup(){
  threejsSetup();

  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  var light = new THREE.PointLight( 0xf9f9f9, 2, 100 );
  light.position.set( 50, 50, 50 );
  scene.add( light );
  camera.position.z = 5;
}

function visualThreeDWavesRender(){
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
	renderer.render(scene, camera);
}
