const deletePostHandler = async (event) => {
  event.preventDefault();
  if (confirm("Are you sure you want to delete this post?")) {
    const id = event.target.dataset.num;
    console.log(`ID: ${id}`);
  
    if (id) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }
  };


document.querySelector('#delete-post').addEventListener('click', deletePostHandler);