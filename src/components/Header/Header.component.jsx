import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import Logo from '../../assets/logo.png';
import { CgShoppingBag } from 'react-icons/cg';
import { GoThreeBars } from 'react-icons/go';

import { uiActions } from '../../store/ui-slice';

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const dispatch = useDispatch();
  const cartQuantity = useSelector(
    (state) => state.cart.totalQuantity
  );

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  const toggleMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <img src={Logo} alt='Company Logo' />
        <span>E - Commerce App</span>
      </div>
      <div className={classes.nav}>
        <GoThreeBars className={classes.bars} onClick={toggleMenu} />

        <ul
          className={classes.menu}
          style={{ display: showMenu ? 'inherit' : 'none' }}
        >
          <li className={classes.item}>Category</li>
          <li className={classes.item}>Brands</li>
          <li className={classes.item}>Sort</li>
        </ul>
        <input
          type='text'
          className={classes.search}
          placeholder='Search'
        />
        <CgShoppingBag
          className={classes.cart}
          onClick={toggleCartHandler}
        >
        </CgShoppingBag>
          <span className={classes.badge}>{cartQuantity}</span>

        {/* {showCart && <Cart />} */}
      </div>
    </div>
  );
};

export default Header;
