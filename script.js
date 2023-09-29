class Menus {
    constructor() {
        this.menuExc = [];

        // initial array for generateHtmlList
        this.meatProcList = ["", "สับ", "กรอบ", "ทอด", "ต้ม",
            "ย่าง", "ย่างเกลือ", "อบ", "เผา"
        ];
        this.meatListObj = {
            "": "", "หมู": "หมู", "ไก่": "ไก่",
            "เนื้อ": "เนื้อ", "ปลา": "ปลา", "กุ้ง": "กุ้ง", "ทะเล": "ทะเล",
            "ปลาหมึก": "ปลาหมึก", "ปู": "ปู", "ปูอัด": "ปูอัด",
            "ใส้กรอก": "ใส้กรอก", "ไข่เยี่ยวม้า": "ไข่เยี่ยวม้า"
        };
        this.meatList = Object.keys(this.meatListObj);
        this.vegList = ["", "คะน้า", "ผักบุ้ง", "ผักรวม", "แครอท",
            "กะหล่ำปลี", "บล็อคโคลี่", "ผักกาด"];
        this.topList = ["", "ไข่เจียว", "ไข่ดาว", "ไข่ข้น", "ไข่เค็ม"];
        this.menuList = ["ข้าวผัด", "ทอดกระเทียม", "ทอดน้ำปลา",
            "ผัดน้ำมันหอย", "คั่วพริกเกลือ", "กระเพรา", "ข้าวไข่",
            "ผัดเผ็ด", "ผัดพริกแกง", "ผัดผงกะหรี่"
        ]
    }

    randomArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    randomObj(obj, exclude) {
        const keys = Object.keys(obj).filter(key => !exclude.includes(key));
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomKey = keys[randomIndex];
        return obj[randomKey];
    }

    getRandProc() {
        let proc;
        do {
            proc = this.randomArray(this.meatProcList);
        } while (this.menuExc.includes(proc));
        return proc;
    }

    getRandIngredient() {
        let meat, veg, top;

        // re-random proc
        const proc = this.getRandProc()
        this.meatListObj = {
            "": "",
            "หมู": "หมู" + proc,
            "ไก่": "ไก่" + proc,
            "เนื้อ": "เนื้อ" + proc,
            "ปลา": "ปลา" + proc,
            "กุ้ง": "กุ้ง" + proc,
            "ทะเล": "ทะเล",
            "ปลาหมึก": "ปลาหมึก",
            "ปู": "ปู",
            "ปูอัด": "ปูอัด",
            "ใส้กรอก": "ใส้กรอก",
            "ไข่เยี่ยวม้า": "ไข่เยี่ยวม้า"
        };
        this.meatList = Object.keys(this.meatListObj);
        meat = this.randomObj(this.meatListObj, this.menuExc);

        do {
            veg = this.randomArray(this.vegList);
        } while (this.menuExc.includes(veg));
        do {
            top = this.randomArray(this.topList);
        } while (this.menuExc.includes(top));
        return [meat, veg, top];
    }

    getMenu() {
        const [meat, veg, top] = this.getRandIngredient();
        this.menusObj = {
            "ข้าวผัด": `ข้าวผัด${meat}${veg}${top}`,
            "ทอดกระเทียม": `${meat}ทอดกระเทียม${top}`,
            "ทอดน้ำปลา": `${meat}ทอดน้ำปลา${top}`,
            "ผัดน้ำมันหอย": `ผัด${veg}${meat}น้ำมันหอย${top}`,
            "คั่วพริกเกลือ": `${meat}คั่วพริกเกลือ${top}`,
            "กระเพรา": `กระเพรา${meat}${top}`,
            "ข้าวไข่": `ข้าว${top}${meat}${veg}`,
            "ผัดเผ็ด": `${meat}ผัดเผ็ด${top}`,
            "ผัดพริกแกง": `${meat}ผัดพริกแกง${top}`,
            "ผัดผงกะหรี่": `${meat}ผัดผงกะหรี่${top}`
        };
        return this.randomObj(this.menusObj, this.menuExc);
    }
}

const menus = new Menus();

////////////////////// generate setting menu in html /////////////////////

// read local storage. 
const menuExc = localStorage.getItem("menuExc");
// if the name is true, add the name to menuExc. 
// if local storage is empty, set menuExc to empty array
menuExc ? menus.menuExc = menuExc.split(",") : menus.menuExc = [];

function generateHtmlList(list, listDivId) {
    let listDiv = document.getElementById(listDivId);
    list.forEach(menu => {
        if (menu === "") {
            return;
        }
        let label = document.createElement("label");
        label.classList.add("check-container");
        label.innerHTML = menu;

        let input = document.createElement("input");
        input.type = "checkbox";
        input.value = menu;
        if (!menus.menuExc.includes(menu)) {
            input.checked = true;
        }

        input.addEventListener("click", () => {
            // update menuExc
            menus.menuExc = getCheckedMenu(menuListCheckbox);
            // update localStorage
            localStorage.setItem("menuExc", menus.menuExc);
        });

        let span = document.createElement("span");
        span.classList.add("checkmark");

        label.appendChild(input);
        label.appendChild(span);
        listDiv.appendChild(label);
    });
}

generateHtmlList(menus.menuList, "menuList");
generateHtmlList(menus.meatList, "meatList");
generateHtmlList(menus.meatProcList, "meatProcList");
generateHtmlList(menus.vegList, "vegList");
generateHtmlList(menus.topList, "topList");

