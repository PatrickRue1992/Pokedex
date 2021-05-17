import React from "react";

const LeftModalComponent = ({ singlePoke }) => {
  return (
    <>
      <div className="picContainer">
        <div className="id">
          <p>
            {singlePoke.id > 99 ? `#${singlePoke.id}` : `#0${singlePoke.id}`}
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
    </>
  );
};

export default LeftModalComponent;
