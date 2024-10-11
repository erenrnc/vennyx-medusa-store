import { TransactionBaseService } from "@medusajs/medusa"
import Pokemon  from "../models/pokemonModel";

const axios = require("axios");

class PostService extends TransactionBaseService {
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
}

export default PostService