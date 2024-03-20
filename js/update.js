const updateForm = document.querySelector('.update-form-container');
let blog_id = 0;

const renderUpdateForm = async () => {
    const res = await fetch(
        `https://blog-server-y5zy.onrender.com/posts/${blog_id}`,
        {
            method: 'GET',
        }
    );

    const blogData = await res.json();

    let template = `<div
                class="row justify-content-center align-items-center create-row"
            >
                <div class="col-md-8 create-form border flex-column d-flex">
                    <form>
                        <h1 class="text-center mb-5">Update Blog</h1>
                        <div class="form-group row">
                            <label
                                for="exampleFormControlTextarea1"
                                class="col-sm-2 col-form-label"
                                >Title</label
                            >
                            <input
                                type="text"
                                class="form-control col-sm-10"
                                placeholder="Title"
                                value="${blogData.title}"
                                id="exampleFormControlTextarea1"
                                name="title"
                            />
                        </div>
                        <div class="form-group row">
                            <label
                                for="exampleFormControlTextarea2"
                                class="col-sm-2 col-form-label"
                                >Author</label
                            >
                            <input
                                type="text"
                                class="form-control col-sm-10"
                                placeholder="Author Name"
                                value="${blogData.author}"
                                id="exampleFormControlTextarea2"
                                name="author"
                            />
                        </div>
                        <div class="form-group row">
                            <label
                                for="exampleFormControlTextarea2"
                                class="col-sm-2 col-form-label"
                                >Description</label
                            >
                            <textarea
                                class="form-control col-sm-10"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Description"
                                name="description"
                            >${blogData.description}</textarea>
                        </div>
                        <div class="form-group row">
                            <label
                                for="exampleFormControlTextarea2"
                                class="col-sm-2 col-form-label"
                                >Picture</label
                            >
                            <input
                                type="text"
                                class="form-control col-sm-10"
                                placeholder="Picture Link"
                                value="${blogData.image}"
                                id="exampleFormControlTextarea2"
                                name="image"
                            />
                        </div>
                        <div class="row justify-content-around mt-4">
                            <a
                                class="btn btn-primary col-4"
                                href='/detailPage.html?blog_id=${blog_id}'
                                role="button"
                                >Back</a
                            >
                            <button
                                type="submit"
                                class="btn btn-success col-4 update-button"
                                data-id="${blogData.id}"
                            >
                                Update
                            </button>

                        </div>
                    </form>
                </div>
            </div>`;
    updateForm.innerHTML = template;

    const updateButton = document.querySelector('.update-button');
    const form = document.querySelector('form');

    updateButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const blogData = {
            title: form.title.value,
            description: form.description.value,
            author: form.author.value,
            image: form.image.value,
        };
        console.log(blog_id);

        await fetch(`https://blog-server-y5zy.onrender.com/posts/${blog_id}`, {
            method: 'PATCH',
            body: JSON.stringify(blogData),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => {
                window.location.replace(`/detailPage.html?blog_id=${blog_id}`);
                alert('Update Success !!!');
            })
            .catch((error) => alert("Update Failed !!!"));
    });
};

document.addEventListener('DOMContentLoaded', () => {
    try {
        var url_string = window.location.href.toLowerCase();
        var url = new URL(url_string);
        var id = url.searchParams.get('blog_id');
        blog_id = id;
    } catch (err) {
        console.log("Issues with Parsing URL Parameter's - " + err);
    }

    renderUpdateForm();
});
