import useFormValidation from "../hooks/UseFormValidation";

const Login = ({ onLogin }) => {
  const { enteredValues, errors, handleChange } = useFormValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    if (!enteredValues.email || !enteredValues.password) {
      return;
    }
    onLogin(enteredValues);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form form" onSubmit={handleSubmit} noValidate>
        <label className="auth__field">
          <input
            onChange={handleChange}
            className="auth__input"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={enteredValues.email || ""}
            required
          />
          {errors.name && <span className="auth__error">{errors.email}</span>}
        </label>
        <label className="auth__field">
          <input
            onChange={handleChange}
            className="auth__input"
            id="password"
            type="password"
            name="password"
            placeholder="Пароль"
            value={enteredValues.password || ""}
            required
            minLength="8"
          />
          {errors.about && (
            <span className="auth__error">{errors.password}</span>
          )}
        </label>
        <button className="auth__submit button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
