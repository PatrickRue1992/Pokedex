import React, { useState, useEffect } from "react";
import SinglePokemon from "./SinglePokemon";
import "./Styles/Pokelist.css";
import { getPokemon, getPokemonData } from "./util/pokemon";
import Modal from "./Modal";
/* import SearchForm from "./SearchForm"; */

const initialUrl = "https://pokeapi.co/api/v2/pokemon";

function Pokelist() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [singlePoke, setSinglePoke] = useState([]);
  const [singlePokeSpecies, setSinglePokeSpecies] = useState([]);
  const [singlePokeEvoChain, setSinglePokeEvoChain] = useState([]);
  const [input, setInput] = useState("");

  let tempId = "";

  const closeModal = () => {
    setShowModal(false);
    setSinglePoke([]);
    setSinglePokeSpecies([]);
  };

  //show Modal and what information to get

  //Functions

  const fetchSinglePoke = async (value) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
    const data = await response.json();
    setSinglePoke(data);

    return data;
  };

  const fetchSpecieData = async (value) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${value}`
    );
    const data = await response.json();
    setSinglePokeSpecies(data);

    return data;
  };

  const fetchEvoData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setSinglePokeEvoChain(data);
    return data;
  };

  const openModal = async (e) => {
    tempId = e.target.dataset.id;
    //fetch detailed information about the pokemon based on its ID

    // Fetch the data by sending two request at once rather than one by one
    const [singlePoke, specieData] = await Promise.all([
      fetchSinglePoke(tempId),
      fetchSpecieData(tempId),
    ]);
    //fetch evo Data with the URL that is is sitting in SpecieData
    const [singlePokeEvoChain] = await Promise.all([
      fetchEvoData(specieData.evolution_chain.url),
    ]);

    setShowModal(true);
  };

  /* handle Submit  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    if (input) {
      setInput(input.toLowerCase());
      const [singlePoke, specieData] = await Promise.all([
        fetchSinglePoke(input),
        fetchSpecieData(input),
      ]);
      //fetch evo Data with the URL that is is sitting in SpecieData
      const [singlePokeEvoChain] = await Promise.all([
        fetchEvoData(specieData.evolution_chain.url),
      ]);

      setShowModal(true);
      setInput("");
      e.target.reset();
    }
  };

  /* End handle Sumbit */

  useEffect(() => {
    async function fetchData() {
      let response = await getPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }

    fetchData();
  }, []);

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemonData(pokemon.url);
        return pokemonRecord;
      })
    );

    setPokemons(_pokemonData);
  };

  //next 20 Pokemon
  const nextPoke = async () => {
    setLoading(true);
    let data = await getPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setShowModal(false);
    setLoading(false);
  };

  // previous 20 Pokemon
  const prevPoke = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setShowModal(false);
    setLoading(false);
  };

  //next Poke in Modal
  const nextModalPoke = async (e) => {
    if (e.currentTarget.dataset.id === 898) return;
    let tempId = parseInt(e.currentTarget.dataset.id) + 1;
    console.log(tempId);
    const [singlePoke, specieData] = await Promise.all([
      fetchSinglePoke(tempId),
      fetchSpecieData(tempId),
    ]);
    //fetch evo Data with the URL that is is sitting in SpecieData
    const [singlePokeEvoChain] = await Promise.all([
      fetchEvoData(specieData.evolution_chain.url),
    ]);
  };

  //prev Poke in Modal
  const prevModalPoke = async (e) => {
    if (e.currentTarget.dataset.id === 1) return;
    let tempId = parseInt(e.currentTarget.dataset.id) - 1;
    console.log(tempId);
    const [singlePoke, specieData] = await Promise.all([
      fetchSinglePoke(tempId),
      fetchSpecieData(tempId),
    ]);
    //fetch evo Data with the URL that is is sitting in SpecieData
    const [singlePokeEvoChain] = await Promise.all([
      fetchEvoData(specieData.evolution_chain.url),
    ]);
  };

  return (
    <>
      <header>
        <p>Pokédex</p>
      </header>
      {loading ? (
        <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Loading...</h1>
      ) : (
        <div className="container">
          <div className="btn-container">
            <button className="btn" onClick={prevPoke}>
              prev
            </button>
            <button className="btn" onClick={nextPoke}>
              next
            </button>
          </div>

          {/* FORM Beginn hier */}
          <div className="form_container">
            <form action="submit" onSubmit={handleSubmit}>
              <input
                className="form"
                type="text"
                name="form"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type ID or Name of Pokémon..."
              />
            </form>
          </div>
          {/* FORM Ende hier */}

          {/* show Modal if state is true */}
          {showModal && (
            <Modal
              singlePoke={singlePoke}
              closeModal={closeModal}
              singlePokeSpecies={singlePokeSpecies}
              singlePokeEvoChain={singlePokeEvoChain}
              openModal={openModal}
              nextModalPoke={nextModalPoke}
              prevModalPoke={prevModalPoke}
            />
          )}

          <div className="Pokemon-Container">
            {pokemons.map((poke) => {
              return (
                <>
                  <SinglePokemon
                    key={poke.id}
                    pokemon={poke}
                    openModal={openModal}
                  />
                </>
              );
            })}
          </div>
          <button className="btn" onClick={prevPoke}>
            prev
          </button>
          <button className="btn" onClick={nextPoke}>
            next
          </button>
        </div>
      )}
    </>
  );
}

export default Pokelist;
