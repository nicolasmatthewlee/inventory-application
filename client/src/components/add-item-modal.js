export const AddItemModal = () => {
  return (
    <div
      className="position-fixed top-0 w-100 zindex-modal d-flex justify-content-center"
      style={{ marginTop: "100px" }}
    >
      <div className="card col-10">
        <div className="card-body p-3">
          <h2>
            <i className="bi-database-fill-add"></i> Add item
          </h2>
          <form action="">
            <div className="mb-2">
              <label className="form-label mb-1">Name</label>
              <input type="text" className="form-control" placeholder="Name" />
            </div>
            <div className="mb-2">
              <label className="form-label mb-1">Description</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Item description..."
              />
            </div>
            <div className="mb-2">
              <label className="form-label mb-1">Category</label>
              <select name="" id="" className="form-select"></select>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div>
                  <label className="form-label mb-1">Price</label>
                  <div className="input-group">
                    <div className="input-group-text">$</div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div>
                  <label className="form-label mb-1">Quantity</label>
                  <input type="text" className="form-control" placeholder="1" />
                </div>
              </div>
            </div>

            <button className="btn btn-dark w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
