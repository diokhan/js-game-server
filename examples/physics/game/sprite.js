function Sprite (attrs) {
  this.attrs = attrs;
  return this;
}

Sprite.prototype.draw = function (ctx) {
  ctx.save();
  ctx.fillStyle = this.attrs.color || 'grey';
  ctx.fillRect(this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);
};

Sprite.prototype.update = function (dt) {
  return true;
};