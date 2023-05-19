import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./Order.css";
import Modal from "../Modal/Modal";
import { v4 as uuidv4 } from "uuid";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carts: [],
      activeCartId: null,
      isModalOpen: false,
      activeCart: {},
      filteredCartStatus: "all",
    };
  }

  addToOrder = (cart) => {
    const updatedCart = {
      ...cart,
      status: "In Progress",
      id: uuidv4(),
    };

    this.setState(
      (prevState) => ({
        carts: [...prevState.carts, updatedCart],
      }),
      () => {
        console.log(this.state.carts);
      }
    );
  };

  handleCartClick = (cartId) => {
    const { carts } = this.state;
    const activeCart = carts.find((cart) => cart.id === cartId);

    this.setState(
      {
        activeCartId: cartId,
        isModalOpen: true,
        activeCart: activeCart,
      },
      () => {
        console.log("activeCartItems", this.state.activeCartItems);
      }
    );
  };

  updateCartStatusCompleted = (cartId) => {
    const { carts } = this.state;
    const cart = carts.find((cart) => cart.id === cartId);
    cart.status = "Completed";
    this.setState({
      isModalOpen: false,
      carts: carts,
      activeCart: {},
    });
  };

  updateCartStatusCancelled = (cartId) => {
    const { carts } = this.state;
    const cart = carts.find((cart) => cart.id === cartId);
    cart.status = "Cancelled";
    this.setState({
      carts: carts,
      isModalOpen: false,
      activeCart: {},
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      activeCart: {},
    });
  };

  render() {
    const { filteredCartStatus, activeCartId, activeCart, isModalOpen, carts } =
      this.state;
    let filteredCarts = [];
    if (filteredCartStatus === "all") {
      filteredCarts = carts;
    } else if (filteredCartStatus === "completed") {
      filteredCarts = carts.filter((cart) => cart.status === "Completed");
    } else if (filteredCartStatus === "cancelled") {
      filteredCarts = carts.filter((cart) => cart.status === "Cancelled");
    } else if (filteredCartStatus === "inProgress") {
      filteredCarts = carts.filter((cart) => cart.status === "In Progress");
    }

    return (
      <div className="container">
        <h2>
          <FormattedMessage id="order.title" defaultMessage="Order" />
        </h2>
        <div className="row mb-3">
          <div className="col-md-12">
            <button
              className={`btn ${
                filteredCartStatus === "all" ? "btn-primary" : "btn-secondary"
              } mr-2`}
              onClick={() => this.setState({ filteredCartStatus: "all" })}
              filteredCartStatus
            >
              Show All Carts
            </button>
            <button
              className={`btn ${
                filteredCartStatus === "completed"
                  ? "btn-primary"
                  : "btn-secondary"
              } mr-2`}
              onClick={() => this.setState({ filteredCartStatus: "completed" })}
            >
              Show Completed Carts
            </button>
            <button
              className={`btn ${
                filteredCartStatus === "cancelled"
                  ? "btn-primary"
                  : "btn-secondary"
              } mr-2`}
              onClick={() => this.setState({ filteredCartStatus: "cancelled" })}
            >
              Show Cancelled Carts
            </button>
            <button
              className={`btn ${
                filteredCartStatus === "inProgress"
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() =>
                this.setState({ filteredCartStatus: "inProgress" })
              }
            >
              Show In Progress Carts
            </button>
          </div>
        </div>
        <div className="row">
          {(filteredCarts || this.state.carts).map((cart, index) => (
            <div key={index} className="col-md-4 mt-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Cart #{index + 1}</h5>
                  <div>Status: {cart.status}</div>{" "}
                </div>
                <div className="card-body">
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handleCartClick(cart.id)}
                  >
                    Show Items
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isModalOpen && (
          <Modal
            activeCartId={activeCartId}
            activeCart={activeCart}
            isModalOpen={isModalOpen}
            closeModal={this.closeModal}
            updateCartStatusCompleted={this.updateCartStatusCompleted}
            updateCartStatusCancelled={this.updateCartStatusCancelled}
          />
        )}
      </div>
    );
  }
}

export default Order;