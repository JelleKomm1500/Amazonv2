/**
 * A three.js group is made, after that the function LoadObjModel is called, to load in a barrel. It properties are then set.
 * @returns {THREE.Group} returns a barrel, which is placed in the scene in the world.cs file
 */
function barrels() {
    var barrels = new THREE.Group();

    LoadOBJModel("textures/objects/barrel/", "barrel.obj", "textures/objects/barrel/", "barrel.mtl", (mesh) => {
        mesh.scale.set(1.2, 1.6, 1.2);
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        barrels.add(mesh);
    });
    return barrels;
}