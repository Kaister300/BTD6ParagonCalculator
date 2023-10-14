/**
 * Class for Calculating Attack of Paragon from paragon detail json file
 * @author Kaister300
 * @param {Number} degree - Degree of paragon
 * @param {String} name - Name of attack
 * @param {String} type - Attack Type
 * @param {Boolean} isdot - Boolean value if attack is damage over time
 * @param {Number} ceramic - Bonus ceramic damage at degree 1
 * @param {Number} moab - Bonus moab damage at degree 1
 * @param {Number} boss - Bonus boss damage at degree 1
 * @param {Number} elite - Bonus elite damage at degree 1
 * @param {Number} pierce - Pierce of attack at degree 1
 * @param {Number} speed - Speed of attack at degree 1
 * @param {Number} cooldown - Cooldown of ability at degree 1
 */
export class attackComp {

    constructor(degree, name, type, isdot, damage, ceramic, moab, boss, elite, pierce, speed, cooldown) {
        // Sets basic information of attack class
        this.degree = degree;
        this.name = name;
        this.type = type;
        this.isdot = isdot;

        // Sets gamma value used in damage computation
        let gamma = 1+0.01*(degree-1);

        // Computes damage
        this.damage = this._baseDamage(gamma, damage);
        this.ceramic = this.damage + this._specialDamage(gamma, ceramic);
        this.moab = this.damage + this._specialDamage(gamma, moab);
        this.boss = this._bossDamage(gamma, boss);
        this.elite = this._eliteDamage();
        this.pierce = this._pierceDamage(gamma, pierce);
        isdot
         ? this.speed = speed
         : this.speed = this._attackSpeed(speed);
    }

    /**
     * Caclulates base damage of attack with paragon degree
     * @param {Number} gamma - Gamma value of degree
     * @return {Number} Base damage of attack
    */
    _baseDamage(gamma, damage) {
        if(this.degree === 1) {
            return damage;
        }
        else if(this.degree === 100) {
            return 2*damage + 10;
        }
        else {
            return damage*gamma + (this.degree/10) - 1;
        }
    }

    /**
     * This includes Ceramics, MOABs and Fortified bonus damage.
     * @param {Number} gamma - Gamma value w/ degree
     * @param {Number} special - Special attack value
     * @return {Number} Bonus damage that is will be applied ontop of base damage
    */
    _specialDamage(gamma, special) {
        if(this.degree === 1) {
            return special;
        }
        else if(this.degree === 100) {
            return 2*special;
        }
        else {
            return special*gamma;
        }
    }

    /** 
     * Calculates Boss Bloon Damage
     * @param {Number} gamma - Gamma value w/ degree
     * @param {Number} boss - Base boss damage of attack
     * @return {Number} Boss damage after factoring in degree
    */
    _bossDamage(gamma, boss) {
        if(this.degree === 1) {
            console.log(`${this.damage} | ${this.moab}`)
            return this.damage + this.moab + boss;
        }
        else {
            let extra = boss*gamma;
            return (this.damage + this.moab + 2*extra)*(1+0.2*(this.degree/20)) - extra;
        }
    }

    /**
     * Calculates Elite Boss Damage of attack.
     * Current formula doubles boss damage, which is accurate up to degree 19.
     * @returns {Number} Elite damage of attack
     */
    _eliteDamage() {
        return 2*this.boss;
    }

    /** 
     * Calculates Pierce Value of Paragon
     * @param {Number} gamma - Gamma value w/ degree
     * @param {Number} piece - Base pierce of attack
     * @return {Number} Amount of pierce attack has
    */
    _pierceDamage(gamma, pierce) {
        if(this.degree === 1) {
            return pierce;
        }
        else if(this.degree === 100) {
            return 2*pierce + 100
        }
        else {
            return pierce*gamma + (this.degree-1);
        }
    }

    /** 
     * Calculates Attack Speed
     * @param {Number} gamma - Gamma value w/ degree
     * @param {Number} speed - Base speed of attack
     * @return {Number} Attack speed of current degree
    */
    _attackSpeed(speed) {
        if(this.degree === 1) {
            return speed;
        }
        else {
            return speed / (1+0.01*Math.sqrt(50*this.degree - 50));
        }
    }
}