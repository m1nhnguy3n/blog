const backToHomeBtn = document.querySelector('.back-to-home-button');
const createButton = document.querySelector('.create-button');
const form = document.querySelector('form');

createButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const blogData = {
        title: form.title.value,
        description: form.description.value,
        author: form.author.value,
        image: form.image.value,
        createdAt: new Date().toISOString(),
        view: 0,
    };

    await fetch('https://blog-server-y5zy.onrender.com/posts', {
        method: 'POST',
        body: JSON.stringify(blogData),
        headers: { 'Content-Type': 'application/json' },
    });

    window.location.replace('/index.html');
});

backToHomeBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    window.location.replace('/index.html');
});

