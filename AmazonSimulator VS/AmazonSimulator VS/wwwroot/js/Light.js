//adds ambient light
function Light(){
    var light = new THREE.AmbientLight(0x404040);
    light.intensity = 0;

    return light;
}

function lighthouseLight() {
    var light = new THREE.SpotLight(0xffffff);

    light.position.set(12, 38, 74.0);
    light.distance = 300;
    light.angle = 0.40;
    light.target.position.set(0, 0 ,0);
    return light;
}

function rotateLight(light) {
    var rotation;
    var posX = light.target.position.x;

    if (posX < 360) {
        rotation = posX + 1;
    }
    else {
        rotation = 0;
    }
    return rotation;
}