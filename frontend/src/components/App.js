import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

import api from "../utils/api";
import * as auth from "../utils/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(false);
  const [authorizationEmail, setAuthorizationEmail] = useState("");

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupWithConfirmationOpen, setIsPopupWithConfirmationOpen] =
    useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [removedCardId, setRemovedCardId] = useState("");

  const navigate = useNavigate();

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
    auth
      .checkToken(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setAuthorizationEmail(data.email);
        navigate("/");
      })
      .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function openInfoTooltip() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  }
  function handleCardDeleteClick(cardId) {
    setIsPopupWithConfirmationOpen(!isPopupWithConfirmationOpen);
    setRemovedCardId(cardId);
  }

  function handleRegisration(data) {
    return auth
      .register(data)
      .then(() => {
        setIsRegistrationSuccessful(true);
        navigate("/signin");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsRegistrationSuccessful(false);  
      })
      .finally(() => {
        openInfoTooltip();
      })
  }

  function handleAuthorization(data) {
    return auth
      .authorize(data)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        api.getToken(data.token);
        setIsLoggedIn(true);
        setAuthorizationEmail(data.email);
        navigate("/");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        openInfoTooltip();
      })
  }

  useEffect(() => {
    if (isLoggedIn) {
      console.log(localStorage.jwt);
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }
  }, [isLoggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(cardId) {
    setIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(newData) {
    setIsLoading(true);
    api
      .setUserInfo(newData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(newData) {
    setIsLoading(true);
    api
      .setUserAvatar(newData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(newData) {
    setIsLoading(true);
    api
      .addNewCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPopupWithConfirmationOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  };

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signin");
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
          <Header
            loggedIn={isLoggedIn}
            userEmail={authorizationEmail}
            onSignOut={handleSignOut}
          />
          <Routes>
            <Route
              path="/signin"
              element={<Login onLogin={handleAuthorization} />}
            />
            <Route
              path="/signup"
              element={<Register onRegister={handleRegisration} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onWithConfirmation={handleCardDeleteClick}
                  cards={cards}
                />
              }
            />
          </Routes>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}
          />

          <PopupWithConfirmation
            onLoading={isLoading}
            isOpen={isPopupWithConfirmationOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            card={removedCardId}
          />

          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            isSuccess={isRegistrationSuccessful}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
