
// For real viewing we will connect html file below with JavaScript logic. The main script looks like that

//This is the main scene generation script. All main logic is here

let scene, renderer, camera, control;
const text = ["A00", "B00"]; 

//This is the main function injects scene, camera and other mesh objects. We usually add 3 necessary instances: renderer, scene, camera.
//All objects are configuring later
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.set(0, 0, 150);//Position of camera
//init main renderer and controls
  renderer = new THREE.SVGRenderer({ antialias: true });//Here we need to import new library
  renderer.setSize(window.innerWidth, window.innerHeight);//And set up new settings for that
  document.body.appendChild(renderer.domElement);
  control = new THREE.OrbitControls(camera, renderer.domElement);
//Here we add two planes, as was said by the terms of the assignment. In order not to do this twice, I use a loop. 
//In each iteration of the loop, we create a plane with the given parameters.
  for (let i = 0; i < 2; i++) {
    const planeGeometry = new THREE.PlaneGeometry(50, 20, 2);
    const planeMaterial = new THREE.MeshBasicMaterial({color: 'red', side: THREE.DoubleSide}); 
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.position.set(i * 60, 0, 0);
    scene.add(planeMesh);

    const loader = new THREE.FontLoader();
    loader.load('/fonts/Roboto_Bold.json', function(font) {
      let textGeometry = new THREE.TextGeometry(text[i], {
        font: font,
        size: 8,
        height: 0,
        curveSegments: 20,
      });
      textGeometry.center();
      let material = new THREE.MeshBasicMaterial( { color: 'blue', transparent: true, } );
      let mesh = new THREE.Mesh( textGeometry, material );

      mesh.position.set(i * 60, 0, 2 * 3);
      scene.add(mesh);
    });
  }
}
 animate = () => {
  requestAnimationFrame(animate);
//It needs to make an animation, create a new sequence and loops
  update();
  render();
}
init();

update = () => {
  control.update();
}

render = () => {
  renderer.render(scene, camera);
}
animate();

/**
  What is SVG by definition? This is a vector markup. In fact, we do not work with the construction of pixel display. 
  We build vectors with our own modules and angles. After that we get different planes. 
  To build a plane, we need 3 points, or 2 vectors. The library three.js does all the work within us for us. 
  We only set the initial parameters. In this task, I generated an SVG image that can be rotated along all axes
  After that, I can import any such object in the Java Script environment. 
  Knowing the size and initial parameters of the object, I can place and rotate such an object as I please.
  I can also work with 3D objects depending on their initial parameters, place them at some control points in the space of three axes.
**/