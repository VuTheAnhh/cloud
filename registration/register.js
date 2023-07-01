function register() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Kiểm tra nếu tên người dùng và mật khẩu hợp lệ
    if (username !== "" && password !== "") {
      // Kiểm tra xem đã có thông tin tài khoản trong localStorage chưa
      var accounts = localStorage.getItem("accounts");
      if (!accounts) {
        // Nếu chưa có, tạo một mảng mới và thêm tài khoản đầu tiên
        accounts = [];
      } else {
        // Nếu đã có, chuyển đổi từ chuỗi JSON thành mảng
        accounts = JSON.parse(accounts);
      }
  
      // Kiểm tra xem tài khoản đã tồn tại hay chưa
      var existingAccount = accounts.find(function(account) {
        return account.username === username;
      });
  
      if (existingAccount) {
        alert("Tài khoản đã tồn tại. Vui lòng chọn tên người dùng khác.");
      } else {
        // Thêm tài khoản mới vào mảng
        accounts.push({
          username: username,
          password: password
        });
  
        // Lưu lại mảng tài khoản vào localStorage
        localStorage.setItem("accounts", JSON.stringify(accounts));
  
        alert("Đăng ký thành công!");
        // Chuyển hướng đến trang đăng nhập
        window.location.href = "login.html";
      }
    } else {
      alert("Vui lòng điền đầy đủ thông tin đăng ký.");
    }
  }
  