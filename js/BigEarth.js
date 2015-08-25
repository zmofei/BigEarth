require.config({
    baseUrl: "js/",
})

console.time('total');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 500;

var controls = new THREE.TrackballControls(camera);
controls.minDistance = 305;
controls.maxDistance = 100000;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var earths = new THREE.Object3D();
earths.rotateX(30 * Math.PI / 180);
earths.rotateY(-100 * Math.PI / 180)
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
requirejs(['atmosphere'], function (atmosphere) {
    earths.add(atmosphere);
})

window.rotSpeed = 0.0003;
// window.rotSpeed = 0;
// add mumber plant
requirejs(['mumber'], function (Num) {
    var online = new Num('online', {
        color: '#fff'
    });
    var height = new Num('height', {
        color: '#fff'
    });
    var speed = new Num('speed', {
        color: '#fff'
    });

    setInterval(function () {
        // online
        var randomNum = 300000 * Math.random() | 0
        randomNum += 1500000;
        online.setNumber(randomNum);
        // speed
        speed.setNumber((((rotSpeed * 30) / Math.PI) * 40076).toFixed(2));
        // height
        var x = camera.position.x;
        var y = camera.position.y;
        var z = camera.position.z;
        var d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2), 2);
        var hei = ((d - 300) * 6371.393) / 300
        height.setNumber(hei.toFixed(2));
    }, 1000);
})


window.addEventListener('keydown', function (e) {
    if (e.keyCode == 32) {
        rotSpeed = 0;
    }
    if (e.keyCode == 37) {
        rotSpeed -= 0.0003;
    }
    if (e.keyCode == 39) {
        rotSpeed += 0.0003;
    }
    console.log(rotSpeed);
});
//
var render = function () {
    controls.update();
    renderer.render(scene, camera);
    earths.rotateY(rotSpeed)
    requirejs(['statsFrame', 'renderFcts'], function (stats, fcts) {
        fcts.update();
        stats.update();
    });
    requestAnimationFrame(render);
};
render();
