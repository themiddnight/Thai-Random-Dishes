function getMeatIng() {
    const meatProc = ["", "สับ", "กรอบ", "ทอด", "ต้ม", "ย่าง", "ย่างเกลือ", "อบ", "เผา"];
    let proc = meatProc[Math.floor(Math.random() * meatProc.length)];
    const meatIng = [
        "หมู" + proc, "ไก่" + proc, "เนื้อ" + proc,
        "ปลา", "ทะเล", "กุ้ง", "ปลาหมึก", "ปู", "ปูอัด", "ใส้กรอก", "ไข่เยี่ยวม้า"
    ];
    return meatIng[Math.floor(Math.random() * meatIng.length)];
}
function getVegIng() {
    const vegIng = ["คะน้า", "ผักบุ้ง", "ผักรวม", "แครอท", "กะหล่ำปลี", "บล็อคโคลี่", "ผักกาด"];
    return vegIng[Math.floor(Math.random() * vegIng.length)];
}
function getTopping() {
    const topping = ["", "ไข่เจียว", "ไข่ดาว", "ไข่ข้น", "ไข่ต้ม", "ไข่เค็ม", "ไข่เยี่ยวม้า"];
    return topping[Math.floor(Math.random() * topping.length)];
}
function getMenu() {
    let meat = getMeatIng();
    let veg = getVegIng();
    let top = getTopping(); let menus = [
        `ข้าวผัด${meat}${top}`,
        `ข้าวผัด${meat}${veg}${top}`,
        `${meat}ทอดกระเทียม${top}`,
        `${meat}ทอดน้ำปลา${top}`,
        `ผัด${veg}${meat}น้ำมันหอย${top}`,
        `${meat}คั่วพริกเกลือ${top}`,
        `กระเพรา${meat}${top}`,
        `ข้าว${top}${meat}`,
        `ข้าว${top}${meat}${veg}`,
        `${veg}${meat}น้ำมันหอย`,
        `${meat}ผัดเผ็ด${top}`,
        `${meat}ผัดพริกแกง${top}`
    ];
    return menus[Math.floor(Math.random() * menus.length)];
}

function setMenuTx() {
    return new Promise((resolve) => {
        let count = 0;
        let interval = 70;
        let menuTitle = document.getElementById("title");
        function executeLoop() {
            menuTitle.innerHTML = getMenu();
            count++;
            if (count >= 15) {
                resolve();
            }
            else {
                interval *= 1.1;
                setTimeout(executeLoop, interval);
            }
        }
        executeLoop();
    });
}

function popMenuTitleCon() {
    let menuTitleCon = document.getElementById("title-con");
    if (menuTitleCon.classList.contains("pop")) {
        menuTitleCon.classList.remove("pop");
    }
    menuTitleCon.offsetWidth = menuTitleCon.offsetWidth;
    menuTitleCon.classList.add("pop");
}

function bouncLogo() {
    let logo = document.getElementById("logo");
    if (logo.classList.contains("bounce")) {
        logo.classList.remove("bounce");
    }
    logo.classList.remove("bounce");
    logo.offsetWidth = logo.offsetWidth;
    logo.classList.add("bounce");
}

let getMenuBtn = document.getElementById("getMenuBtn");
let randCount = 0;
getMenuBtn.addEventListener("click", async () => {
    await setMenuTx();
    popMenuTitleCon();
    bouncLogo();
    randCount++;

    // subtitle show
    let subtitle = document.getElementById("subtitle");
    if (randCount >= 10 && randCount <= 30) {
        subtitle.innerHTML = `ไม่ถูกใจ ${randCount} ครั้งแล้ว`;
    }
    else if (randCount > 30) {
        subtitle.innerHTML = `${randCount} รอบแล้ว.. จะได้กินมั้ยนะ?`;
    }
});