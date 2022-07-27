const API_URL = "http://localhost:3000/todos";

export async function getTodos() {
  try {
    const response = await fetch(API_URL);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodo(id) {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: "PATCH",
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function completeTodo(id) {
  try {
    const response = await fetch(`${API_URL}/complete/${id}`, {
      method: "PATCH",
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function hardDeleteTodo(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function createTodo(todo) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function updateTodo(id, todo) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
