//adds ambient light
function Light(){
    var light = new THREE.AmbientLight(0x404040);
    light.intensity = 4;

    return light;
}

function lighthouseLight() {
    var light = new THREE.SpotLight(0xFFAA55);
    var pLight;

    light.position.set(12, 32, 74.0);
    light.distance = 500;
    light.angle = 0.7;
    light.intensity = 5;
    light.penumbra = .5;
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 10, 2500));
    light.shadow.bias = 0.0001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5;       // default
    light.shadow.camera.far = 150;      // default

    pLight = lhPointLight(light.position.x, light.position.y, light.position.z);

    return [light, pLight];
}

function lhPointLight(x, y, z) {
    pLight = new THREE.PointLight(0xFFAA55);
    pLight.position.set(x, y + 5, z);
    pLight.distance = 20;
    pLight.angle = 0;
    pLight.intensity = 5;

    return pLight;
}
var boolTurn = false;

function moveLight(x_p) {

    if (x_p < 300 && boolTurn === false) {
        x_p += 1;
        if (x_p === 100) {
            boolTurn = true;
        }
    }
    else if (boolTurn === true) {
        x_p -= 1;
        if (x_p === -120) {
            boolTurn = false;
        }
    }
    return x_p;
}