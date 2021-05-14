import React from "react";
import "./Styles/Modal.css";
import { AiOutlineClose } from "react-icons/ai";
import typeColors from "./util/typeColors";

function Modal({ closeModal, singlePoke, singlePokeSpecies }) {
  let bioText = singlePokeSpecies.flavor_text_entries[0].flavor_text;
  bioText = bioText.split("").join(" ");
  return (
    <>
      <div className="modalContainer">
        <header>
          <i className="closeIcon" onClick={closeModal}>
            <AiOutlineClose size={60} />
          </i>
        </header>
        <div
          className="ModalContent"
          style={{
            background: `linear-gradient(${
              typeColors[singlePoke.types[0].type.name]
            }, #FFFFFF)`,
          }}
        >
          <div className="picContainer">
            <div className="id">
              <p>
                {" "}
                {singlePoke.id > 99
                  ? `#${singlePoke.id}`
                  : `#0${singlePoke.id}`}
              </p>
            </div>
            <img
              className="modal_img"
              src={singlePoke.sprites.other["official-artwork"].front_default}
              alt=""
            />
            <div className="pokeName">
              <p>{singlePoke.name}</p>
            </div>
          </div>

          {/* start mittlerer sector */}
          <div className="Biography">
            <p>Bio</p>
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

                <p>
                  {singlePoke.abilities.length > 1 ? "Hidden Ability:" : ""}
                </p>
                <p className="test">
                  {singlePoke.abilities.length > 1
                    ? `${singlePoke.abilities[1].ability.name} `
                    : ""}
                </p>
              </div>
            </div>

            <div className="training_container">
              <p>Training</p>
              <div className="training_data">
                <p>Base Exp:</p>
                <p>{singlePoke.base_experience}</p>

                <p>Base Happines:</p>
                <p>{singlePokeSpecies.base_happiness}</p>

                <p>Catch Rate:</p>
                <p>
                  {singlePokeSpecies.capture_rate} (
                  {((singlePokeSpecies.capture_rate / 255) * 100).toFixed(1)}
                  %)
                </p>

                <p>Growth Rate:</p>
                <p>{singlePokeSpecies.growth_rate.name}</p>
              </div>
            </div>
          </div>
          <p>NAME</p>
        </div>
      </div>
    </>
  );
}

export default Modal;
