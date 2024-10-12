import { TransactionBaseService } from "@medusajs/medusa"
import Pokemon from "../models/pokemonModel";
import { EntityManager } from "typeorm";
import Pokeitem from "../models/pokemonItem";

const axios = require("axios");

class PostService extends TransactionBaseService {
    constructor({ manager }) {
        super(manager);
        this.manager_ = manager;
    }

    async getMessage(limit: number, offset: number) {
        try {
            // Dış API'ye GET isteği yapılıyor
            const response = await axios.get(`https://pokeapi.co/api/v2/ability/?limit=${limit}&offset=${offset}`);
            //console.log(response.data);
            return JSON.stringify(response.data);
        } catch (error) {
            // Hata durumunda mesaj
            //console.error("Dış API'den veri çekilemedi:", error);
            //throw new Error("Veri çekilemedi");
        }


        return `veriyi çekemeyenler!`
    }

    async getPokeInfo(name: string) {
        try {
            // Dış API'ye GET isteği yapılıyor
            const response = await axios.get(`https://pokeapi.co/api/v2/ability/${name}`);

            // API'den dönen veriyi Pokemon modeline göre yapılandırıyoruz
            //const pokemon = response.data.results.map(pokemonData => {
            //    return new Pokemon(pokemonData.name, pokemonData.generation.url, pokemonData.id, pokemonData.is_main_series);
            //});
            return JSON.stringify(response.data);
        } catch (error) {
            // Hata durumunda mesaj
            //console.error("Dış API'den veri çekilemedi:", error);
            //throw new Error("Veri çekilemedi");
        }


        return `veriyi çekemeyenler!`
    }

    async createItem(data) {
        const itemRepository = this.manager_.getRepository(Pokeitem);

        const newItem = itemRepository.create({
            name: data.name,
            img: data.img,
            type: data.type,
        });

        return await itemRepository.save(newItem);
    }
}

export default PostService