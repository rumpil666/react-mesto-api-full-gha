import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardClick, card, onCardLike, onWithConfirmation }) {
  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onWithConfirmation(card._id);
  }

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  return (
    <li className="element">
      {isOwn &&
        <button
          className="element__delete"
          onClick={handleDeleteClick}
          type="button"
          aria-label="Удалить"
        />
      }
      <img
        onClick={handleClick}
        className="element__item"
        src={card.link}
        alt={card.name}
      />
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
          ></button>
          <span className="element__likes-number">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
