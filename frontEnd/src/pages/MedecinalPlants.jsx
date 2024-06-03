import React, { useEffect,useState } from "react";
import NavBar from "../components/NavBar";
import "../components/header.css";
import ProductCard from "../components/ProductCard";
import aboutImage1 from "../assets/images/Urtica dioica L.(igisura).jpg";
import aboutImage2 from "../assets/images/Clerodendrum myricoides R. Br.(umukuzanyana).jpg";
import Footer from "../components/Footer";
import { Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlantByCategories } from "../redux/slices/plant/plantThunks";
import { useNavigate } from "react-router-dom";
import LeavesPlants from "./plantCategories/leavesPlants";
import Vegetables from "./plantCategories/Vegetables";
import NotChecken from "./plantCategories/NotChecken";
import Flower from "./plantCategories/Flowers";
import Fruits from "./plantCategories/Fruits";
import Routes from "./plantCategories/Routes";
import Spices from "./plantCategories/Spices";
import Edible from "./plantCategories/Edible";
const MedecinalPlants = () => {
  const { plantCategory } = useSelector((state) => state.plants);
  const [selectedCategories,setSelectedCategories]=useState("")
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: <h1>See more</h1>,
      children: (
        <div className="p-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 w-full m-auto">
          <ProductCard
            img1={aboutImage1}
            img2={aboutImage2}
            name={"Urtica massaica"}
            btnName={"ReadMore"}
            description={"Fresh roots are crushed, boiled and strained"}
            onClick={() => navigate(`/plant/view/${el?._id}`)}
          />
          <ProductCard
            img1={aboutImage1}
            img2={aboutImage2}
            name={"Urtica massaica"}
            btnName={"ReadMore"}
            description={"Fresh roots are crushed, boiled and strained"}
            onClick={() => navigate("/plant/view")}
          />
          <ProductCard
            img1={aboutImage1}
            img2={aboutImage2}
            name={"Urtica massaica"}
            btnName={"ReadMore"}
            description={"Fresh roots are crushed, boiled and strained"}
            onClick={() => navigate("/plant/view")}
          />
          <ProductCard
            img1={aboutImage1}
            img2={aboutImage2}
            name={"Urtica massaica"}
            btnName={"ReadMore"}
            description={"Fresh roots are crushed, boiled and strained"}
            onClick={() => navigate("/plant/view")}
          />
          <ProductCard
            img1={aboutImage1}
            img2={aboutImage2}
            name={"Urtica massaica"}
            btnName={"ReadMore"}
            description={"Fresh roots are crushed, boiled and strained"}
            onClick={() => navigate("/plant/view")}
          />
          <ProductCard
            img1={aboutImage1}
            img2={aboutImage2}
            name={"Urtica massaica"}
            btnName={"ReadMore"}
            description={"Fresh roots are crushed, boiled and strained"}
            onClick={() => navigate("/plant/view")}
          />
          <ProductCard
            img1={aboutImage1}
            img2={aboutImage2}
            name={"Urtica massaica"}
            btnName={"ReadMore"}
            description={"Fresh roots are crushed, boiled and strained"}
            onClick={() => navigate("/plant/view")}
          />
          <ProductCard
            img1={aboutImage1}
            img2={aboutImage2}
            name={"Urtica massaica"}
            btnName={"ReadMore"}
            description={"Fresh roots are crushed, boiled and strained"}
            onClick={() => navigate("/plant/view")}
          />
          <ProductCard
            img1={aboutImage1}
            img2={aboutImage2}
            name={"Urtica massaica"}
            btnName={"ReadMore"}
            description={"Fresh roots are crushed, boiled and strained"}
            onClick={() => navigate("/plant/view")}
          />
          <ProductCard
            img1={aboutImage1}
            img2={aboutImage2}
            name={"Urtica massaica"}
            btnName={"ReadMore"}
            description={"Fresh roots are crushed, boiled and strained"}
            onClick={() => navigate("/plant/view")}
          />
        </div>
      ),
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    fetchPlantByCategories(`?category=leaves`)(dispatch);
  }, [dispatch]);
  console.log("plant categories medecinalCategory", selectedCategories);
  return (
    <>
      <NavBar setSelectedCategories={setSelectedCategories}/>
      <div className="w-full h-screen bg-[url('https://media.istockphoto.com/id/175203893/photo/smiling-woman-with-healthy-skin-holding-cream.jpg?s=2048x2048&w=is&k=20&c=PyB-0SOmKlVtEFsHpuYh-IxJcdfbg-SIoYrWwEuZeBU=')] bg-cover mt-[7rem] bg-fixed">
        <h1 className="pt-20 text-center  text-2xl font-bold">
          Medicinal Plants
        </h1>
        {selectedCategories ? <>
        {selectedCategories==="leaves" && <LeavesPlants/>}
       {selectedCategories==="Vegetables" && <Vegetables />}
       {selectedCategories==="not for kitchen daily activities" && <NotChecken />}
        {selectedCategories==="flowers" && <Flower />}
        {selectedCategories==="fruit" && <Fruits />}
        {selectedCategories==="rootes" && <Routes />}
        {selectedCategories==="spices" && <Spices />}
        {selectedCategories==="edible" && <Edible />}
      
        </>:<>
        <LeavesPlants />
        <Vegetables />
        <NotChecken />
        <Flower />
        <Fruits />
        <Routes />
        <Spices />
        <Edible />
        </>}
       <div className="mt-[15rem]">

        <Footer />
       </div>
      </div>
    </>
  );
};

export default MedecinalPlants;
