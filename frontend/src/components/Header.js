import React from "react";
import { Link, Routes, Route } from "react-router-dom";

import logo from "../images/logo.svg";

function Header({ userEmail, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место-Россия" />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="header__wrapper">
              <span className="header__span">{userEmail}</span>
              <button className="header__sign-out button" onClick={onSignOut}>
                Выйти
              </button>
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <Link className="header__link" to="/signin">
              Войти
            </Link>
          }
        />
        <Route
          path="/signin"
          element={
            <Link className="header__link" to="/signup">
              Регистрация
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
