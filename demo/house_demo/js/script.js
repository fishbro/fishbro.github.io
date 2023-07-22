let timestate = 'initial',
    state_timer = null,
    buttons,
    auto = false,
    loader = new THREE.GLTFLoader();

let container = document.getElementById('screen');

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);
renderer.setPixelRatio(1.2);

let scene = new THREE.Scene();
scene.background = new THREE.Color().setRGB({r:1, g:1, b:1});
scene.fog = new THREE.Fog(scene.background, 1, 500);

let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 500); //30
camera.position.set(-2.2, 5.9, 39.6);

// controls
let controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.minDistance = 20;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2.1;
controls.autoRotate = false;

// LIGHTS
let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
hemiLight.color.setRGB(0.2, 0.52, 1);
hemiLight.groundColor.setRGB(1, 0.78, 0.5);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

//SUN TARGET
var targetObject = new THREE.Object3D();
scene.add(targetObject);

let dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.color.setRGB(1, 0.96, 0.9);
dirLight.position.set(-43, 33, 33);
dirLight.position.multiplyScalar(1);
dirLight.target = targetObject;
scene.add(dirLight);

dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

let d = 50;

dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;

dirLight.shadow.camera.far = 2600;
dirLight.shadow.bias = -0.0001;
console.log(dirLight);


//HELPERS 
let axes_helper = new THREE.AxesHelper( 20 );
scene.add(axes_helper);

// let hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
// scene.add(hemiLightHelper);

let dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 10);
scene.add(dirLightHeper);

// SKYDOME
let vertexShader = document.getElementById('vertexShader').textContent;
let fragmentShader = document.getElementById('fragmentShader').textContent;
let uniforms = {
    "topColor": {
        // value: new THREE.Color(0x0077ff)
        value: new THREE.Color(0, 0, 0)
    },
    "bottomColor": {
        // value: new THREE.Color(1, 1, 1) // day
        value: new THREE.Color(.2, .2, .2) //night
    },
    "offset": {
        value: 33
    },
    "exponent": {
        value: 0.6
    }
};
uniforms["topColor"].value.copy(hemiLight.color);

scene.fog.color.copy(uniforms["bottomColor"].value);

let skyGeo = new THREE.SphereBufferGeometry(300, 32, 15);
let skyMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.BackSide
});

let sky = new THREE.Mesh(skyGeo, skyMat);
scene.add(sky);

// TERRAIN
// let img = new Image();
// img.onload = function () {
//     let accuracy = 128;
//     let data = getHeightData(img, accuracy);

//     let box = new THREE.BoxGeometry(200,1,200,accuracy-1,1,accuracy-1);
//     let top_verticles = [];
//     for ( var i = 0, k = 0, l = box.vertices.length; i < l; i++ ) {
//         if(box.vertices[i].y == box.parameters.height/2){
//             top_verticles[k] = box.vertices[i];
//             k++;
//         }
//     }

//     top_verticles.sort(sortFunction);
//     function sortFunction(a, b) {
//         if(a.z === b.z){
//             if(a.x === b.x){
//                 return 0;
//             }else {
//                 return (a.x < b.x) ? -1 : 1;
//             }
//         }else{
//             return (a.z < b.z) ? -1 : 1;
//         }
//     }
//     for ( var i = 0, l = top_verticles.length; i < l; i++ ) {
//         top_verticles[i].y = data[i];
//     }

//     let terrain_bumpmap = new THREE.TextureLoader().load('model/satellite_1024_bump.jpg');
//     terrain_texture = new THREE.TextureLoader().load('model/terrain_1024.jpg');
//     satellite_texture = new THREE.TextureLoader().load('model/satellite_1024.jpg', init);
//     terrain_material = new THREE.MeshStandardMaterial({
//         map: satellite_texture,
//         roughness: 0.8,
//         bumpMap: terrain_bumpmap,
//         bumpScale: 1,
//         aoMap: terrain_bumpmap,
//         aoMapIntensity: .4,
//     });
//     let terrain = new THREE.Mesh( box, terrain_material );
//     terrain.castShadow = true;
//     terrain.receiveShadow = true;
//     scene.add(terrain);
    
