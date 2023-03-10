import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";

import { useEffect, useState } from "react";

import { ItemModal } from "./components/item-modal";

const App = () => {
  const server = "http://localhost:3000";

  const [isFetchingData, setIsFetchingData] = useState(true);
  const [dataAccessed, setDataAccessed] = useState(false);

  const [items, setItems] = useState([]);
  const loadItems = async () => {
    setIsFetchingData(true);
    try {
      const itemsData = await fetch(`${server}/api`);
      const itemsJSON = await itemsData.json();
      setItems(itemsJSON);
      setDataAccessed(true);
    } catch (err) {
      setDataAccessed(false);
    }
    setIsFetchingData(false);
  };
  useEffect(() => {
    loadItems();
  }, []);

  const [modalMode, setModalMode] = useState("add");
  const [showItemModal, setShowItemModal] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const goToItem = (id) => {
    setModalMode("update");
    setActiveItem(id);
    setShowItemModal(true);
  };

  return (
    <div className="App bg-light">
      {showItemModal ? (
        <div>
          {/* overlay */}
          <div
            onClick={() => setShowItemModal(false)}
            className="zindex-modal-backdrop w-100 h-100 bg-dark opacity-50 position-fixed"
          ></div>
          <ItemModal
            server={server}
            onClose={() => setShowItemModal(false)}
            onSave={loadItems}
            mode={modalMode}
            item={activeItem}
          />
        </div>
      ) : null}

      <div className="container-fluid bg-light shadow-sm mb-3 p-3">
        <div className="row align-items-center">
          <div className="col">
            <h1>
              <i className="bi-box-seam-fill me-2"></i>Inventory
            </h1>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-success"
              onClick={() => {
                setModalMode("add");
                setShowItemModal(true);
              }}
            >
              <i className="bi-plus-lg"></i> New Item
            </button>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        {isFetchingData ? (
          <div className="d-flex align-items-center justify-content-center gap-2 pb-3">
            <div className="spinner-border spinner-border-sm text-success"></div>
            <h5 className="m-0">Loading...</h5>
          </div>
        ) : !dataAccessed ? (
          <div className="d-flex align-items-center justify-content-center gap-2 pb-3">
            <h5 className="m-0">An error occurred. Please try again.</h5>
          </div>
        ) : items.length > 0 ? (
          <table className="table table-striped table-bordered table-hover m-0 bg-white shadow-sm mb-3">
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
        ) : (
          <div className="d-flex align-items-center justify-content-center gap-2 pb-3">
            <h5 className="m-0">No data found.</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
