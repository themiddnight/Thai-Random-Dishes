///////////////////////// Variables /////////////////////////
const logo = document.getElementById("logo");
const titleCon = document.getElementById("title-con");
const menuTitle = document.getElementById("title");
const coppiedMsg = document.getElementById("coppiedMsg");
const randomBtn = document.getElementById("randomBtn");
const subtitle = document.getElementById("subtitle");
const settingBtn = document.getElementById("settingBtn");

const menuListDiv = document.getElementById("menuList");
const meatListDiv = document.getElementById("meatList");

const settingMenu = document.getElementById("setting-container");
const resetBtn = document.getElementById("resetBtn");
const closeBtn = document.getElementById("closeSettingBtn");

const menuSettingToggle = document.getElementById("menuSettingToggle");
const meatSettingToggle = document.getElementById("meatSettingToggle");
const meatProcSettingToggle = document.getElementById("meatProcSettingToggle");
const vegSettingToggle = document.getElementById("vegSettingToggle");
const topSettingToggle = document.getElementById("topSettingToggle");

let menuActiveList = []
let meatActiveList = []
let meatProcActiveList = []
let vegActiveList = []
let topActiveList = []

let menuDataLocal = localStorage.getItem("menuData");
let intervalTimeoutID;
let randCount = 0;

///////////////////////// Functions /////////////////////////
// fetch data from json file and save to localStorage
async function fetchData() {
  const menuDataFetch = await fetch("https://themiddnight.github.io/Thai-Random-Dishes/data.json").then((res) => res.json());
  localStorage.setItem("menuData", JSON.stringify(menuDataFetch));
  return localStorage.getItem("menuData");
}

// add animation class to nodes
// use setTimeout to make sure the class is added after the previous class is removed
function addAnimation(node, animation) {
  setTimeout(() => {
    node.classList.add(animation);
  }, 1);
}

// clear animations
function clearAnimations(nodes) {
  for (let node of nodes) {
    node.classList.remove("roll");
    node.classList.remove("pop");
    node.classList.remove("bounce");
    node.classList.remove("squish");
    node.classList.remove("showAndHide");
    node.classList.remove("slide-in");
    node.classList.remove("slide-out");
  }
}

// random value of a data from array
function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)].value;
}

// get a random dish text
function getRandMenuText() {
  const randMenuValue = randomFromArray(menuActiveList);
  const randMeatValue = randomFromArray(meatActiveList);
  const randMeatProcValue = randomFromArray(meatProcActiveList);
  const randVegValue = randomFromArray(vegActiveList);
  const randTopValue = randomFromArray(topActiveList);

  return randMenuValue
    .replaceAll("[meat]", randMeatValue.replace("[proc]", randMeatProcValue))
    .replaceAll("[veg]", randVegValue)
    .replaceAll("[top]", randTopValue);
}

// alert to select at least one menu
function checkMenuSelection() {
  const menuListCheckboxes = [...menuListDiv.querySelectorAll("input[type=checkbox]")];
  const meatListCheckboxes = [...meatListDiv.querySelectorAll("input[type=checkbox]")];
  const someMenuChecked = menuListCheckboxes.some((checkbox) => checkbox.checked)
  const someMeatChecked = meatListCheckboxes.some((checkbox) => checkbox.checked)
  if (someMenuChecked && someMeatChecked) {
    return true;
  } else {
    alert("เลือกเมนูกับเนื้อซักอย่างนึงก่อนซิ!");
    return false;
  }
}

// generate ingredient checkboxes in setting from data
function generateHtmlMenuSettingList(listData, listDivId) {
  const listDiv = document.getElementById(listDivId);
  listData.forEach((item) => {
    if (item.name === "") {
      return;
    }
    const label = document.createElement("label");
    label.classList.add("check-container");
    label.innerHTML = item.name;

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = item.id;
    input.value = item.name;
    if (item.active) {
      input.checked = true;
    }

    input.addEventListener("click", () => {
      item.active = !item.active;
      localStorage.setItem("menuData", JSON.stringify(menuData));
    });

    const span = document.createElement("span");
    span.classList.add("checkmark");

    label.appendChild(input);
    label.appendChild(span);
    listDiv.appendChild(label);
  });
}

// toggle category checkboxes in setting
function toggleAllList(listData, listDivId) {
  const listDiv = document.getElementById(listDivId);
  const checkboxes = [...listDiv.querySelectorAll("input[type=checkbox]")];

  const allChecked = checkboxes.every((checkbox) => checkbox.checked);
  checkboxes.forEach((checkbox) => {
    if (allChecked) {
      checkbox.checked = false;
      listData.find((data) => data.id === +checkbox.id).active = false;
    } else {
      checkbox.checked = true;
      listData.find((data) => data.id === +checkbox.id).active = true;
    }
  });
  localStorage.setItem("menuData", JSON.stringify(menuData));
}

