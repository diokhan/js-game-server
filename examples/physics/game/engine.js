//window.gameEngine = window.gameEngine || {};

function Engine(scene, options) {
  this.canvas = document.createElement('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.canvas.width = options.width || 700;
  this.canvas.height = options.height || 400;
  this.canvas.id = 'canvas';
  document.body.appendChild(this.canvas);
  this.scene = scene;
  this.scene.ctx = this.ctx;
  this.lastTime = 0;
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  return this;
}

Engine.prototype.draw = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  this.scene.draw();
  //this.requestAnimationFrame(toDraw);
};

Engine.prototype.update = function (dt) {
  this.scene.update(dt);
};

Engine.prototype.scene = function () {
  return this.scene;
};

Engine.prototype.start = function () {
  var now = Date.now();
  var dt = (now - this.lastTime) / 1000.0;
  this.inputHandler(dt);
  this.update(dt);
  this.draw();

  this.lastTime = now;
  var self = this;
  window.requestAnimationFrame(function () {
    self.start();
  });
};

Engine.prototype.inputHandler = function (dt) {
  if (input.isDown('LEFT') || input.isDown('a')) {
    this.scene.move('left');
  }

  if (input.isDown('RIGHT') || input.isDown('d')) {
    this.scene.move('right');
  }
};

//window.gameEngine.Engine = Engine;