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
function diemDanh() {
    let mssvRaw = document.getElementById("masv").value;

    if (mssvRaw === "" || gheDaChon === null) {
        alert("Vui lòng nhập MSSV và chọn ghế");
        return;
    }

    const mssv = mssvRaw.trim();
    const vitri = gheDaChon.toString();

    // 🔥 CHUYỂN SANG DẠNG GET: Đưa dữ liệu lên URL Query String
    // Các tên tham số maSinhVien và viTriNgoi phải khớp 100% với Controller C#
    const url = `http://192.168.1.214:5154/api/diemdanh?maSinhVien=${mssv}&viTriNgoi=${vitri}`;

    console.log("Đang gọi API:", url);

    // Fetch mặc định không có method sẽ là GET
    fetch(url)
    .then(async res => {
        const result = await res.json();
        if (!res.ok) {
            // Hiển thị lỗi từ server (ví dụ: MSSV không tồn tại)
            throw new Error(result.message || "Lỗi không xác định");
        }
        return result;
    })
    .then(data => {
        alert("Thành công: " + data.message);
    })
    .catch(err => {
        console.error("Chi tiết lỗi:", err);
        // Nếu vẫn lỗi "Failed to fetch", trình duyệt vẫn đang chặn Mixed Content.
        // Bạn hãy thực hiện bước "Mồi IP" như đã thảo luận.
        alert("Lỗi kết nối: " + err.message);
    });
}