// close setting menu
// if checkboxes in menuList class are not all unchecked, close setting menu.
function closeSettingMenu() {
  if (checkMenuSelection()) {
    clearAnimations([settingMenu]);
    settingMenu.classList.add("slide-out");
    settingBtn.classList.toggle("hidden");
    setTimeout(() => {
      settingMenu.classList.toggle("hidden");
      clearAnimations([settingMenu]);
    }, 400);
  }
}

///////////////////////// Event listeners /////////////////////////
// execute random button
randomBtn.addEventListener("click", () => {
  // update activated list
  menuActiveList = menuData.menuList.filter((data) => data.active === true);
  meatActiveList = menuData.meatList.filter((data) => data.active === true);
  meatProcActiveList = menuData.meatProcList.filter((data) => data.active === true);
  vegActiveList = menuData.vegList.filter((data) => data.active === true);
  topActiveList = menuData.topList.filter((data) => data.active === true);

  // check if at least one menu and meat are selected
  if (checkMenuSelection()) {
    // clear current interval
    clearInterval(intervalTimeoutID);
    // clear animation class
    clearAnimations([titleCon, logo]);
    addAnimation(titleCon, "roll");
    
    let i = 0;
    function intervalRandom() {
      if (i <= 15) {
        intervalTimeoutID = setTimeout(() => {
          menuTitle.innerHTML = getRandMenuText();
          i++;
          intervalRandom();
        }, 10 * i * 2);
      } else {
        titleCon.classList.add("pop");
        logo.classList.add("bounce");
        menuTitle.innerHTML = getRandMenuText();
        randCount++;
      }
    }
    intervalRandom();
  }

  // subtitle show
  if (randCount >= 10 && randCount <= 30) {
      subtitle.innerHTML = `ไม่ถูกใจ ${randCount} ครั้งแล้ว`;
  } else if (randCount > 30) {
      subtitle.innerHTML = `${randCount} รอบแล้ว.. จะได้กินมั้ยนะ?`;
  }
});

// click dish title to copy to clipboard
titleCon.addEventListener("click", () => {
  if (randCount > 0) {
    navigator.clipboard.writeText(menuTitle.innerHTML);
    clearAnimations([titleCon, coppiedMsg]);
    addAnimation(titleCon, "squish");
    addAnimation(coppiedMsg, "showAndHide");
  }
});

// show setting menu
settingMenu.classList.toggle("hidden");
settingBtn.addEventListener("click", () => {
  clearAnimations([settingMenu]);
  settingMenu.classList.toggle("hidden");
  settingMenu.classList.add("slide-in");
  settingBtn.classList.toggle("hidden");
});

// toggle all checkbox in the setting
menuSettingToggle.addEventListener("click", () =>
  toggleAllList(menuData.menuList, "menuList")
);
meatSettingToggle.addEventListener("click", () =>
  toggleAllList(menuData.meatList, "meatList")
);
meatProcSettingToggle.addEventListener("click", () =>
  toggleAllList(menuData.meatProcList, "meatProcList")
);
vegSettingToggle.addEventListener("click", () =>
  toggleAllList(menuData.vegList, "vegList")
);
topSettingToggle.addEventListener("click", () =>
  toggleAllList(menuData.topList, "topList")
);

// reset all settings
resetBtn.addEventListener("click", async () => {
  if (confirm("คุณต้องการรีเซ็ตการตั้งค่าทั้งหมดใช่หรือไม่?")) {
    menuDataLocal = await fetchData();
    menuData = JSON.parse(menuDataLocal);
    location.reload();
  }
});

// close settings menu by button
closeBtn.addEventListener("click", closeSettingMenu);

// close settings menu by click anywhere out of the menu box
document.addEventListener("click", (e) => {
  if (
    !settingMenu.contains(e.target) &&
    !settingBtn.contains(e.target) &&
    !settingMenu.classList.contains("hidden")
  ) {
    closeSettingMenu();
  }
});

///////////////////////// Start app /////////////////////////
// Load data
// The app will only use modified localStorage data.
// If no localStorage data, copy from app data then use it.
if (!menuDataLocal) {
  menuDataLocal = await fetchData();
}
let menuData = JSON.parse(menuDataLocal);

// generate ingredient setting list from the data
generateHtmlMenuSettingList(menuData.menuList, "menuList");
generateHtmlMenuSettingList(menuData.meatList, "meatList");
generateHtmlMenuSettingList(menuData.meatProcList, "meatProcList");
generateHtmlMenuSettingList(menuData.vegList, "vegList");
generateHtmlMenuSettingList(menuData.topList, "topList");
