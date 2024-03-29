import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ProductCard from "./ProductCard";
import MainDashboard from "../../Components/Navbar/MainDashboard";

const ManageProduct = () => {
  const [addedItem, setAddedItem] = useState([]);

  useEffect(() => {
    fetch(`https://mern-ecom-backend-henna.vercel.app/api/product/`)
      .then((res) => res.json())
      .then((data) => {
        setAddedItem(data.data);
      });
  }, []);

  const handleDelete = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");

        fetch(
          `https://mern-ecom-backend-henna.vercel.app/api/product/${itemId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.deletedCount === 1) {
              setAddedItem((prevCartItems) =>
                prevCartItems.filter((item) => item._id !== itemId)
              );
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="flex">
      <div>
        <MainDashboard></MainDashboard>
      </div>
      <div className="md:w-[1290px] ml-4 md:mx-4 md:my-6">
        <Helmet>
          <title>AN NOOR | Manage Service</title>
        </Helmet>
        {addedItem.length === 0 ? (
          <p>You Have No Service Available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2">
            {addedItem?.products?.map((itemDetails, index) => (
              <ProductCard
                key={index}
                itemDetails={itemDetails}
                handleDelete={handleDelete}
              ></ProductCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProduct;
