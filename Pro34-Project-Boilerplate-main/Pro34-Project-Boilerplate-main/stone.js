class Stone{
    constructor(x, y, width, height, slingshotAngle) {
        var options = {
          isStatic: true,
          density: 0.1
        };
        this.width = width;
        this.height = height;
        this.body = Bodies.rectangle(x, y, this.width, this.height, options);
        this.image = loadImage("stone.PNG");
        this.trajectory = [];
        this.isRemoved = false;
        this.slingshotAngle = slingshotAngle;
        this.velocity = p5.Vector.fromAngle(slingshotAngle);
        World.add(world, this.body);
    }
    remove(index) {
        this.isRemoved = true;
        Matter.World.remove(world, this.body);
        delete stones[index];
    }    
    shoot(slingshotAngle) {
        slingshotAngle += 90;
        this.velocity = p5.Vector.fromAngle(slingshotAngle * (3.14 / 180));
    
        this.velocity.mult(0.5);
    
        Matter.Body.setVelocity(this.body, {
          x: this.velocity.x * (-720 / 3.14),
          y: this.velocity.y * (-180 / 3.14)
        });
    
        Matter.Body.setStatic(this.body, false);
    }
    display() {
        var tmpAngle;
        if (this.body.velocity.y === 0) {
          tmpAngle = this.slingshotAngle -180;
        } else {
          tmpAngle = Math.atan(this.body.velocity.y / this.body.velocity.x) * (180 / 3.14);
        }
    
        Matter.Body.setAngle(this.body, tmpAngle);
    
        var pos = this.body.position;
        var angle = this.body.angle;
    
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
    }
}