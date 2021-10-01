export default class Room {
  constructor(id, numBeds, allowSmoking, dailyRate, cleaningFee) {
    this.id = id;
    this.numBeds = numBeds;
    this.allowSmoking = allowSmoking;
    this.dailyRate = dailyRate;
    this.cleaningFee = cleaningFee;
  }

  /**
     * Calculates total charge for the room from provided stay length
     * @param {Number} stayLengthInDays
     * @returns {Number}
     */
  calculateTotalCharge(stayLengthInDays) {
    return stayLengthInDays * this.dailyRate + this.cleaningFee;
  }
}
