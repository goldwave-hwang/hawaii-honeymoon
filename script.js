// ================================
// Hawaii Honeymoon Planner V3.2
// 예약 탭 자유 추가 / 수정 / 삭제
// ================================

const STORAGE_KEY = "hawaii_booking_v1";

let bookings = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { title: "✈️ 항공권", content: "" },
  { title: "🚗 Hertz 렌트카", content: "" }
];

const app = document.getElementById("app");

function saveBookings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function render() {
  app.innerHTML = `
    <div class="hero">
      <h1>🌺 Hawaii Honeymoon Planner</h1>
      <p>2026.10.27 - 11.06</p>
      <p>Injae ♥ Boyeon</p>
    </div>

    <div class="tabs">
      <button class="tab">📅 일정</button>
      <button class="tab active">🎟️ 예약</button>
      <button class="tab">🧳 준비물</button>
    </div>

    <div class="container">
      <div class="card">
        <h2>🎟️ 예약 정보</h2>
        <p>주제와 내용을 자유롭게 입력하세요.</p>

        <div id="booking-list"></div>

        <button class="add" id="addBooking">➕ 새 예약 주제 추가</button>
      </div>
    </div>
  `;

  const list = document.getElementById("booking-list");

  bookings.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <input
        class="titleInput"
        data-index="${index}"
        value="${item.title}"
        placeholder="주제 입력"
      >

      <textarea
        class="contentInput"
        data-index="${index}"
        rows="4"
        placeholder="예약번호 / 시간 / 주소 / 메모 입력"
      >${item.content}</textarea>

      <button class="deleteBtn" data-index="${index}">
        🗑️ 삭제
      </button>
    `;

    list.appendChild(card);
  });

  document.querySelectorAll(".titleInput").forEach(input => {
    input.addEventListener("input", e => {
      bookings[e.target.dataset.index].title = e.target.value;
      saveBookings();
    });
  });

  document.querySelectorAll(".contentInput").forEach(textarea => {
    textarea.addEventListener("input", e => {
      bookings[e.target.dataset.index].content = e.target.value;
      saveBookings();
    });
  });

  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = Number(e.target.dataset.index);

      if (!confirm("이 예약을 삭제할까요?")) return;

      bookings.splice(idx, 1);
      saveBookings();
      render();
    });
  });

  document.getElementById("addBooking").addEventListener("click", () => {
    bookings.push({
      title: "🆕 새 예약",
      content: ""
    });

    saveBookings();
    render();
  });
}

render();

// ===============================
// 탭 전환 복구 (V3.2 Fix)
// ===============================

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {

    // 버튼 active 변경
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // 페이지 숨기기
    document.querySelectorAll(".page, .section").forEach(page => {
      page.classList.remove("active");
    });

    // data-tab 값에 맞는 페이지 열기
    const target = tab.dataset.tab;
    const page = document.getElementById(target);

    if (page) page.classList.add("active");
  });
});
