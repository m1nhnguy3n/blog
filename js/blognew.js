document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".grid-container2");
  const renderPosts = async (page, perPage) => {
    let uri = `https://blog-server-y5zy.onrender.com/posts?_page=${page}&_per_page=${perPage}`;
    const res = await fetch(uri);
    const data = await res.json();
    console.log(data);
    renderGrid(data.data);
  };

  const renderGrid = (data) => {
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    let template = "";
    data?.forEach((item, index) => {
      template += `<div class="blog-featured">
            <div class="content-featured">
              <div class="section-blog">
                <img class="img" src="${item?.image}" alt="" />
                <a href="/detailPage.html?blog_id=${item.id}" class="section-title"
                  >${item.title}</a
                >
                <div class="description">
                  <p>${item?.description}</p>
                </div>
                <div class="author">
                  <p>${item?.author}</p>
                </div>
              </div>
            </div>
          </div>
            
          `;
    });
    container.innerHTML = template;
  };

  window.addEventListener("DOMContentLoaded", () => {
    renderPosts(1, 3);
  });
  container.addEventListener("click", (event) => {
    if (event.target.classList.contains("section-title")) {
      const blogItem = document.querySelector(
        `.blog-featured[data-id="${itemId}"]`
      );

      blogItem.style.display = "block";
    }
  });
});
