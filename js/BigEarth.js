require.config({
    baseUrl: "js/",
})

console.time('total');

// var stats = new Stats();
// stats.setMode(0); // 0: fps, 1: ms, 2: mb
// stats.domElement.style.position = 'absolute';
// stats.domElement.style.left = '5px';
// stats.domElement.style.top = '5px';
// document.body.appendChild(stats.domElement);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.z = 400;

var controls = new THREE.TrackballControls(camera);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//
var render = function() {
    controls.update();
    renderer.render(scene, camera);
    requirejs(['statsFrame'], function(stats) {
        stats.update()
    });
    // stats.update();
    requestAnimationFrame(render);
};

render();

// lightPoint
requirejs(['lightPoint'], function(light) {
    scene.add(light);
})

// earth
requirejs(['earth'], function(earth) {
    scene.add(earth)
})

// atmosphere
requirejs(['atmosphere'], function(atmosphere) {
    scene.add(atmosphere)
})

// var backgroundLight = new THREE.HemisphereLight(0x002A52, 0x000000, 7);
// scene.add(backgroundLight);
