/**
 * @param {string} modelPath String met de path van het obj bestand.
 * @param {string} modelName String met de naam van het obj bestand.
 * @param {string} texturePath String met de path van het mtl bestand.
 * @param {string} textureName String met de naam van het mtl bestand.
 * @param {Function} onload Functie die uitgevoerd wordt als het laden succesvol is.
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