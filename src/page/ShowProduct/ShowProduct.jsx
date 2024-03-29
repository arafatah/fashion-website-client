import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import Rating from "react-rating-stars-component";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../api/api";
import { DotLoader } from "react-spinners";

const ShowProduct = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
    select: (data) => {
      return data.data;
    },
  });
  return (
    <div className="mx-3 md:mx-20 lg:mx-36">
      <Helmet>
        <title>AN NOOR | HOME</title>
      </Helmet>
      <div className="py-6">
        <h1 className="text-2xl font-semibold mb-4">NEW ARRIVALS</h1>
        {isLoading && (
          <div className="mx-auto h-[500px]">
            <div className="flex items-center justify-center ">
              <div className="flex flex-col items-center">
                <div>
                  <DotLoader color="#36d7b7" />
                </div>
                {/* <p className="mt-4 text-gray-700">Loading...</p> */}
              </div>
            </div>
          </div>
        )}
        {products && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6   gap-4">
            {products?.data?.products
              ?.slice(0, 12)
              .map((productDetail, index) => (
                <div
                  key={index}
                  className={`bg-white p-4 !h-[450px] rounded-lg shadow-md col-span-1 relative overflow-hidden ${
                    index >= 15 ? "hidden" : ""
                  }`}
                  style={{
                    height: "400px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="group flex-grow">
                    <div className="relative overflow-hidden aspect-w-1 aspect-h-1 group-hover:scale-105 transition-transform">
                      <Link to={`/showProduct/${productDetail?._id}`}>
                        <img
                          src={productDetail?.image}
                          alt={productDetail?.yourName}
                          className="w-full h-[200px] sm:h-[250px] object-cover rounded-md"
                        />
                      </Link>
                    </div>
                    <Link
                      to={`/showProduct/${productDetail?._id}`}
                      className="text-base text-deep-orange-900 font-semibold 
                    hover:text-deep-orange-700 transition duration-300 ease-in-out
                  mt-2 flex justify-center overflow-hidden"
                      style={{ height: "50px" }}
                    >
                      {productDetail?.title}
                    </Link>

                    <div className="flex justify-center">
                      <Rating
                        value={productDetail?.averageRating}
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        edit={false}
                      />
                    </div>

                    <div className="flex justify-center mb-2">
                      <h3 className="text-sm font-medium mx-3 text-green-500">
                        ৳ {productDetail?.price}
                      </h3>
                    </div>

                    <div className="flex justify-center mb-2">
                      <h2
                        className="text-xs text-black overflow-hidden"
                        style={{ height: "20px" }}
                      >
                        {productDetail?.companyName}
                      </h2>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0">
                      <Link
                        to={`/showProduct/${productDetail?._id}`}
                        className="text-center py-2 flex justify-center items-center rounded-md bg-blue-400 text-white hover:bg-indigo-700 transition duration-300 ease-in-out"
                        style={{ marginTop: "auto" }}
                      >
                        <h1 className="text-sm md:text-xs md:font-semibold">
                          Show details
                        </h1>
                        <FaArrowRightLong className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* {products?.data.length > 0 && ( */}
        <div className="flex justify-center mt-10">
          <Link
            to="/Products"
            className="bg-[#349234] text-white px-3 py-1.5 rounded-md  font-semibold  transition duration-300 ease-in-out"
          >
            Show All Products
          </Link>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default ShowProduct;
