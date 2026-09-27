const app=document.getElementById('app');
const days=['DAY01 10/27 Hilo','DAY02 10/28 Volcano','DAY03 10/29 Kona','DAY04 10/30 Kona','DAY05-A 10/31 Big Island 오전','DAY05-B 10/31 Oahu 오후','DAY06 11/01 Waikiki','DAY07 11/02 Ko Olina','DAY08 11/03 North Shore','DAY09 11/04 East Side','DAY10 11/05 Hanauma Bay','DAY11 11/06 Honolulu'];
app.innerHTML=`
<div class="hero"><h1>🌺 Hawaii Honeymoon</h1><p>2026.10.27–11.06</p><p>Injae ♥ Boyeon</p></div>
<div class="tabs"><button class="tab">📅 일정</button><button class="tab">🎟️ 예약</button><button class="tab">🧳 준비물</button></div>
<div class="card"><h2>📅 날짜별 일정</h2><div class="day-grid">${days.map(d=>`<div class="day">${d}</div>`).join('')}</div><p><button class="add">+ 일정 추가</button></p></div>
<div class="card"><h2>🎟️ 예약</h2><p>V3.1에서 자유 추가/삭제 예정</p></div>
<div class="card"><h2>🧳 준비물</h2><p>V3.1에서 대분류 추가 예정</p></div>`;