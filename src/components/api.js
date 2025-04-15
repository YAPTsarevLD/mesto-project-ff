// Конфиг
const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-mag-4",
  headers: {
    authorization: "099f17f1-5636-4e5c-9759-d880f974285e",
    "Content-Type": "application/json",
  },
};

// Универсальная функция запроса
function request(endpoint, options = {}) {
  const url = `${config.baseUrl}${endpoint}`;
  options.headers = config.headers;

  return fetch(url, options).then(checkResponse);
}

// Проверка ответа сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Получение данных профиля пользователя
export const getUserInfo = () => request("/users/me");

// Получение карточек
export const getInitialCards = () => request("/cards");

// Обновление профиля
export const updateProfile = (name, about) => {
  return request("/users/me", {
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};

// Добавление новой карточки
export const addNewCard = (name, link) => {
  return request("/cards", {
    method: "POST",
    body: JSON.stringify({ name, link }),
  });
};

// Удаление карточки
export const deleteCard = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: "DELETE",
  });
};

// Постановка лайка
export const likeCard = (cardId) => {
  return request(`/cards/${cardId}/likes`, {
    method: "PUT",
  });
};

// Снятие лайка
export const unlikeCard = (cardId) => {
  return request(`/cards/${cardId}/likes`, {
    method: "DELETE",
  });
};

// Обновление аватара
export const updateAvatar = (avatar) => {
  return request("/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify({ avatar }),
  });
};

export const getCardLikeStatus = (cardId, userId) => {
  return request(`/cards/${cardId}`).then((card) => {
    return card.likes.some((like) => like._id === userId);
  });
};
