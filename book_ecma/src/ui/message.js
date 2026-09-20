const formError = document.getElementById("formError");
const loadingMessage = document.getElementById("loadingMessage");

let successTimeoutId = null;

export function showError(message) {
  if (successTimeoutId) {
    clearTimeout(successTimeoutId);
    successTimeoutId = null;
  }
  formError.textContent = message;
}

export function showSuccess(message) {
  formError.textContent = message;

  if (successTimeoutId) {
    clearTimeout(successTimeoutId);
  }

  successTimeoutId = setTimeout(() => {
    clearMessages();
  }, 3000);
}

export function clearMessages() {
  formError.textContent = "";
}

export function setLoading(isLoading = true) {
  if (isLoading) {
    loadingMessage.style.display = "block";
  } else {
    loadingMessage.style.display = "none";
  }
}
