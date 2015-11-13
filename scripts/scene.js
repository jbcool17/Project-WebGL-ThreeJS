var scene, camera, renderer, light, spotLight, controls;


var mouse = new THREE.Vector2(), INTERSECTED;
//########################################################################
//SCENE
//########################################################################
scene = new THREE.Scene();

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

scene.add( box );
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




















