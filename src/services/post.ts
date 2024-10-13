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
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
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
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

            const pokemonData = response.data;
            const img = pokemonData.sprites?.front_default || "https://via.placeholder.com/96"; // Yedek görsel
            const type = pokemonData.types?.[0]?.type?.name || "Unknown";
            const pokemon = new Pokemon(pokemonData.name,img, pokemonData.id, type);

            return JSON.stringify(pokemon);
        } catch (error) {
            console.error("Dış API'den veri çekilemedi:", error);
            throw new Error("Veri çekilemedi");
        }
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

    async createItemWithTransaction(itemData, transactionalEntityManager) {
        const itemRepository = transactionalEntityManager.getRepository(Pokeitem);
        const newItem = itemRepository.create(itemData);
        await itemRepository.save(newItem);
        return newItem;
    }

    async deleteItem(id) {
        const itemRepository = this.manager_.getRepository(Pokeitem); 
        try {
            const item = await itemRepository.findOne({ where: { id: Number(id) } }); // ID ile item bul
            if (!item) {
                return null; // Eğer item yoksa null döner
            }
            await itemRepository.remove(item); // Item'ı sil
            return item; // Silinen item'ı döndür
        } catch (error) {
            console.error("Error in deleteItem:", error);
            throw new Error("Error deleting item");
        }
    }
}

export default PostService