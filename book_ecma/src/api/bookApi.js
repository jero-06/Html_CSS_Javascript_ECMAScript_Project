import { BOOKS_URL, JSON_HEADERS } from "../config.js";

async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    let message = "";

    try {
      const errorData = await response.json();
      message = errorData.message;
    } catch {
      // 서버가 JSON을 안 줬을 수도 있으니 넘어간다
    }

    if (!message) {
      const defaultMessages = {
        400: "입력값을 확인해주세요",
        404: "존재하지 않는 도서입니다.",
        409: "이미 등록된 ISBN입니다.",
        500: "서버 오류가 발생했습니다.",
      };
      message = defaultMessages[response.status] ?? "요청에 실패했습니다.";
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const fetchBooks = () => request(BOOKS_URL);
export const fetchBook = (id) => request(`${BOOKS_URL}/${id}`);
export const createBook = (book) =>
  request(BOOKS_URL, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(book),
  });
export const updateBook = (id, book) =>
  request(`${BOOKS_URL}/${id}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(book),
  });
export const deleteBook = (id) =>
  request(`${BOOKS_URL}/${id}`, {
    method: "DELETE",
    headers: JSON_HEADERS,
  });
