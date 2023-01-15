import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';

import classes from './Cart.module.css';
import CartItem from './CartItem';
import CheckOut from './CheckOut';
import useFetch from './../../hooks/useFetch';
import { cartActions } from '../../store/cart-slice';
import { uiActions } from '../../store/ui-slice';
import Modal from './../UI/Modal';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const { isLoading, sendHttpRequest: sendTaskRequest } = useFetch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const hasItems = cartItems.length > 0;

  const submitOrderHandler = async (orderData) => {
    sendTaskRequest({
      url: 'https://react--http-f960e-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        userOrder: orderData,
        orderedItems: cartItems.items,
      },
    });
    setRequestSubmitted(true);
    dispatch(cartActions.clearCart());
  };

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const displayCartItems = (
    <ul className={classes['cart-items']}>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={{
            id: item.id,
            title: item.title,
            brand: item.brand,
            quantity: item.quantity,
            total: item.totalPrice,
            price: item.price,
            stock: item.stock,
          }}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button
        className={classes['button--alt']}
        onClick={toggleCartHandler}
      >
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {!isCheckout && displayCartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount} $</span>
      </div>
      {isCheckout && (
        <CheckOut
          onSubmit={submitOrderHandler}
          onCancel={toggleCartHandler}
        />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={toggleCartHandler}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose = {toggleCartHandler}>
      {!isLoading && !requestSubmitted && cartModalContent}
      {isLoading && requestSubmitted && <p>Sending order data...</p>}
      {!isLoading && requestSubmitted && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
