import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      subtitle="Сохранить"
      loadingSubtitle="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onLoading={onLoading}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_link"
          id="avatar"
          type="url"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
          ref={avatarRef}
        />
        <span className="popup__input-error url-avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
