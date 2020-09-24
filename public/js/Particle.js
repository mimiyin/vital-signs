class Particle {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;

    this.xStart = x;
    this.xSpeed = random(-5, 5);
    this.xRange = random(-120, 120);

    this.size = 0;
    this.maxSize = 75;
    this.startDecay = false;
    this.lifeSpeed = random(0.2, 1.5);
    this.pulseSpeed = random(0.01, 0.1);
    this.opacity = 10;
    this.drawParticle = false;

    // this.moveDelay = 0;
    // this.moveDelayFrames = 5;

    // Keep track of how long there's been movement or stillness
    this.diffFrames = 0;
  }

  update() {

    this.opacity = (sin(frameCount * this.pulseSpeed) * 20) + 20;

    if (scene === 0) {
      this.size += this.lifeSpeed;

      if (this.size > this.maxSize || this.size < 0) {
        this.lifeSpeed *= -1;
      }

      this.x = this.xStart + sin(frameCount * this.pulseSpeed) * this.xRange
    } else if (scene === 1) {
      this.size = 10 * sin(frameCount * this.pulseSpeed) + 15;
    }

    let index = int((map(this.x, 0, width, camWidth, 0) + map(this.y, 0, height, 0, camHeight) * camWidth)) * 4;

    let prevR = prevPixelData[index];
    let prevG = prevPixelData[index + 1];
    let prevB = prevPixelData[index + 2];

    this.r = pixelData[index];
    this.g = pixelData[index + 1];
    this.b = pixelData[index + 2];

    let colordiff = abs(this.r - prevR) > 20 && abs(this.g - prevG) > 20 && abs(this.b - prevB) > 20;


    // If there's movement
    if (colordiff) {
      this.diffFrames++;
    } else {
      this.diffFrames-=0.5;
    }
    this.diffFrames = constrain(this.diffFrames, 0, 100);

    this.drawParticle = this.r + this.g + this.b > 0 && this.diffFrames > 20; //&& this.moveDelay < this.moveDelayFrames;

    // if (this.moveDelay >= this.moveDelayFrames) {
    //   this.moveDelay = 0;
    // }

    // if(!colordiff){
    //     this.moveDelay++;
    // }
    //
    // if(this.moveDelay < this.moveDelayFrames){
    //     if(this.r + this.g + this.b > 0){
    //         this.drawParticle = true;
    //     }
    // }
  }

  display() {
    if (this.drawParticle) {
      noStroke();
      //fill(this.r, this.g, this.b, this.opacity);
      fill(255, this.opacity);
      //fill(255);
      //ellipse(this.x, this.y, this.size, this.size);
      rect(this.x, this.y, this.size, this.size);
    }
  }
}
