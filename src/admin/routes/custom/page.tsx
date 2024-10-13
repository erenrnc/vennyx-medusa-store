import { RouteConfig } from "@medusajs/admin";
import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles.css';

const CustomPage = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState(null);  // To store selected Pokémon details
    const [showModal, setShowModal] = useState(false);  // To control the modal visibility

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:9000/get/pokemons?offset=${offset}&limit=${limit}`);
                setPokemons(response.data.results);
                setTotalCount(response.data.count);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Pokemons:", error);
                setLoading(false);
            }
        };
        fetchPokemons();
    }, [offset, limit]);

    const handleViewMore = async (name) => {
        try {
            const response = await axios.get(`http://localhost:9000/getby?name=${name}`);
            setSelectedPokemon(response.data);  // Store the Pokémon details
            setShowModal(true);  // Open the modal
        } catch (error) {
            console.error("Error fetching Pokemon details:", error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);  // Close the modal
        setSelectedPokemon(null);  // Clear the selected Pokémon data
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 style={{ fontWeight: 'bold' }}>Pokemons List</h1>
            <br/>
            <div className="table-container">
                {pokemons.map((pokemon, index) => (
                    <div className="card" key={index}>
                        <h2>{pokemon.name}</h2>
                        <button onClick={() => handleViewMore(pokemon.name)}>View More</button>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button disabled={offset === 0} onClick={() => setOffset(offset - limit)}>Previous</button>
                <span> Page {Math.ceil(offset / limit) + 1} of {Math.ceil(totalCount / limit)} </span>
                <button disabled={(offset + limit) >= totalCount} onClick={() => setOffset(offset + limit)}>Next</button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        {selectedPokemon ? (
                            <>
                                {/* Resim Solda */}
                                <img
                                    src={selectedPokemon.img || "https://via.placeholder.com/96"}  // Yedek görsel kullan
                                    alt={selectedPokemon.name}
                                />
                                {/* Bilgiler Sa?da */}
                                <div className="modal-details">
                                    <h2>{selectedPokemon.name}</h2>
                                    <p><strong>Type:</strong> {selectedPokemon.type || "Unknown"}</p>  {/* Type yoksa "Unknown" yaz */}
                                    <p><strong>ID:</strong> {selectedPokemon.id}</p>
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}

export const config: RouteConfig = {
    link: {
        label: "Pokemons",
    },
}

export default CustomPage;

