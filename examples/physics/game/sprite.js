(function() {
  function Sprite (attrs, type, controllable) {
    this.attrs = attrs;
    this.type = type;
    this.controllable = controllable || false;
    return this;
  }

  Sprite.prototype.draw = function (ctx) {
    ctx.save();
    ctx.fillStyle = this.attrs.color || 'grey';
    ctx.fillRect(this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);
  };

  Sprite.prototype.update = function (dt) {
    switch (this.type) {
      case 'player':
        if (this.direction) {
          if (this.direction === 'left') {
            this.attrs.x -= this.attrs.speed * dt;
          } else {
            this.attrs.x += this.attrs.speed * dt;
          }

          this.direction = null;
        }
        break;
      case 'projectile':
        //handle projectile
        break;
      case 'obstacle':
        //handle obstacles
        break;
      default:
        break;
    }
  };

  Sprite.prototype.move = function (direction) {
    this.direction = direction;
  };

  window.Sprite = Sprite;
})();
