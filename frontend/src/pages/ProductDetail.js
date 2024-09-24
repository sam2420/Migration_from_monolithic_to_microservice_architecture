import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { onGetProductDetails, onAddToWishlist, onAddToCart, onRemoveFromWishlist, onRemoveFromCart } from '../store/actions'

const ProductDetails = () => {

  const { id } = useParams();

  const { currentProduct } = useSelector(state => state.shoppingReducer) || {};
  const { wishlist, cart } = useSelector(state => state.userReducer) || {};

  // Add a check to ensure currentProduct is defined before destructuring its properties

  const dispatch = useDispatch();

  const [currentUnit, setCurrentUnit] = useState(0);
  const { _id, banner, available, price, name, desc, type } = currentProduct || {};

  // const { _id, banner, available, price, name, desc, type } = currentProduct;


  useEffect(() => {
    dispatch(onGetProductDetails(id))
  }, [id]);

  useEffect(() => {
    if (Array.isArray(cart) && cart.length) {
      const exist = cart.filter(({ product }) => product._id === _id);
      if (exist.length) {
        setCurrentUnit(exist[0].qty)
      }
    }

  }, [currentProduct])

  const setImage = () => {
    if (banner) {
      return banner
    } else {
      return 'placeholder.jpg'
    }
  }

  const addCart = () => {
    const newUnit = currentUnit + 1;
    setCurrentUnit(newUnit);
    dispatch(onAddToCart({ _id, qty: newUnit }));
  }

  const removeCart = () => {
    if (currentUnit > 0) {
      const newUnit = currentUnit - 1;
      setCurrentUnit(newUnit);
      if (newUnit > 0) {
        dispatch(onAddToCart({ _id, qty: newUnit }));
      } else {
        dispatch(onRemoveFromCart(_id));
      }
    }
  }

  const checkWishListExistence = () => {
    const exist = wishlist.find(item => item._id === _id);
    if (exist) {
      return <button className="btn btn-lg" style={{ backgroundColor: '#A7A7A7', color: 'white' }}
        onClick={() => dispatch(onRemoveFromWishlist(_id))}
      > Remove <i className="fas fa-heart"></i></button>;
    } else {
      return <button className="btn btn-lg" style={{ backgroundColor: '#FA5F8E', color: 'white' }}
        onClick={() => dispatch(onAddToWishlist(_id))}
      > Wishlist <i className="fas fa-heart"></i></button>;
    }
  }

  const checkCartExistence = () => {
    if (Array.isArray(cart) && cart.length) {
      const exist = cart.find(item => item.product && item.product._id === _id);
      if (exist) {
        return (
          <div className="col-auto" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <button className="btn bg-warning" onClick={() => removeCart()}>
              <i className="fas fa-minus"></i>
            </button>
            <span className="m-3" style={{ fontSize: '2.0rem' }}>{currentUnit}</span>
            <button className="btn bg-warning" onClick={() => addCart()}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
        );
      } else {
        return (
          <div className="col-auto">
            <button className="btn btn-lg bg-warning" onClick={() => addCart()}>
              Add <i className="fas fa-shopping-cart"></i>
            </button>
          </div>
        );
      }
    } else {
      return (
        <div className="col-auto">
          <button className="btn btn-lg bg-warning" onClick={() => addCart()}>
            Add <i className="fas fa-shopping-cart"></i>
          </button>
        </div>
      );
    }
  }


  return (
    <div className="container pt-5">
      <div className="row bg-white rounded">
        <div className="col-sm col-md-5 col-lg-5">
          <img variant="top" src={setImage()} style={{ width: '100%' }} />
        </div>
        <div className="col-sm col-md-7 col-lg-7">
          <div className="row p-3">
            <span style={{ fontSize: '1.5rem' }}>Category → <span className="font-weight-bold text-secondary">{type}</span></span>
          </div>
          <div className="row p-3">
            <span style={{ fontSize: 30, fontWeight: 'normal' }}> Price<span className="pl-2" style={{ fontSize: 30, fontWeight: 'bolder' }}>₹{price}</span></span>
          </div>
          <div className="row p-3">
            <p>{desc}</p>
          </div>
          <div className="row p-3">
            <p>Type of Product: <span className="text-secondary">{type}</span></p>
          </div>
          <div className="row p-3">
            <p style={{ fontSize: '0.9rem' }} className="text-secondary"> *Product will be available through standard delivery channel</p>
          </div>
          <div className="row mb-4">
            {checkCartExistence()}
            <div className="col" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              {checkWishListExistence()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProductDetails };
