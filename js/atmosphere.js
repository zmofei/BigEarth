define(['effectComposer', 'copyShader', 'shaderPass', 'renderPass', 'additiveBlendShader', 'maskPass'], function() {

    //****
    // var atmosphereScene = new THREE.Scene();
    // var camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
    // camera2.position = camera.position;
    // camera2.rotation = camera.rotation;
    // atmosphereScene.add(camera2);
    // ********** old ****
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
    // ******** end old *****
    // atmosphereScene.add(atmo);
    // atmosphereScene.add(sphere);

    // prepare secondary composer
    // var renderTargetParameters = {
    //     minFilter: THREE.LinearFilter,
    //     magFilter: THREE.LinearFilter,
    //     format: THREE.RGBFormat,
    //     stencilBuffer: false
    // };
    // var renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters);
    // var composer2 = new THREE.EffectComposer(renderer, renderTarget);

    // // prepare the secondary render's passes
    // var render2Pass = new THREE.RenderPass(atmosphereScene, camera2);
    // composer2.addPass(render2Pass);

    // // prepare final composer
    // var finalComposer = new THREE.EffectComposer(renderer, renderTarget);

    // // prepare the final render's passes
    // var renderModel = new THREE.RenderPass(scene, camera);
    // finalComposer.addPass(renderModel);

    // var effectBlend = new THREE.ShaderPass(THREE.AdditiveBlendShader, "tDiffuse1");
    // effectBlend.uniforms['tDiffuse2'].value = composer2.renderTarget2;
    // effectBlend.renderToScreen = true;
    // finalComposer.addPass(effectBlend);

    // return [composer2,finalComposer];
})
