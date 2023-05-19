import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onWithConfirmation,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__info">
          <img className="profile__avatar" src={avatar} alt="Аватарка" />
          <button
            onClick={onEditAvatar}
            className="profile__avatar-btn"
          ></button>
          <div className="profile__grid">
            <h1 className="profile__name">{name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-button"
              aria-label="Открыть"
              type="button"
            ></button>
            <p className="profile__about-me">{about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-button button"
          aria-label="Открыть"
        ></button>
      </section>

      <section
        className="elements"
        aria-label="Карточки с интересными местами в России"
      >
        <div className="elements__list">
          {cards.map((card) => {
            return (
              <Card
                onCardClick={onCardClick}
                key={card._id}
                card={card}
                onCardLike={onCardLike}
                onWithConfirmation={onWithConfirmation}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