// get all of checkbox in setting-container (after generateHtmlList) 
const checkboxesList = document.getElementById("setting-container")
    .querySelectorAll("input[type=checkbox]");
const menuListCheckbox = Array.from(checkboxesList);

// get all of the value of checkboxs that get checked in ListDiv
function getCheckedMenu(checkboxes) {
    let unchecked = [];
    checkboxes.forEach(checkbox => {
        !checkbox.checked ? unchecked.push(checkbox.value) : null;
    });
    return unchecked;
}

////////////// alert to select at least one menu //////////////

function checktMenuSelection() {
    let menuListCheckboxes = Array.from(document.getElementsByClassName("menuList"))
        .map(div => Array.from(div.querySelectorAll("input[type=checkbox]")))
        .flat();
    let someChecked = menuListCheckboxes.some(checkbox => checkbox.checked);
    if (someChecked) {
        return true;
    } else {
        alert("เลือกซักเมนูนึงก่อนซิ!");
        return false;
    }
}

///////////////////////// clear animations /////////////////////////

function clearAnimations(nodes) {
    for (let node of nodes) {
        node.classList.remove("roll");
        node.classList.remove("pop");
        node.classList.remove("bounce");
        node.classList.remove("squish");
        node.classList.remove("showAndHide");
        node.classList.remove("slide-in");
        node.classList.remove("slide-out");
        node.offsetWidth = node.offsetWidth;
    }
}

//////////////////////// do random menu ////////////////////////

function setMenuTx() {
    return new Promise((resolve) => {
        let count = 0;
        let interval = 70;
        let menuTitle = document.getElementById("title");
        function executeLoop() {
            menuTitle.innerHTML = menus.getMenu();
            count++;
            if (count >= 15) {
                resolve();
            } else {
                interval *= 1.1;
                setTimeout(executeLoop, interval);
            }
        } executeLoop();
    });
}

////// press button - do random menu
const logo = document.getElementById("logo");
const titleCon = document.getElementById("title-con");
const getMenuBtn = document.getElementById("getMenuBtn");
const subtitle = document.getElementById("subtitle");
var randCount = 0;

getMenuBtn.addEventListener("click", async () => {
    if (checktMenuSelection()) {
        // clear animation class
        clearAnimations([titleCon, logo]);
        titleCon.classList.add("roll");
        await setMenuTx();
        titleCon.classList.add("pop");
        logo.classList.add("bounce");

        // subtitle show
        if (randCount >= 10 && randCount <= 30) {
            subtitle.innerHTML = `ไม่ถูกใจ ${randCount} ครั้งแล้ว`;
        }
        else if (randCount > 30) {
            subtitle.innerHTML = `${randCount} รอบแล้ว.. จะได้กินมั้ยนะ?`;
        }
        randCount++;
    }
});

//////////////////////// copy menu ////////////////////////

// copy menu to clipboard
function copyClipboard() {
    if (randCount > 0) {
        let menu = document.getElementById("title").innerHTML;
        let coppiedMsg = document.getElementById("coppiedMsg");
        navigator.clipboard.writeText(menu);
        clearAnimations([titleCon, coppiedMsg]);
        // squish title
        titleCon.classList.add("squish");
        // show coppiedMsg
        coppiedMsg.classList.add("showAndHide");
    }
};

//////////////////////// show setting menu ////////////////////////

// show setting menu
const settingBtn = document.getElementById("settingBtn");
const settingMenu = document.getElementById("setting-container");
settingMenu.classList.toggle("hidden");
settingBtn.addEventListener("click", () => {
    clearAnimations([settingMenu]);
    settingMenu.classList.toggle("hidden");
    settingMenu.classList.add("slide-in");
    settingBtn.classList.toggle("hidden");
});

function closeSettingMenu() {
    // if checkboxes in menuList class are not all unchecked, close setting menu.
    if (checktMenuSelection()) {
        clearAnimations([settingMenu]);
        settingMenu.classList.add("slide-out");
        settingBtn.classList.toggle("hidden");
        setTimeout(() => {
            settingMenu.classList.toggle("hidden");
        }, 400);
    }
};

// close setting menu - button
const closeBtn = document.getElementById("closeSettingBtn");
closeBtn.addEventListener("click", closeSettingMenu);

// close setting menu - click anywhere except settingMenu
document.addEventListener("click", (e) => {
    if (!settingMenu.contains(e.target)
        && !settingBtn.contains(e.target)
        && !settingMenu.classList.contains("hidden")) {
        closeSettingMenu();
    }
});

//////////////////////// setting select/deselect all ////////////////////////

// pass the div class name: menuList, meatList, meatProcList, vegList, topList
// if checkboxes in the div are all checked, uncheck all.
// else check all.
function selectAll(divClassName) {
    let checkboxes = Array.from(document.getElementsByClassName(divClassName))
        .map(div => Array.from(div.querySelectorAll("input[type=checkbox]")))
        .flat();

    let allChecked = checkboxes.every(checkbox => checkbox.checked);
    checkboxes.forEach(checkbox => {
        allChecked ? checkbox.checked = false : checkbox.checked = true;
    });

    // update menuExc
    menus.menuExc = getCheckedMenu(menuListCheckbox);
    // update localStorage
    localStorage.setItem("menuExc", menus.menuExc);
}