import successIcon from "../images/SuccessIcon.svg";
import unsuccessIcon from "../images/UnsuccessIcon.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть"
        />
        <img
          src={isSuccess ? successIcon : unsuccessIcon}
          alt={isSuccess ? "Регистрация успешна" : "Ошибка регистрации"}
          className="popup__signup-icon"
        />
        <h3 className="popup__signup">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
