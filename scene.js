var scene, camera, renderer, light, spotLight, controls;

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

spotLight = new THREE.SpotLight(0x04ff04);
spotLight.position.set( 0, 15, 1);
spotLight.castShadow = true;
var spotLightHelper = new THREE.SpotLightHelper( spotLight );

scene.add( light, spotLight, spotLightHelper );

//########################################################################
//RENDERER
//########################################################################
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor(0x21ccff, 1);
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
box = new THREE.Mesh( boxGeometry, boxMaterialBasic );
box.position.set( 0, 1, 0);
box.castShadow = true;

	//setup colors
for (var i = 0; i <12; i+=2) {
    var r= Math.random(); 
    var g= Math.random()*100; 
    var b= Math.random(); 
                  
    box.geometry.faces[i].color.setRGB(r,g,b);
    box.geometry.faces[i+1].color.setRGB(r,g,b);                
}

scene.add( box );


var ground = new THREE.Mesh( new THREE.PlaneGeometry(100, 100, 1), boxMaterialPhong );
ground.rotateX( - Math.PI / 2 );
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