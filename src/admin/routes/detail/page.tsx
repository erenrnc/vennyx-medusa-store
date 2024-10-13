//import { RouteConfig } from "@medusajs/admin"
////import { CustomIcon } from "../../icons/custom"

//const DetailPage = () => {
//    return (
//        <div>
//            This is my custom route
//        </div>
//    )
//}

//export const config: RouteConfig = {
//    link: {
//        label: "Saved Pokemons",
//        //icon: CustomIcon,
//    },
//}


//export default DetailPage


import { RouteConfig } from "@medusajs/admin"
import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles.css';

const DetailPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:9000/itemsdb"); // API ça?r?s?
                setItems(response.data); // Ö?eleri state'e set et
                setLoading(false);
            } catch (error) {
                console.error("Error fetching items:", error);
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Yükleniyor mesaj?
    }

    return (
        <div>
            <h1 style={{ fontWeight: 'bold' }}>In DB Pokemons</h1>
            <div className="grid-container">
                {items.map((item) => (
                    <div className="grid-item" key={item.id}>
                        <img src={item.img || "https://via.placeholder.com/96"} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p><strong>Type:</strong> {item.type || "Unknown"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const config: RouteConfig = {
    link: {
        label: "Saved Pokemons",
        //icon: CustomIcon,
    },
}

export default DetailPage;
