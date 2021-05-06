import React, { useState, useEffect } from "react";
import "./Styles/Pokelist.css";

function Pokelist() {
  const [list, setList] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [prevPageUrl, setPrevPageUrl] = useState("");

  const nextPage = () => {
    setCurrentPageUrl(nextPageUrl);
  };

  const prevPage = () => {
    setCurrentPageUrl(prevPageUrl);
  };

  //fetch inital Pokemons starting by 1
  const fetchPoke = async (url) => {
    try {
      const response = await fetch(url);
      const pokeList = await response.json();

      setList(pokeList.results);
      setNextPageUrl(pokeList.next);
      setPrevPageUrl(pokeList.previous);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPoke(currentPageUrl);
  }, [currentPageUrl]);

  return (
    <>
      <div className="ListContainer">
        <ul>
          {list.map((poke) => {
            let id = poke.url.split("/");

            return (
              <li key={id[6]}>
                {id[6]}
                <span> {poke.name}</span>
                {/*  {poke.url} */}
              </li>
            );
          })}
        </ul>
        {prevPageUrl ? <button onClick={prevPage}>prev</button> : ""}
        {nextPageUrl ? <button onClick={nextPage}>next</button> : ""}
      </div>
    </>
  );
}

export default Pokelist;
