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

    // 🔥 Lưu vào input hidden để gửi API
    document.getElementById("seat").value = num;
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
// GỌI API ĐIỂM DANH
// =======================
function diemDanh() {
    let mssv = document.getElementById("masv").value;

    if (mssv == "" || gheDaChon == null) {
        alert("Vui lòng nhập MSSV và chọn ghế");
        return;
    }

    const data = {
        maSinhVien: mssv,
        viTriNgoi: gheDaChon
    };

    fetch("https://YOUR_API_URL/api/diemdanh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })
    .catch(err => {
        console.error(err);
        alert("Lỗi kết nối API");
    });
}
