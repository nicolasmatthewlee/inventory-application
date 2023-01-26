import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";

import { useEffect, useState } from "react";

import { AddItemModal } from "./components/add-item-modal";

const App = () => {
  const loadItems = async () => {
    try {
      const itemsData = await fetch("http://localhost:3000/api");
      const itemsJSON = await itemsData.json();
      setItems(itemsJSON);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const [items, setItems] = useState([]);

  const goToItem = (id) => {
    console.log(id);
  };

  return (
    <div className="App bg-light">
      {/* overlay */}
      <div className="w-100 h-100 bg-dark opacity-50 position-fixed"></div>

      <div className="container-fluid bg-light shadow-sm mb-3 p-3">
        <div className="row align-items-center">
          <div className="col">
            <h1>Inventory</h1>
          </div>
          <div className="col-auto">
            <button className="btn btn-dark">
              <i className="bi-plus-lg"></i> New Item
            </button>
          </div>
        </div>
      </div>

      <AddItemModal />

      <div className="container-fluid">
        {items.length > 0 ? (
          <table className="table table-striped table-bordered table-hover m-0 bg-white shadow-sm">
            <thead>
              <tr>
                {Object.keys(items[0]).map((n) =>
                  n !== "_id" ? <th key={n}>{n}</th> : null
                )}
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i._id} onClick={() => goToItem(i._id)}>
                  {Object.keys(i).map((n) =>
                    n !== "_id" ? <td key={n}>{i[n]}</td> : null
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};

export default App;
