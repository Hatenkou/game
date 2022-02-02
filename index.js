
const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
const imgPlatform = new Image();
imgPlatform.src = "./img/platf.png"

canvas.width = window.innerWidth;
canvas.height = 576;

console.log(canvasContext);

const gravity = 1.5;

class Player {
   constructor() {
      this.position = {
         x: 100,
         y: 100
      }
      this.velocity = {
         x: 0,
         y: 0
      }
      this.width = 30
      this.height = 30
   }

   draw() {
      canvasContext.fillStyle = "green"
      canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height);
   }

   update() {
      this.draw()
      this.position.y += this.velocity.y
      this.position.x += this.velocity.x

      if (this.position.y + this.height + this.velocity.y <= canvas.height)
         this.velocity.y += gravity
      else this.velocity.y = 0
   }
}

class Platform {
   constructor({ x, y, image }) {
      this.position = {
         x,
         y
      }
      this.image = image;
      this.width = image.width;
      this.height = image.heightd;
   }
   draw() {
      canvasContext.drawImage(this.image, this.position.x, this.position.y)
   }
};


const player = new Player();
const platforms = [
   new Platform({ x: -1, y: 470, image: imgPlatform }),
   new Platform({ x: imgPlatform.width - 3, y: 470, image: imgPlatform }),
];


const keys = {
   right: {
      pressed: false
   },
   left: {
      pressed: false
   },


};
let scrollOfset = 0;

function animate() {
   requestAnimationFrame(animate);
   canvasContext.fillStyle = 'white'
   canvasContext.fillRect(0, 0, canvas.width, canvas.height);
   platforms.forEach(platform => {
      platform.draw();
   })
   player.update();

   //player move
   if (keys.right.pressed && player.position.x < 400) {
      player.velocity.x = 5;
   } else if (keys.left.pressed && player.position.x > 100) {
      player.velocity.x = -5;
   } else {
      player.velocity.x = 0;

      if (keys.right.pressed) {
         scrollOfset += 5;
         platforms.forEach((platform) => {
            platform.position.x -= 5;
         })

      } else if (keys.left.pressed) {
         scrollOfset -= 5
         platforms.forEach((platform) => {
            platform.position.x += 5;
         })

      }
   }
   //platfor collosion detection
   platforms.forEach((platform) => {
      if (player.position.y + player.height <=
         platform.position.y && player.position.y + player.height + player.velocity.y >=
         platform.position.y && player.position.x + player.width >=
         platform.position.x && player.position.x <=
         platform.position.x + platform.width) {
         player.velocity.y = 0
      }
   });
   if (scrollOfset > 2000) {
      console.log("you win");
   }
};

animate();

addEventListener('keydown', ({ keyCode, }) => {
   switch (keyCode) {
      case 65:
         console.log("left");
         keys.left.pressed = true;

         break
      case 83:
         console.log("down");
         player.velocity.y += 20
         break
      case 68:
         console.log("right");
         keys.right.pressed = true;

         break
      case 87:
         console.log("up");
         player.velocity.y -= 20
         break
   }

});

addEventListener('keyup', ({ keyCode, }) => {
   switch (keyCode) {
      case 65:
         console.log("left");
         keys.left.pressed = false;

         break
      case 83:
         console.log("down");
         player.velocity.y += 20
         break
      case 68:
         console.log("right");
         keys.right.pressed = false;
         break
      case 87:
         console.log("up");
         player.velocity.y -= 20
         break
   }

})
