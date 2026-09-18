export function validateBook(book) {
  if (!book.title) {
    return "제목을 입력해주세요."   // alert 대신, 그 문구를 그대로 돌려준다
  }

  if (!book.author) {
    return "저자를 입력해주세요.";
  }

  if (!book.isbn) {
    return "ISBN을 입력해주세요.";
  }

  const isbnPattern = /^[0-9X-]+$/;
  if (!isbnPattern.test(book.isbn)) {
    return "올바른 ISBN 형식이 아닙니다. (숫자와 X, -만 허용)";
  }

  if (book.price !== null && book.price < 0) {
    return "가격은 0 이상이어야 합니다.";
  }

  if (book.bookDetail.pageCount !== null && book.bookDetail.pageCount < 0) {
    return "페이지 수는 0 이상이어야 합니다.";
  }

  if (book.bookDetail.coverImageUrl && !isValidUrl(book.bookDetail.coverImageUrl)) {
    return "올바른 이미지 URL 형식이 아닙니다.";
  }

  return "";
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}