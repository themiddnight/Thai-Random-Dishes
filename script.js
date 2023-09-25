function getMeatIng() {
    const meatProc = ["", "สับ", "กรอบ", "ทอด", "ต้ม", "ย่าง", "อบ"];
    let proc = meatProc[Math.floor(Math.random() * meatProc.length)];
    const meatIng = [
        "หมู" + proc, "ไก่" + proc, "เนื้อ" + proc, "ปลา" + proc,
        "ทะเล", "กุ้ง", "ปลาหมึก", "ปู", "ปูอัด", "ใส้กรอก", "ไข่เยี่ยวม้า"
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
        `${veg}${meat}`,
        `${meat}ผัดเผ็ด${top}`,
        `${meat}ผัดพริกแกง${top}`
    ];
    return menus[Math.floor(Math.random() * menus.length)];
}

let getMenuBtn = document.getElementById("getMenuBtn");
let menuTitle = document.getElementById("title");
let subtitle = document.getElementById("subtitle");
let randCount = 0;
getMenuBtn.addEventListener("click", function () {
    menuTitle.innerHTML = getMenu();
    randCount++;
    if (randCount >= 10) {
        subtitle.innerHTML = `ไม่ถูกใจแล้ว ${randCount} ครั้ง`;
    }
});