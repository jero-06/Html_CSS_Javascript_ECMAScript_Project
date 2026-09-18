import { BOOKS_URL } from "../config.js";

export async function fetchBooks() {
  const response = await fetch(BOOKS_URL);

  if (!response.ok) {
    throw new Error('도서 목록을 불러오는데 실패했습니다.');
  }
  return response.json();
}
