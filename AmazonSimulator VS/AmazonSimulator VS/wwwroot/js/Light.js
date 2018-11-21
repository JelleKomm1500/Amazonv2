//adds ambient light
function Light(){
    var light = new THREE.AmbientLight(0xffffff);
    light.intensity = .5;

    return light;
}

function lighthouseLight() {
    var light = new THREE.SpotLight(0xFFAA55);

    light.position.set(12, 36, 74.0);
    light.distance = 500;
    light.angle = 0.7;
    light.intensity = 2;
    light.penumbra = .5;
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 10, 2500));
    light.shadow.bias = 0.0001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5;       // default
    light.shadow.camera.far = 150;      // default

    return light;
}
