/**
 * A three.js group is made, after that the function LoadObjModel is called, to load in a lighthouse. It properties are then set.
 * @returns {THREE.Group} returns the lighthouse, which is placed in the scene in the world.cs file
 */
function lighthouse() {
    var lighthouseGroup = new THREE.Group();

    LoadOBJModel("textures/objects/lighthouse/", "Lighthouse.obj", "textures/objects/lighthouse/", "Lighthouse.mtl", (mesh) => {
        mesh.scale.set(2, 2, 2);
        mesh.position.set(12, 3.5, 74.0);
        mesh.rotation.y = Math.PI / 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        lighthouseGroup.add(mesh);
    });

    return lighthouseGroup;
}