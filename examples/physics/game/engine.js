//window.gameEngine = window.gameEngine || {};

function Engine(scene, options) {
  var canvas = document.createElement('canvas');
  this.ctx = canvas.getContext('2d');
  canvas.width = options.width || 700;
  canvas.height = options.height || 400;
  canvas.id = 'canvas';
  document.body.appendChild(canvas);
  this.scene = scene;
  this.scene.ctx = this.ctx;
  this.lastTime = 0;
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  return this;
}


Engine.prototype.draw = function () {
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

  this.update(dt);
  this.draw();

  this.lastTime = now;
  var self = this;
  window.requestAnimationFrame(function () {
    self.start();
  });
};

//window.gameEngine.Engine = Engine;