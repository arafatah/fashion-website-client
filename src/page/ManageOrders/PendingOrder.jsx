import React, { useState, useEffect } from "react";

const CancelledOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("pending"); // State to track the selected status

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://mern-ecom-backend-henna.vercel.app/api/order?status=${selectedStatus}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data.data);
        setOrders(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [selectedStatus]); // Fetch orders whenever the selected status changes

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://mern-ecom-backend-henna.vercel.app/api/order/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      // After successfully updating the status, refetch orders
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div>
        <label htmlFor="status">Select Status:</label>
        <select id="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="canceled">Canceled</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Product Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <React.Fragment key={index}>
              <tr>
                <td colSpan="5"><strong>{order.customerName}</strong></td>
              </tr>
              {order?.products?.map((product, productIndex) => (
                <tr key={productIndex}>
                  <td></td>
                  <td>{product.productId?.title}</td>
                  <td>{product.productId?.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button onClick={() => handleChangeStatus(order._id, "canceled")}>Cancel</button>
                    <button onClick={() => handleChangeStatus(order._id, "delivered")}>Deliver</button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CancelledOrders;