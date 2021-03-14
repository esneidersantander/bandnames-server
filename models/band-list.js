const Band = require("./band");

class BandList {
    constructor(){
        this.bands = [
            new Band('Mago de Oz'),
            new Band('Linkin Park'),
            new Band('Nickelback'),
            new Band('Metallica')
        ]
    }
    addBand (name){
        const newBand = new Band(name);
        this.bands.push(newBand);
        return this.bands;
    }
    
    removeBand(id){
        this.bands = this.bands.filter(band => band.id !==id);
    }

    getBands(){
        return this.bands;
    }

    increaseVotes(id){
        this.bands.map(band=>{
            if (band.id === id) {
                band.votes +=1;
            }
            return band;
        })
    }

    changeName(id, name){
        this.bands.map(band=>{
            if (band.id === id) {
                band.name =name;
            }
            return band;
        })
    }
}

module.exports = BandList;