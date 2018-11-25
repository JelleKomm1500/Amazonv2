/**
 * @param {string} modelPath String with the path of the obj file.
 * @param {string} modelName String with the name the mtl file.
 * @param {string} texturePath String with the path of the obj file..
 * @param {string} textureName String with the name of the mtl file.
 * @param {Function} onload function if the object is loaded.
 */
function LoadOBJModel(modelPath, modelName, texturePath, textureName, onload) {
    new THREE.MTLLoader()
        .setPath(texturePath)
        .load(textureName, function (materials) {
            materials.preload();

            new THREE.OBJLoader()
                .setPath(modelPath)
                .setMaterials(materials)
                .load(modelName, function (object) {
                    onload(object);


                }, function () { }, function (e) { console.log("Something went wrong!"); console.log(e); });

        });

}