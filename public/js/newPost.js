const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#post-title").value.trim();
    const contents = document.querySelector("#post-contents").value.trim();
    console.log(title);
    console.log(contents);
    if (title && contents) {
 
      const response = await fetch("/api/posts/new", {
        method: "POST",
        body: JSON.stringify({ title, contents }),
        headers: { "Content-Type": "application/json" },
      });
      // console.log(response);
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  };

document
  .querySelector(".post-form")
  .addEventListener("submit", newPostFormHandler);