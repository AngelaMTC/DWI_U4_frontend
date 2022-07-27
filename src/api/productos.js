const API_URL = "http://localhost:3000/productos";

export async function getProductos() {
  try {
    const response = await fetch(API_URL);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProducto(id) {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: "PATCH",
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function completeProducto(id) {
  try {
    const response = await fetch(`${API_URL}/complete/${id}`, {
      method: "PATCH",
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function hardDeleteProducto(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function createProducto(producto) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function updateProducto(id, producto) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
