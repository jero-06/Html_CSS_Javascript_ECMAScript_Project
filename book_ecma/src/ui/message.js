const formError = document.getElementById("formError");
const loadingMessage = document.getElementById("loadingMessage");

let successTimeoutId = null;

export function showError(message) {
  ???
  // formError 요소의 textContent를 message로 채운다.
  // 이 메시지는 지우기 전까지 계속 남아있어야 한다 (자동으로 안 사라짐).
}

export function showSuccess(message) {
  ???
  // formError에 message를 채우되(showError와 비슷하게),
  // 3초 뒤에 자동으로 지워지도록 setTimeout을 예약한다.
  //
  // 주의: 만약 이전에 예약해둔 setTimeout이 아직 안 끝났는데 새 메시지가 오면,
  // 그 이전 예약을 clearTimeout으로 먼저 취소해야 한다.
  // (안 그러면 옛 예약이 새 메시지를 지워버릴 수 있다 — 지난 문서 "알아두기" 참고)
}

export function clearMessages() {
  ???
  // formError.textContent를 빈 문자열로 만든다.
}

export function setLoading(isLoading = true) {
  ???
  // isLoading이 true면 loadingMessage를 보이게, false면 숨긴다.
  // (style.display를 "block"/"none"으로)
}