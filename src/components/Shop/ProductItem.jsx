import { useDispatch } from 'react-redux';

import { cartActions } from '../../store/cart-slice';

import classes from './ProductItem.module.css';

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const { title, price, brand, id, thumbnail, stock } = props.product;

  function addToCartHandler() {
    console.log(brand, stock);
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        brand,
        price,
      })
    );
  }

  return (
    <div className={classes.container_c}>
      <div className='left_s'>
        <div className='name'>
          <span>{brand}</span>
          <span>{title}</span>
          {stock < 50 && <span>HurryUp Only few Items left </span>}
        </div>
        <span>{price}$</span>
        <button onClick={addToCartHandler}>Add to Cart</button>
      </div>
      <img src={thumbnail} alt='product Image' className='img-p' />
    </div>
  );
};

export default ProductItem;
