import React, { useEffect, useState } from 'react';
import { auth, database } from '../firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { set, ref, push, onValue } from 'firebase/database';

export const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({});
    const productsRef = ref(database, 'products');
    const ordersRef = ref(database, 'orders');
    const reservationsRef = ref(database, 'reservations');
    const [products, setProducts] = useState([]);
    const [ orders, setOrders ] = useState([]);
    const [ reservations, setReservations ] = useState([]);

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setUser(user)
          // ...
        } else {
          // User is signed out
          // ...
          window.location.href="/login"
        }
      });

      const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        const productRef = push(productsRef);
        set(productRef, {
           ...form
        });
      }
      useEffect(() => {
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            setProducts(Object.values(data))
          });

          onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();
            setOrders(Object.values(data))
          });

          onValue(reservationsRef, (snapshot) => {
            const data = snapshot.val();
            setReservations(Object.values(data))
          });

      }, [])
      

    return (
        <div className='container'>
            <p>Hello {user?.email},</p>
            <h3>Products</h3>
            <div>
                {showForm ? 
                <form onSubmit={handleSubmit} style={{margin:10}}>
                    <div style={{margin:10}}>
                    <label>Product Name</label>
                    <input name="name" onChange={handleChange} type={"text"} placeholder="Name" />
                    </div>
                    <div style={{margin:10}}>
                    <label>Product Price (USD)</label>
                    <input name='price' onChange={handleChange} type={"number"} placeholder="Price" />
                    </div>
                    <div style={{margin:10}}>
                    <label>Product Cateogry</label>
                    <select name="category" onChange={handleChange}>
                        <option></option>
                        <option value={"Drinks"}>Drinks</option>
                        <option value={"Sides"}>Sides</option>
                        <option value={"Specials"}>Specials</option>
                        <option value={"Starters"}>Starters</option>
                    </select>
                    </div>
                    <div style={{margin:10}}>
                        <label> Image Link 1</label>
                        <input onChange={handleChange} name="image1" type={"text"} placeholder="Name" />
                    </div>
                    <div style={{margin:10}}>
                        <label> Image Link 2</label>
                        <input onChange={handleChange} name="image2" type={"text"} placeholder="Name" />
                    </div>
                    <div style={{margin:10}}>
                        <label> Image Link 3</label>
                        <input onChange={handleChange} name="image3" type={"text"} placeholder="Name" />
                    </div>
                    <div style={{margin:10}}>
                    <label>Product description</label>
                    <input name='desc' onChange={handleChange} type={"text"} placeholder="Desc" />
                    </div>
                    <button type='submit'>Save</button>
                </form> : <button onClick={() => setShowForm(true)}>Add New Product</button>}
            </div>
            <table className='table'>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                {products.map((product, idx) =>
                    <tr key={`${idx+1}`}>
                    <td>{idx+1}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td><img src={product.image1} alt="Product image" width={50} height={50} /></td>
                    </tr>
                )}
                </tbody>
            </table>

            <h3>Orders</h3>
            <table className='table'>
                <thead>
                <tr>
                <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Order Type</th>
                    <th>Delivery Address</th>
                    <th>Products</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, idx) =>
                    <tr key={`${idx+1}`}>
                    <td>{idx+1}</td>
                    <td>{order.name}</td>
                    <td>${order.totalAmount}</td>
                    <td>{order.order_type}</td>
                    <td>{`${order?.country} ${order?.state || ''} ${order?.street_address}`}</td>
                    <td>{order.products?.length}</td>
                    </tr>
                )}
                {/* {products.map((product, idx) => 
                    <tr key={`${idx+1}`}>
                    <td>{idx+1}</td>
                    <td>{product.name}</td>
                    </tr>
                )} */}



                </tbody>
            </table>
            
            <h3>Reservations</h3>
            <table className='table'>
                <thead>
                <tr>
                <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Table Size</th>
                </tr>
                </thead>
                <tbody>
                {reservations.map((reservation, idx) =>
                    <tr key={`${idx+1}`}>
                    <td>{idx+1}</td>
                    <td>{reservation.name}</td>
                    <td>{reservation.phone}</td>
                    <td>{reservation.date}</td>
                    <td>{reservation.time}</td>
                    <td>{reservation.table_size}</td>
                    </tr>
                )}
                </tbody>
            </table>
            
        </div>
    )
}

export default Dashboard;