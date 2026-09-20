// 1. 가져오기
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

// 2. 상태
let editingBookId = null; // 현재 수정 중인 도서 ID

// 3. 목록 불러오기
async function loadBooks() {
  setLoading(true);

  try {
    const books = await fetchBooks();
    renderBookTable(books);
  } catch (error) {
    console.error(error);
    renderTableError("도서 목록을 불러오는데 실패했습니다.");
  } finally {
    setLoading(false);
  }
}

// 4. 폼 제출 — 등록과 수정을 editingBookId 하나로 가른다
bookForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const bookData = collectBookData();

  const message = validateBook(bookData);
  if (message) {
    showError(message);
    return;
  }

  try {
    if (editingBookId) {
      await apiUpdateBook(editingBookId, bookData);
      showSuccess("도서 정보가 성공적으로 수정되었습니다.");
      editingBookId = null;
    } else {
      await apiCreateBook(bookData);
      showSuccess("도서가 성공적으로 등록되었습니다.");
    }
    resetForm();
    loadBooks();
  } catch (error) {
    console.error("Error:", error);
    showError(
      editingBookId ? "도서 정보 수정에 실패했습니다." : "도서 등록에 실패했습니다.",
    );
  }
});

// 5. 표 클릭 받기 — 이벤트 위임
bookTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "edit") startEdit(id);
  if (action === "delete") removeBook(id);
  if (action === "detail") showDetail(id);
});

// 6. 수정 준비 · 삭제 · 상세
async function startEdit(id) {
  try {
    const book = await fetchBook(id);
    fillForm(book);
    editingBookId = id;
    setEditMode(true);
    scrollToForm();
  } catch (error) {
    console.error("Error:", error);
    showError("도서 정보를 불러오는데 실패했습니다.");
  }
}

async function removeBook(id) {
  if (!confirm("정말로 이 도서를 삭제하시겠습니까?")) return;

  try {
    await apiDeleteBook(id);
    showSuccess("도서가 성공적으로 삭제되었습니다.");
    loadBooks();
  } catch (error) {
    console.error("Error:", error);
    showError("도서 삭제에 실패했습니다.");
  }
}

async function showDetail(id) {
  try {
    const book = await fetchBook(id);
    alert(formatBookDetail(book));
  } catch (error) {
    console.error("Error:", error);
    alert("도서 정보를 불러오는데 실패했습니다.");
  }
}

// 7. 취소 버튼과 시작
cancelButton.addEventListener("click", () => {
  editingBookId = null;
  resetForm();
});

loadBooks();