//     //LAYERS
//     // water
//     let water_plane = new THREE.PlaneGeometry( 200, 200, 1, 1 );
//     let water_opacity = new THREE.TextureLoader().load('model/water_mask.jpg');
//     let water_normal = new THREE.TextureLoader().load('model/waternormals.jpg');
//     water_material = new THREE.MeshPhongMaterial({
//         alphaMap: water_opacity, 
//         transparent: true, 
//         opacity: .5,
//         // emissive: {r:1, g:1, b:1},
//         reflectivity: 1,
//         shininess: 100,
//         color: 0x000000,
//         normalMap: water_normal,
//         normalScale: ({x:.3, y:.3})
//     });
//     water_mesh = new THREE.Mesh( water_plane, water_material );
//     water_mesh.rotation.x = -Math.PI / 2;
//     water_mesh.position.y = 1.7;
//     water_mesh.receiveShadow = true;
//     scene.add(water_mesh);


//     // roads
//     let roads_plane = new THREE.PlaneGeometry( 200, 200, accuracy-1, accuracy-1 );
//     for ( var i = 0, l = roads_plane.vertices.length; i < l; i++ ) {
//         roads_plane.vertices[i].z = data[i];
//     }
//     let roads_texture = new THREE.TextureLoader().load('model/glow_map_mask.png');
//     roads_material = new THREE.MeshLambertMaterial({
//         alphaMap: roads_texture, 
//         emissive: '#FFFCDB', 
//         emissiveMap: roads_texture, 
//         transparent: true, 
//         lightMap: roads_texture, 
//         opacity: 0
//     });
//     roads_mesh = new THREE.Mesh( roads_plane, roads_material );
//     roads_mesh.rotation.x = -Math.PI / 2;
//     // roads_mesh.position.y = .01;
//     roads_mesh.position.y = .1;
//     scene.add(roads_mesh);

//     // height_map
//     let height_texture = new THREE.TextureLoader().load('model/height_map_smooth_light.png');
//     height_material = new THREE.MeshLambertMaterial({
//         map: height_texture,
//         transparent: true, 
//         opacity: 0
//     });
//     height_mesh = new THREE.Mesh( roads_plane, height_material );
//     height_mesh.rotation.x = -Math.PI / 2;
//     height_mesh.position.y = 0;
//     scene.add(height_mesh);

//     // bump_map
//     let bump_texture = new THREE.TextureLoader().load('model/satellite_1024_bump.jpg');
//     bump_material = new THREE.MeshLambertMaterial({
//         alphaMap: bump_texture, 
//         map: bump_texture,
//         transparent: true, 
//         opacity: 0
//     });
//     bump_mesh = new THREE.Mesh( roads_plane, bump_material );
//     bump_mesh.rotation.x = -Math.PI / 2;
//     bump_mesh.position.y = 0;
//     scene.add(bump_mesh);

//     roadsMaterialTween = new TWEEN.Tween(roads_material);
//     heightMaterialTween = new TWEEN.Tween(height_material);
//     bumpMaterialTween = new TWEEN.Tween(bump_material);
//     waterMeshTween = new TWEEN.Tween(water_mesh.position);
//     roadsMeshTween = new TWEEN.Tween(roads_mesh.position);
//     heightMeshTween = new TWEEN.Tween(height_mesh.position);
//     bumpMeshTween = new TWEEN.Tween(bump_mesh.position);
// };
// img.src = "model/height_map_smooth_light.png";

// Load a glTF resource
loader.load(
	// resource URL
	'model/house_base_textured.gltf',
	// called when the resource is loaded
	function ( gltf ) {

        let exclude = [
            'Sun',
            'Camera',
            'Point'
        ];

        gltf.scene.scale.set(1,1,1);
        gltf.scene.castShadow = true;
        gltf.scene.receiveShadow = true;
        gltf.scene.children.map(function(obj){
            // console.log(obj.name);
            if(!exclude.includes(obj.name)){
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
            if(obj.name === 'windows_glasses'){
                obj.material.opacity = 0.1;
                obj.material.transparent = true;
                obj.castShadow = false;
            }
        });
        scene.add( gltf.scene );
        
        console.log(gltf.scene);
        

		// gltf.animations; // Array<THREE.AnimationClip>
		// gltf.scene; // THREE.Group
		// gltf.scenes; // Array<THREE.Group>
		// gltf.cameras; // Array<THREE.Camera>
		// gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

// RENDERER
renderer.gammaInput = true;
renderer.gammaOutput = true;

renderer.shadowMap.enabled = true;

animate();

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();
}
window.addEventListener( 'resize', onWindowResize, false );
