import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation({ isOpen, onClose, card, onLoading, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      subtitle="Да"
      loadingSubtitle="Удаление..."
      isOpen={isOpen}
      onClose={onClose}
      onLoading={onLoading}
      onSubmit={handleSubmit}
    />
  );
}
export default PopupWithConfirmation;
