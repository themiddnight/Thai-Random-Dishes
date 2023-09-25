function getMeatIng() {
    const meatProc = ["", "สับ", "กรอบ", "ทอด", "ต้ม", "ย่าง", "อบ"];
    let proc = meatProc[Math.floor(Math.random() * meatProc.length)];
    const meatIng = [
        "หมู" + proc, "ไก่" + proc, "เนื้อ" + proc,
        "ปลา", "ทะเล", "กุ้ง", "ปลาหมึก", "ปู", "ปูอัด", "ใส้กรอก", "ไข่เยี่ยวม้า"
    ];
    return meatIng[Math.floor(Math.random() * meatIng.length)];
}
function getVegIng() {
    const vegIng = ["คะน้า", "ผักบุ้ง", "ผักรวม", "แครอท"];
    return vegIng[Math.floor(Math.random() * vegIng.length)];
}
function getTopping() {
    const topping = ["", "ไข่เจียว", "ไข่ดาว", "ไข่ข้น"];
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

let getMenuBtn = document.getElementById("getMenuBtn");
let randCount = 0;
getMenuBtn.addEventListener("click", () => {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => { 
            // roll amd change title
            let menuTitle = document.getElementById("title");
            menuTitle.classList.remove("roll");
            menuTitle.offsetWidth = menuTitle.offsetWidth;
            menuTitle.classList.add("roll");
            menuTitle.innerHTML = getMenu();
        }, 100 * (i * (i / 10)))
    }

    // logo bounce
    let logo = document.getElementById("logo");
    logo.classList.remove("bounce");
    logo.offsetWidth = logo.offsetWidth;
    logo.classList.add("bounce");

    // subtitle show
    randCount++;
    let subtitle = document.getElementById("subtitle");
    if (randCount >= 10) {
        subtitle.innerHTML = `ไม่ถูกใจแล้ว ${randCount} ครั้ง`;
    }
});