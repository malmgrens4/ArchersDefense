function Bow(tier, position, maxPower, powerIncrement, arrowDurability, knockback, strength, upgradeCost = 100) {
    this.position = position.copy();
    this.position.x += 5;
    this.position.y -= 5;
    this.angle = 0;
    this.width = 30;
    this.height = 80;
    this.power = 0;
    this.name = "bow";
    this.numArrows = 1;
    this.tier = tier;
    
    this.bowImage = loadImage("/images/bow.png");
    
    this.maxPower = maxPower;
    this.strength = strength;
    this.powerIncrement = powerIncrement;
    this.knockback = knockback;
    
    this.arrowKnocked = false;
    this.arrowWidth = 36;
    this.arrowHeight = 12;
    this.arrowImage = loadImage("/images/pixel_arrow.png");
    this.arrows = [];
    this.arrowDurability = arrowDurability;
    this.upgradeCost = upgradeCost;

    this.powerBar = new StatusBar(createVector(this.position.x - 15, this.position.y - 50), this.width, this.height / 8, this.power, this.maxPower);

    this.update = function () {
        this.angle = atan2(mouseY - this.position.y, mouseX - this.position.x);
        this.powerBar.update(this.power, this.maxPower);

        for (var i = 0; i < this.arrows.length; i++) {
            this.arrows[i].update();
            if (!this.arrows[i].stopped) {
                if(gameEngine.detectZombieHit(this.arrows[i].position, this.arrows[i].angle, this.arrows[i].power * this.strength, this.knockback)){
                    this.arrows[i].damage();
                }
            }
            if (this.arrows[i].lifespan <= 0 || this.arrows[i].durabilility <= 0) {
                this.arrows.splice(i, 1);
            }
        }

    };

    this.show = function () {
        
        push();
        translate(this.position.x + this.width/2, this.position.y);
        rotate(this.angle);
        image(this.bowImage, -this.width/2, -this.height/2, this.width, this.height);
        pop();

        for (var i = 0; i < this.arrows.length; i++) {
            this.arrows[i].show();
        }

        //draw arrow if we are aiming one
        if (this.arrowKnocked) {
            //TODO ensure arrow is aligned with bow string
            push();
            translate(this.position.x, this.position.y - this.arrowHeight/2);
            stroke(1);
            rotate(this.angle);
            image(this.arrowImage, -this.power/4, 0, this.arrowWidth, this.arrowHeight);
            pop();
        }

        this.powerBar.show();

    };

    this.onMouseHold = function () {
        if (mouseIsPressed && this.power < this.maxPower) {
            this.power += this.powerIncrement;
            this.arrowKnocked = true;
        }
        else{
            this.power = this.maxPower;
        }
    };

    this.onMouseRelease = function () {
        if (this.power != 0) {
            this.fire();
        }
        this.arrowKnocked = false;
        

    };
    
    this.fire = function () {
        for(var i = 0; i < this.numArrows; i++){
            var angleChange = -(PI/40);
            if(this.numArrows % 2 == 0){
               angleChange = (PI/40); 
            }
            
             this.arrows.push(new Arrow(this.position, this.power, this.angle + (angleChange * i), this.arrowWidth, this.arrowHeight, this.arrowDurability, this.arrowImage, this.tier));
        }
       
        this.power = 0;

    };
    
    this.upgrade = function () {
        this.tier+=1;
        this.maxPower*=1.1;
        this.powerIncrement*=1.12;
        this.arrowDurability = Math.floor(this.arrowDurability * 1.5);
        this.knockback *= 1.2;
        this.upgradeCost = Math.floor(this.upgradeCost * 2.1);
        this.strength *= 1.1;
        if(this.tier % 3 == 0){
            this.numArrows+=1;
        }
    }
    
    this.onKeyPress = function (keyCode){
        
    };
    
}






