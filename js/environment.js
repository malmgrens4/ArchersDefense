function Environment() {
    this.currentWeather = [];
    this.possibleWeather = ['rain', 'snow', 'fire', 'blood', 'explosives'];
    this.rainSize = 6;
    this.snowSize = 2;
    this.rainDrops = [];
    this.snowCrystals = [];
    this.weatherPace = 5; //number of ticks for one to spawn
    this.splashParticles = [];

    this.addPrecipitationType = function (weather) {
        this.currentWeather.push(weather);
    };

    this.removePrecipitationType = function (weather) {
        this.currentWeather.splice(this.currentWeather.indexOf(weather), 1);
    };

    this.update = function () {

        if (this.currentWeather.includes('rain')) {
            this.rain();
        }
        if (this.currentWeather.includes('snow')) {

        }
        if (this.currentWeather.includes('fire')) {
            //this.fire();
        }
        if (this.currentWeather.includes('blood')) {
            //this.blood();
        }
    };

    this.show = function () {
        for (var i = 0; i < this.rainDrops.length; i++) {
            this.rainDrops[i].show();
        };
        for (var i = 0; i < this.splashParticles.length; i++) {
            this.splashParticles[i].show();
        };
    };

    this.rain = function () {
        if (gameEngine.tickCount % this.weatherPace == 0) {
            this.rainDrops.push(new Rain(createVector(Math.random() * windowWidth, -this.rainSize), this.rainSize));
        }

        for (var i = 0; i < this.rainDrops.length; i++) {
            this.rainDrops[i].update();
            if (this.rainDrops[i].position.y > groundStart) {
                this.splash(this.rainDrops[i].position);
                this.rainDrops.splice(i, 1);
            }

        }
        for (var i = 0; i < this.splashParticles.length; i++) {
            this.splashParticles[i].update();
            if (this.splashParticles[i].lifespan <= 0 || this.splashParticles[i].position.y - 2 > groundStart) {
                this.splashParticles.splice(i, 1);
            }
        };
    };


    this.snow = function () {

    };

    this.splash = function (position) {
        for (var i = 0; i < 10; i++) {
            this.splashParticles.push(new RainParticle(position, Math.random() * -PI, 3));
        }
    };

}

function RainParticle(position, angle, speed) {
    this.position = position.copy();
    this.acceleration = createVector(0, gravity);
    this.velocity = createVector(cos(angle) * speed, sin(angle) * speed);
    this.lifespan = 25;
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
