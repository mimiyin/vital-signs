class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xStart = x;
    this.xRange = random(-60, 60);

    this.size = 0;
    this.maxSize = 10;
    // this.startDecay = false;
    this.lifeSpeed = random(0.2, 1.5);
    this.pulseSpeed = random(0.01, 0.1);
    //this.opacity = 100;
    // this.drawParticle = false;

    // Assign random lifespan between 1 and 10 seconds
    this.birth();
  }

  birth() {
    this.lifespan = random(3, 15) * 60;
  }

  updateData() {
    this.drawParticle = true;
    this.birth();
  }

  update(delay) {
    // Slowly die
    this.lifespan--;
    if (this.lifespan < 0) this.drawParticle = false;


    this.opacity = (sin(frameCount * this.pulseSpeed) * 5) + 50;

    if (scene === 0) {
      this.size += this.lifeSpeed;

      if (this.size > this.maxSize || this.size < 0) {
        this.lifeSpeed *= -1;
      }

      this.x = this.xStart + sin(frameCount * this.pulseSpeed) * this.xRange
    } else if (scene === 1) {
      this.size = 1 * sin(frameCount * this.pulseSpeed) + this.maxSize;
    }

  }

  display() {
    if (this.drawParticle) {
      noStroke();
      //fill(this.r, this.g, this.b, this.opacity);

      // Draw opaque square
      fill(255);
      //            ellipse(this.x, this.y, this.size, this.size);
      rect(this.x, this.y, this.size, this.size);
    }
  }
}
