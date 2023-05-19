import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_zoom-img ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__column">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть"
        ></button>
        <img className="popup__img" src={card.link} alt={card.name} />
        <h2 className="popup__subtitle">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
