const deletePostHandler = async (event) => {
  event.preventDefault();

  const id = event.target.id;
  console.log(id);

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

document.querySelector('#delete-btn').addEventListener('click', deletePostHandler);