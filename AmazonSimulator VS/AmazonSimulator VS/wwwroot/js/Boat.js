//Load boat object and places it on the map
function Boat() {
    var boat = new THREE.Group();

    LoadOBJModel("textures/objects/boat/", "boat.obj", "textures/objects/boat/", "boat.mtl", (mesh) => {
        mesh.scale.set(0.06, 0.06, 0.06);
        mesh.rotation.y = Math.PI / 1;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        boat.add(mesh);
    });
    return boat;
}   