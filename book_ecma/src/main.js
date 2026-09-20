import "./style.css";
import {
  fetchBooks,
  fetchBook,
  createBook as apiCreateBook,
  updateBook as apiUpdateBook,
  deleteBook as apiDeleteBook,
} from "./api/bookApi.js";
import {
  bookForm,
  collectBookData,
  cancelButton,
  fillForm,
  setEditMode,
  resetForm,
  scrollToForm,
} from "./ui/bookForm.js";
import {
  bookTableBody,
  renderBookTable,
  renderTableError,
} from "./ui/bookTable.js";
import { formatBookDetail } from "./ui/bookDetail.js";

import { validateBook } from "./lib/validation.js";
import { showError, showSuccess, setLoading } from "./ui/message.js";
import { Action } from "../../todolist_react_router/node_modules/react-router/dist/development/chunk-GR4NQCSD";

// 전역 변수
let editingBookId = null; // 현재 수정 중인 도서 ID

// DOM 요소 참조
const bookTableBody = document.getElementById("bookTableBody");
const submitButton = bookForm.querySelector('button[type="submit"]');

// 초기화
document.addEventListener("DOMContentLoaded", function () {
  console.log("페이지 로드 완료");
  loadBooks();
});

// 이벤트 위임
bookTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");

  // 버튼 아닌 공간 클릭 시 액션 X
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  // data-action값에 맞는 함수 호출
  if (action === "edit") {
    editBook(id);
  }

  if (action === "delete") {
    deleteBook(id);
  }

  if (action === "detail") {
    showBookDetail(id);
  }
});

// 폼 제출 이벤트 핸들러
bookForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // 폼 데이터 수집
  const bookData = collectBookData();

  // 유효성 검사
  const message = validateBook(bookData);
  if (message) {
    showError(message);
    return;
  }

  // 수정 모드인지 확인
  if (editingBookId) {
    updateBook(editingBookId, bookData);
  } else {
    createBook(bookData);
  }
});

// 도서 생성 함수
async function createBook(bookData) {
  try {
    await apiCreateBook(bookData);
    showSuccess("도서가 성공적으로 등록되었습니다.");
    bookForm.reset();
    loadBooks(); // 목록 새로고침
  } catch (error) {
    console.error("Error:", error);
    alert("도서 등록에 실패했습니다.");
  }
}

// 도서 목록 로드 함수
async function loadBooks() {
  loadingMessage.style.display = "block"; // 로딩 표시(#loadingMessage) 켜기

  try {
    const books = await fetchBooks(); // fetchBooks() 를 호출해서 기다린다
    renderBookTable(books); // 표 그리는 기존 코드는 그대로 재사용
  } catch (error) {
    console.error(error);
    showError("도서 목록을 불러오는데 실패했습니다.");
  } finally {
    loadingMessage.style.display = "none"; // 로딩 표시 끄기 — 성공하든 실패하든 항상 실행
  }
}

// 도서 테이블 렌더링
function renderBookTable(books) {
  bookTableBody.innerHTML = "";

  books.forEach((book) => {
    const row = document.createElement("tr");

    bookTableBody.appendChild(row);
  });
}

// 도서 삭제 함수
async function deleteBook(bookId) {
  if (!confirm("정말로 이 도서를 삭제하시겠습니까?")) {
    return;
  }

  try {
    await apiDeleteBook(bookId);
    showSuccess("도서가 성공적으로 삭제되었습니다.");
    loadBooks(); // 목록 새로고침
  } catch (error) {
    console.error("Error:", error);
    showError("도서 삭제에 실패했습니다.");
  }
}

// 도서 수정 함수
async function editBook(bookId) {
  try {
    const book = await fetchBook(bookId); // fetchBook을 호출하고 결과를 기다린다

    fillForm(book);
    editingBookId = bookId;
    setEditMode(true);
    scrollToForm();
  } catch (error) {
    console.error("Error:", error);
    showError("도서 정보를 불러오는데 실패했습니다.");
  }
}

// 도서 업데이트 함수
async function updateBook(bookId, bookData) {
  try {
    await apiUpdateBook(bookId, bookData);
    showSuccess("도서 정보가 성공적으로 수정되었습니다.");
    editingBookId = null;
    resetForm();
    loadBooks(); // 목록 새로고침
  } catch (error) {
    console.error("Error:", error);
    showError("도서 정보 수정에 실패했습니다.");
  }
}

// 도서 상세보기 함수
async function showBookDetail(id) {
  try {
    const book = await fetchBookDetailApi(id);
    const detailText = formatBookDetail(book);
    alert(detailText);
  } catch (error) {
    alert("도서 정보를 불러오는데 실패했습니다.");
  }
}

cancelButton.addEventListener("click", () => {
  editingBookId = null;
  resetForm();
});
