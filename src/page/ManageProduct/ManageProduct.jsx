import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ProductCard from "./ProductCard";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const ManageProduct = () => {
  const [addedItem, setAddedItem] = useState([]);
const { user } = useContext(AuthContext);
  console.log(addedItem);

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
    <div>
      <div className="drawer z-40 absolute top-20">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  mt-3 pl-3">
        {/* Your existing drawer content */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Open dashboard
        </label>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {user.role == "admin" && (
            <li>
              <NavLink
                to="/manageProduct"
                className={({ isActive }) =>
                  isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
                }
              >
                Manage Product
              </NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
                }
              >
                My Schedules
              </NavLink>
            </li>
          )}
          {user.role == "admin" && (
            <li>
              <NavLink
                to="/addProduct"
                className={({ isActive }) =>
                  isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
                }
              >
                Add Product
              </NavLink>
            </li>
          )}
          {user.role == "admin" && (
            <li>
              <NavLink
                to="/addCategory"
                className={({ isActive }) =>
                  isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
                }
              >
                Add Category
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
    <div className="container mx-auto my-8">
      <Helmet>
        <title>FASHION | Manage Service</title>
      </Helmet>
      {addedItem.length === 0 ? (
        <p>You Have No Service Available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2">
          {addedItem.map((itemDetails, index) => (
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
