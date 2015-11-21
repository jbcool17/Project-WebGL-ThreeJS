var scene, camera, renderer, light, spotLight, controls;

Physijs.scripts.worker = 'bower_components/Physijs/physijs_worker.js';
Physijs.scripts.ammo = 'bower_components/ammo.js/builds/ammo.js';
//########################################################################
//SCENE
//########################################################################
scene = new Physijs.Scene();

	//Gavity
scene.setGravity( new THREE.Vector3( 0, -25, 0 ));

//########################################################################
//CAMERA
//########################################################################
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set( 0, 1, 5);
controls = new THREE.OrbitControls( camera );

//########################################################################
//RENDERER
//########################################################################
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );

renderer.setClearColor(0x21ccff, 1); //Background Color

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; //soft shadow
document.body.insertBefore(renderer.domElement, document.body.firstChild);

//########################################################################
//LIGHTS
//########################################################################
light = new THREE.AmbientLight(0x000000);

spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );

spotLight.castShadow = true;
spotLight.shadowDarkness = 0.5;
spotLight.shadowMapWidth = 2048;
spotLight.shadowMapHeight = 2048;
spotLight.shadowCameraNear = 500;
spotLight.shadowCameraFar = 4000;
spotLight.shadowCameraFov = 0.1; //shadow quality

scene.add( light, spotLight );

//########################################################################
//OBJECTS
//########################################################################
	//Materials
var boxMaterialBasic, boxMaterialLambert, boxMaterialPhong;

boxMaterialBasic = new THREE.MeshBasicMaterial({ color: 0x0000ff }); //Blue Basic
boxMaterialLambert = new THREE.MeshLambertMaterial({ color: 0x00ff00 }); //Green Lambert
boxMaterialPhong = new THREE.MeshPhongMaterial({ color: 0x2194ce, 
												emissive: 0x2194ce, 
												specular: 0x111111, 
												shininess: 100,
												shading: THREE.FlatShading  });



var box = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xaaff00, wireframe: true }));
box.position.set( 0, 1, 0);
box.castShadow = true;
box.receiveShadow = true;
scene.add( box );

var ground = new THREE.Mesh( new THREE.PlaneGeometry(100, 100, 1), new THREE.MeshPhongMaterial( { color: 0xcccccc } ) );
ground.rotateX( - Math.PI / 2 );
ground.castShadow = false;
ground.receiveShadow = true;
scene.add( ground );
//########################################################################
//FUNCTIONS
//########################################################################


var onWindowResize = function(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

var render = function () {
	requestAnimationFrame( render );
	
	//Animations
	box.rotation.y += 0.01;
	
	controls.update();
	renderer.render( scene, camera );
}
        
//ON PAGE LOAD
$(document).ready(function() {

	render();

	window.addEventListener( 'resize', onWindowResize, false );
});




















