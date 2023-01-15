import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from './ProductItem';
import classes from './Products.module.css';
import useFetch from './../../hooks/useFetch';
import Arrow from '../../assets/plane.png';
import { productActions } from './../../store/product-slice';

const Products = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [sortType, setSortType] = useState('price');
  const [filterCriteria, setFilterCriteria] = useState({});
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const {
    isLoading,
    error,
    sendHttpRequest: fetchProductsRequest,
  } = useFetch();

  const categoryRef = useRef('');

  useEffect(() => {
    const processProducts = (dataObj) => {
      const receivedProducts = dataObj.products;
      const receivedCategories = [];
      const receivedBrands = [];
      for (const key in dataObj.products) {
        if (
          !receivedCategories.includes(dataObj.products[key].category)
        ) {
          receivedCategories.push(dataObj.products[key].category);
        }
      }
      for (const key in dataObj.products) {
        if (!receivedBrands.includes(dataObj.products[key].brand)) {
          receivedBrands.push(dataObj.products[key].brand);
        }
      }
      setBrands(receivedBrands);
      setCategories(receivedCategories);
      dispatch(productActions.loadProducts(receivedProducts));
      setDisplayProducts(receivedProducts);
    };

    fetchProductsRequest(
      {
        url: 'https://dummyjson.com/products?limit=100',
      },
      processProducts
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProductsRequest]);

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        price: 'price',
        rating: 'rating',
        discount: 'discountPercentage',
      };
      const sortProperty = types[type];
      const sorted = [...displayProducts].sort(
        (a, b) => b[sortProperty] - a[sortProperty]
      );
      setDisplayProducts(sorted);
    };

    sortArray(sortType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  useEffect(() => {
    const filterArray = (type, value) => {
      setDisplayProducts(
        products.filter((product) => product[type] === value)
      );
    };

    filterArray(filterCriteria.type, filterCriteria.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCriteria]);

  const categoryFilterHandler = (event) => {
    setFilterCriteria({
      type: 'category',
      value: event.target.value,
    });
  };

  const brandFilterHandler = (event) => {
    setFilterCriteria({
      type: 'brand',
      value: event.target.value,
    });
  };

  const sortHandler = (event) => {
    setSortType(event.target.value);
    console.log(sortType);
  };

  const categoryOptionItems = categories.map((category) => (
    <option value={category} key={category}>
      {category}
    </option>
  ));
  const brandOptionItems = brands.map((brand) => (
    <option value={brand} key={brand}>
      {brand}
    </option>
  ));

  let content = (
    <>
      <ul className={classes.menu}>
        <li onClick={() => setDisplayProducts(products)}>All</li>
        <li className='category'>
          Category
          <select
            ref={categoryRef}
            className={classes.dropdown}
            onChange={categoryFilterHandler}
          >
            <option value=''></option>
            {categoryOptionItems}
          </select>
        </li>
        <li>
          Brands
          <select
            className={classes.dropdown}
            onChange={brandFilterHandler}
          >
            <option value=''></option>
            {brandOptionItems}
          </select>
        </li>
        <li>
          Sort
          <select className={classes.dropdown} onChange={sortHandler}>
            <option value=''></option>
            <option value='price'>Price</option>
            <option value='rating'>Rating</option>
            <option value='discount'>Discount</option>
          </select>
        </li>
      </ul>
      <div className={classes.list}>
        {displayProducts.map((product) => (
          <ProductItem
            key={product.id}
            product = {product}
          />
        ))}
      </div>
    </>
  );

  if (products.length <= 0) content = <p> No Products Found... </p>;

  if (error) {
    content = (
      <button onClick={fetchProductsRequest}>Try again</button>
    );
  }

  if (isLoading) {
    content = 'Loading Products...';
  }

  return (
    <div className={classes.container}>
      <img src={Arrow} alt='' />
      <h1>Buy Your Favorite Products</h1>

      <div className={classes.products}>{content}</div>
    </div>
  );
};

export default Products;
