//adds ambient light
function Light(){
    var light = new THREE.AmbientLight(0x404040);
    light.intensity = 4;

    return light;
}