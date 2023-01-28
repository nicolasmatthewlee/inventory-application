import { useEffect, useState } from "react";
import CLOSE_ICON from "../assets/close.svg";
import uniqid from "uniqid";

export const ItemModal = (props) => {
  const [categories, setCategories] = useState([]);

  // get categories, if 'update' also fetch all data for given _id
  const fetchData = async () => {
    try {
      const categoriesData = await fetch(`${props.server}/api/categories`);
      const categoriesJSON = await categoriesData.json();
      setCategories(categoriesJSON);
      setCategory(categoriesJSON[0]);
    } catch (err) {
      console.log(err);
    }

    if (props.mode === "update") {
      try {
        const itemData = await fetch(`${props.server}/api/item/${props.item}`);
        const itemJSON = await itemData.json();
        setName(itemJSON.name);
        setDescription(itemJSON.description);
        setCategory(itemJSON.category);
        setPrice(itemJSON.price);
        setQuantity(itemJSON.count);
        setId(itemJSON._id);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [id, setId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const postForm = async (name, description, category, price, quantity, id) => {
    setLoading(true);
    try {
      const response = await fetch(`${props.server}/api/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          category,
          price,
          quantity,
          id,
        }),
      });
      const responseJSON = await response.json();

      // set errors
      if (responseJSON.errors) setErrors(responseJSON.errors);
      else setErrors([]);

      if (responseJSON.success === true) {
        props.onClose();
        props.onSave();
      } else throw Error;
    } catch (err) {
      setErrors([{ msg: "An unknown error occured." }]);
    }
    setLoading(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    postForm(name, description, category, price, quantity, id);
  };

  const onDelete = (e) => {
    console.log(id);
  };

  return (
    <div
      className="position-fixed top-0 w-100 zindex-modal d-flex justify-content-center"
      style={{ marginTop: "100px" }}
    >
      <div className="card col-10" style={{ maxWidth: "400px" }}>
        <div className="card-body p-3">
          <div className="row">
            <div className="col">
              <h2>
                {props.mode === "add" ? (
                  <i className="bi-database-fill-add"></i>
                ) : (
                  <i className="bi-database-fill-check"> </i>
                )}
                {" " + props.mode.charAt(0).toUpperCase() + props.mode.slice(1)}{" "}
                Item
              </h2>
            </div>
            <div className="col-auto p-0">
              <button className="btn p-0 me-2" onClick={props.onClose}>
                <img src={CLOSE_ICON} alt="close" style={{ width: "30px" }} />
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit}>
            <div className="mb-2">
              {/* htmlFor corresponds the id of the input */}
              <label htmlFor="name" className="form-label mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="description" className="form-label mb-1">
                Description
              </label>
              <textarea
                type="text"
                id="description"
                rows="3"
                className="form-control"
                placeholder="Item description..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="category" className="form-label mb-1">
                Category
              </label>
              <select
                id="category"
                className="form-select"
                required
                onChange={(e) => setCategory(e.target.value)}
                defaultValue={category}
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div>
                  <label htmlFor="price" className="form-label mb-1">
                    Price
                  </label>
                  <div className="input-group">
                    <div className="input-group-text">$</div>
                    <input
                      type="number"
                      id="price"
                      className="form-control"
                      placeholder="0.00"
                      onChange={(e) => setPrice(e.target.value)}
                      min="0"
                      style={{
                        MozAppearance: "textfield",
                      }}
                      value={price}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div>
                  <label htmlFor="quantity" className="form-label mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    className="form-control"
                    placeholder="1"
                    onChange={(e) => setQuantity(e.target.value)}
                    min="0"
                    value={quantity}
                  />
                </div>
              </div>
            </div>

            {errors.length > 0 ? (
              <div className="container-fluid list-group p-0  mb-3">
                <li className="list-group-item list-group-item-danger m-0">
                  <ul className="m-0 ps-3">
                    {errors.map((e) => (
                      <li className="" key={uniqid()}>
                        {e.msg}
                      </li>
                    ))}
                  </ul>
                </li>
              </div>
            ) : null}

            {props.mode === "add" ? (
              <button type="submit" className="btn btn-success w-100">
                {loading ? (
                  <div>
                    <i className="spinner-border spinner-border-sm"></i>{" "}
                    Loading...
                  </div>
                ) : (
                  "Add"
                )}
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-warning w-100 text-white"
              >
                {loading ? (
                  <div>
                    <i className="spinner-border spinner-border-sm"></i>{" "}
                    Loading...
                  </div>
                ) : (
                  "Update"
                )}
              </button>
            )}
          </form>
          {props.mode === "update" ? (
            <button onClick={onDelete} className="btn btn-danger w-100 mt-3">
              {loading ? (
                <div>
                  <i className="spinner-border spinner-border-sm"></i>{" "}
                  Loading...
                </div>
              ) : (
                "Delete"
              )}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
