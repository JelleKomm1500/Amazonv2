//adds ambient light
function Light(){
    var light = new THREE.AmbientLight(0x404040);
    light.intensity = 1;

    return light;
}

function lighthouseLight() {
    var light = new THREE.SpotLight(0xffffff);

    light.position.set(12, 36, 74.0);
    light.distance = 500;
    light.angle = 0.7;
    light.intensity = 2;
    light.penumbra = .5;
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.camera.near = 0.5;       // default
    light.shadow.camera.far = 500;      // default

    return light;
}
