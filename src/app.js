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
      _id: "CSDF1234",
      name: "Central Park",
      description:
        "This a description of an item. This is some more placeholder text. ",
      tags: ["american", "nature", "medium"],
      price: 200,
      count: 5,
    },
    {
      _id: "BSDF1234",
      name: "Central Park",
      description:
        "This a description of an item. This is some more placeholder text.",
      tags: ["american", "nature", "medium"],
      price: 200,
      count: 5,
    },
  ];

  const goToItem = (id) => {
    console.log(id);
  };

  return (
    <div className="App bg-light">
      <h1 className="container-fluid bg-light shadow-sm p-3 mb-3">Inventory</h1>

      <div className="container-fluid">
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
      </div>
    </div>
  );
};

export default App;
