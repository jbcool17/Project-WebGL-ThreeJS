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
//RENDERER
//########################################################################
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor(0x21ccff, 1);
renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; //soft shadow
document.body.insertBefore(renderer.domElement, document.body.firstChild);


//########################################################################
//OBJECTS
//########################################################################
	//Materials
var boxMaterialBasic, boxMaterialLambert, boxMaterialPhong;
	//Geo
var boxGeometry, box;

boxMaterialBasic = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.VertexColors });

boxMaterialLambert = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
boxMaterialPhong = new THREE.MeshPhongMaterial({ color: 0x2194ce, 
												emissive: 0x2194ce, 
												specular: 0x111111, 
												shininess: 100,
												shading: THREE.FlatShading  });

boxGeometry = new THREE.BoxGeometry( 1, 1, 1);	
box = new THREE.Mesh( boxGeometry, boxMaterialLambert );
box.position.y = 2;
box.name = 'box';
box.castShadow = true;
box.receiveShadow = true;

for (var i = 0; i <12; i+=2) {
    var r= Math.random(); 
    var g= Math.random()*100; 
    var b= Math.random(); 
                  
    box.geometry.faces[i].color.setRGB(r,g,b);
    box.geometry.faces[i+1].color.setRGB(r,g,b);                
}

scene.add( box );



var ground = new THREE.Mesh( new THREE.PlaneGeometry(100, 100, 1), new THREE.MeshPhongMaterial( { color: 0xffdd99 } ) );
ground.rotateX( - Math.PI / 2 );
ground.castShadow = false;
ground.receiveShadow = true;
// raycastHold.push( ground );
scene.add( ground );

//########################################################################
//FUNCTIONS
//########################################################################

var boxHolder = [];
var createBox = function () {
	
	box = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1), 
						  new THREE.MeshBasicMaterial({ color: 0x111111 }));
	boxHolder.push( box );
	scene.add( box );
}

var onWindowResize = function(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

var render = function () {
	requestAnimationFrame( render );
	
	//Animations
	// for (var i = 0; i < scene.children.length; i++ ){
	// 	if ( scene.children[i].name === 'box') {
	// 		scene.children[i].rotation.y += Math.random() * 0.01;
	// 		scene.children[i].rotation.x += Math.random() * 0.01;	
	// 	}
	// }
	

	controls.update();
	renderer.render( scene, camera );
}
        
//ON PAGE LOAD
$(document).ready(function() {
	render();
	window.addEventListener( 'resize', onWindowResize, false );
});