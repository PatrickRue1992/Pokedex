import React, { useState, useEffect } from "react";
import SinglePokemon from "./SinglePokemon";
import "./Styles/Pokelist.css";
import { getPokemon, getPokemonData } from "./util/pokemon";
import Modal from "./Modal";

const initialUrl = "https://pokeapi.co/api/v2/pokemon";

function Pokelist() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [singlePoke, setSinglePoke] = useState([]);

  const closeModal = () => {
    setShowModal(false);
  };

  //show Modal

  const openModal = async (e) => {
    let tempId = e.target.dataset.id;
    //fetch SinglePokemonData für Model
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${tempId}`);
    const data = await response.json();
    setShowModal(true);
    setSinglePoke(data);
  };

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

  //liste voran
  const nextPoke = async () => {
    setLoading(true);
    let data = await getPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setShowModal(false);
    setLoading(false);
  };

  // previous button - liste zurück
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

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemonData(pokemon.url);
        return pokemonRecord;
      })
    );

    setPokemons(_pokemonData);
  };

  return (
    <>
      <header>
        <p>Pokedex</p>
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

          {/* Modal zeigen */}

          {showModal && (
            <Modal singlePoke={singlePoke} closeModal={closeModal} />
          )}

          <div className="Pokemon-Container">
            {pokemons.map((poke, index) => {
              return (
                <>
                  <SinglePokemon
                    key={index}
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
