import { useEffect, useState } from "react";
import CLOSE_ICON from "../assets/close.svg";

export const AddItemModal = (props) => {
  const [categories, setCategories] = useState([]);

  // get categories for select
  const getCategories = async () => {
    try {
      const categoriesData = await fetch(`${props.server}/api/categories`);
      const categoriesJSON = await categoriesData.json();
      setCategories(categoriesJSON);
      setCategory(categoriesJSON[0]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, description, category, price, quantity);
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
                <i className="bi-database-fill-add"></i> Add item
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
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-dark w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
