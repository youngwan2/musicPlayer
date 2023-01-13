const prev = document.querySelectorAll("button")[0];
const next = document.querySelectorAll("button")[1];
const body = document.querySelector("body");
const ul = document.querySelector(".nav_btn");
const img = document.querySelector(".img");
const imgBox = document.querySelector(".img_box");
console.log(img);

const background = [
  "linear-gradient(323deg, rgb(0 112 164), rgb(231 224 212))",
  "linear-gradient(204deg, #5b8589, #a4a5ae)",
  "linear-gradient(135deg, #f3c6a0, #54428e)",
  "linear-gradient(61deg, #d6b586, #815336)",
  "linear-gradient(291deg, rgb(18 7 3), rgb(181 13 25))",
  "linear-gradient(239deg, rgb(96 126 122), rgb(255 255 255))",
];

let index = 1;
let totalIndex = 6;

const PREV = () => {
  prev.addEventListener("click", () => {
    if (index > 1) {
      index--;
    }
    render();
    store();
  });
};
PREV();

const NEXT = () => {
  next.addEventListener("click", () => {
    if (index > totalIndex - 1) return 1;
    index++;
    render();
    store();
  });
};
NEXT();

const render = () => {
  let renderHTML = "";
  for (let i = 0; i < totalIndex; i++) {
    renderHTML += `
            <li class = ${index === i + 1 ? "li_color" : "li"} 
                onclick ="shift(${i})"></li>`;
  }
  ul.innerHTML = renderHTML;
};
render();

const shift = (i) => {
  console.log(i + 1);
  index = i + 1;
  store();
};

function store() {
  body.style.background = background[index - 1];
  img.setAttribute("src", `/public/img/iu_${index - 1}.jpg`);
  render();
}

store();

//모바일 환경인지 확인하는 영역
function mobileChk() {
  const mobileKeyWords = new Array(
    "Android",
    "iPhone",
    "iPod",
    "BlackBerry",
    "Windows CE",
    "SAMSUNG",
    "LG",
    "MOT",
    "SonyEricsson"
  );
  for (let info in mobileKeyWords) {
    if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
      return true;
    }
  }
  return false;
}

const touchFun = (event) => {
  // 이벤트 타입에는 타겟에 발생한 이벤트의 이름이 들어 있음

  let type = null;
  let touch = null;
  let endX;

  switch (event.type) {
    case "touchstart":
      type = "mousedown";
      touch = event.changedTouches[0];
      startX = touch.clientX;
      endX = 0;

    case "touchend":
      type = "mouseup";
      touch = event.changedTouches[0];
      endX = touch.clientX;
  }

  let checkX = startX - endX;
  let checkAbs = Math.abs(checkX);

  console.log(startX, endX);
  console.log(checkX);

  if (checkAbs > 100) {
    if (checkX < 0 && index > 1) {
      index--;
      console.log(index);
    } else if (index < totalIndex) index++;
  }

  store();
};

// 모바일인 경우에만 모바일 터치 이벤트 및 함수를 실행시킨다.
if (mobileChk()) {
  imgBox.addEventListener("touchstart", touchFun, false);
  imgBox.addEventListener("touchend", touchFun, false);
}

