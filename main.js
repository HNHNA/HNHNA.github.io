const accessKey = "wpWg9j7ZTXEzdnPFwJX09qyQ0B92jbAH7UKHjJ6Lt2Y";

let inputData = ""; 
let page = 1; 

  document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("container");
    
  // Create h1 
  const h1 = document.createElement("h1");
  h1.textContent = "Image Search App";
  container.appendChild(h1);

  // Create form 
  const form = document.createElement("form");
  form.id = "form-container"

  // Create input 
  const input = document.createElement("input");
  input.type = "text";
  input.id = "search-input";
  input.placeholder = "Search for images...";
  form.appendChild(input);

  // Create button 
  const button = document.createElement("button");
  button.id = "search-button";
  button.textContent = "Search";
  form.appendChild(button);

  // Append form to container
  container.appendChild(form);

  // Create search results container
  const searchResults = document.createElement("div");
  searchResults.className = "search-results";
  container.appendChild(searchResults);

  // Create scroll observer
  const scrollObserver = document.createElement("div");
  scrollObserver.id = "scroll-observer";
  /**
   * Add height so the user
   * can scroll it into view
   */
  scrollObserver.style.height = '2px';
  container.appendChild(scrollObserver);

  // console.log(observer.observe(scrollObserver));
  
  const searchInputEl = document.getElementById("search-input"); 
  console.log(searchInputEl);
  const searchResultsEl = document.querySelector(".search-results");
  console.log(searchResultsEl);
  const formInput = document.getElementById('form-container');
  console.log(formInput);
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      searchImages(); 
    }
  });
  
  async function searchImages() {
    /**
     * Do not reset the form as when you scroll down,
     * it will be accessed again
     */
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&per_page=12&client_id=${accessKey}`; // Tạo URL yêu cầu API
    if(!inputData){
      console.error('Search query is not empty! ')
      return 
    }

    try {
      const response = await fetch(url); // Lấy dữ liệu từ API
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
    const data = await response.json(); // Phân tích dữ liệu JSON từ phản hồi

    const results = data.results; // Trích xuất kết quả từ phản hồi API

    results.forEach((result) => {
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
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  }

  formInput.addEventListener("submit", (event) => {
    event.preventDefault(); 
    page = 1;
    if (searchInputEl.value.trim() === '') {
      // Empty or only space string are still empty after trimmed
      alert('Please enter in the form !!!!');
      return;
    }

    /**
     * Do not reset the form as when you scroll down,
     * it will be accessed again
     */
    console.log('Searching');
    searchResultsEl.replaceChildren();
    searchImages();
  });

  observer.observe(scrollObserver);

}); 
