function UpgradeManager() {
    //this is all absurd, shame on you!!
    this.currentWeapon;
    this.upgradeCurrentWeapon = function (position) {
        console.log(this.currentWeapon.name);
        if (this.currentWeapon.name == "bow") {
            this.upgradeBow(position);
        }
        if (this.currentWeapon.name == "handgun") {
            this.upgradeGun(position);
        }
    }
    this.upgradeBow = function (position, tier) {
        if (tier === 1) {
            return new Bow(2, position, weapon_data.bow.tier_two.maxPower, weapon_data.bow.tier_two.powerIncrement, weapon_data.bow.tier_two.durability, weapon_data.bow.tier_two.knockback, weapon_data.bow.tier_two.strength, weapon_data.bow.cost);
        }
        if (tier === 2) {
            return new Bow(3, position, weapon_data.bow.tier_three.maxPower, weapon_data.bow.tier_three.powerIncrement, weapon_data.bow.tier_three.durability, weapon_data.bow.tier_three.knockback, weapon_data.bow.tier_three.strength, weapon_data.bow.cost);
        } else {
            return false;
        }
    };

    this.upgradeHandgun = function (position, tier) {
        if (tier === 1) {
            return new Handgun(2, position, weapon_data.handgun.tier_two.maxPower, weapon_data.handgun.tier_two.powerIncrement, weapon_data.handgun.tier_two.durability, weapon_data.handgun.tier_two.knockback, weapon_data.handgun.tier_two.strength, weapon_data.handgun.cost);
        }
        if (tier === 2) {
            return new Handgun(3, position, weapon_data.handgun.tier_three.maxPower, weapon_data.handgun.tier_three.powerIncrement, weapon_data.handgun.tier_three.durability, weapon_data.handgun.tier_three.knockback, weapon_data.handgun.tier_three.strength, weapon_data.handgun.cost);
        }
        return false;
    };

    this.show = function () {
        text("Q to upgrade " + this.currentWeapon.name, 20, 40);
        text(" Cost: " + this.currentWeapon.upgradeCost, 20, 50);
    }

    this.update = function (currentWeapon) {
        this.currentWeapon = currentWeapon;
    }
}
