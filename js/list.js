document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.grid-container');
    const paginationContainer = document.querySelector('.pagination');
    const pageNumber = 1;
    const perPageNumber = 12;
    const renderPosts = async (page, perPage) => {
        let uri = `https://blog-server-y5zy.onrender.com/posts?_page=${page}&_per_page=${perPage}`;
        const res = await fetch(uri);
        const data = await res.json();
        renderGrid(data.data);
        pagination(data);
    };

    const renderGrid = (data) => {
        let template = '';
        data?.forEach((item) => {
            template += `
            <div class="grid-item">
                <img class="card-img-top" src=${item?.image} alt="${item?.title}">
                <div class="card-body">
                    <h5 class="card-title">${item?.title}</h5>
                    <p class="card-text">${item?.description}</p>
                    <p class="card-text"><small class="text-muted">${item?.author}</small></p>
                    <button class="btn btn-danger btn-delete-post" data-id="${item.id}">Delete</button>
                    <a href="/detailPage.html?blog_id=${item.id}" class="btn btn-primary">Detail</a>
                </div>
            </div>
          `;
        });

        container.innerHTML = template;
        const deleteButtons = document.querySelectorAll('.btn-delete-post');

        deleteButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const modal = document.getElementById('id01');
                modal.style.display = 'block';
                const yes = document.getElementById('yes');
                const no = document.getElementById('no');
                yes.addEventListener('click', async () => {
                    const postId = button.getAttribute('data-id');

                    await fetch(
                        `https://blog-server-y5zy.onrender.com/posts/${postId}`,
                        {
                            method: 'DELETE',
                        }
                    )
                        .then((res) => {
                            if (res.status === 200) {
                                modal.style.display = 'none';
                                const filteredData = data?.filter(
                                    (item) => item.id !== postId
                                );
                                renderGrid(filteredData);
                            }
                        })
                        .catch((error) => console.log(error));
                });
                no.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            });
        });
    };

    const pagination = (data) => {
        let template = '';
        for (let i = 1; i <= data.pages; i++) {
            const isActive = data.prev + 1 === i ? 'active' : '';
            template += `
            <li class="page-item ${isActive}"><a class="page-link" href="#" data-id="${i}">${i}</a></li>
          `;
        }
        paginationContainer.innerHTML = template;
        const pageItems = document.querySelectorAll('.page-item');
        pageItems.forEach((item) => {
            item.addEventListener('click', () => {
                const page = parseInt(
                    item.querySelector('.page-link').getAttribute('data-id')
                );
                renderPosts(page, 6);
            });
        });
    };

    window.addEventListener('DOMContentLoaded', () => {
        renderPosts(1, 6);
    });
});
