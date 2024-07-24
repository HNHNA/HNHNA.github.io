const accessKey = "wpWg9j7ZTXEzdnPFwJX09qyQ0B92jbAH7UKHjJ6Lt2Y"; // Khóa truy cập API Unsplash của bạn

const formEl = document.querySelector("form"); // Chọn phần tử biểu mẫu
const searchInputEl = document.getElementById("search-input"); // Chọn phần tử nhập liệu tìm kiếm theo ID
const searchResultsEl = document.querySelector(".search-results"); // Chọn phần tử để hiển thị kết quả tìm kiếm
const showMoreButtonEl = document.getElementById("show-more-button"); // Chọn nút "Hiển thị thêm" theo ID

let inputData = ""; // Lưu trữ truy vấn tìm kiếm hiện tại
let page = 1; // Theo dõi trang kết quả hiện tại



async function searchImages() {
  inputData = searchInputEl.value; // Lấy dữ liệu nhập từ người dùng từ phần tử nhập liệu tìm kiếm
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&per_page=12&client_id=${accessKey}`; // Tạo URL yêu cầu API

  const response = await fetch(url); // Lấy dữ liệu từ API
  // console.log(response.data);
  const data = await response.json(); // Phân tích dữ liệu JSON từ phản hồi

  if (page === 1) {
    searchResultsEl.innerHTML = ""; // Xóa kết quả trước đó nếu đây là trang đầu tiên
  }

  const results = data.results; // Trích xuất kết quả từ phản hồi API

  results.map((result) => {
    // Tạo các phần tử để hiển thị từng hình ảnh và liên kết của nó
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small; // Đặt nguồn hình ảnh
    image.alt = result.alt_description; // Đặt văn bản thay thế cho hình ảnh
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html; // Đặt liên kết đến trang hình ảnh
    imageLink.target = "_blank"; // Mở liên kết trong tab mới
    imageLink.textContent = result.alt_description; // Đặt văn bản liên kết

    imageWrapper.appendChild(image); // Thêm hình ảnh vào wrapper
    imageWrapper.appendChild(imageLink); // Thêm liên kết vào wrapper
    searchResultsEl.appendChild(imageWrapper); // Thêm wrapper vào phần tử kết quả tìm kiếm
  });

  page++; // Tăng số trang cho lần tìm kiếm tiếp theo

  if (page > 1) {
    showMoreButtonEl.style.display = "block"; // Hiển thị nút "Hiển thị thêm" nếu có nhiều trang hơn
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault(); // Ngăn chặn hành vi nộp biểu mẫu mặc định
  page = 1; // Đặt lại số trang về 1
  searchImages(); // Gọi hàm tìm kiếm hình ảnh
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages(); // Gọi hàm tìm kiếm hình ảnh
});
