/*import { useCreateCustomer } from "medusa-react"*/

const axios = require("axios");

class RegisterService {

    async getToken() {
        let YOUR_ADMIN_API_TOKEN = "Tokeni alamayanlar!";

        try {
            const response = await axios.post('http://localhost:9000/admin/auth/token', {
                "email": "admin@medusa-test.com",
                "password": "supersecret"
            });

            YOUR_ADMIN_API_TOKEN = response.data.access_token;


        } catch (error) {
            console.error('Error creating customer:', error);
        }

        return YOUR_ADMIN_API_TOKEN;
    }

    async create() { //auth purposes

        try {
            let YOUR_ADMIN_API_TOKEN = this.getToken();
            
            const response = await axios.post('http://localhost:9000/admin/customers', {
                email: "customer@example.com",
                first_name: "John",
                last_name: "Doe",
                password: "securePassword123"
            }, {
                headers: {
                    'Authorization': 'Bearer ' + YOUR_ADMIN_API_TOKEN,
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error creating customer:', error);
        }

        return "Customer oluşturamayanlar!"

    }
}

export default RegisterService