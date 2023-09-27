class Menus {
    constructor() {
        this.menuExc = [];
        this.meatProcExc = [];
        this.meatExc = [];
        this.vegExc = [];
        this.topExc = [];

        this.meatProcList = ["", "สับ", "กรอบ", "ทอด", "ต้ม",
            "ย่าง", "ย่างเกลือ", "อบ", "เผา"];
        const proc = this.getRandProc()
        this.meatListObj = {
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
        this.vegList = ["", "คะน้า", "ผักบุ้ง", "ผักรวม", "แครอท",
            "กะหล่ำปลี", "บล็อคโคลี่", "ผักกาด"];
        this.topList = ["", "ไข่เจียว", "ไข่ดาว", "ไข่ข้น", "ไข่เค็ม"];
        this.menuList = [
            "ข้าวผัด",
            "ทอดกระเทียม",
            "ทอดน้ำปลา",
            "ผัดน้ำมันหอย",
            "คั่วพริกเกลือ",
            "กระเพรา",
            "ข้าวไข่",
            "ผัดเผ็ด",
            "ผัดพริกแกง",
            "ผัดผงกะหรี่"
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
        } while (this.meatProcExc.includes(proc));
        return proc;
    }

    getRandIngredient() {
        let meat, veg, top;
        meat = this.randomObj(this.meatListObj, this.meatExc);
        do {
            veg = this.randomArray(this.vegList);
        } while (this.vegExc.includes(veg));
        do {
            top = this.randomArray(this.topList);
        } while (this.topExc.includes(top));
        return [meat, veg, top];
    }

    getMenu() {
        const [, veg, top] = this.getRandIngredient();
        // re-random proc
        const proc = this.getRandProc()
        this.meatListObj = {
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
        const meat = this.randomObj(this.meatListObj, this.meatExc);

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

//////////////////////// generate setting menu in html ////////////////////////

function generateHtmlList(list, listDivId) {
    if (list.includes("")) {
        list.splice(list.indexOf(""), 1);
    }
    const listDiv = document.getElementById(listDivId);
    list.forEach(menu => {
        const label = document.createElement("label");
        label.classList.add("check-container");
        label.innerHTML = `${menu}<input type="checkbox" value="${menu}" checked>
                            <span class="checkmark"></span>`;
        listDiv.appendChild(label);
    });
    listDiv.querySelectorAll("input[type=checkbox]")
    .forEach(checkbox => {
        checkbox.addEventListener("click", addExcludeItems);
    });
}

generateHtmlList(menus.menuList, "menuList");
generateHtmlList(menus.meatList, "meatList");
generateHtmlList(menus.meatProcList, "meatProcList");
generateHtmlList(menus.vegList, "vegList");
generateHtmlList(menus.topList, "topList");

// get all of checkbox in each ListDiv
const menuListCheckbox = document.getElementById("menuList")
.querySelectorAll("input[type=checkbox]");
const meatListCheckbox = document.getElementById("meatList")
.querySelectorAll("input[type=checkbox]");
const meatProcListCheckbox = document.getElementById("meatProcList")
.querySelectorAll("input[type=checkbox]");
const vegListCheckbox = document.getElementById("vegList")
.querySelectorAll("input[type=checkbox]");
const topListCheckbox = document.getElementById("topList")
.querySelectorAll("input[type=checkbox]");

// get all of the value of checkboxs that get checked in ListDiv
function getCheckedMenu(checkboxes) {
    const unchecked = [];
    checkboxes.forEach(checkbox => {
        if (!checkbox.checked) {
            unchecked.push(checkbox.value);
        }
    });
    return unchecked;
}

function addExcludeItems() {
    menus.menuExc = [];
    menus.meatProcExc = [];
    menus.meatExc = [];
    menus.vegExc = [];
    menus.topExc = [];
    menus.menuExc = getCheckedMenu(menuListCheckbox);
    menus.meatProcExc = getCheckedMenu(meatProcListCheckbox);
    menus.meatExc = getCheckedMenu(meatListCheckbox);
    menus.vegExc = getCheckedMenu(vegListCheckbox);
    menus.topExc = getCheckedMenu(topListCheckbox);
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

function popMenuTitleCon() {
    const menuTitleCon = document.getElementById("title-con");
    if (menuTitleCon.classList.contains("pop")) {
        menuTitleCon.classList.remove("pop");
    }
    menuTitleCon.offsetWidth = menuTitleCon.offsetWidth;
    menuTitleCon.classList.add("pop");
}

function bouncLogo() {
    const logo = document.getElementById("logo");
    if (logo.classList.contains("bounce")) {
        logo.classList.remove("bounce");
    }
    logo.offsetWidth = logo.offsetWidth;
    logo.classList.add("bounce");
}

////// press button - do random menu
const getMenuBtn = document.getElementById("getMenuBtn");
let randCount = 0;
getMenuBtn.addEventListener("click", async () => {
    await setMenuTx();
    popMenuTitleCon();
    bouncLogo();
    randCount++;

    // subtitle show
    const subtitle = document.getElementById("subtitle");
    if (randCount >= 10 && randCount <= 30) {
        subtitle.innerHTML = `ไม่ถูกใจ ${randCount} ครั้งแล้ว`;
    }
    else if (randCount > 30) {
        subtitle.innerHTML = `${randCount} รอบแล้ว.. จะได้กินมั้ยนะ?`;
    }
});

//////////////////////// setting menu ////////////////////////

// show setting menu
const settingBtn = document.getElementById("settingBtn");
const settingMenu = document.getElementById("setting-container");
settingBtn.addEventListener("click", () => {
    settingMenu.classList.toggle("hidden");
    if (settingMenu.classList.contains("slide-out")) {
        settingMenu.classList.remove("slide-out");
    }
    settingMenu.offsetWidth = settingMenu.offsetWidth;
    settingMenu.classList.add("slide-in");
});

// close setting menu
const closeBtn = document.getElementById("closeSettingBtn");
closeBtn.addEventListener("click", () => {
    if (settingMenu.classList.contains("slide-in")) {
        settingMenu.classList.remove("slide-in");
    }
    settingMenu.offsetWidth = settingMenu.offsetWidth;
    settingMenu.classList.add("slide-out");
    setTimeout(() => {
        settingMenu.classList.toggle("hidden");
    }, 400);
});