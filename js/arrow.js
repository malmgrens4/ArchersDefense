new p5();
function Arrow(position, power, angle, width, height, durability, arrowImage, tier) {
    this.acceleration = createVector(0, gravity);
    this.angle = angle;
    this.durabilility = durability;
    this.width = width;
    this.height = height;
    this.position = position.copy();
    this.power = power;
    this.lifespan = 100; //after it stops moving
    this.stopped = false;
    this.velocity = createVector(this.power * cos(this.angle), this.power * sin(this.angle));
    this.arrowImage = arrowImage;
    this.trailLength = 10;
    this.trailPoints = [];
    
    this.update = function () {
        this.angle = atan2(this.velocity.y, this.velocity.x);
        
        this.checkCollision();

        if (this.stopped) {
            this.lifespan--;
        } else {
            //console.log(this.velocity.x, this.velocity.y);
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
        }
        
        if(this.trailPoints.length >= this.trailLength){
            this.trailPoints.splice(0, 1);
        }
        this.trailPoints.push(createVector(this.position.x, this.position.y ));
    };

    this.show = function () {
        push();
        stroke(1);
        translate(this.position.x, this.position.y - this.height/2);
        rotate(this.angle);
        image(this.arrowImage, 0, 0, this.width, this.height);  
        pop();
        
        push();
        for(var i = 0; i < this.trailPoints.length - 1; i++) {
            var color1 = 180;
            var color2 = 240;
            var color3 = 220;
            if(tier > 5){
            color1 = map(Math.random(), 0, .99, 50, 255);
            color2 = map(Math.random(), 0, .99, 50, 255);
            color3 = map(Math.random(), 0, .99, 50, 255);
            }
            strokeWeight(tier/2);
            stroke(color1, color2, color3,  parseFloat((i/this.trailPoints.length)).toFixed(2));
            line(this.trailPoints[i].x, this.trailPoints[i].y, this.trailPoints[i+1].x, this.trailPoints[i+1].y);
        }
        pop();
        
    };
    
    this.checkCollision = function () {
        //check against all zombies
        if(this.position.y >= groundStart - this.width + (this.width * cos(this.angle))){
            this.stopped = true;
        }
        if(this.position.x >= windowWidth || this.position.x <= 0){
            this.stopped = true;
        }
        
    };
    
    this.destroy = function () {
        this.lifespan = 0;
    }
    
    this.damage = function () {
        this.durabilility-=1;
    }
}
