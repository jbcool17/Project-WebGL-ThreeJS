Physijs.scripts.worker = '/bower_components/Physijs/physijs_worker.js'
Physijs.scripts.ammo = '/bower_components/ammo.js/builds/ammo.js'

var scene = new Physijs.Scene(),
	light = new THREE.AmbientLight(0xffffff),
	camera,
	renderer = new THREE.WebGLRenderer(),
	box,
	ground;


scene.setGravity(new THREE.Vector3( 0, -25, 0));

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor(0x000000, 1);
document.getElementById('webgl-canvas').appendChild(renderer.domElement);



//AUTO RESIZE
var onWindowResize = function(event) {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


scene.add( light );

camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1000 );
camera.position.set( 60, 50, 60 );
scene.add( camera );

var spotLight = new THREE.SpotLight(0x040404);
spotLight.position.y = 20;
scene.add( spotLight );

//BOX
var boxMaterial = Physijs.createMaterial( new THREE.MeshBasicMaterial({ color: 0xFF0000 }), 0, 1); //Friction, bouciness

box = new Physijs.BoxMesh( new THREE.CubeGeometry( 15, 15, 15), boxMaterial );

box.position.y = 40;
box.rotation.z = 90;
box.rotation.y = 50;

box.addEventListener( 'collision', function(
		otherObject,
		relative_velocity,
		relative_rotation,
		contact_normal ) {

		if ( otherObject.name ===  'ground') {
			console.log('hit');
		}
	});

scene.add( box );


//GROUND
var groundMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ color: 0x008888 }),
    0, //friction
    0.5 //restitution/bounciness
);

ground = new Physijs.BoxMesh(
    new THREE.CubeGeometry(150, 5, 150),
    groundMaterial,
    0
);

ground.name='ground';
ground.position.y = -25;
scene.add( ground );

//RENDER FUNCTION
var render = function() {
	scene.simulate();
	renderer.render( scene, camera );

	requestAnimationFrame( render );

}

//WHEN PAGES LOADS
window.onload = function(){
	requestAnimationFrame( render );

	window.addEventListener('resize', onWindowResize, false);
};















