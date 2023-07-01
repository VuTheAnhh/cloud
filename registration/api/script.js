function getInfo() {
  event.preventDefault();

  // Create request object
  const xhr = new XMLHttpRequest();

  // Set up request
  xhr.open('GET', 'https://c41h2dbnn3.execute-api.ap-southeast-2.amazonaws.com/prod', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Set up response handler
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Parse the response as JSON
        const response = JSON.parse(xhr.responseText);

        // Access the items array in the response
        const items = response.body;

        let myString = items
        
        // Chuyển chuỗi JSON thành mảng
        let myArray = JSON.parse(myString);
        
        // Tạo thẻ div để chứa kết quả
        let tableHtml = '<table id="myTable"> <thead> <tr> <th>Nhóm</th> <th>Tiến độ</th> <th>Vấn đề</th> <th>Ghi chú</th> </tr> </thead> <tbody>';

        for(let i = 0; i < myArray.length; i++){
          let rowHtml = '<tr>';
          rowHtml += '<td>'+ '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + myArray[i].name +  '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ '</td>';
          rowHtml += '<td>'+ '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + myArray[i].email +  '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ '</td>';
          rowHtml += '<td>'+ '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + myArray[i].password +  '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ '</td>';
          rowHtml += '<td>'+ '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + myArray[i].phone +  '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ '</td>';
          rowHtml += '</tr>';
          tableHtml += rowHtml;
        }
        
        tableHtml += '</tbody> </table>';
        
        // Thêm bảng vào thẻ div đã tạo
        let myTableDiv = document.getElementById("myTableDiv");
        myTableDiv.innerHTML = tableHtml;
        
        // Tạo mảng chứa giá trị của email
        const emailValues = myArray.map(item => item.email);

        // Tạo mảng chứa giá trị của name
        const nameValues = myArray.map(item => item.name);

        // Tạo biểu đồ cột
        const myChart = new Chart(chartCanvas, {
          type: 'bar',
          data: {
            labels: nameValues,
            datasets: [
              {
                label: 'Email',
                data: emailValues,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return value + '%';
                  }
                }
              }
            }
          }
        });


        // Thêm resultDiv vào trang web
        document.body.appendChild(resultDiv);
        
      } else {
        alert('Failed to get information: ' + xhr.responseText);
      }
    }
  };

  // Send request
  xhr.send();
}


function submitForm() {
  event.preventDefault();

  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;

  // Create request object
  const xhr = new XMLHttpRequest();

  // Set up request
  xhr.open('POST', 'https://c41h2dbnn3.execute-api.ap-southeast-2.amazonaws.com/prod', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Set up response handler
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              alert('Registration successful!');
              document.getElementById('name').value = '';
              document.getElementById('email').value = '';
              document.getElementById('phone').value = '';
              document.getElementById('password').value = '';
              // window.location.href = 'https://lienquan.garena.vn/';
          } else {
              alert('Registration failed: ' + xhr.responseText);
          }
      }
  };

  // Send request
  xhr.send(JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      password: password
  }));
}


function drawChart() {
  // Tạo mảng chứa giá trị của email
  const emailValues = myArray.map(item => item.email);

  // Tạo mảng chứa giá trị của name
  const nameValues = myArray.map(item => item.name);

  // Tạo biểu đồ cột
  const chartCanvas = document.getElementById('chartCanvas');
  const myChart = new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: nameValues,
      datasets: [
        {
          label: 'Progress',
          data: emailValues,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  });
}
