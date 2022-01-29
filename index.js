const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

console.log(canvasContext);

class Player {
   constructor() {
      this.position = {
         x: 100,
         y: 100
      }
      this.width = 30
      this.haight = 30
   }

   draw() {
      canvasContext.fillRect(this.position.x, this.position.y, this.width, this.haight);
   }
}

const player = new Player()
player.draw()