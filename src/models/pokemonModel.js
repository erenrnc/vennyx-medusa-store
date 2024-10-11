class pokemon {
    constructor(name, img, id, type) {
        this.name = name;
        this.img = img;
        this.id = id;
        this.type = type;
    }

    getPokemonInfo() {
        return `Pokemon: ${this.name}, img: ${this.img}, id: ${this.id}, type: ${this.type}`;
    }
}

export default pokemon;