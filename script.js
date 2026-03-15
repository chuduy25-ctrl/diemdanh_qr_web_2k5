let gheDaChon = null;

function chonGhe(num) {

    gheDaChon = num;

    let seats = document.querySelectorAll(".seat");

    seats.forEach(function (seat) {
        seat.classList.remove("selected");
    });

    seats[num - 1].classList.add("selected");

}

function submitForm() {

    let mssv = document.getElementById("mssv").value;

    if (mssv == "" || gheDaChon == null) {
        alert("Vui lòng nhập MSSV và chọn ghế");
        return;
    }

    alert("MSSV: " + mssv + " chọn ghế: " + gheDaChon);

}