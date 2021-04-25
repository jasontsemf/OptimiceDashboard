var clock = new THREE.Clock();
var delta = clock.getDelta(); // seconds.
var rotateAngle = Math.PI / 2 * delta; // pi/2 radians (90 degrees) per second
var container, stats;

var camera, scene, renderer;

var mouseX = 0,
    mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var obj;
let cWidth;
let cHeight;

let button;
let click = 0;

// button = document.getElementById("btn1");
// button.onclick = function () {
//     click++;
//     console.log(click);
//     let i = 0;
//     obj.traverse(function (child) {
//         if (child instanceof THREE.Mesh) {
//             if(i == click){
//                 let material = new THREE.MeshStandardMaterial();
//                 material.color.setHex(0x0000ff);
//                 child.material = material;
//             }
//         }
//         i++;
//         // 146 to 148
//     });
// };

$(document).ready(function () {
    init();
    animate();
});

function changeMaterial(m) {
    console.log(m.value);
}

function changeColor(index, c) {
    let i = 0;
    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            if (i == index) {
                let material = new THREE.MeshStandardMaterial();
                //child.material.map = texture;
                // var materials = child.material;
                let cHex = 0x000000;
                if (c.value == "white") {
                    cHex = 0xffffff;
                    material.color.setHex(cHex);
                } else if (c.value == "black") {
                    cHex = 0x000000;
                    material.color.setHex(cHex);
                }else if (c.value == "transparent"){
                    cHex = 0xffffff;
                    material.opacity = 0.6;
                    material.transparent = true;
                }
                child.material = material;
            }
        }
        i++;
    });
}

function init() {

    // container = document.createElement( 'div' );
    // document.body.appendChild( container );

    container = document.getElementById("mouse");
    container2 = document.getElementById("mouse-exterior");
    cWidth = container.clientWidth;
    cHeight = container.clientHeight;
    windowHalfX = container.clientWidth / 2;
    windowHalfY = container.clientHeight / 2;
    console.log(cWidth);
    console.log(cHeight);

    camera = new THREE.PerspectiveCamera(24, cWidth / cHeight, 1, 2000);
    camera.position.z = 1000;

    // scene

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf1f1f1);

    var ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // texture

    var manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {

        console.log(item, loaded, total);

    };

    // model
    var loader = new THREE.OBJLoader(manager);
    loader.load('assets/3d/optimicev2.obj', function (object) {

        let i = 0;
        object.traverse(function (child) {
            console.log(child);
            if (child instanceof THREE.Mesh) {
                let material = new THREE.MeshStandardMaterial();
                material.color.setHex(0xb8b8b8);
                child.material = material;
            }
        });

        // object.position.x = - 60;
        // object.position.y = -80;
        // object.rotation.x = 270* Math.PI / 180;
        // object.rotation.y = 270* Math.PI / 180;
        object.rotation.z = 270 * Math.PI / 180;
        object.scale.x = 2;
        object.scale.y = 2;
        object.scale.z = 2;
        obj = object;
        scene.add(obj);

    });

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(cWidth, cHeight);
    container.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
    windowHalfX = container.clientWidth / 2;
    windowHalfY = container.clientHeight / 2;

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    // obj.rotation.y += (0.2*(Math.PI / 180));
    // obj.rotation.y %=360;

    camera.position.x += (mouseX*3 - camera.position.x) * .05;
    camera.position.y += (-mouseY*3 - camera.position.y) * .05;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}