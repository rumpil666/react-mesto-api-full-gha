import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormValidation from "../hooks/UseFormValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { enteredValues, errors, handleChange, isFormValid, resetForm } =
    useFormValidation();

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [resetForm, isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: enteredValues.name,
      about: enteredValues.about,
    });
  }

  return (
    <PopupWithForm
      name="username"
      title="Редактировать профиль"
      subtitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}
      isFormValid={!isFormValid}
      loadingSubtitle="Сохранение..."
    >
      <label className="popup__field">
        <input
          onChange={handleChange}
          className="popup__input popup__input_type_username"
          id="name"
          type="text"
          name="name"
          placeholder="Имя"
          value={enteredValues.name || ""}
          required
          minLength="2"
          maxLength="40"
        />
        {errors.name && (
          <span className="popup__input-error author-input-error">
            {errors.name}
          </span>
        )}
      </label>
      <label className="popup__field">
        <input
          onChange={handleChange}
          className="popup__input popup__input_type_about-me"
          id="about"
          type="text"
          name="about"
          placeholder="О себе"
          value={enteredValues.about || ""}
          required
          minLength="2"
          maxLength="200"
        />
        {errors.about && (
          <span className="popup__input-error about-me-input-error">
            {errors.about}
          </span>
        )}
      </label>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
