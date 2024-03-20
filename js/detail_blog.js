let blog_id
document.addEventListener('DOMContentLoaded', function () {
    try {
        var url_string = window.location.href.toLowerCase();
        var url = new URL(url_string);
        var id = url.searchParams.get('blog_id');
        blog_id = id;
    } catch (err) {
        console.log("Issues with Parsing URL Parameter's - " + err);
    }
    const container = document.querySelector('.grid-container');
    const renderPosts = (page = 1, perPage = 1) => {
        let uri = `https://blog-server-y5zy.onrender.com/posts/${blog_id}`;
        fetch(uri)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                renderGrid(data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };
    const renderGrid = (item) => {
        let template = `
            <div class="container-button">
                <a href="/updatePage.html?blog_id=${item.id}" class="btn btn-primary btn-update-blog">Update</a>
            </div>
            <div class="detail-blog">
                Detail Blog
            </div>
            <div class="row no-gutters">
                <div class="col-md-4 image-container">
                    <img src="${item.image}" class="card-img" alt="Detail Blog Image" style="max-width:100%; height:auto;">
                </div>
                <div class="col-md-8">
                    <div class="card-body-1 mt-5">
                        <div class="form-group d-flex flex-row">
                            <label style="width:30%">Title</label>
                            <input class="form-control mb-1" readonly value="${item?.title}">
                        </div>
                        <div class="form-group d-flex flex-row">
                            <label style="width:30%">Author</label>
                            <input class="form-control mb-1" readonly value="${item.author}">
                        </div>
                        <div class="form-group d-flex flex-row">
                            <label style="width:30%">Description</label>
                            <textarea class="form-control" rows="5" readonly>${item.description}</textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="comment-detail mt-2">
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="author">Author</label>
                            ${item.comments?.map((comment, index) => `
                                <input readonly class="form-control mt-1" value="${comment.author_comment}">
                            `).join('')}
                    </div>
                    <div class="form-group col-md-8">
                        <label for="comment">Comment</label>
                            ${item.comments?.map((comment, index) => `
                                <input readonly class="form-control mt-1" value="${comment.text}">
                            `).join('')}
                    </div>
                </div>
            </div>
        `;
        container.innerHTML = template;
    };
    renderPosts();
});
