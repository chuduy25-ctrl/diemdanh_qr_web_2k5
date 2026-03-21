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

    // Thêm class selected cho ghế vừa chọn (num - 1 vì mảng bắt đầu từ 0)
    if (seats[num - 1]) {
        seats[num - 1].classList.add("selected");
    }

    // Cập nhật giá trị vào input ẩn nếu có
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

// Chạy mỗi giây
setInterval(capNhatThoiGian, 1000);

// =======================
// GỌI API ĐIỂM DANH
// =======================
function diemDanh() {
    let mssv = document.getElementById("masv").value;

    if (mssv === "" || gheDaChon === null) {
        alert("Vui lòng nhập MSSV và chọn ghế");
        return;
    }

    // 🔥 QUAN TRỌNG: Tên thuộc tính phải viết HOA chữ cái đầu để khớp với Class DiemDanh trong C#
    const data = {
        MaSinhVien: mssv.trim(),
        ViTriNgoi: gheDaChon.toString(), // Chuyển số thành chuỗi "1", "2"...
        ThoiGian: new Date().toISOString() // Định dạng chuẩn ISO cho SQL
    };

    // 🔥 Đổi sang cổng HTTP:5154
    fetch("http://localhost:5154/api/diemdanh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(async res => {
        const result = await res.json();
        if (!res.ok) {
            // Nếu server trả về BadRequest (400) kèm message lỗi
            throw new Error(result.message || "Lỗi không xác định");
        }
        return result;
    })
    .then(data => {
        alert("Thành công: " + data.message);
        // Có thể reset form hoặc chuyển trang tại đây
    })
    .catch(err => {
        console.error("Chi tiết lỗi:", err);
        alert("Thất bại: " + err.message);
    });
}
