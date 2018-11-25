/**
 * When the window loads, creates all variables, and runs all other functions to create the scene, camera and objects, furtmore make connections to c# code and on callback add boat, barrels and robot to the map
 */
window.onload = function () {
    //declare variables
    var camera, scene, renderer;
    var cameraControls;
    var water, models;
    var lights = lighthouseLight();
    var spotLight = lights[0];
    var pointLight = lights[1];
    var worldObjects = {};
    var x_p = 0;
    /**
    * Creates the camera, scene and render. Adds non-moveable objects, shaders, lights and the skybox to the scene
    */
    function init() {
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        cameraControls = new THREE.OrbitControls(camera);
        camera.position.z = 75;
        camera.position.y = 25;
        camera.position.x = 75;
        cameraControls.update();
        scene = new THREE.Scene();
        
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight + 5);
        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', onWindowResize, false);

        water = waterRender();
        scene.add(water);
        scene.add(skybox());
        scene.add(light());
        scene.add(spotLight);
        scene.add(pointLight);
    }
    /**
    * Changes screen size on change
    */
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
    * Makes the spotlight of the lighthouse move around and calls the function movelight to determine the rotation of the spotlight.target.position. Also updates camera control
    */
    function animate() {
        requestAnimationFrame(animate);
        x_p = moveLight(x_p);
        spotLight.target.position.set(x_p, 0, x_p);
        spotLight.target.updateMatrixWorld();
        cameraControls.update();
        render();
    }
/**
 * Renders the scene and camera and makes it so water waves move.
 */
    function render() {
        var time = performance.now() * 0.001;
        water.material.uniforms.time.value += 1.0 / 60.0;
        renderer.render(scene, camera);
    }
    exampleSocket = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port + "/connect_client");
    exampleSocket.onmessage = function (event) {
        var command = parseCommand(event.data);

        if (command.command === "update") {
            models = new THREE.Group();
            scene.add(models);
            if (Object.keys(worldObjects).indexOf(command.parameters.guid) < 0) {

                if (command.parameters.type === "robot") {
                    var robot = new robot();
                    models.add(robot);
                    worldObjects[command.parameters.guid] = robot;
                }
                else if (command.parameters.type === "boat") {
                    var boat = new boat();
                    models.add(boat);
                    worldObjects[command.parameters.guid] = boat;
                }
                else if (command.parameters.type === "lighthouse") {
                    var lighthouse = new lighthouse();
                    models.add(lighthouse);
                    worldObjects[command.parameters.guid] = lighthouse;
                }
                else if (command.parameters.type === "barrels") {
                    var barrels = new barrels();
                    models.add(barrels);
                    worldObjects[command.parameters.guid] = barrels;
                }
            }
            var object = worldObjects[command.parameters.guid];

            object.position.x = command.parameters.x;
            object.position.y = command.parameters.y;
            object.position.z = command.parameters.z;

        }
    };
    init();
    animate();
};
   