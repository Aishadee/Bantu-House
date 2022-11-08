import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { database } from '../firebaseconfig';
import { set, ref, push, onValue } from 'firebase/database';
import "../styles/Checkout.css";
import { toast } from 'react-toastify';

const tables = [
  {
    size:2,
    openings: ["10:00AM", "11:00PM", "12:00PM", "2:00PM", "3:00PM", "5:00PM", "6:00PM", "10:00PM"]
  },
  {
    size:4,
    openings: ["10:00AM", "1:00PM", "3:00PM", "5:00PM", "9:00PM"]
  },
  {
    size:6,
    openings: ["10:00AM", "11:00PM", "12:00PM", "2:00PM", "3:00PM", "5:00PM", "6:00PM", "10:00PM"]
  },
  {
    size:10,
    openings: ["8:00AM", "12:00PM", "4:00PM", "8:00PM"]
  },
  {
    size:15,
    openings: ["8:00AM", "2:00PM", "5:00PM", "10:00PM"]
  }
]

const Table = () => {
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const reservationsRef = ref(database, 'reservations');
  const [selectedTable, setSelectedTable] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();
    const userShippingAddress = {
      name: enterName,
      email: enterEmail,
      phone: enterNumber,
      date,
      time,
      table_size: tables[selectedTable].size,
    };
    const reservationRef = push(reservationsRef);
    set(reservationRef, {
           ...userShippingAddress
    });
    toast.success("Reservation placed successfully!")
  };

  const currentTableOpening = tables[selectedTable].openings

  return (
    <Helmet title="Reserve Table">
      <CommonSection title="Reserve a table" />
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
                
                <>
                <div className="form__group">
                  <input
                    type="date"
                    placeholder="Date"
                    required
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                

                  <div className="form__group">
                  <select onChange={(e) => setSelectedTable(e.target.value)}>
                    <option>Select Table Size</option>
                    {tables.map((table, idx) =>
                      <option key={`${idx}`} value={idx}>{table.size}</option>
                    )}
                  </select>
                </div>
                
                <div className="form__group">
                  <select onChange={(e) => setTime(e.target.value)}>
                    <option>Available times</option>
                    {currentTableOpening.map((opening, idx) =>
                      <option key={`${idx}`} value={opening}>{opening}</option>
                    )}
                  </select>
                </div>
                </>
                <br />
                <button type="submit" className="addTOCart__btn">
                  Reserve
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Table;
