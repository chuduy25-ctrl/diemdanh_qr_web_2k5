let gheDaChon = null;

// =======================
// CHỌN GHẾ
// =======================
function chonGhe(num) {
    gheDaChon = num;

    let seats = document.querySelectorAll(".seat");

    seats.forEach(function (seat) {
        seat.classList.remove("selected");
    });

    seats[num - 1].classList.add("selected");
}

// =======================
// HIỂN THỊ THỜI GIAN THỰC
// =======================
function capNhatThoiGian() {
    let now = new Date();

    let ngay = now.getDate().toString().padStart(2, '0');
    let thang = (now.getMonth() + 1).toString().padStart(2, '0');
    let nam = now.getFullYear();

    let gio = now.getHours().toString().padStart(2, '0');
    let phut = now.getMinutes().toString().padStart(2, '0');
    let giay = now.getSeconds().toString().padStart(2, '0');

    let thoiGian = `${ngay}/${thang}/${nam} ${gio}:${phut}:${giay}`;

    document.getElementById("thoigian").value = thoiGian;
}

// chạy mỗi giây
setInterval(capNhatThoiGian, 1000);

// =======================
// SUBMIT
// =======================
function submitForm() {
    let mssv = document.getElementById("mssv").value;
    let monhoc = document.getElementById("monhoc").value;
    let thoigian = document.getElementById("thoigian").value;

    if (mssv == "" || gheDaChon == null) {
        alert("Vui lòng nhập MSSV và chọn ghế");
        return;
    }

    alert(
        "MSSV: " + mssv +
        "\nMôn học: " + monhoc +
        "\nThời gian: " + thoigian +
        "\nGhế: " + gheDaChon
    );
}
