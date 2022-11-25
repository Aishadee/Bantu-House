import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { database } from '../firebaseconfig';
import { set, ref, push, onValue } from 'firebase/database';
import "../styles/Checkout.css";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

const Checkout = () => {
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [enterStreet, setEnterStreet] = useState("");
  const [attendees, setAttendees] = useState("");
  const [date, setDate] = useState("");
  const [state, setState] = useState("");
  const [showOrderType, setShowOrderType] = useState(true);
  const [orderType, setOrderType] = useState("");
  const [time, setTime] = useState("");
  const ordersRef = ref(database, 'orders');
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = orderType === "delivery" ? 30 : 0;
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = cartTotalAmount + Number(shippingCost);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const userShippingAddress = {
      name: enterName,
      email: enterEmail,
      phone: enterNumber,
      country: enterCountry,
      city: enterCity,
      state,
      street_address: enterStreet,
      zip_code: postalCode,
      date,
      time,
      attendees,
      order_type: orderType,
      products: cartProducts,
      totalAmount
    };
    const orderRef = push(ordersRef);
    set(orderRef, {
           ...userShippingAddress
    });
    if(orderType === "delivery") {
      toast.success("Order placed successfully, will be out in 40mins!")
    }else {
      toast.success("Order placed successfully!")
    }
    dispatch(cartActions.emptyCart())
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    onChange={(e) => setEnterName(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    onChange={(e) => setEnterEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Phone number"
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>
                <span onClick={() => { setOrderType("delivery"); setShowOrderType(true)}} style={{margin:10, fontSize:14, border: orderType === "delivery" ? '1px solid red' : '', padding: 5, }}>Delivery</span>
                <span onClick={() => { setOrderType("dine-in"); setShowOrderType(true)}} style={{margin:10, fontSize:14, border: orderType === "dine-in" ? '1px solid red' : '', padding: 5, }}>Dine-in</span>
                <span onClick={() => { setOrderType("pick-up"); setShowOrderType(true)}} style={{margin:10, fontSize:14, border: orderType === "pick-up" ? '1px solid red' : '', padding: 5, }}>Pick-up</span>
                {showOrderType && orderType === "delivery" ? 
                <>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Street Address"
                    required
                    onChange={(e) => setEnterStreet(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Country"
                    required
                    onChange={(e) => setEnterCountry(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="State"
                    required
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    onChange={(e) => setEnterCity(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Zip code"
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                </> 
                : showOrderType && orderType === "dine-in" ?
                <>
                  <div className="form__group">
                  <input
                    type="number"
                    placeholder="Attendees"
                    required
                    onChange={(e) => setAttendees(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="date"
                    placeholder="Date"
                    required
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="time"
                    placeholder="Date"
                    required
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                </> : null 
                }
                <br />
                <button type="submit" className="addTOCart__btn">
                  Payment
                </button>
              </form>
            </Col>

            <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal: <span>${cartTotalAmount}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Delivery: <span>${shippingCost}</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>${totalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
