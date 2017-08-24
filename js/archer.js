new p5();

function Archer(position) {
    this.height = 80;
    this.position = position.copy();
    this.position.y -= this.height;
    this.position.x -= this.height / 2;
    this.image = loadImage("/images/archer.png");
    this.bowPosition = createVector(this.position.x + this.height / 2, this.position.y + this.height / 1.8);
    
    this.bow = new Bow(weapon_data.bow.tier_one.tier, this.bowPosition, weapon_data.bow.tier_one.maxPower, weapon_data.bow.tier_one.powerIncrement, weapon_data.bow.tier_one.durability, weapon_data.bow.tier_one.knockback, weapon_data.bow.tier_one.strength, weapon_data.bow.cost);
    
    this.handgun = new Handgun(weapon_data.handgun.tier_one.tier, this.bowPosition, weapon_data.handgun.tier_one.clipSize, weapon_data.handgun.tier_one.reloadTime, weapon_data.handgun.tier_one.durability, weapon_data.handgun.tier_one.knockback, weapon_data.handgun.tier_one.strength);
    
    this.machinegun = new Machinegun(weapon_data.machinegun.tier_one.tier, this.bowPosition, weapon_data.machinegun.tier_one.clipSize, weapon_data.machinegun.tier_one.reloadTime, weapon_data.machinegun.tier_one.durability, weapon_data.machinegun.tier_one.knockback, weapon_data.machinegun.tier_one.strength);
    
    this.currentWeapon = this.bow;
    this.score = 500;

    this.update = function () {

        this.currentWeapon.update();
       

    };
    this.show = function () {
        push();
        fill(51);
        stroke(2);
        //image(this.image, this.position.x, this.position.y, this.height, this.height);
        //        ellipse(this.position.x, this.position.y - this.height, this.height/2, this.height/2);
        //        line(this.position.x, this.position.y - this.height, this.position.x, this.position.y);
        pop();
        push();
        this.currentWeapon.show();
        textFont(scoreFont, 42);
        text(Math.floor(this.score), windowWidth / 3, 80);
        
        textFont(weaponFont, 16);
        text("Q to upgrade " + this.currentWeapon.name, 20, 40);
        text(" Cost: " + Math.floor(this.currentWeapon.upgradeCost), 20, 70);
        textSize(10);
        text("1: ", 250, 40);
        image(this.bow.bowImage, 260, 40, this.bow.width/2, this.bow.height/2 );
         text("2: ", 340, 40);
        image(this.handgun.handgunImage, 350, 40, this.handgun.width/2, this.handgun.height/2 );
         text("3: ", 420, 40);
        image(this.machinegun.machinegunImage, 430, 40, this.machinegun.width/2, this.machinegun.height/2 );
        pop();
        
    };

    this.onMouseHold = function () {
        this.currentWeapon.onMouseHold();
    };

    this.onMouseRelease = function () {
        this.currentWeapon.onMouseRelease();
    };

    this.setWeapon = function (weapon) {
        this.currentWeapon = weapon;
    };

    this.addPoints = function (points) {
        this.score += points;
    }

    this.losePoints = function (points) {
        this.score -= points;
    }

    this.getPoints = function () {
        return this.score;
    }

    this.onKeyPress = function (keyCode) {
        this.currentWeapon.onKeyPress(keyCode);
        if (keyCode === 49) {
            this.currentWeapon = this.bow;
        }
        if (keyCode === 50) {
            this.bow.power = 0;
            this.currentWeapon = this.handgun;
        }
        
        if (keyCode === 51) {
            this.currentWeapon = this.machinegun;
        }
        if (keyCode === 81) {
            if(this.score >= this.currentWeapon.upgradeCost){
                this.losePoints(this.currentWeapon.upgradeCost);
                this.currentWeapon.upgrade();
                
            }
        }
        
    }
    
    
}
