require.config({
    baseUrl: "js/",
})

console.time('total');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.z = 400;

var controls = new THREE.TrackballControls(camera);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// lightPoint
requirejs(['lightPoint'], function(light) {
    scene.add(light);
})

// earth
requirejs(['earth'], function(earth) {
    scene.add(earth)
})

//field
requirejs(['field'], function(field) {
    scene.add(field)
})

// atmosphere
var atmo;
requirejs(['atmosphere'], function(atmosphere) {
    scene.add(atmosphere);
    // atmo = atmosphere;
})

// var backgroundLight = new THREE.HemisphereLight(0x002A52, 0x000000, 7);
// scene.add(backgroundLight);

//
var render = function() {
    controls.update();
    if(atmo){
        for(var i in atmo){
            atmo[i].render()
        }
    }else{
        renderer.render(scene, camera);
    }

    requirejs(['statsFrame', 'renderFcts'], function(stats, fcts) {
        fcts.update();
        stats.update();
    });
    requestAnimationFrame(render);
};
render();
