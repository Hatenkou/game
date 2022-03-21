const imgPlatform = './img/platform.png';
const imgMiniPlatform = './img/miniPlt.png';
const imgBackground = './img/bg.png';
const imgSpriteRunLeft = './img/spriteRunLeft.png';
const imgSpriteRunRight = './img/spriteRunRight.png';
const imgSpriteStandLeft = './img/spriteStandLeft.png';
const imgSpriteStandRight = './img/spriteStandRight.png';
const imgSpriteGoomba = './img/spriteGoomba.png';
const imgBgPlanet = './img/bg/bgPlanet.png'
const imgBgPlanetOne = './img/bg/bgPlanet1.png'
const imgBgPlanetTwo = './img/bg/bgPlanet2.png'

const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

function createImage(imageSrc) {
   const image = new Image();
   image.src = imageSrc;
   return image
};


canvas.width = window.innerWidth;
canvas.height = 676;



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
      )
         this.frames = 0

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
class BackgroundObject {
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
class Goomba {
   constructor({ position, velocity }) {
      this.position = {
         x: position.x,
         y: position.y,
      };
      this.velocity = {
         x: velocity.x,
         y: velocity.y,
      };
      this.width = 43.33,
         this.height = 50,
         this.image = createImage(imgSpriteGoomba),
         this.frames = 0

   }
   draw() {
      //  canvasContext.fillStyle = 'red'
      //  canvasContext.fillRect(
      //      this.position.x,
      //     this.position.y,
      //     this.width,
      //     this.height,
      //   )
      canvasContext.drawImage(
         this.image,
         130 * this.frames,
         0,
         130,
         150,
         this.position.x,
         this.position.y,
         this.width,
         this.height
      )

   }
   update() {
      this.frames++
      if (this.frames >= 58) this.frames = 0
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y

      if (this.position.y + this.height + this.velocity.y <= canvas.height)
         this.velocity.y += gravity
   }
};
// img
let platFormImage = createImage(imgPlatform);
let MiniplatFormImage = createImage(imgMiniPlatform);
let backgroundImage = createImage(imgBackground);
let BgPlanetImage = createImage(imgBgPlanet);
let BgPlanetOneImage = createImage(imgBgPlanetOne);
let BgPlanetTwoImage = createImage(imgBgPlanetTwo);

let player = new Player();
let GenericObjects = [];
let BackgroundObjects = [];
let platforms = [];
let goombas = [];


let keys = {
   right: {
      pressed: false
   },
   left: {
      pressed: false
   },


};
let scrollOfset = 0;
function isOnTopOfPlatform({ object, platform }) {
   return (object.position.y + object.height <= platform.position.y
      && object.position.y + object.height + object.velocity.y >= platform.position.y
      && object.position.x + object.width >= platform.position.x
      && object.position.x <= platform.position.x + platform.width)
};
function collosionTop({ objectOne, objectTwo }) {
   return (objectOne.position.y + objectOne.height <= objectTwo.position.y
      && objectOne.position.y + objectOne.height + objectOne.velocity.y >= objectTwo.position.y
      && objectOne.position.x + objectOne.width >= objectTwo.position.x
      && objectOne.position.x <= objectTwo.position.x + objectTwo.width)
};


function init() {
   platFormImage = createImage(imgPlatform);

   player = new Player();
   goombas = [
      new Goomba({
         position: {
            x: 440,
            y: 100,
         },
         velocity: {
            x: -0.3,
            y: 0,
         }
      }),
   ];
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
      new Platform({
         x: platFormImage.width * 8,
         y: 620,
         image: MiniplatFormImage
      }),
      new Platform({
         x: platFormImage.width * 9,
         y: 520,
         image: MiniplatFormImage
      }),
      new Platform({
         x: platFormImage.width * 11,
         y: 420,
         image: MiniplatFormImage
      }), new Platform({
         x: platFormImage.width * 12,
         y: 620,
         image: platFormImage
      }), new Platform({
         x: platFormImage.width * 13 - 3,
         y: 620,
         image: platFormImage
      }),



   ];

   BackgroundObjects = [
      new BackgroundObject({
         x: 0,
         y: 0,
         image: backgroundImage
      }
      )
   ];

   GenericObjects = [

      new GenericObject({
         x: 2800,
         y: 0,
         image: BgPlanetImage
      }),
      new GenericObject({
         x: 25,
         y: 200,
         image: BgPlanetOneImage
      }),
      new GenericObject({
         x: 1600,
         y: -300,
         image: BgPlanetTwoImage
      }),


   ];


   scrollOfset = 0;
};
function animate() {
   requestAnimationFrame(animate);
   canvasContext.fillStyle = 'white'
   canvasContext.fillRect(0, 0, canvas.width, canvas.height);

   BackgroundObjects.forEach(bgObject => {
      bgObject.draw()
   });

   GenericObjects.forEach(genericObject => {
      genericObject.draw()
   });


   platforms.forEach(platform => {
      platform.draw();
   });

   goombas.forEach((goomba, index) => {
      goomba.update();
      if (collosionTop({
         objectOne: player,
         objectTwo: goomba
      })) {
         player.velocity.y -= 30
         goombas.splice(index, 1)
      } else if (
         player.position.x + player.width >= goomba.position.x
         &&
         player.position.y + player.height >= goomba.position.y
         &&
         player.position.x <= goomba.position.x + goomba.width
      ) init()
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
      // scrolling code
      if (keys.right.pressed) {
         scrollOfset += player.speed;
         platforms.forEach((platform) => {
            platform.position.x -= player.speed;
         });
         GenericObjects.forEach(genericObject => {
            genericObject.position.x -= 3;
         });
         goombas.forEach((goomba) => {
            goomba.position.x -= player.speed;
         });
      } else if (keys.left.pressed && scrollOfset > 0) {
         scrollOfset -= player.speed;

         platforms.forEach((platform) => {
            platform.position.x += player.speed;
         });
         GenericObjects.forEach(genericObject => {
            genericObject.position.x += 3;
         });
         goombas.forEach((goomba) => {
            goomba.position.x += player.speed;
         })

      }
   }
   //platfor collosion detection
   platforms.forEach((platform) => {
      if (isOnTopOfPlatform({
         object: player,
         platform
      })) {
         player.velocity.y = 0
      }

      goombas.forEach(goomba => {
         if (isOnTopOfPlatform({
            object: goomba,
            platform
         })
         )
            goomba.velocity.y = 0
      })
   });

   //win condition
   if (scrollOfset > 3000) {
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
