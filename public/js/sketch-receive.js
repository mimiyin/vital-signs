const socket = io();

const camWidth = 160;
const camHeight = 120;

let socketId = [];
let particleData = [];
let users = [];
let usersMeta = [];

let scene = 0;
// Resolution
let SKIP = 2;

// Number of users
let NUM = 20;

function setup() {
  createCanvas(1920, 1080);
  pixelDensity(1);
  noStroke();

  socket.on('broadcast', function(dataReceived) {

    particleData = dataReceived;

    if (dataReceived.data.length > 0) {
      let socketIndex = socketId.indexOf(dataReceived.id);
      if (socketIndex >= 0) {
        if (users[socketIndex]) {
          scene = dataReceived.data[0];

          let particles = users[socketIndex];
          // Get list of moving particles
          let movers = dataReceived.data.slice(1);
          for (let m of movers) {
            if (particles[m]) {
              particles[m].updateData();
              setTimeout(function() {
                particles[m].updateData();
              }, random(m));
            }
          }

          // for (let i = 0; i < particles.length*2; i+=2) {
          //   let p = dataReceived.data[i + 1];
          //
          //   if (p) particles[i/2].updateData(p[0], p[1], p[2], p[3]);
          // }
        }
      } else {
        socketId.push(dataReceived.id);
        let newParticles = [];

        for (let y = 0; y < camHeight; y += SKIP) {
          for (let x = 0; x < camWidth; x += SKIP) {
            let mappedX = map(x, 0, camWidth, camWidth * 3, 0);
            let mappedY = map(y, 0, camHeight, 0, camHeight * 3);

            newParticles.push(new Particle(mappedX, mappedY));
          }
        }
        users[socketId.length - 1] = newParticles;
      }
    }

  });

  socket.on('disconnect', function(id) {
    let socketIndex = socketId.indexOf(id);

    socketId.splice(socketIndex, 1);
    users.splice(socketIndex, 1);
  });

  // Assign users random xy positions and random scale
  for (let i = 0; i < NUM; i++) {
    usersMeta.push({
      x: random(-100, width),
      y: random(-100, height),
      scl: random(0.1, 1),
      delay: random(1, 3) * 1000,
    });
  }
}

function draw() {
  background(0);


  for (let j = 0; j < NUM; j++) {
    let particles = users[0];
    push();
    translate(usersMeta[j].x, usersMeta[j].y)
    scale(usersMeta[j].scl);
    if (particles) {
      for (let particle of particles) {

        // Delay drawing this user
        particle.update(usersMeta[j].delay);
        particle.display();
      }
    }
    pop();
  }

  // Print framerate
  fill(255);
  rect(10, 10, 100, 20);
  fill(0);
  text(int(frameRate()), 20, 20);
}
