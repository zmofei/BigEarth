define(function() {
    // create the geometry sphere
    var geometry = new THREE.SphereGeometry(30000, 100, 50);
    // create the material, using a texture of startfield
    var material = new THREE.MeshBasicMaterial()
    material.map = THREE.ImageUtils.loadTexture('img/galaxy_starfield.png')
    material.side = THREE.BackSide;
    // create the mesh based on geometry and material
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
});
