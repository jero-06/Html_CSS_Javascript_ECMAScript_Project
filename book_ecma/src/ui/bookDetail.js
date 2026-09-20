// 도서 상세 정보를 문자열로 만들어 반환한다 (화면에 어떻게 보여줄지는 부르는 쪽이 정한다)

export function formatBookDetail(book) {
  // 도서 데이터가 없거나 유효하지 않으면 안내 문구로 대체
  if (!book) {
    return "도서 정보를 불러오는데 실패했습니다.";
  }

  // 가격은 천 단위 구분 기호를 붙인다
  const formattedPrice = book.price ? `₩${book.price.toLocaleString()}` : "-";

  // 상세 정보(bookDetail)는 없을 수 있으니 ?.와 ??로 안전하게 참조한다
  const title = book.title || "-";
  const author = book.author || "-";
  const isbn = book.isbn || "-";
  const publishDate = book.publishDate || "-";
  const description = book.bookDetail?.description || "-";
  const language = book.bookDetail?.language || "-";
  const pageCount = book.bookDetail?.pageCount ?? "-";
  const publisher = book.bookDetail?.publisher || "-";
  const edition = book.bookDetail?.edition || "-";
  const coverImageUrl = book.bookDetail?.coverImageUrl || "-";

  return `[도서 상세 정보]
제목: ${title}
저자: ${author}
ISBN: ${isbn}
가격: ${formattedPrice}
출판일: ${publishDate}
설명: ${description}
언어: ${language}
페이지 수: ${pageCount}
출판사: ${publisher}
에디션: ${edition}
표지 이미지: ${coverImageUrl}`;
}