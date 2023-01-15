import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';

import './App.css';
import Header from './components/Header/Header.component';
import Hero from './components/Header/Hero.component';
import Footer from './components/Footer/Footer.component';
import Slider from './components/Slider/Slider.component';
import Products from './components/Shop/Products';
import { sendCartData, fetchCartData } from './store/cart-actions';
import Cart from './components/Cart/Cart';
import Notification from './components/UI/Notification';

let renderer = 1;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (renderer <= 2) {
      renderer++;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  return (
    <div className='App'>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Header />
      <Fragment>{showCart && <Cart />}</Fragment>
      <Hero />
      <Slider />
      <Products />
      <Footer />
    </div>
  );
}

export default App;
