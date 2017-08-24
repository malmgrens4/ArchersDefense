function Handgun(tier, position, clipSize, reloadTime, bulletDurability, knockback, strength, upgradeCost = 100) {
    this.position = position.copy();
    this.position.x += 5;
    this.position.y -= 5;
    this.angle = 0;
    this.width = 35;
    this.height = 20;
    this.power = 0;
    this.powerMultiplier = 10;
    this.shotVelocity = 70;
    this.name = "handgun";

    this.tier = tier;

    this.upgradeCost = upgradeCost;

    this.power = 0;

    this.handgunImage = loadImage("/images/handgun.png");

    this.clipSize = clipSize;
    this.bulletsInClip = clipSize;
    this.strength = strength;
    this.reloadTime = reloadTime;
    this.knockback = knockback;

    this.bulletWidth = 6;
    this.bulletHeight = 3;
    this.bulletImage = loadImage("/images/bullet.png");
    this.bullets = [];
    this.bulletDurability = bulletDurability;

    this.reloading = false;
    this.reloadStartTime = 0;
    this.forcedReload = false;
    this.shotsFired = 0;
    this.shotsHit = 0;
    this.accuracy = this.shotsHit / this.shotsFired;

    this.burstFire = 1;


    this.powerBar = new StatusBar(createVector(this.position.x - 15, this.position.y - 50), this.width, this.height / 4, this.bulletsInClip, this.clipSize, true);

    this.update = function () {
        this.angle = atan2(mouseY - this.position.y, mouseX - this.position.x);
        this.powerBar.update(this.bulletsInClip, this.clipSize);

        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update();
            if (!this.bullets[i].stopped) {
                if (gameEngine.detectZombieHit(this.bullets[i].position, this.bullets[i].angle, this.bullets[i].power * this.strength, this.knockback)) {
                    this.bullets[i].damage();
                    this.shotsHit += 1;
                }
            }
            if (this.bullets[i].lifespan <= 0 || this.bullets[i].durabilility <= 0) {
                this.bullets.splice(i, 1);
            }
        }
        if ((this.bulletsInClip <= 0 && !this.reloading) || this.forcedReload) {
            this.reloadStartTime = gameEngine.tickCount;
            this.reloading = true;
            this.forcedReload = false;
        }
        if ((gameEngine.tickCount - this.reloadStartTime) > this.reloadTime && this.reloading) {
            this.reloading = false;
            this.bulletsInClip = this.clipSize;
        }
        this.accuracy = this.shotsHit / this.shotsFired;

    };

    this.show = function () {

        push();
        noFill();
        stroke(139, 69, 19);
        translate(this.position.x + this.width / 2, this.position.y);
        rotate(this.angle);
        image(this.handgunImage, -this.width / 2, -this.height / 2, this.width, this.height);
        pop();

        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].show();
        }

        this.powerBar.show();
        push();
        textFont(weaponFont, 12);
        text((this.accuracy * 100).toFixed(2) + "%", this.position.x - this.width, this.position.y + this.height);
        pop();
        if (this.reloading) {
            push();
            fill(255, 255, 255);
            textFont(weaponFont, 14);
            text("RELOADING..." + (this.reloadTime - (gameEngine.tickCount - this.reloadStartTime)).toFixed(2).toString(), this.position.x, this.position.y - this.height);
            pop();
        }

    };

    this.onMouseHold = function () {
        this.power += 1;
    };

    this.onMouseRelease = function () {
        if (!this.reloading && this.power > 0) {
            this.fire();
            this.power = 0;
        }


    };

    this.fire = function () {
      
        for (var i = 0; i < this.burstFire; i++) {
            var bPosition = this.position.copy();
            bPosition.y += 2 * i;
            this.bullets.push(new Bullet(bPosition, this.shotVelocity, this.angle, this.bulletWidth, this.bulletHeight, this.bulletDurability, this.bulletImage, this.tier));
        }
         //TODO add power as determination of accuracy
        this.power = 0;
        this.bulletsInClip -= 1;
        this.shotsFired += this.burstFire;
    };

    this.upgrade = function () {
        this.tier += 1;
        this.clipSize = Math.floor(this.clipSize * 1.05);
        this.strength *= 1.14;
        this.reloadTime *= .98;
        this.bulletDurability = Math.floor(this.bulletDurability * 1.5);
        this.knockback *= 1.12;
        this.upgradeCost = Math.floor(this.upgradeCost * 1.4) + (this.tier * 100);
        this.bulletsInClip = this.clipSize;
        this.reloading = false;
        if(this.tier % 3 == 0){
            this.burstFire+=1;
        }
    };

    this.onKeyPress = function (keyCode) {
        if (keyCode === 82) {
            if (!this.reloading && !(this.clipSize == this.bulletsInClip)) {
                this.forcedReload = true;
            }
        }
    };


}
