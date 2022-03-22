export function createImage(imageSrc) {
   const image = new Image();
   image.src = imageSrc;
   return image
};

export function isOnTopOfPlatform({ object, platform }) {
   return (object.position.y + object.height <= platform.position.y
      && object.position.y + object.height + object.velocity.y >= platform.position.y
      && object.position.x + object.width >= platform.position.x
      && object.position.x <= platform.position.x + platform.width)
};

export function collosionTop({ objectOne, objectTwo }) {
   return (objectOne.position.y + objectOne.height <= objectTwo.position.y
      && objectOne.position.y + objectOne.height + objectOne.velocity.y >= objectTwo.position.y
      && objectOne.position.x + objectOne.width >= objectTwo.position.x
      && objectOne.position.x <= objectTwo.position.x + objectTwo.width)
};

export function isOnTopOfPlatformCircle({ object, platform }) {
   return (object.position.y + object.radius <= platform.position.y
      && object.position.y + object.radius + object.velocity.y >= platform.position.y
      && object.position.x + object.radius >= platform.position.x
      && object.position.x <= platform.position.x + platform.width)
};

export function hitBottomOfPlatform({ object, platform }) {
   return object.position.y <= platform.position.y + platform.height
      && object.position.y - object.velocity.y >= platform.position.y + platform.height
      && object.position.x + object.width >= platform.position.x + platform.width
      && object.position.x + object.width <= platform.position.x + platform.width
};
