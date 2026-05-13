let gheDaChon = null;

// =======================
// CHỌN GHẾ
// =======================
function chonGhe(num) {
    gheDaChon = num;

    let seats = document.querySelectorAll(".seat");

    // Xóa class selected cũ
    seats.forEach(function (seat) {
        seat.classList.remove("selected");
    });

    // Thêm class selected cho ghế vừa chọn
    if (seats[num - 1]) {
        seats[num - 1].classList.add("selected");
    }

    const seatInput = document.getElementById("seat");
    if (seatInput) seatInput.value = num;
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

    const thoiGianInput = document.getElementById("thoigian");
    if (thoiGianInput) thoiGianInput.value = thoiGian;
}
setInterval(capNhatThoiGian, 1000);

// =======================
// GỌI API ĐIỂM DANH (BẢN GET)
// =======================
async function diemDanh() {
    let mssvRaw = document.getElementById("masv").value.trim();
    if (mssvRaw === "" || gheDaChon === null) {
        alert("Vui lòng nhập MSSV và chọn ghế");
        return;
    }

    const mssv = mssvRaw;
    const vitri = gheDaChon.toString();

    // ⚠️ Thay YOUR_HTTPS_URL bằng URL HTTPS thực tế bạn có (ví dụ ngrok)
   const apiUrl = window.location.origin + "/api/diemdanh";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": "23.03.2005"   // phải khớp với API Key ở server
            },
            body: JSON.stringify({ maSinhVien: mssv, viTriNgoi: vitri })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Lỗi không xác định");
        }
        alert("Thành công: " + data.message);
    } catch (err) {
        console.error(err);
        alert("Lỗi kết nối: " + err.message);
    }
}
