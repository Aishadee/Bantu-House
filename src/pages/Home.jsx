import React, { useState, useEffect } from "react";

import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import heroImg from "../assets/images/finedining.jpg";
import "../styles/hero-section.css";

import { Link } from "react-router-dom";

import Category from "../components/UI/category/Category.jsx";

import "../styles/Home.css";

import featureImg01 from "../assets/images/service-01.png";
import featureImg02 from "../assets/images/service-02.png";
import featureImg03 from "../assets/images/service-03.png";

import foodCategoryImg01 from "../assets/images/hamburger.png";
import foodCategoryImg02 from "../assets/images/pizza.png";
import foodCategoryImg03 from "../assets/images/bread.png";
import ProductCard from "../components/UI/product-card/ProductCard.jsx";
import whyImg from "../assets/images/location.png";
import networkImg from "../assets/images/luxury.jpg";
import TestimonialSlider from "../components/UI/slider/TestimonialSlider.jsx";
import { database } from '../firebaseconfig';
import { ref,onValue } from 'firebase/database';

const featureData = [
  {
    title: "Quick Delivery",
    imgUrl: featureImg01,
    desc: "No matter where you are, we are willing to serve you.",
  },

  {
    title: "Super Dine In",
    imgUrl: featureImg02,
    desc: "Experience quick service, quality food and great vibe.",
  },
  {
    title: "Easy Pick Up",
    imgUrl: featureImg03,
    desc: "Order at home, pick up while hot",
  },
];

const Home = () => {
  const [category, setCategory] = useState("ALL");
  const [allProducts, setAllProducts] = useState([]);
  const productsRef = ref(database, 'products');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    onValue(productsRef, (snapshot) => {
        const data = snapshot.val();
        setAllProducts(Object.values(data))
        setProducts(Object.values(data))
      });
  }, [])


  useEffect(() => {
    if (category === "ALL") {
      setProducts(allProducts);
    }
    else{
      const filteredProducts = allProducts.filter(
        (item) => item.category === category
      );

      setProducts(filteredProducts);
    };

   
  }, [category]);

  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content  ">
                <h5 className="mb-3">Easy way to make an order</h5>
                <h1 className="mb-4 hero__title">
                 <span>HUNGRY?</span>Lets' change that!
                </h1>

                <p>
                  Come experience the best luxury and fine dining restaurant.
                </p>

                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn d-flex align-items-center justify-content-between">
                  <Link to="/foods">Order now</Link> <i class="ri-arrow-right-s-line"></i>
                  </button>
                  <button className="order__btn d-flex align-items-center justify-content-between">
                  <Link to="/tables">Book a Table</Link> <i class="ri-arrow-right-s-line"></i>
                  </button>
                </div>

                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i class="ri-car-line"></i>
                    </span>{" "}
                    No shipping charge
                  </p>

                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i class="ri-shield-check-line"></i>
                    </span>{" "}
                    100% secure checkout
                  </p>
                </div>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              {/* <h5 className="feature__subtitle mb-4">What we serve</h5>
              <h2 className="feature__title">Just sit back </h2> */}
              {/* <h2 className="feature__title">
                we will <span>take care</span>
              </h2> */}
              <p className="mb-1 mt-4 feature__text">
                {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, */}
                {/* officiis? */}
              </p>
              <p className="feature__text">
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. */}
                {/* Aperiam, eius.{" "} */}
              </p>
            </Col>

            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature__item text-center px-5 py-3">
                  <img
                    src={item.imgUrl}
                    alt="feature-img"
                    className="w-25 mb-3"
                  />
                  <h5 className=" fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2>Menu</h2>
            </Col>

            <Col lg="12">
              <div className="food__category d-flex align-items-center justify-content-center gap-4">
                <button
                  className={`all__btn  ${
                    category === "ALL" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("ALL")}
                >
                  All
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "Starters" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("Starters")}
                >
                  Starters
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "Specials" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("Specials")}
                >
                  Specials
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "Drinks" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("Drinks")}
                >
                  Drinks
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "Sides" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("Sides")}
                >
                  Sides
                </button>
              </div>
            </Col>

            {products.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="why__choose-us">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyImg} alt="why-tasty-treat" className="w-100" />
            </Col>

            <Col lg="6" md="6">
              <div className="why__tasty-treat">
                <h2 className="tasty__treat-title mb-4">
                  Why <span>Bantu House?</span>
                </h2>
                <p className="tasty__treat-desc">
                  Bantu House is afro-carribbean fusion that serves our customers
                  a perfect blend of both the African and Carribbean culture.
                </p>

                <ListGroup className="mt-4">
                  <ListGroupItem className="border-0 ps-0">
                    <p className=" choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i> Fresh and tasty
                      foods
                    </p>
                    <p className="choose__us-desc">
                      From the first step in and the tasty servings we offer we guarantee
                      that you will fall in love.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i> Quality support
                    </p>
                    <p className="choose__us-desc">
                      Experience quick service, quality food and great vibe
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i>Order from any
                      location{" "}
                    </p>
                    <p className="choose__us-desc">
                      No matter where you are, we are willing to serve you.
                    </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>


      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial ">
                <h5 className="testimonial__subtitle mb-4">Testimonial</h5>
                <h2 className="testimonial__title mb-4">
                  What our <span>customers</span> are saying
                </h2>
                <p className="testimonial__desc">
                The location is certainly special and everything about the restaurant experience matched the excellence. 
                Great food. Great service. Great drinks. 5 star worthy across the board.
                </p>

                <TestimonialSlider />
              </div>
            </Col>

            <Col lg="6" md="6">
              <img src={networkImg} alt="testimonial-img" className="w-100" height="400" />
      
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
