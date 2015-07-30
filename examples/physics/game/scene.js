var Scene = function (ctx) {
  this.sprites = [];
  this.ctx = ctx || {};
  this.controllables = [];
  return this;
};

Scene.prototype.add = function (sprite, options) {
  this.sprites.push(sprite);
  if (sprite.controllable) {
    this.controllables.push(sprite);
  }
};

Scene.prototype.remove = function (name) {

};

Scene.prototype.update = function (dt) {
  this.sprites.forEach(function (sprite) {
    sprite.update(dt);
  });
};

Scene.prototype.draw = function () {
  var self = this;
  this.sprites.forEach(function (sprite) {
    sprite.draw(self.ctx);
  });
};

Scene.prototype.get = function () {
  return this.sprites;
};

Scene.prototype.move = function (direction) {
  this.controllables.forEach(function (sprite) {
    sprite.move(direction);
  })
};
