function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Kiểm tra tên người dùng và mật khẩu trong localStorage
    var accounts = localStorage.getItem("accounts");
    if (accounts) {
      accounts = JSON.parse(accounts);
  
      // Tìm kiếm tài khoản phù hợp
      var matchingAccount = accounts.find(function(account) {
        return account.username === username && account.password === password;
      });
  
      if (matchingAccount) {
        alert("Đăng nhập thành công!");
        // Xử lý thành công đăng nhập, ví dụ: chuyển hướng đến trang chính
        window.location.href = "./api/index.html";
      } else {
        alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.");
      }
    } else {
      alert("Tài khoản không tồn tại. Vui lòng đăng ký trước khi đăng nhập.");
    }
  }
  