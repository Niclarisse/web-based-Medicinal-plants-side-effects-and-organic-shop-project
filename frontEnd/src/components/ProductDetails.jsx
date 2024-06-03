import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { IoMdStar } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { HiOutlineMinus } from "react-icons/hi2";
import Button from "./Button";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import aboutImage from "../assets/images/product-1-1 (1).png";
import aboutImage1 from "../assets/images/download (2).png";
import aboutImage2 from "../assets/images/download (3).png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  fetchPlants,
  fetchSinglePlant,
} from "../redux/slices/plant/plantThunks";
import { Skeleton } from "antd";
import { api } from "../utils/helpers";
import { toastMessage } from "../utils/toast";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const ProductDetails = () => {
  const { plant, allplants, is_plants_loading } = useSelector(
    (state) => state.plants
  );
  const [currentImage, setCurrentImage] = useState(
    plant?.images && plant?.images[0]?.url
  );
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { plantId } = useParams();
  useEffect(() => {
    fetchSinglePlant(plantId)(dispatch);
  }, [plantId, dispatch]);

  useEffect(() => {
    if (plant?.images) {
      setCurrentImage(plant?.images[0]?.url);
    }
  }, [plant, plant?.images]);
  useEffect(() => {
    dispatch(fetchPlants());
  }, [dispatch]);
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  const onFinish = async (values) => {
    setLoading(true);
    console.log("Success:", values);

    await api
      .post("/user/cart", {
        cart: [
          {
            _id: plantId,
            count: count,
          },
        ],
      })
      .then((res) => {
        setLoading(false);
        toastMessage("success", res.statusText);
        // navigate("/cart");
        console.log("msg", res);
      })
      .catch((error) => {
        setLoading(false);
        errorHandler(error);
        console.log("msg errrr", error);
      });

    fetchCart()(dispatch);
  };
  return (
    <div className="w-full">
      <NavBar />
      <div className="flex justify-between w-full px-20 py-10 mt-36">
        <h1 className="text-2xl font-semibold text-center ">Plant Details</h1>
        <p className="text-lg font-normal">Home /Plant /Details</p>
      </div>
      <div className="w-[85%] m-auto md:flex gap-5 h-[40rem]">
        <div className=" w-full md:w-2/5 h-full">
          {" "}
          <div className="w-full h-[70%] flex items-center justify-center bg-gray-200">
            <img
              src={currentImage}
              alt=""
              className="w-[50%] h-[50%] rounded-md"
            />
          </div>
          <div className="w-full h-[25%] mt-2 bg-gray-200 rounded-sm flex gap-5 justify-center items-center">
            {plant?.images?.map((el) => {
              return (
                <img
                  src={el?.url}
                  onClick={() => {
                    el?.url && setCurrentImage(el?.url);
                  }}
                  alt=""
                  className="w-24 h-24 rounded-md border border-green-300"
                />
              );
            })}
          </div>
        </div>
        <div className="ml-10 w-full md:w-1/2 mt-10">
          <h1 className="text-base font-medium">Details about Plant</h1>
          <div className="flex gap-2 pt-3">
            <IoMdStar color="#FFBA00" size={20} />
            <IoMdStar color="#FFBA00" size={20} />
            <IoMdStar color="#FFBA00" size={20} />
            <IoMdStar color="#FFBA00" size={20} />
            <p>{plant?.totalrating} Review</p>
          </div>
          <div className="p-2 md:w-[55%] w-full mt-5">
            <h1 className="text-[#030229] font-medium text-2xl underline">
              {plant?.title}
            </h1>
            <p className="text-[#030229] font-medium text-md pt-3">
              Kinyarwanda Name
              <span className="font-medium text-sm pl-4">
                {" "}
                {plant?.kinyarwandaName}
              </span>
            </p>
            <p className="text-[#030229] font-medium text-md py-1">
              {" "}
              Scientific name:{" "}
              <span className="font-medium text-sm pl-4">
                {" "}
                {plant?.scientificName}
              </span>
            </p>
            <p className="text-[#030229] font-medium text-md py-[2px]">
              {" "}
              Common name:{" "}
              <span className="font-medium text-sm pl-4">
                {" "}
                {plant?.commonName}
              </span>
            </p>
            <p className="text-[#030229] font-medium text-md py-1">
              {" "}
              Total Price:{" "}
              <span className="font-bold text-xl pl-4">
                {" "}
                {plant?.price} RFW
              </span>
            </p>
            <p className="text-[#030229B2] text-sm pt-2">
              Family: <span className="pl-20">{plant?.slug} </span>
            </p>
            <p className="text-[#030229B2] text-sm py-1">
              Part to be used: <span className="pl-8">Leaves and stem </span>
            </p>
          </div>
          <div>Categories: {plant?.category}</div>
          <div className="flex gap-3 mt-2">
            <div className="flex items-center justify-center gap-2 border py-2 px-5 rounded-md">
              <button disabled={count <= 1} onClick={() => setCount(count - 1)}>
                <HiOutlineMinus size={20} className="cursor-pointer" />
              </button>
              <p className="px-4">{count}</p>
              <button>
                {" "}
                <GoPlus
                  size={20}
                  onClick={() => setCount(count + 1)}
                  className="cursor-pointer"
                />
              </button>
            </div>
            <Button
              name={
                loading ? (
                  <Spin
                    indicator={<LoadingOutlined spin size={25} color="black" />}
                    className="text-black"
                  />
                ) : (
                  "Add To Cart"
                )
              }
              color={"black"}
              width={"[50px]"}
              onClick={() => onFinish()}
            />
          </div>
        </div>
      </div>
      <div className="px-20 mt-[30rem] md:mt-5 lg:mts-[50rem] xls:mt-[30rem] 2xls:mt-80 w-[75%] m-auto">
        <h1 className="text-[#030229] font-medium text-2xl text-center py-1">
          {" "}
          Medicinal use:{" "}
        </h1>
        <ul className="text-[#030229B2] text-sm">
          {plant?.howToUse?.map((el) => {
            console.log("how", el);
            return <li className="list-disc py-1.5">{el}</li>;
          })}
        </ul>
        <h1 className="text-[#030229] font-medium text-2xl text-center py-3">
          {" "}
          Dosages and preparation:{" "}
        </h1>
        <p className="text-[#030229B2] text-sm pt-1">
          {plant?.dosages?.adults}
        </p>
        <h1 className="text-[#030229] font-medium text-xl pt-4 text-center py-3">
          Side effects
        </h1>
        <p className="text-[#030229B2] text-sm pt-2">
          Fresh roots are crushed, boiled and strained, and the liquid is used
          to treat gonorrhoea and syphilis. Fresh leaf juice, sometimes with
          Erythrina sacleuxii Hua, is used for the treatment of leprosy. Leaf
          and roots are used for pleurisy, inflammatory conditions of chest and
          for oxytocic activity. Is extensively used in many skin disease
          medicine.
        </p>
        <h1 className="text-[#030229] font-medium text-xl pt-4 text-center py-3">
          Description
        </h1>
        <p className="text-[#030229B2] text-sm pt-2">{plant?.description}</p>
      </div>
      <div className="mts-[60rem] lg:mts-[50rem] xls:mt-[30rem] 2xls:mt-80 mt-5">
        <h1 className="text-2xl font-semibold text-center py-3">
          Related Plants
        </h1>
      </div>

      {is_plants_loading ? (
        <div className="grid grid-cols-4 gap-4">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className="p-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 w-full m-auto">
          {allplants.map((el, i) => {
            console.log("plant data", el);
            return (
              <ProductCard
                key={i}
                status={"For Sale"}
                img1={el?.images[0]?.url}
                img2={el?.images[1]?.url}
                name={el?.title}
                amount={el?.price}
                btnName={"ReadMore"}
                // btnSecondName={"Add to cart"}
                description={el?.description}
                onClick={() => navigate(`/shop/${el?._id}`)}
              />
            );
          })}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetails;
