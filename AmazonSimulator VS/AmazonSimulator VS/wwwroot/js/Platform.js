function Platform(){
    var platformGroup = new THREE.Group();

    LoadOBJModel("textures/objects/platform/", "platform.obj", "textures/objects/platform/", "platform.mtl", (mesh) => {
        mesh.scale.set(0.27,0.4,0.1 );
        mesh.position.set(-20.0,-15.0,5.0);
        mesh.rotation.x = Math.PI / -2;
        mesh.rotation.z = Math.PI / 2;
        mesh.children[0].material = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture("textures/objects/platform/wood5.jpg")});
        platformGroup.add(mesh);
    })
    return platformGroup;
}