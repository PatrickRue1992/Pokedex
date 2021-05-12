import React from "react";
import "./Styles/Modal.css";
import { AiOutlineClose } from "react-icons/ai";
import typeColors from "./util/typeColors";

function Modal({ closeModal, singlePoke }) {
  return (
    <>
      <div className="modalContainer">
        <header>
          <i className="closeIcon" onClick={closeModal}>
            <AiOutlineClose size={60} />
          </i>
        </header>
        <div className="ModalContent">
          <div
            className="picContainer"
            style={{
              background: `linear-gradient(${
                typeColors[singlePoke.types[0].type.name]
              }, #FFFFFF)`,
            }}
          >
            <div className="id">
              <p>
                {" "}
                {singlePoke.id > 99
                  ? `#${singlePoke.id}`
                  : `#0${singlePoke.id}`}
              </p>
            </div>
            <img
              src={singlePoke.sprites.other["official-artwork"].front_default}
              alt=""
            />
            <div className="pokeName">
              <p>{singlePoke.name}</p>
            </div>
          </div>
          <div className="Biography">
            <p>Bio</p>
            <div className="bio_data">
              <p>
                Height:
                <span>
                  {singlePoke.height / 10}m (
                  {Math.floor(((singlePoke.height / 10) * 39.37) / 12)}&apos;
                  {(((singlePoke.height / 10) * 39.37) % 12).toFixed(1)}
                  &quot;)
                </span>
              </p>
              <p>
                Weight:
                <span>
                  {singlePoke.weight / 10}kg (
                  {((singlePoke.weight / 10) * 2.2).toFixed(1)} lbs)
                </span>
              </p>
              <p>
                Type:{" "}
                <span>
                  {singlePoke.types.length > 1
                    ? `${singlePoke.types[0].type.name} / ${singlePoke.types[1].type.name}`
                    : `${singlePoke.types[0].type.name}`}
                </span>
              </p>
            </div>
          </div>
          <p>NAME</p>
        </div>
      </div>
    </>
  );
}

export default Modal;
