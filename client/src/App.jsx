import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groceries: [],
      disabled: false,
      item: '',
      quantity: 1
    }
    this.submit = this.submit.bind(this)
    this.handler = this.handler.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  componentDidMount() {
    this.getGroceries()
  }

  getGroceries(cb) {
    axios.get('/groceries').then(res => {
      this.setState({ groceries: res.data })
      cb && cb()
    })
  }

  submit(e) {
    this.setState({ disabled: true }, () => {
      const item = this.state.item
      const quantity = this.state.quantity
      axios.post('/groceries', { item, quantity }).then(() => {
        this.getGroceries(() =>
          this.setState({ disabled: false, item: '', quantity: 1 })
        )
      })
    })
    e.preventDefault()
  }

  handler(event) {
    const name = event.target.name
    this.setState({ [name]: event.target.value })
  }

  deleteItem(e, id) {
    axios
      .delete('/groceries', { params: { id } })
      .then(() => this.getGroceries())
    e.preventDefault()
  }

  render() {
    return (
      <div style={{ width: '100%' }} className="d-flex justify-content-center">
        <div style={{ maxWidth: 1000 }}>
          <div className="container-fluid text-center my-5">
            <img
              src="grocery-bags.png"
              className="img-fluid"
              alt="grocery-bag"
            />
            <div className="h1 my-5">Grocery list</div>
            <form
              className="form-inline d-flex justify-content-center my-5"
              style={{ marginLeft: 12, marginRight: 12 }}
              onSubmit={this.submit}
            >
              <div className="form-group">
                <label>Item</label>
                <input
                  required
                  type="text"
                  name="item"
                  value={this.state.item}
                  onChange={this.handler}
                  className="form-control form-control-sm ml-2"
                />
              </div>
              <div className="form-group ml-4">
                <label>Quantity</label>
                <input
                  required
                  type="number"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.handler}
                  className="form-control form-control-sm ml-2"
                />
              </div>
              <button
                type="submit"
                className="btn-sm ml-4"
                disabled={this.state.disabled}
              >
                Add Grocery
              </button>
            </form>
            <div className="text-left">
              <table className="table">
                <thead className="text-secondary">
                  <tr>
                    <th style={{ width: '33%' }}>Item</th>
                    <th style={{ width: '33%' }}>Quantity</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.groceries.length > 0 ? (
                    this.state.groceries
                      .map(grocery => (
                        <Grocery
                          {...grocery}
                          key={grocery.id}
                          deleteItem={this.deleteItem}
                        />
                      ))
                      .reverse()
                  ) : (
                    <tr>
                      <td colSpan="2">No items!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function Grocery({ item, quantity, id, deleteItem }) {
  return (
    <tr>
      <td>{item}</td>
      <td>{quantity}</td>
      <td>
        <button
          type="button"
          className="btn-sm btn-outline-danger"
          onClick={e => deleteItem(e, id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default App
