import React from "react";

function PopupWithForm({
  name,
  title,
  subtitle,
  isOpen,
  onClose,
  children,
  onSubmit,
  onLoading,
  isFormValid,
  loadingSubtitle,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form form" name={`${name}`} onSubmit={onSubmit}>
          {children}
          <button
            className={`popup__submit button ${
              isFormValid ? "button_inactive" : ""
            }`}
            type="submit"
            disabled={isFormValid}
          >
            {onLoading ? loadingSubtitle : subtitle}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
