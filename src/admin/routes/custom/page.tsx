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
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});  // Track selected Pokémon checkboxes

    useEffect(() => {
        fetchPokemons();
    }, [offset, limit]);

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

        const handleViewMore = async (name) => {
            try {
                const response = await axios.get(`http://localhost:9000/getby?name=${name}`);
                setSelectedPokemon(response.data);  // Store the Pokémon details
                setShowModal(true);  // Open the modal
            } catch (error) {
                console.error("Error fetching Pokemon details:", error);
            }
        }

    const fetchPokemonDetails = async (name) => {
        try {
            const response = await axios.get(`http://localhost:9000/getby?name=${name}`);
            return response.data; // Pokémon detaylarını döndür
        } catch (error) {
            console.error("Error fetching Pokemon details:", error);
            return null; // Hata durumunda null döndür
        }
    };

    const handleCheckboxChange = async (name) => {
        setSelectedCheckboxes((prev) => {
            const newSelection = {
                ...prev,
                [name]: !prev[name], // Toggle checkbox selection
            };

            // Eğer checkbox işaretlendi ise detayları al
            if (newSelection[name]) {
                fetchPokemonDetails(name).then((details) => {
                    if (details) {
                        setSelectedPokemon(details);  // Store the Pokémon details
                        //setShowModal(true);  // Open the modal
                    }
                });
            }

            return newSelection;
        });
    };

    const handleSave = async () => {
        const selectedPokemons = [];

        for (const name in selectedCheckboxes) {
            if (selectedCheckboxes[name]) {
                const details = await fetchPokemonDetails(name); // Detayları al
                if (details) {
                    selectedPokemons.push({
                        name: details.name,
                        img: details.img,
                        type: details.type
                    });
                }
            }
        }

        try {
            await axios.post("http://localhost:9000/addlist", selectedPokemons);
            alert("Selected Pokémon saved successfully!");
            fetchPokemons();  // Pokémon listesini güncelle
            setSelectedCheckboxes({}); // Checkboxları temizle
        } catch (error) {
            console.error("Error saving selected Pokémon:", error);
            alert("Failed to save selected Pokémon.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 style={{ fontWeight: 'bold' }}>Pokemons List</h1>
            <br />
            <div className="table-container">
                {pokemons.map((pokemon, index) => (
                    <div className="card" key={index}>
                        <input
                            type="checkbox"
                            checked={!!selectedCheckboxes[pokemon.name]}
                            onChange={() => handleCheckboxChange(pokemon.name)}
                        />
                        <h2>{pokemon.name}</h2>
                        <button onClick={() => handleViewMore(pokemon.name)}>View More</button>
                    </div>
                ))}
            </div>

            {/* Kaydet Butonu */}
            <button
                onClick={handleSave}
                style={{
                    marginTop: '20px',
                    backgroundColor: '#007bff', // Buton rengi
                    color: 'white', // Metin rengi
                    padding: '10px 20px', // İçerik boşluğu
                    border: 'none', // Kenar görünümü
                    borderRadius: '5px', // Kenar yuvarlama
                    cursor: 'pointer', // İmleç şekli
                }}
            >
                Save
            </button>

            {/* Pagination Controls */}
            <div className="pagination-controls" style={{ marginTop: '10px' }}>
                <button disabled={offset === 0} onClick={() => setOffset(offset - limit)}>Previous</button>
                <span> Page {Math.ceil(offset / limit) + 1} of {Math.ceil(totalCount / limit)} </span>
                <button disabled={(offset + limit) >= totalCount} onClick={() => setOffset(offset + limit)}>Next</button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        {selectedPokemon ? (
                            <>
                                {/* Resim Solda */}
                                <img
                                    src={selectedPokemon.img || "https://via.placeholder.com/96"}  // Yedek görsel kullan
                                    alt={selectedPokemon.name}
                                />
                                {/* Bilgiler Sağda */}
                                <div className="modal-details">
                                    <h2>{selectedPokemon.name}</h2>
                                    <p><strong>Type:</strong> {selectedPokemon.type || "Unknown"}</p>
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

//import { RouteConfig } from "@medusajs/admin";
//import React, { useState, useEffect } from "react";
//import axios from "axios";
//import './styles.css';

//const CustomPage = () => {
//    const [pokemons, setPokemons] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [offset, setOffset] = useState(0);
//    const [limit, setLimit] = useState(20);
//    const [totalCount, setTotalCount] = useState(0);
//    const [selectedPokemon, setSelectedPokemon] = useState(null);  // To store selected Pokémon details
//    const [showModal, setShowModal] = useState(false);  // To control the modal visibility
//    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});  // Track selected Pokémon checkboxes

//    useEffect(() => {
//        fetchPokemons();
//    }, [offset, limit]);

//    const fetchPokemons = async () => {
//        try {
//            setLoading(true);
//            const response = await axios.get(`http://localhost:9000/get/pokemons?offset=${offset}&limit=${limit}`);
//            setPokemons(response.data.results);
//            setTotalCount(response.data.count);
//            setLoading(false);
//        } catch (error) {
//            console.error("Error fetching Pokemons:", error);
//            setLoading(false);
//        }
//    };

//    const handleViewMore = async (name) => {
//        try {
//            const response = await axios.get(`http://localhost:9000/getby?name=${name}`);
//            setSelectedPokemon(response.data);  // Store the Pokémon details
//            setShowModal(true);  // Open the modal
//        } catch (error) {
//            console.error("Error fetching Pokemon details:", error);
//        }
//    };

//    const handleCloseModal = () => {
//        setShowModal(false);  // Close the modal
//        setSelectedPokemon(null);  // Clear the selected Pokémon data
//    };

//    //const handleCheckboxChange = (name) => {
//    //    setSelectedCheckboxes((prev) => ({
//    //        ...prev,
//    //        [name]: !prev[name], // Toggle checkbox selection
//    //    }));
//    //};

//    const handleCheckboxChange = async (name) => {
//        setSelectedCheckboxes((prev) => {
//            const newSelection = {
//                ...prev,
//                [name]: !prev[name], // Toggle checkbox selection
//            };

//            // Eğer checkbox işaretlendi ise detayları al
//            if (newSelection[name]) {
//                fetchPokemonDetails(name); // Detayları al
//            }

//            return newSelection;
//        });
//    };

//    const fetchPokemonDetails = async (name) => {
//        try {
//            const response = await axios.get(`http://localhost:9000/getby?name=${name}`);
//            setSelectedPokemon(response.data);  // Store the Pokémon details
//            //setShowModal(true);  // Open the modal
//        } catch (error) {
//            console.error("Error fetching Pokemon details:", error);
//        }
//    };

//    const handleSave = async () => {
//        const selectedPokemons = pokemons.filter(pokemon => selectedCheckboxes[pokemon.name]).map(pokemon => ({
//            name: pokemon.name,
//            img: pokemon.img,  // Fallback image
//            type: pokemon.type, // Fallback type
//        }));

//        try {
//            await axios.post("http://localhost:9000/addlist", selectedPokemons);
//            alert("Selected Pokémon saved successfully!");
//            fetchPokemons();  // Pokémon listesini güncelle
//            setSelectedCheckboxes({}); // Checkboxları temizle
//        } catch (error) {
//            console.error("Error saving selected Pokémon:", error);
//            alert("Failed to save selected Pokémon.");
//        }
//    };

//    if (loading) {
//        return <div>Loading...</div>;
//    }

//    return (
//        <div>
//            <h1 style={{ fontWeight: 'bold' }}>Pokemons List</h1>
//            <br />
//            <div className="table-container">
//                {pokemons.map((pokemon, index) => (
//                    <div className="card" key={index}>
//                        <input
//                            type="checkbox"
//                            checked={!!selectedCheckboxes[pokemon.name]}
//                            onChange={() => handleCheckboxChange(pokemon.name)}
//                        />
//                        <h2>{pokemon.name}</h2>
//                        <button onClick={() => handleViewMore(pokemon.name)}>View More</button>
//                    </div>
//                ))}
//            </div>

//            {/* Kaydet Butonu */}
//            <button
//                onClick={handleSave}
//                style={{
//                    marginTop: '20px',
//                    backgroundColor: '#007bff', // Buton rengi
//                    color: 'white', // Metin rengi
//                    padding: '10px 20px', // İçerik boşluğu
//                    border: 'none', // Kenar görünümü
//                    borderRadius: '5px', // Kenar yuvarlama
//                    cursor: 'pointer', // İmleç şekli
//                }}
//            >
//                Kaydet
//            </button>

//            {/* Pagination Controls */}
//            <div className="pagination-controls" style={{ marginTop: '10px' }}>
//                <button disabled={offset === 0} onClick={() => setOffset(offset - limit)}>Previous</button>
//                <span> Page {Math.ceil(offset / limit) + 1} of {Math.ceil(totalCount / limit)} </span>
//                <button disabled={(offset + limit) >= totalCount} onClick={() => setOffset(offset + limit)}>Next</button>
//            </div>

//            {/* Modal */}
//            {showModal && (
//                <div className="modal">
//                    <div className="modal-content">
//                        <span className="close" onClick={handleCloseModal}>&times;</span>
//                        {selectedPokemon ? (
//                            <>
//                                {/* Resim Solda */}
//                                <img
//                                    src={selectedPokemon.img || "https://via.placeholder.com/96"}  // Yedek görsel kullan
//                                    alt={selectedPokemon.name}
//                                />
//                                {/* Bilgiler Sağda */}
//                                <div className="modal-details">
//                                    <h2>{selectedPokemon.name}</h2>
//                                    <p><strong>Type:</strong> {selectedPokemon.type || "Unknown"}</p>
//                                    <p><strong>ID:</strong> {selectedPokemon.id}</p>
//                                </div>
//                            </>
//                        ) : (
//                            <p>Loading...</p>
//                        )}
//                    </div>
//                </div>
//            )}
//        </div>
//    );
//}

//export const config: RouteConfig = {
//    link: {
//        label: "Pokemons",
//    },
//}

//export default CustomPage;

