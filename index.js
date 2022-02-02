const imgPlatform = './img/platf.png';
const imgBackground = './img/bluemoon.png';
const imgTree = './img/tree.png';
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
   new Platform({
      x: -1,
      y: 570,
      image: platFormImage
   }),
   new Platform({
      x: platFormImage.width * 2 - 3,
      y: 570,
      image: platFormImage
   }),
   new Platform({
      x: platFormImage.width * 3 - 3,
      y: 570,
      image: platFormImage
   }),
   new Platform({
      x: platFormImage.width - 3,
      y: 250,
      image: platFormImage
   }),

];
let backgroundImage = createImage(imgBackground);
let treeImage = createImage(imgTree);
let GenericObjects = [
   new GenericObject({
      x: 0,
      y: 0,
      image: backgroundImage
   }), new GenericObject({
      x: platFormImage.width - 2000,
      y: 0,
      image: backgroundImage
   }), new GenericObject({
      x: platFormImage.width + 1000,
      y: 0,
      image: backgroundImage
   }),
   new GenericObject({
      x: 150,
      y: 270,
      image: treeImage
   }),
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
         y: 570,
         image: platFormImage
      }),
      new Platform({
         x: platFormImage.width * 2 - 3,
         y: 570,
         image: platFormImage
      }),
      new Platform({
         x: platFormImage.width * 3 - 3,
         y: 570,
         image: platFormImage
      }),
      new Platform({
         x: platFormImage.width - 3,
         y: 250,
         image: platFormImage
      }),

   ];
   backgroundImage = createImage(imgBackground);
   treeImage = createImage(imgTree);
   GenericObjects = [
      new GenericObject({
         x: 0,
         y: 0,
         image: backgroundImage
      }), new GenericObject({
         x: platFormImage.width - 2000,
         y: 0,
         image: backgroundImage
      }), new GenericObject({
         x: platFormImage.width + 1000,
         y: 0,
         image: backgroundImage
      }),
      new GenericObject({
         x: 150,
         y: 270,
         image: treeImage
      }),
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
         GenericObjects.forEach(genericObject => {
            genericObject.position.x -= 3;
         })
      } else if (keys.left.pressed) {
         scrollOfset -= 5
         platforms.forEach((platform) => {
            platform.position.x += 5;
         })
         GenericObjects.forEach(genericObject => {
            genericObject.position.x += 3;
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
