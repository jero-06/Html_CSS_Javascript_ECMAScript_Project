export const bookTableBody = document.getElementById("bookTableBody");
export function renderBookTable(books = []) {
  bookTableBody.innerHTML = "";

  if (books.length === 0) {
    bookTableBody.appendChild(createMessageRow("등록된 도서가 없습니다."));
    return;
  }

  books.forEach((book) => {
    bookTableBody.appendChild(createBookRow(book));
  });
}

// 목록을 불러오지 못했을 때 표 자리에 오류를 표시한다.
export function renderTableError(
  message = "오류: 데이터를 불러올 수 없습니다.",
) {
  bookTableBody.innerHTML = "";
  bookTableBody.appendChild(createMessageRow(message, "error-row"));
}

export function createBookRow(book) {
  const row = document.createElement("tr");

  // 가격 및 날짜 포맷팅
  const formattedPrice = book.price ? `₩${book.price.toLocaleString()}` : "-";
  const formattedDate = book.publishDate || "-";
  const publisher = book.bookDetail ? book.bookDetail.publisher || "-" : "-";

  row.innerHTML = `
    <td class="cell-tiltle"></td>
    <td class="cell-author"></td>
    <td class="cell-isbn"></td>
    <td>${formattedPrice}</td>
    <td>${formattedDate}</td>
    <td>${publisher}</td>
    <td>
        <button type="button" class="edit-btn" data-action="edit" data-id="${book.id}">수정</button>
        <button type="button" class="delete-btn" data-action="delete" data-id="${book.id}">삭제</button>
        <button type="button" class="detail-btn" data-action="detail" data-id="${book.id}">상세</button>
    </td>
`;
  row.querySelector(".cell-tiltle").textContent = book.title;
  row.querySelector(".cell-author").textContent = book.author;
  row.querySelector(".cell-isbn").textContent = book.isbn;

  return row;
}
function createMessageRow(message, className = "") {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = 7; // 표의 열 개수만큼
  cell.textContent = message;
  if (className) cell.classList.add(className);
  row.appendChild(cell);
  return row;
}