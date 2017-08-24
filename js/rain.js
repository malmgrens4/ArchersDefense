function Rain(position, size) {
    
    this.position = position.copy();
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, gravity);
    this.splashParticles = [];
    
    this.update = function() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);  
        for(var i = 0; i < this.splashParticles.length; i++){
            this.splashParticles[i].update();
        };
    };
    
    this.show = function () {
        push();
        noStroke();
        fill(4, 236, 224);
        rect(this.position.x, this.position.y, size/2, size);
        pop();
        for(var i = 0; i < this.splashParticles.length; i++){
            this.splashParticles[i].show();
        }
    };
    
    this.splash = function () {
        for(var  i = 0; i < 10; i++){
            this.splashParticles.push(new RainParticle(this.position, Math.random() * -PI, 4));
        }
    }
}

function RainParticle(position, angle, speed) {
    this.position = position.copy();
    this.acceleration = createVector(0, gravity);
    this.velocity = createVector(cos(angle) * speed, sin(angle) * speed);
    this.lifespan = 255;
    this.update = function () {
        this.lifespan--;
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }
    this.show = function () {
        push();
        noStroke();
        fill(4, 245, 255);
        ellipse(this.position.x, this.position.y, 2, 2);
        pop();
    }
}