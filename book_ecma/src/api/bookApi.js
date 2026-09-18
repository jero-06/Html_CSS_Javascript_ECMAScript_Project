import { BOOKS_URL } from "../config.js";

export async function fetchBooks() {
  const response = await fetch(BOOKS_URL);

  if (!response.ok) {
    throw new Error("도서 목록을 불러오는데 실패했습니다.");
  }
  return response.json();
}

async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    let message = "";

    try {
      const errorData = await response.json();
      message = errorData.message;
    } catch {
      // 서버가 JSON을 안 줬을 수도 있으니 그냥 넘어간다
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
