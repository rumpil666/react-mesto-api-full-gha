const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
}

export const BASE_URL = "https://api.rumpelstilzchen.nomoredomains.monster";

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
};

export const register = ({ email, password }) => {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  })
};

export const authorize = ({ email, password }) => {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  })
};

export const checkToken = (jwt) => {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${jwt}`,
    },
  })
};

