import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";

const App = () => {
  const items = [
    {
      _id: "ASDF1234",
      name: "Central Park",
      description:
        "This a description of an item. This is some more placeholder text.",
      tags: ["american", "nature", "medium"],
      price: 200,
      count: 5,
    },
    {
      _id: "ASDF1234",
      name: "Central Park",
      description:
        "This a description of an item. This is some more placeholder text. This is going to be an extended description of an item",
      tags: ["american", "nature", "medium"],
      price: 200,
      count: 5,
    },
    {
      _id: "ASDF1234",
      name: "Central Park",
      description:
        "This a description of an item. This is some more placeholder text.",
      tags: ["american", "nature", "medium"],
      price: 200,
      count: 5,
    },
  ];
  return (
    <div className="App">
      <h1 className="container-fluid bg-light shadow-sm p-3 mb-3">
        American Fine Arts
      </h1>

      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col">
            <div className="input-group">
              <button className="btn btn-dark">
                <i className="bi-search"></i>
              </button>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>

        <div className="list-group">
          <div className="list-group-item">
            <div className="row">
              {Object.keys(items[0]).map((n) => (
                <div
                  className={
                    ["_id", "price", "count"].includes(n)
                      ? "text-nowrap text-truncate col col-md-1"
                      : "text-nowrap text-truncate col"
                  }
                >
                  {n}
                </div>
              ))}
            </div>
          </div>

          {items.map((i) => (
            <div className="list-group-item">
              <div className="row">
                {Object.keys(i).map((n) => (
                  <div
                    className={
                      ["_id", "price", "count"].includes(n)
                        ? "text-nowrap text-truncate col col-md-1"
                        : "text-nowrap text-truncate col"
                    }
                  >
                    {i[n]}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <table className="table table-striped table-hover m-0">
          <thead>
            <tr>
              {Object.keys(items[0]).map((n) => (
                <th>{n}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr>
                {Object.keys(i).map((n) => (
                  <td>{i[n]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
