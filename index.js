const imgPlatform = './img/platform.png';
const imgBackground = './img/bg.png';
const imgSpriteRunLeft = './img/spriteRunLeft.png';
const imgSpriteRunRight = './img/spriteRunRight.png';
const imgSpriteStandLeft = './img/spriteStandLeft.png';
const imgSpriteStandRight = './img/spriteStandRight.png';
const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

function createImage(imageSrc) {
   const image = new Image();
   image.src = imageSrc;
   return image
};

canvas.width = window.innerWidth;
canvas.height = 676;

console.log(canvasContext);

const gravity = 2;

class Player {
   constructor() {
      this.speed = 10;
      this.position = {
         x: 100,
         y: 100
      }
      this.velocity = {
         x: 0,
         y: 0
      }
      this.width = 66
      this.height = 150
      this.image = createImage(imgSpriteStandRight)
      this.frames = 0
      this.sprites = {
         stand: {
            right: createImage(imgSpriteStandRight),
            left: createImage(imgSpriteStandLeft),
            cropWidth: 177,
            width: 66
         },
         run: {
            right: createImage(imgSpriteRunRight),
            left: createImage(imgSpriteRunLeft),
            cropWidth: 341,
            width: 127.875
         }
      }
      this.currentSprite = this.sprites.stand.right;
      this.currentCropWidth = 177
   }

   draw() {
      canvasContext.drawImage(
         this.currentSprite,
         this.currentCropWidth * this.frames,
         0,
         this.currentCropWidth,
         400,
         this.position.x,
         this.position.y,
         this.width,
         this.height
      )
   };

   update() {
      this.frames++

      if (this.frames > 59 && (this.currentSprite ===
         this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)
      ) this.frames = 0
      else if (this.frames > 29 && (this.currentSprite ===
         this.sprites.run.right || this.currentSprite === this.sprites.run.left)
      ) this.frames = 0

      this.draw()
      this.position.y += this.velocity.y
      this.position.x += this.velocity.x

      if (this.position.y + this.height + this.velocity.y <= canvas.height)
         this.velocity.y += gravity
   }
};

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
class GenericObject {
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
let platFormImage = createImage(imgPlatform);

let player = new Player();
let platforms = [

];
let backgroundImage = createImage(imgBackground);
let GenericObjects = [

];

let keys = {
   right: {
      pressed: false
   },
   left: {
      pressed: false
   },


};
let scrollOfset = 0;
function init() {
   platFormImage = createImage(imgPlatform);
   player = new Player();
   platforms = [
      new Platform({
         x: -1,
         y: 620,
         image: platFormImage
      }),
      new Platform({
         x: platFormImage.width * 2 - 3,
         y: 620,
         image: platFormImage
      }),
      new Platform({
         x: platFormImage.width * 3 - 3,
         y: 620,
         image: platFormImage
      }),
      new Platform({
         x: platFormImage.width - 3,
         y: 350,
         image: platFormImage
      }),
      new Platform({
         x: platFormImage.width * 4 + 200,
         y: 350,
         image: platFormImage
      }),

      new Platform({
         x: platFormImage.width * 5,
         y: 620,
         image: platFormImage
      }),
      new Platform({
         x: platFormImage.width * 6,
         y: 620,
         image: platFormImage
      }),



   ];
   backgroundImage = createImage(imgBackground);
   GenericObjects = [
      new GenericObject({
         x: 0,
         y: 0,
         image: backgroundImage
      })

   ];


   scrollOfset = 0;
};
function animate() {
   requestAnimationFrame(animate);
   canvasContext.fillStyle = 'white'
   canvasContext.fillRect(0, 0, canvas.width, canvas.height);

   GenericObjects.forEach(genericObject => {
      genericObject.draw()
   });

   platforms.forEach(platform => {
      platform.draw();
   })
   player.update();

   //player move
   if (keys.right.pressed && player.position.x < 400) {
      player.velocity.x = player.speed;
   } else if ((keys.left.pressed && player.position.x > 100)
      || keys.left.pressed && scrollOfset === 0
      && player.position.x > 0
   ) {
      player.velocity.x = -player.speed;
   } else {
      player.velocity.x = 0;

      if (keys.right.pressed) {
         scrollOfset += player.speed;
         platforms.forEach((platform) => {
            platform.position.x -= player.speed;
         })
         GenericObjects.forEach(genericObject => {
            genericObject.position.x;
         })
      } else if (keys.left.pressed && scrollOfset > 0) {
         scrollOfset -= player.speed;

         platforms.forEach((platform) => {
            platform.position.x += player.speed;
         })
         GenericObjects.forEach(genericObject => {
            genericObject.position.x;
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

   //win condition
   if (scrollOfset > 2000) {
      console.log("you win");
   }
   //lose condition
   if (player.position.y > canvas.height) {
      init();
   }
};

init();
animate();

addEventListener('keydown', ({ keyCode, }) => {

   switch (keyCode) {
      case 65:
         console.log("left");
         keys.left.pressed = true;
         player.currentSprite = player.sprites.run.left
         player.currentCropWidth = player.sprites.run.cropWidth
         player.width = player.sprites.run.width
         break
      case 83:
         console.log("down");
         player.velocity.y += 20
         break
      case 68:
         console.log("right");
         keys.right.pressed = true;
         player.currentSprite = player.sprites.run.right
         player.currentCropWidth = player.sprites.run.cropWidth
         player.width = player.sprites.run.width

         break
      case 87:
         console.log("up");
         player.velocity.y -= 30
         break
   }

});

addEventListener('keyup', ({ keyCode, }) => {
   switch (keyCode) {
      case 65:
         console.log("left");
         keys.left.pressed = false;
         player.currentSprite = player.sprites.stand.left
         player.currentCropWidth = player.sprites.stand.cropWidth
         player.width = player.sprites.stand.width

         break
      case 83:
         console.log("down");
         player.velocity.y += 20
         break
      case 68:
         console.log("right");
         keys.right.pressed = false;
         player.currentSprite = player.sprites.stand.right
         player.currentCropWidth = player.sprites.stand.cropWidth
         player.width = player.sprites.stand.width
         break
      case 87:
         console.log("up");

         break
   }

})
