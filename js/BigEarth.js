console.time('total');
var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms, 2: mb
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '5px';
stats.domElement.style.top = '5px';
document.body.appendChild(stats.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.z = 400;

var controls = new THREE.TrackballControls(camera);


var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//
var light = new THREE.Object3D();
scene.add(light)

//
// var star = new THREE.Object3D();
// scene.add(star);

// var starGeometry = new THREE.Geometry();
// var starMesh = new THREE.PointCloud(starGeometry, new THREE.PointCloudMaterial({
//     size: 4,
//     color: 0xFFFFFF,
//     transparent: true,
//     blending: THREE.AdditiveBlending,
//     depthTest: false,
//     transparent: true,
//     sizeAttenuation: true,
//     map: THREE.ImageUtils.loadTexture(
//         "img/galactic_sharp.png"
//     ),
// }));
// star.add(starMesh)

//
var geometrySmall = new THREE.Geometry();
var geometryBig = new THREE.Geometry();

var radius = 300;


function lonlatToVec(lon, lat) {
    var y = radius * Math.sin(lon * Math.PI / 180);
    var newRadius = radius * Math.cos(lon * Math.PI / 180);
    var x = newRadius * Math.sin(lat * Math.PI / 180);
    var z = newRadius * Math.cos(lat * Math.PI / 180);

    var vertice = new THREE.Vector3(x, y, z);
    vertice._x = x;
    vertice._y = y;
    vertice._z = z;
    return vertice;
}

// get data
console.time('get data');
$.get('js/lnglat_china.data', function(data) {
    console.timeEnd('get data');
    console.time('format data');
    var datas = data.split('\n');
    var ret = [];
    datas.map(function(val, index) {
        ret.push(val.split('\t'));
    })
    console.timeEnd('format data');
    console.log(ret)

    // put data to geometry
    for (var i in ret) {
        var ver = lonlatToVec(ret[i][1], ret[i][0]);
        if (ret[i][2] < 400000) {
            geometrySmall.vertices.push(ver);
        } else {
            geometryBig.vertices.push(ver);
        }
    }
    //
    var meshSmall = new THREE.PointCloud(geometrySmall, new THREE.PointCloudMaterial({
        size: 0.1,
        color: 'skyblue',
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite:false,
        opacity: 0.5,
        transparent: true,
        map: THREE.ImageUtils.loadTexture(
            "img/particle.png"
        ),
    }));
    meshSmall.name = "small";
    var meshBig = new THREE.PointCloud(geometryBig, new THREE.PointCloudMaterial({
        size: 4,
        color: 0xFFFFFF,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite:false,
        transparent: true,
        sizeAttenuation: true,
        map: THREE.ImageUtils.loadTexture(
            "img/particle.png"
        ),
    }));
    meshBig.name = "big";
    light.add(meshSmall);
    light.add(meshBig);

    camera.position.x = 434.25;
    camera.position.y = 251.38;
    camera.position.z = -108.54;

    console.timeEnd('total');
});

var render = function() {
    controls.update();
    renderer.render(scene, camera);
    stats.update();
    requestAnimationFrame(render);
};

render();

// add earth

var earthGeo = new THREE.SphereGeometry(300 * 0.99, 100, 50);
// var earth = THREE.SceneUtils.createMultiMaterialObject(earthGeo, [
//     new THREE.MeshPhongMaterial({
//         color: 0xfefefe,
//         transparent: true,
//         opacity: 0.5,
//         combine: THREE.MultiplyOperation,
//         name: 'earth1'
//     }),
//     new THREE.MeshBasicMaterial({
//         color: 0x002A52,
//         transparent: true,
//         opacity: 0.8,
//         blending: THREE.AdditiveBlending,
//         side: THREE.DoubleSide,
//         name: 'earth2'
//     }),
//     new THREE.MeshBasicMaterial({
//         color: 0xf0f0f0,
//         transparent: true,
//         opacity: 0.1,
//         blending: THREE.AdditiveBlending,
//         wireframe: true,
//         side: THREE.FrontSide,
//         name: 'earth3'
//     }),
// ]);
var earthMaterial = new THREE.MeshBasicMaterial({
    color: '#333333',
    // transparent: true,
    // opacity: 0.1,
    // blending: THREE.AdditiveBlending,
    // wireframe: true,
    // side: THREE.DoubleSide,
    // name: 'earth3',
    // map: THREE.ImageUtils.loadTexture(
    //     "img/night_earth.png"
    // )
});
var earth = new THREE.Mesh(earthGeo, earthMaterial);
scene.add(earth);

// var backgroundLight = new THREE.HemisphereLight(0x002A52, 0x000000, 7);
// scene.add(backgroundLight);


// animate
setInterval(function() {
    for (var i in geometryBig.vertices) {
        if (Math.random() < 0.5) {
            geometryBig.vertices[i].x = 0
            geometryBig.vertices[i].y = 0
            geometryBig.vertices[i].z = 0
        } else {
            geometryBig.vertices[i].x = geometryBig.vertices[i]._x
            geometryBig.vertices[i].y = geometryBig.vertices[i]._y
            geometryBig.vertices[i].z = geometryBig.vertices[i]._z
        }
    }
    geometryBig.verticesNeedUpdate = true
}, 1000)
