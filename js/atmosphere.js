define(function() {
    var earthGeo = new THREE.SphereGeometry(300 * 0.99, 100, 50);
    var atmosphere = new THREE.Object3D();
    var customMaterialAtmosphere = new THREE.ShaderMaterial({
        uniforms: {
            "c": {
                type: "f",
                value: 0.8
            },
            "p": {
                type: "f",
                value: 2.1
            }
        },
        vertexShader: document.getElementById('vertexShaderAtmosphere').textContent,
        fragmentShader: document.getElementById('fragmentShaderAtmosphere').textContent
    });
    var atmo = new THREE.Mesh(earthGeo.clone(), customMaterialAtmosphere);
    atmo.scale.x = atmo.scale.y = atmo.scale.z = 1.1;
    atmo.material.side = THREE.BackSide;

    var blackMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000
    });
    var sphere = new THREE.Mesh(earthGeo.clone(), blackMaterial);
    sphere.scale.x = sphere.scale.y = sphere.scale.z = 1;
    atmosphere.add(atmo);
    atmosphere.add(sphere);
    return atmosphere;
})
