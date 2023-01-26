import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";

import { useEffect, useState } from "react";

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
      <h1 className="container-fluid bg-light shadow-sm p-3 mb-3">Inventory</h1>

      <div className="container-fluid">
        {items.length > 0 ? (
          <table className="table table-striped table-bordered table-hover m-0 bg-white shadow-sm">
            <thead>
              <tr>
                {Object.keys(items[0]).map((n) => (
                  <th key={n}>{n}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i._id} onClick={() => goToItem(i._id)}>
                  {Object.keys(i).map((n) => (
                    <td key={n}>{i[n]}</td>
                  ))}
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
