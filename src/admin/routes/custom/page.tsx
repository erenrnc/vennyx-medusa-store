import { RouteConfig } from "@medusajs/admin"
//import { CustomIcon } from "../../icons/custom"
import React, { useState, useEffect } from "react";
//import PostService from "../../../services/post";
import axios from "axios";
import './styles.css';

//const pokemons = [
//    { id: 1, name: "Bulbasaur", type: "Grass/Poison" },
//    { id: 2, name: "Charmander", type: "Fire" },
//    { id: 3, name: "Squirtle", type: "Water" },
//    { id: 4, name: "Pikachu", type: "Electric" },
//];

const CustomPage = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await axios.get("http://localhost:9000/get/pokemons?offset=0&limit=100");
                //console.log("API Response:", response.data);
                setPokemons(response.data.results); 
                setLoading(false);

                
            } catch (error) {
                console.error("Error fetching Pokemons:", error);
                setLoading(false);
            }
        };
        fetchPokemons();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Pokemons List</h1>
            <div className="table-container">
                {pokemons.map((pokemon, index) => (
                    <div className="card" key={index}>
                        <h2>{pokemon.name}</h2>
                        {/*<img src={pokemon.url} alt={pokemon.name} style={{ width: "100px" }} />*/}
                        <p><a href={pokemon.url} target="_blank" rel="noopener noreferrer">View More</a></p>
                    </div>
                ))}
            </div>
        </div>
    );

    //const [data, setData] = useState([]);

    //// Simulating a fetch request to an API or a backend service
    //useEffect(() => {
    //    setData(pokemons);
    //}, []);

    //return (
    //    <div>
    //        <h1>Pokemons List</h1>
    //        <table>
    //            <thead>
    //                <tr>
    //                    <th>ID</th>
    //                    <th>Name</th>
    //                    <th>Type</th>
    //                </tr>
    //            </thead>
    //            <tbody>
    //                {data.map((pokemon) => (
    //                    <tr key={pokemon.id}>
    //                        <td>{pokemon.id}</td>
    //                        <td>{pokemon.name}</td>
    //                        <td>{pokemon.type}</td>
    //                    </tr>
    //                ))}
    //            </tbody>
    //        </table>
    //    </div>
    //);
    //const [pokemons, setPokemons] = useState([]);
    //const postService = new PostService({ manager: null });  // Provide a manager if necessary

    //useEffect(() => {
    //    const fetchPokemons = async () => {
    //        try {
    //            const response = await postService.getMessage(10, 0);  // Fetch 10 Pokémon abilities
    //            const data = JSON.parse(response);
    //            setPokemons(data.results);  // Assuming 'results' contains the Pokémon abilities
    //        } catch (error) {
    //            console.error("Error fetching Pokemons:", error);
    //        }
    //    };
    //    fetchPokemons();
    //}, []);

    //return (
    //    <div>
    //        <h1>Pokemons List</h1>
    //        <table>
    //            <thead>
    //                <tr>
    //                    <th>Name</th>
    //                    <th>URL</th>
    //                </tr>
    //            </thead>
    //            <tbody>
    //                {pokemons.map((pokemon, index) => (
    //                    <tr key={index}>
    //                        <td>{pokemon.name}</td>
    //                        <td>
    //                            <a href={pokemon.url} target="_blank" rel="noopener noreferrer">
    //                                {pokemon.url}
    //                            </a>
    //                        </td>
    //                    </tr>
    //                ))}
    //            </tbody>
    //        </table>
    //    </div>
    //);
}

export const config: RouteConfig = {
    link: {
        label: "Pokemons",
        //icon: CustomIcon,
    },
}

export default CustomPage