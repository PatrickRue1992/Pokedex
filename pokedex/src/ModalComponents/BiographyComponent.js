import React from "react";

const BioGraphyComponent = ({ singlePokeSpecies, singlePoke }) => {
  let bioText = singlePokeSpecies.flavor_text_entries[0].flavor_text;
  bioText = bioText.split("").join(" ");
  return (
    <>
      <div className="bio_data">
        <p className="bio_Text">{bioText}</p>
        <div className="bio_data_container">
          <p>Genus: </p>
          <p>{singlePokeSpecies.genera[7].genus}</p>
          <p>{singlePoke.types.length > 1 ? "Types:" : "Type:"}</p>

          <p>
            {singlePoke.types[0].type.name}

            {singlePoke.types.length > 1
              ? ` / ${singlePoke.types[1].type.name}`
              : ""}
          </p>

          <p>Height: </p>
          <p>
            {singlePoke.height / 10}m (
            {Math.floor(((singlePoke.height / 10) * 39.37) / 12)}&apos;
            {(((singlePoke.height / 10) * 39.37) % 12).toFixed(1)}
            &quot;)
          </p>

          <p>Weight:</p>
          <p>
            {singlePoke.weight / 10}kg (
            {((singlePoke.weight / 10) * 2.2).toFixed(1)} lbs)
          </p>

          <p>Ability:</p>
          <p>{singlePoke.abilities[0].ability.name}</p>

          <p>{singlePoke.abilities.length > 1 ? "Hidden Ability:" : ""}</p>
          <p className="test">
            {singlePoke.abilities.length > 1
              ? `${singlePoke.abilities[1].ability.name} `
              : ""}
          </p>
        </div>
      </div>
    </>
  );
};

export default BioGraphyComponent;
