function GameEngine() {
    this.wall = new Wall(windowWidth / 20, windowHeight / 2);
    this.archer = new Archer(createVector((windowWidth / 20) - 20, (windowHeight / 2)));
    this.zombies = [];
    this.zombiesSpawned = 0;
    this.environment = new Environment();
    this.tickCount = 0;
    this.tickBetweenZombieSpawn = 40;
    this.scoreAnimations = [];
    this.scoreAnimationLength = 100;
    this.lastZombieSpawn = 0;
    this.bossWave = false;
    
    this.update = function () {
        this.initializeZombiesForRound();
        this.tickCount++;
        this.wall.update();
        this.archer.update();
        for (var i = 0; i < this.zombies.length; i++) {
            this.zombies[i].update();
            if (this.zombies[i].health <= 0) {

                this.scoreAnimations.push(new scoreAnimation(this.zombies[i].position, this.zombies[i].pointValue + round * 50, this.scoreAnimationLength));
                this.archer.addPoints(this.zombies[i].pointValue + round * 10);
                this.zombies.splice(i, 1);
            }
        }
        this.environment.update();
        for (var i = 0; i < this.scoreAnimations.length; i++) {
            this.scoreAnimations[i].update();
            if(this.scoreAnimations[i].duration <= 0){
                this.scoreAnimations.splice(i, 1);
            }
        }
        if(this.zombies.length == 0 && this.zombiesSpawned > 0){
            this.endRound();
        }

    };

    this.show = function () {
        this.wall.show();
        this.archer.show();
        for (var i = 0; i < this.zombies.length; i++) {
            this.zombies[i].show();
        }
        this.environment.show();
        for (var i = 0; i < this.scoreAnimations.length; i++) {
            this.scoreAnimations[i].show();
        }
        push();
        textFont(scoreFont, 32);
        text("Wave: " + round, windowWidth - 300, 50);
        pop();
    };


    //wall stuff
    this.damageWall = function (damage) {
        this.wall.hit(damage);
    };

    this.getWallHealthByRound = function () {
        return round * 100;
    };

    this.endRound = function () {
        round+=1;
        this.tickBetweenZombieSpawn-=2;
        this.wall.health += round * 10;
        this.zombiesSpawned = 0;
    };

    this.reset = function () {
        this.wall = new Wall(windowWidth / 20, windowHeight / 2);
        this.archer = new Archer(createVector(windowWidth / 20, windowHeight / 2));
        this.zombies = [];
        this.environment = new Environment();
        this.tickCount = 0;
        this.lastZombieSpawn = 0;
        round = 1;
    };

    //mouse pressed
    this.onMouseHold = function () {
        this.archer.onMouseHold();
    };

    this.onMouseRelease = function () {
        this.archer.onMouseRelease();
    };

    //key listeners
    this.onKeyPress = function (keyCode) {
        this.archer.onKeyPress(keyCode);
    }

    //zombie stuff
    this.initializeZombiesForRound = function () {
        //zombies have a spawn delay
        //console.log(this.tickCount % this.tickBetweenZombieSpawn == 0);
        if(round % 5 == 0 && !this.bossWave){
            this.zombies.push(new Boss(round/10));
            this.bossWave = true;
        }
        if(this.bossWave && this.zombies==0){
            this.bossWave = false;
            this.archer.currentWeapon.upgrade();
            this.endRound();
        }
        if (!this.bossWave && ((this.tickCount - this.lastZombieSpawn) > this.tickBetweenZombieSpawn) && (this.zombiesSpawned < round * 1.8)) {
            this.zombiesSpawned++;
            this.lastZombieSpawn = this.tickCount;
            var zxSpeed = -min(1.2, (Math.random() * round/2) + .5);
            this.zombies.push(new Zombie(createVector(zxSpeed, 0)));
            if(this.zombiesSpawned % 3 == 0){
                var fzxSpeed = min(1.4, Math.random() * round/1.5 + .5);
                this.zombies.push(new FlyingZombie(fzxSpeed));//TODO rework FZ parameters
            }
            if(this.zombiesSpawned % 12 == 0 && round % 6 == 0){
                for(var  i = 0; i < this.zombiesSpawned/2; i++){
                    var iVel = createVector(-round * 1.5, 0);
                    var health = round/10;
                    var iPos = createVector(windowWidth + (i * 400), groundStart - 80);
                    var damage = round * .3;
                    this.zombies.push(new Zombie(iVel, health, loadImage("/images/crawler.png"), iPos, damage));
                    
                }
            }
        }
        

    };

    //weather
    this.rain = function () {
        this.environment.addPrecipitationType('rain');
    };

    //functions for archer
    this.detectZombieHit = function (position, angle, power, knockback) {
        for (var i = 0; i < this.zombies.length; i++) {

            if (this.ballSquareCollision(position, 0, this.zombies[i].position, this.zombies[i].size)) {
                this.zombies[i].hit(power, angle, position, knockback);
                return true;
            }

        }
        return false;
    };


    this.giveArcherAmmo = function (ammoType, amount) {
        
    };

    //physics
    this.ballSquareCollision = function (b_p, b_r, s_p, s_s) {
        if (b_p.x > s_p.x && b_p.x < s_p.x + s_s) {
            if (b_p.y > s_p.y && b_p.y < s_p.y + s_s) {
                return true;
            }
        } else {
            return false
        }
    };

}

function scoreAnimation(position, points, duration) {
    this.position = position.copy();
    this.duration = duration;
    this.velocity = createVector(0, -.4);
    this.start = gameEngine.tickCount;
    this.show = function () {
        push();
        textFont(weaponFont, 32);
        fill(100, 41, 41);
        text(points, this.position.x, this.position.y, ((this.duration/ gameEngine.scoreAnimationLength)).toFixed(2));
        pop();

    };
    this.update = function () {
        this.position.add(this.velocity);
        this.duration-=1;
    };
}
