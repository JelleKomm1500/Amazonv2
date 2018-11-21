//adds ambient light
function Light(){
    var light = new THREE.AmbientLight(0x404040);
    light.intensity = .5;

    return light;
}

function lighthouseLight() {
    var light = new THREE.SpotLight(0xFFAA55);
    var pLight;

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

    pLight = lhPointLight(light.position.x, light.position.y, light.position.z);

    return [light, pLight];
}

function lhPointLight(x, y, z) {
    var sphere = new THREE.SphereBufferGeometry(0.25, 16, 8);

    pLight = new THREE.PointLight(0xFFAA55);
    pLight.position.set(x, y, z);
    pLight.distance = 10;
    pLight.angle = 1;
    pLight.intensity = 10;
    pLight.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffcb6b })));

    return pLight;
}