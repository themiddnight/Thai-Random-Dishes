///////////////////////// Variables /////////////////////////
const logo = document.getElementById("logo");
const titleCon = document.getElementById("title-con");
const menuTitle = document.getElementById("title");
const coppiedMsg = document.getElementById("coppiedMsg");
const randomBtn = document.getElementById("randomBtn");
const subtitle = document.getElementById("subtitle");

const settingBtn = document.getElementById("settingBtn");
const settingMenu = document.getElementById("setting-container");
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

let randCount = 0;

///////////////////////// Functions /////////////////////////
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
    // node.offsetWidth = node.offsetWidth;
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
  let menuListCheckboxes = Array.from(
    document.getElementsByClassName("menuList")
  )
    .map((div) => Array.from(div.querySelectorAll("input[type=checkbox]")))
    .flat();
  let someChecked = menuListCheckboxes.some((checkbox) => checkbox.checked);
  if (someChecked) {
    return true;
  } else {
    alert("เลือกซักเมนูนึงก่อนซิ!");
    return false;
  }
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

// generate menu settings list from data
function generateHtmlMenuSettingList(listData, listDivId) {
  let listDiv = document.getElementById(listDivId);
  listData.forEach((item) => {
    if (item.name === "") {
      return;
    }
    let label = document.createElement("label");
    label.classList.add("check-container");
    label.innerHTML = item.name;

    let input = document.createElement("input");
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

    let span = document.createElement("span");
    span.classList.add("checkmark");

    label.appendChild(input);
    label.appendChild(span);
    listDiv.appendChild(label);
  });
}

// toggle category list function
function toggleAllList(listData, listDivId) {
  let checkboxes = Array.from(document.getElementsByClassName(listDivId))
    .map((div) => Array.from(div.querySelectorAll("input[type=checkbox]")))
    .flat();

  let allChecked = checkboxes.every((checkbox) => checkbox.checked);
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

///////////////////////// Event listeners /////////////////////////
// execute random button
randomBtn.addEventListener("click", async () => {
  // update activated list
  menuActiveList = menuData.menuList.filter((data) => data.active === true);
  meatActiveList = menuData.meatList.filter((data) => data.active === true);
  meatProcActiveList = menuData.meatProcList.filter((data) => data.active === true);
  vegActiveList = menuData.vegList.filter((data) => data.active === true);
  topActiveList = menuData.topList.filter((data) => data.active === true);

  // do random interval
  if (checkMenuSelection()) {
    // clear animation class
    clearAnimations([titleCon, logo]);
    titleCon.classList.add("roll");

    let i = 0;
    function intervalRandom() {
      if (i <= 15) {
        setTimeout(() => {
          menuTitle.innerHTML = getRandMenuText();
          i++;
          intervalRandom();
        }, 10 * i * 2);
      } else {
        titleCon.classList.add("pop");
        logo.classList.add("bounce");
        menuTitle.innerHTML = getRandMenuText();
      }
    }
    intervalRandom();

    // subtitle show
    if (randCount >= 10 && randCount <= 30) {
      subtitle.innerHTML = `ไม่ถูกใจ ${randCount} ครั้งแล้ว`;
    } else if (randCount > 30) {
      subtitle.innerHTML = `${randCount} รอบแล้ว.. จะได้กินมั้ยนะ?`;
    }
    randCount++;
  }
});

// click dish title to copy to clipboard
titleCon.addEventListener("click", () => {
  if (randCount > 0) {
    navigator.clipboard.writeText(menuTitle.innerHTML);
    clearAnimations([titleCon, coppiedMsg]);
    setTimeout(() => {
      titleCon.classList.add("squish");
      coppiedMsg.classList.add("showAndHide");
    }, 1);
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

// toggle checkbox in the setting
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
let menuDataLocal = localStorage.getItem("menuData");
if (!menuDataLocal) {
  let menuDataFetch = await (await fetch("/data.json")).json();
  localStorage.setItem("menuData", JSON.stringify(menuDataFetch));
  menuDataLocal = localStorage.getItem("menuData");
}
const menuData = JSON.parse(menuDataLocal);

// generate ingredient setting list from the data
generateHtmlMenuSettingList(menuData.menuList, "menuList");
generateHtmlMenuSettingList(menuData.meatList, "meatList");
generateHtmlMenuSettingList(menuData.meatProcList, "meatProcList");
generateHtmlMenuSettingList(menuData.vegList, "vegList");
generateHtmlMenuSettingList(menuData.topList, "topList");
