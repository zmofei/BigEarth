define(function() {
    var earthGeo = new THREE.SphereGeometry(300 * 0.99, 100, 50);
    var earth = THREE.SceneUtils.createMultiMaterialObject(earthGeo, [
        new THREE.MeshPhongMaterial({
            color: 0xfefefe,
            transparent: true,
            opacity: 0.5,
            combine: THREE.MultiplyOperation,
            name: 'earth1'
        }),
        new THREE.MeshBasicMaterial({
            color: 0x002A52,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            name: 'earth2'
        }),
        new THREE.MeshBasicMaterial({
            color: 0xf0f0f0,
            transparent: true,
            opacity: 0.1,
            blending: THREE.AdditiveBlending,
            wireframe: true,
            side: THREE.FrontSide,
            name: 'earth3'
        }),
    ]);
    return earth;
});
