window.onload = function () {
    //declare variables
    var camera, scene, renderer;
    var cameraControls;
    var water, ship, lhLight;
    var boolTurn = false;
    var worldObjects = {};
    var x_p = 0;

    function init() {
        //create camera view, scene and renderer
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
        renderer.shadowMapSoft = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight + 5);
        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', onWindowResize, false);
        //store water and the boat in another variable, so that it can be used outside of the init function
        water = WaterRender();
        ship = Boat();
        lhLight = lighthouseLight();
        //add the objects and geometries to the scene
        scene.add(water);
        scene.add(lhLight);
        scene.add(Light());
        scene.add(ship);
        scene.add(Skybox());
        scene.add(Platform());
        console.log(Barrels());
        console.log(Track());
        scene.add(Barrels());
        scene.add(Track());
        scene.add(lighthouse());
        spotLightHelper = new THREE.SpotLightHelper(lhLight);
        scene.add(spotLightHelper);
        var helper = new THREE.CameraHelper(lhLight.shadow.camera);
        scene.add(helper);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        spotLightHelper.update();
        if (x_p < 300 && boolTurn === false) {
            x_p += 1;
            if (x_p === 100) {
                boolTurn = true;
            }
        }
        else if (boolTurn === true) {
            x_p -= 0.5;
            if (x_p === -300) {
                boolTurn = false;
            }
        }
        lhLight.target.position.set(x_p, 0, x_p);
        lhLight.target.updateMatrixWorld();
        cameraControls.update();
        renderer.render(scene, camera);
        render();
    }
    //render function to animate the water shader, also cause off huge gpu dependency
    function render() {
        var time = performance.now() * 0.001;
        water.material.uniforms.time.value += 1.0 / 60.0;
        renderer.render(scene, camera);
    }

    exampleSocket = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port + "/connect_client");
    exampleSocket.onmessage = function (event) {
        var command = parseCommand(event.data);

        if (command.command == "update") {
            if (Object.keys(worldObjects).indexOf(command.parameters.guid) < 0) {
                if (command.parameters.type == "robot") {
                    var geometry = new THREE.BoxGeometry(0.9, 0.3, 0.9);
                    var cubeMaterials = [
                        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/robot_side.png"), side: THREE.DoubleSide }), //LEFT
                        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/robot_side.png"), side: THREE.DoubleSide }), //RIGHT
                        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/robot_top.png"), side: THREE.DoubleSide }), //TOP
                        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/robot_bottom.png"), side: THREE.DoubleSide }), //BOTTOM
                        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/robot_front.png"), side: THREE.DoubleSide }), //FRONT
                        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/robot_front.png"), side: THREE.DoubleSide }), //BACK
                    ];
                    var material = new THREE.MeshFaceMaterial(cubeMaterials);
                    var robot = new THREE.Mesh(geometry, material);
                    robot.position.y = 0.15;
                    robot.scale.x = 5;
                    robot.scale.y = 5;
                    robot.scale.z = 5;


                    var group = new THREE.Group();
                    group.add(robot);

                    scene.add(group);
                    worldObjects[command.parameters.guid] = group;
                }
            }

            var object = worldObjects[command.parameters.guid];

            object.position.x = command.parameters.x;
            object.position.y = command.parameters.y;
            object.position.z = command.parameters.z;

            object.rotation.x = command.parameters.rotationX;
            object.rotation.y = command.parameters.rotationY;
            object.rotation.z = command.parameters.rotationZ;
        }
    }
    init();
    animate();
}