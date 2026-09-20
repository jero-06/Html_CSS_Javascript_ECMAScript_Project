import { format } from '../../../todolist_react/node_modules/vite/dist/node/chunks/node';
// 도서 상세 정보를 전달받아 화면에 출력할 문자열로 만들어 반환

export function formatBookDetail(book) {
  // 1. 전달받은 도서 ㅓ데이터가 없거나 유효하지 않을 경우 예외
  if (!book) {
    return "도서 정보를 불러오는데 실패했습니다.";
  }

  // 2. 가격 포맷팅 (천 단위 구분 기호)
  const formattedPrice = book.price ? `₩${book.price.toLocaleString()}` : "-";

  // 3.  중첩 객체 안전하게 참조
  const publisher = book.bookDetail?.publisher || "-";
  const description = book.bookDetail?.description || "-";
  const publishDate = book.publishDate || "-";

  return `[도서 상세 정보]
  제목: ${book.title  || "-"}
  저자: ${book.author  || "-"}
  ISBN: ${book.isbn  || "-"}
  가격: ${formattedPrice}
  출판일: ${publishDate}
  설명: ${description}
  언어: ${book.bookDetail.language}
  페이지 수: ${book.bookDetail.pageCount}
  출판사: ${book.bookDetail.publisher}
  에디션: ${book.bookDetail.edition}
  표지 이미지: ${book.bookDetail.coverImageUrl}`;
}
