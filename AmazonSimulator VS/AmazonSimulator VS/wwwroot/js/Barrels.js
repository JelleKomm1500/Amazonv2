//Load in multiple barrels with objloader and give them a position on the map
function Barrels(){
    var barrel = [];
    var barrels = new THREE.Group();
    var bZ = 59;
    var bX = 18;

    for(var i = 0; i<5; i++){
        LoadOBJModel("textures/objects/barrel/", "barrel.obj", "textures/objects/barrel/", "barrel.mtl", (mesh) => {
            mesh.scale.set(1.2, 1.6, 1.2);
            mesh.position.set(bX, 3.1, bZ);
            barrel[i] = mesh;
            barrel[i].castShadow = true;
            barrels.add(barrel[i]);
            bZ -= 20;
            bX -= 10;
        });
    }
    barrels.castShadow = true;
    return barrels;
    
}