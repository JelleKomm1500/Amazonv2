﻿//Load boat object and places it on the map
function Lighthouse() {
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