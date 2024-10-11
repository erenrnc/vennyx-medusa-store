import { TransactionBaseService } from "@medusajs/medusa"

const axios = require("axios");

class PostService extends TransactionBaseService {
    async getMessage() {
        try {
            // Dış API'ye GET isteği yapılıyor
            const response = await axios.get("https://pokeapi.co/api/v2/ability/?limit=20&offset=20");
            //console.log(response.data);
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