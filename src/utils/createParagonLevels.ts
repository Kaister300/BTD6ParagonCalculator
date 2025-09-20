/**
 * Returns paragon power needed to hit specified degree.
 * @param {number} degree Paragon Degree
 * @returns {number} Power that is required
 */
function paragonFunction(degree: number): number {
    if(degree === 1) {
        return 0;
    }
    else if(degree === 100) {
        return 200000;
    }
    else {
        let top = 50*(degree)**3 + 5025*(degree)**2 + 168324*(degree) + 843000;
        return Math.floor(top/600);
    }
}

/**
 * Generates an array that contains each level needed to
 * reach that paragon degree.
 * @param null
 * @returns {number[]} Power array that contains what power is needed for each level
 */
function paragonLevelsGenerator(): number[] {
    let levels = Array.from({length: 100}, (_, i) => i + 1);
    // paragonLevels = levels.map(this.paragonFunction);
    return levels.map(paragonFunction);
}

export { paragonFunction, paragonLevelsGenerator }