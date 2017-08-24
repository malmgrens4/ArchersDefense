var weapon_data = {
    "bow": {
        "tier_one": {
            "tier": 1,
            "maxPower": 20, //the max charge/velocity it can go
            "powerIncrement": .25, //this rate at which it charges
            "durability": 1, //the number of targets it can hit
            "knockback": 5, //the distance it sends its target back
            "strength": .2, //the ratio of it velocity it damages the target for
            "cost": 100 //how much it costs for upgrade!!!
        },


    },
    "handgun": {
        "tier_one": {
            "tier": 1,
            "clipSize": 20, //TODO rename variables to clipSize and reloadTime
            "reloadTime": 200,
            "durability": 1,
            "knockback": 1,
            "strength": .007,
            "cost": 100
        },

    },
    "machinegun": {
        "tier_one": {
            "tier": 1,
            "clipSize": 50, //TODO rename variables to clipSize and reloadTime
            "reloadTime": 300,
            "durability": 1,
            "knockback": 0,
            "strength": .004,
            "cost": 100
        },

    }

};
