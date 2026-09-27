// ========================================
// Hawaii Honeymoon Planner - Recovery V1
// (기존 사이트 복구 버전)
// ========================================

const tabs = document.querySelectorAll(".tab");
const pages = document.querySelectorAll(".section, .page");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    pages.forEach(p => p.classList.remove("active"));

    tab.classList.add("active");

    const target = tab.dataset.tab;
    const page = document.getElementById(target);

    if (page) page.classList.add("active");
  });
});

// ---------- 메모 자동 저장 ----------
document.querySelectorAll("textarea").forEach(area => {
  const key = "memo_" + (area.id || Math.random());

  if (localStorage.getItem(key)) {
    area.value = localStorage.getItem(key);
  }

  area.addEventListener("input", () => {
    localStorage.setItem(key, area.value);
  });
});

// ---------- 준비물 체크 저장 ----------
document.querySelectorAll('input[type="checkbox"]').forEach(box => {
  const key = "check_" + (box.id || box.value || Math.random());

  const saved = localStorage.getItem(key);
  if (saved === "true") box.checked = true;

  box.addEventListener("change", () => {
    localStorage.setItem(key, box.checked);
  });
});

console.log("🌺 Hawaii Honeymoon Recovery Loaded");
