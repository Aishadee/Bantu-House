import React from "react";

import "../../../styles/product-card.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

const ProductCard = (props) => {
  const { id, name, image1, price } = props.item;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        name,
        image1,
        price,

      })
    );
  };

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={image1} alt="product-img" className="w-50" width="100" height="100" />
      </div>

      <div className="product__content">
        <h5>
          {/* <Link to={`/foods/${id}`}>{name}</Link> */}
        </h5>
        <div className="align-items-center justify-content-between ">
          <div>
          <p className="">{name}</p>
          <span className="">${price}</span>
          </div>
          <button className="addTOCart__btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
