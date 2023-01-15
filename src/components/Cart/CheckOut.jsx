import classes from './CheckOut.module.css';

import useValidation from '../../hooks/useValidation';

const CheckOut = (props) => {
  const isEmpty = (value) => value.trim() !== '';
  const isFiveChars = (value) => value.trim().length === 6;

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useValidation(isEmpty);

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useValidation(isEmpty);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useValidation(isEmpty);

  const {
    value: enteredPostalCode,
    isValid: enteredPostalIsValid,
    hasError: postalInputHasError,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostal,
  } = useValidation(isFiveChars);

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredCityIsValid &&
    enteredPostalIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
    resetName();
    resetStreet();
    resetPostal();
    resetCity();
  };

  const nameInputClasses = `${classes.control} ${
    !nameInputHasError ? '' : classes.invalid
  }`;

  const streetInputClasses = `${classes.control} ${
    !streetInputHasError ? '' : classes.invalid
  }`;
  const cityInputClasses = `${classes.control} ${
    !cityInputHasError ? '' : classes.invalid
  }`;
  const postalInputClasses = `${classes.control} ${
    !postalInputHasError ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className='error-text'>Please enter a valid name!</p>
        )}
      </div>

      <div className={streetInputClasses}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
        {streetInputHasError && (
          <p className='error-text'>Please enter a valid Street!</p>
        )}
      </div>

      <div className={cityInputClasses}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
        {cityInputHasError && (
          <p className='error-text'>Please enter a valid City!</p>
        )}
      </div>

      <div className={postalInputClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input
          type='text'
          id='postal'
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
          value={enteredPostalCode}
          maxLength='6'
        />
        {postalInputHasError && (
          <p className='error-text'>Please enter a valid Postal!</p>
        )}
      </div>

      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid}>Confirm</button>
        {/*  */}
      </div>
    </form>
  );
};

export default CheckOut;
