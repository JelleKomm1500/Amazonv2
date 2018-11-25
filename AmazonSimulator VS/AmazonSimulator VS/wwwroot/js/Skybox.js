/**
 * Creates a skybox, by making a THREE box geometry, the size of the x,y,z are set to 1000
 * @returns {THREE.Mesh} returns the skybox, which is placed in the scene in the CameraAnimateScene file
 */
function skybox(){
    var skyboxGeometry = new THREE.BoxGeometry( 1000, 1000, 1000);
    var skyboxMaterials = [
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("textures/Skybox/Left.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("textures/Skybox/Right.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("textures/Skybox/Up.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("textures/Skybox/Down.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("textures/Skybox/Front.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("textures/Skybox/Back.png"), side: THREE.DoubleSide}),
    ];
    var skyboxMaterial = new THREE.MeshFaceMaterial(skyboxMaterials);
    var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

    return skybox;
}