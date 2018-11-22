function Barrels() {
    var barrels = new THREE.Group();

    LoadOBJModel("textures/objects/barrel/", "barrel.obj", "textures/objects/barrel/", "barrel.mtl", (mesh) => {
        mesh.scale.set(1.2, 1.6, 1.2);
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        barrels.add(mesh);
    });

    return barrels;
}