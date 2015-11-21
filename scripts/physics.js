var scene, camera, renderer, light, spotLight, controls;

Physijs.scripts.worker = '/bower_components/Physijs/physijs_worker.js';
Physijs.scripts.ammo = '/bower_components/ammo.js/builds/ammo.js';

//########################################################################
//SCENE
//########################################################################
scene = new Physijs.Scene(),
 
scene.setGravity( new THREE.Vector3( 0, -25, 0 ) );
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
//CAMERA
//########################################################################
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set( 0, 15, 15);
controls = new THREE.OrbitControls( camera );
controls.autoRotate = true;

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
          



    
var boxMaterial= Physijs.createMaterial(
    new THREE.MeshBasicMaterial({ color: 0xaaff00, wireframe: true }),
    0, //friction
    1 //restitution/bounciness
);
    
box= new Physijs.BoxMesh(
    new THREE.BoxGeometry( 15, 15, 15 ),
    boxMaterial
);

box.position.y=40;
box.rotation.z=90;
box.rotation.y=50;

box.addEventListener( 'collision', function( 
    otherObject, 
    relative_velocity, 
    relative_rotation, 
    contact_normal ) {
    
    if(otherObject.name=="ground"){
       // alert('hit ground')
       console.log('HIT');
    }                

});

scene.add(box);           

 var groundMaterial = Physijs.createMaterial(
    new THREE.MeshPhongMaterial( { color: 0xcccccc } ),
    0, //friction
    0.5 //restitution/bounciness
);

ground = new Physijs.BoxMesh(
    new THREE.PlaneGeometry(100, 100, 1),
    groundMaterial,
    0
);

ground.rotateX( - Math.PI / 2 );
ground.castShadow = false;
ground.receiveShadow = true;
ground.name='ground';
ground.position.y = -25;
scene.add( ground );           

requestAnimationFrame(render);

function render() {
scene.simulate();
renderer.render( scene, camera); 

requestAnimationFrame(render);
};


