var clock = new THREE.Clock();
var delta = clock.getDelta(); // seconds.
var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
var container, stats;

var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var obj;
let cWidth;
let cHeight

$( document ).ready(function() {
    init();
    // if (obj != null){
        animate();
    // }
});

function init() {

    // container = document.createElement( 'div' );
    // document.body.appendChild( container );

    container = document.getElementById("mouse");
    cWidth = container.clientWidth;
    cHeight = container.clientHeight;
    windowHalfX = container.clientWidth / 2;
    windowHalfY = container.clientHeight / 2;
    console.log(cWidth);
    console.log(cHeight);

    camera = new THREE.PerspectiveCamera( 45, cWidth / cHeight, 1, 2000 );
    camera.position.z = 600;

    // scene

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    var ambient = new THREE.AmbientLight( 0x101030 );
    scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 );
    scene.add( directionalLight );

    // texture

    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {

        console.log( item, loaded, total );

    };

    // model
    var loader = new THREE.OBJLoader( manager );
    loader.load( 'assets/3d/mouse.obj', function ( object ) {

        object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {
                //child.material.map = texture;
            }

        } );

        // object.position.x = - 60;
        object.position.y = - 80;
        // object.rotation.x = 270* Math.PI / 180;
        // object.rotation.y = 180* Math.PI / 180;
        // object.rotation.z = 1* Math.PI / 180;
        object.scale.x = 2;
        object.scale.y = 2;
        object.scale.z = 2;
        obj = object;
        scene.add( obj );

    } );

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( cWidth, cHeight );
    container.appendChild( renderer.domElement );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
    windowHalfX = container.clientWidth / 2;
    windowHalfY = container.clientHeight / 2;

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( container.clientWidth, container.clientHeight );
}

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    // obj.rotation.y += (0.2*(Math.PI / 180));
    // obj.rotation.y %=360;

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );

    renderer.render( scene, camera );
}