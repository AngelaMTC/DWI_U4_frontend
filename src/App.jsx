import { useEffect, useState } from "react";
import "./App.css";
import {
  completeProducto,
  deleteProducto,
  getProductos,
  hardDeleteProducto,
  createProducto,
  updateProducto,
} from "./api/productos";

import { TiEdit } from "react-icons/ti";

function App() {
  const [productos, setProductos] = useState([]);

  const [newProducto, setNewProducto] = useState({});

  async function fetchProductos() {
    const fetchedProductos = await getProductos();
    console.log({ fetchedProductos });
    setProductos(fetchedProductos);
  }

  const ProductoComponent = ({
    _id,
    title,
    description,
    updatedAt,
    completed,
    removeProducto,
    hardDeleteProducto,
    toggleProducto,
    handleCreateOrUpdateProducto,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [edditingProducto, setEditingProducto] = useState({});

    const handleEdit = () => {
      setIsEditing((current) => !current);
      setEditingProducto({ _id, title, description, completed });
    };

    return (
      <div className="producto-item">
        <h2>
          {title} <TiEdit onClick={handleEdit} />
        </h2>
        <h4>{description}</h4>
        <p style={{ color: completed ? "green" : "red" }}>
          <input
            checked={completed}
            type="checkbox"
            onChange={() => toggleProducto(_id)}
          />
          <b>{completed ? " Completed" : "Not completed"}</b>{" "}
        </p>
        <p>
          Last update:<b>{updatedAt}</b>{" "}
        </p>
        <button className="button-danger" onClick={() => removeProducto(_id)}>
          Delete
        </button>
        <button className="button-danger" onClick={() => hardDeleteProducto(_id)}>
          Hard Delete
        </button>

        {isEditing && (
          <div>
            Titile
            <input
              type="text"
              name="title"
              value={edditingProducto.title}
              onChange={(e) =>
                setEditingProducto((current) => ({
                  ...current,
                  title: e.target.value,
                }))
              }
            />
            Description
            <input
              type="text"
              name="description"
              value={edditingProducto.description}
              onChange={(e) =>
                setEditingProducto((current) => ({
                  ...current,
                  description: e.target.value,
                }))
              }
            />
            <button
              className="button-primary"
              onClick={() => handleCreateOrUpdateProducto(edditingProducto)}
            >
              Update Producto
            </button>
          </div>
        )}
        <hr />
      </div>
    );
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const removeProducto = async (id) => {
    await deleteProducto(id);
    fetchProductos();
  };

  const toggleComepleted = async (id) => {
    await completeProducto(id);
    fetchProductos();
  };

  const ereaseProducto = async (id) => {
    await hardDeleteProducto(id);
    fetchProductos();
  };

  const handleCreateOrUpdateProducto = async (producto) => {
    if (!producto._id) {
      await createProducto(producto);
      setNewProducto({ title: "", description: "" });
      fetchProductos();
      return;
    }
    const { _id } = producto;
    delete producto._id;
    await updateProducto(_id, producto);
    fetchProductos();
  };

  return (
    <div>
      <div className="Producto-list">
        <h1>PRODUCTOS</h1>
        {productos &&
          productos.map((producto) => (
            <ProductoComponent
              {...producto}
              handleCreateOrUpdateProducto={handleCreateOrUpdateProducto}
              hardDeleteProducto={ereaseProducto}
              removeProducto={removeProducto}
              toggleProducto={toggleComepleted}
            />
          ))}
        <div>
          Title
          <input
            type="text"
            name="title"
            value={newProducto.title}
            onChange={(e) =>
              setNewProducto((current) => ({ ...current, title: e.target.value }))
            }
          />
          Description
          <input
            type="text"
            name="description"
            value={newProducto.description}
            onChange={(e) =>
              setNewProducto((current) => ({
                ...current,
                description: e.target.value,
              }))
            }
          />
          <button
            className="button-primary"
            onClick={() => handleCreateOrUpdateProducto(newProducto)}
          >
            Create Producto
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
