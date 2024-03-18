fetch("https://blog-server-y5zy.onrender.com/posts")
  .then((response) => response.json())
  .then((data) => {
    // Process the data returned from the API
    console.log(data);
  })
  .catch((error) => {
    // Handle any errors that occur during the API call
    console.error(error);
  });
