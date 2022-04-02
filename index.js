//path 1.0

import {
   createImage,
   isOnTopOfPlatform,
   collosionTop,
   isOnTopOfPlatformCircle
} from './js/utils.js'

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
   constructor({ position, velocity, distance = {
      limit: 50,
      traveled: 0
   } }) {
      this.position = {
         x: position.x,
         y: position.y,
      }
      this.velocity = {
         x: velocity.x,
         y: velocity.y,
      }
      this.width = 43.33,
         this.height = 50,
         this.image = createImage(imgSpriteGoomba),
         this.frames = 0

      this.distance = distance

   }
   draw() {

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

      //walk the goomba back and four
      this.distance.traveled += Math.abs(this.velocity.x)

      if (this.distance.traveled > this.distance.limit) {
         this.distance.traveled = 0
         this.velocity.x = -this.velocity.x
      }

   }
};
class Partcle {
   constructor({ position, velocity, radius }) {
      this.position = {
         x: position.x,
         y: position.y
      }
      this.velocity = {
         x: velocity.x,
         y: velocity.y
      }
      this.radius = radius
      this.ttl = 300
   }
   draw() {
      canvasContext.beginPath()
      canvasContext.arc(
         this.position.x,
         this.position.y,
         this.radius, 0,
         Math.PI * 2, false)
      canvasContext.fillStyle = pickRandomWord(colors)
      canvasContext.fill()
      canvasContext.closePath()

   }
   update() {
      this.ttl--
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      if (this.position.y + this.radius + this.velocity.y <= canvas.height)
         this.velocity.y += gravity * 0.4
   }
}

// img
let platFormImage = createImage(imgPlatform);
let MiniplatFormImage = createImage(imgMiniPlatform);
let backgroundImage = createImage(imgBackground);
let BgPlanetImage = createImage(imgBgPlanet);
let BgPlanetOneImage = createImage(imgBgPlanetOne);
let BgPlanetTwoImage = createImage(imgBgPlanetTwo);
let colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];
function pickRandomWord(words) {
   return words[Math.floor(Math.random() * words.length)];
};
let player = new Player();
let GenericObjects = [];
let BackgroundObjects = [];
let platforms = [];
let goombas = [];
let particles = [];

let scrollOfset = 0;
let keys = {
   up: {
      pressed: false
   },
   right: {
      pressed: false
   },
   left: {
      pressed: false
   },


};

function init() {
   platFormImage = createImage(imgPlatform);

   player = new Player();
   goombas = [
      new Goomba({
         position: {
            x: 520,
            y: 100,
         },
         velocity: {
            x: -0.3,
            y: 0,
         },
         distance: {
            limit: 100,
            traveled: 0
         }
      }),
      new Goomba({
         position: {
            x: 920,
            y: 570,
         },
         velocity: {
            x: -1,
            y: 0,
         },
         distance: {
            limit: 200,
            traveled: 10
         }

      }),
      new Goomba({
         position: {
            x: 1380,
            y: 570,
         },
         velocity: {
            x: -0.5,
            y: 0,
         },
         distance: {
            limit: 100,
            traveled: 10
         }

      }),
      new Goomba({
         position: {
            x: 2300,
            y: 570,
         },
         velocity: {
            x: -2.5,
            y: 0,
         },
         distance: {
            limit: 400,
            traveled: 10
         }

      }),
      new Goomba({
         position: {
            x: 2450,
            y: 570,
         },
         velocity: {
            x: -0.5,
            y: 0,
         },
         distance: {
            limit: 150,
            traveled: 10
         }

      }),

   ];
   particles = [

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
         x: platFormImage.width * 11 - 40,
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

      //goomba stomp
      if (collosionTop({
         objectOne: player,
         objectTwo: goomba
      })) {
         for (let i = 0; i < 50; i++) {
            particles.push(new Partcle({
               position: {
                  x: goomba.position.x + goomba.width / 2,
                  y: goomba.position.y + goomba.height / 2
               },
               velocity: {
                  x: (Math.random() - 0.5) * 5,
                  y: (Math.random() - 0.5) * 15,
               },
               radius: Math.random() * 3
            }))
         }
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

   particles.forEach((particle) => {
      particle.update();
   });

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
         particles.forEach((particle) => {
            particle.position.x -= player.speed;
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
         particles.forEach((particle) => {
            particle.position.x += player.speed;
         });

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
      //particles bounce
      particles.forEach((particle, index) => {
         if (isOnTopOfPlatformCircle({
            object: particle,
            platform
         })) {
            particle.velocity.y = -particle.velocity.y * 0.9
            if (particle.radius - 0.4 < 0) particles.splice(index, 1)
            else particle.radius -= 0.4
         }
         if (particle.ttl < 0) particles.splice(index, 1)
      })

      goombas.forEach(goomba => {
         if (isOnTopOfPlatform({
            object: goomba,
            platform
         })
         )
            goomba.velocity.y = 0
      });
   });



   //win condition
   if (scrollOfset > 4450) {
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
         if (player.position.y > 680)
            player.velocity.y = +20
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

         if (player.velocity.y === 0) player.velocity.y = -40

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
         if (player.position.y > 680)
            player.velocity.y = +20
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
