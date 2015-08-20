require.config({
    baseUrl: "js/",
})

console.time('total');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.x = 400;
camera.position.y = 230;
camera.position.z = -100;

var controls = new THREE.TrackballControls(camera);
controls.minDistance = 305;
controls.maxDistance = 100000;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var earths = new THREE.Object3D();
scene.add(earths);
// lightPoint
requirejs(['lightPoint'], function (light) {
    earths.add(light);
})

// earth
requirejs(['earth'], function (earth) {
    earths.add(earth)
})

//field
requirejs(['field'], function (field) {
    scene.add(field)
})
requirejs(['stars'], function (stars) {
    scene.add(stars)
})

// atmosphere
var atmo;
requirejs(['atmosphere'], function (atmosphere) {
    earths.add(atmosphere);
    // atmo = atmosphere;
})

// var backgroundLight = new THREE.HemisphereLight(0x002A52, 0x000000, 7);
// scene.add(backgroundLight);
var speed = 0.0003;
window.addEventListener('keydown', function (e) {
    if (e.keyCode == 37) {
        speed -= 0.0005;
    }
    if (e.keyCode == 39) {
        speed += 0.0005;
    }
    console.log(speed);
});

//
var render = function () {
    controls.update();
    renderer.render(scene, camera);
    earths.rotateY(speed)
    requirejs(['statsFrame', 'renderFcts'], function (stats, fcts) {
        fcts.update();
        stats.update();
    });
    requestAnimationFrame(render);
};
render();
