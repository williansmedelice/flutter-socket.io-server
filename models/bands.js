const Band = require("./band");

class Bands {
  constructor() {
    this.bands = [];
  }

  // Agregar una banda
  addBand(band = new Band()) {
    this.bands.push(band);
  }

  // Obtener las bandaa
  getBands() {
    return this.bands;
  }

  //Borrar la Banda
  deteleBand(id = "") {
    this.bands = this.bands.filter((band) => band.id !== id);
    return this.bands;
  }

  // Incrementar los votos en 1
  voteBand(id = "") {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes++;
        return band;
      } else {
        return band;
      }
    });
    console.log(this.bands);
  }
}

module.exports = Bands;
