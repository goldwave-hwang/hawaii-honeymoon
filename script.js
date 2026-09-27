
const days=[
["10/27 (화)","Hilo"],["10/28 (수)","Volcano"],["10/29 (목)","Kona"],
["10/30 (금)","Kona"],["10/31 AM","Big Island"],["10/31 PM","Oahu"],
["11/01 (일)","Waikiki"],["11/02 (월)","Ko Olina"],["11/03 (화)","North Shore"],
["11/04 (수)","East Side"],["11/05 (목)","Hanauma Bay"],["11/06 (금)","Honolulu"]
];

let booking=JSON.parse(localStorage.getItem("booking")||"[]");
let packing=JSON.parse(localStorage.getItem("packing")||"[]");

document.getElementById("app").innerHTML=`
<div class=tabs>
<button class="tab active" data=t1>📅 일정</button>
<button class=tab data=t2>🎟️ 예약</button>
<button class=tab data=t3>🧳 준비물</button>
</div>
<div id=t1 class="page active">
<div class=day-grid>${days.map((d,i)=>`<div class=day><b>DAY ${String(i+1).padStart(2,"0")}</b><br>${d[0]}<br>${d[1]}</div>`).join("")}</div>
</div>
<div id=t2 class=page>
<div id=bookingList></div>
<button class=add id=addBooking>+ 예약 주제 추가</button>
</div>
<div id=t3 class=page>
<div id=packingList></div>
<button class=add id=addGroup>+ 준비물 대분류 추가</button>
</div>`;

document.querySelectorAll(".tab").forEach(b=>{
 b.onclick=()=>{
   document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
   document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
   b.classList.add("active");
   document.getElementById(b.dataset.t).classList.add("active");
 };
});

function save(){localStorage.setItem("booking",JSON.stringify(booking));localStorage.setItem("packing",JSON.stringify(packing));}

function drawBooking(){
 const box=document.getElementById("bookingList"); box.innerHTML="";
 booking.forEach((b,i)=>{
  const c=document.createElement("div"); c.className="card";
  c.innerHTML=`<input value="${b.title}"><textarea>${b.memo}</textarea><button class=add>삭제</button>`;
  c.querySelector("input").oninput=e=>{booking[i].title=e.target.value;save();}
  c.querySelector("textarea").oninput=e=>{booking[i].memo=e.target.value;save();}
  c.querySelector("button").onclick=()=>{booking.splice(i,1);save();drawBooking();}
  box.appendChild(c);
 });
}

function drawPacking(){
 const box=document.getElementById("packingList"); box.innerHTML="";
 packing.forEach((g,i)=>{
  const c=document.createElement("div"); c.className="card";
  c.innerHTML=`<input value="${g.name}"><div class=items></div><button class=add>+ 준비물 추가</button>`;
  const items=c.querySelector(".items");
  g.items.forEach((it,j)=>{
    const row=document.createElement("div"); row.className="todo";
    row.innerHTML=`<input type=checkbox ${it.done?"checked":""}><input type=text value="${it.text}"><button>❌</button>`;
    row.children[0].onchange=e=>{it.done=e.target.checked;save();}
    row.children[1].oninput=e=>{it.text=e.target.value;save();}
    row.children[2].onclick=()=>{g.items.splice(j,1);save();drawPacking();}
    items.appendChild(row);
  });
  c.querySelector("input").oninput=e=>{g.name=e.target.value;save();}
  c.querySelector(".add").onclick=()=>{g.items.push({text:"새 준비물",done:false});save();drawPacking();}
  box.appendChild(c);
 });
}

document.getElementById("addBooking").onclick=()=>{booking.push({title:"새 예약",memo:""});save();drawBooking();}
document.getElementById("addGroup").onclick=()=>{packing.push({name:"새 대분류",items:[]});save();drawPacking();}

drawBooking(); drawPacking();
