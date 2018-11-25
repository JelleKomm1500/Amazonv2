/**
 * A three.js group is made, after that the function LoadObjModel is called, to load in a boat. It properties are then set.
 * @returns {THREE.Group} returns the boat, which is placed in the scene in the world.cs file
 */
function boat() {
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