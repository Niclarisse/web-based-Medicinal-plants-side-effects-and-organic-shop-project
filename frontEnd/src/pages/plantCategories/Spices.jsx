import { useDispatch, useSelector } from "react-redux";
import { fetchPlantByCategories } from "../../redux/slices/plant/plantThunks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProductCard from "../../components/ProductCard";

const Spices = () => {
  const { plantCategory } = useSelector((state) => state.plants);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchPlantByCategories(`?category=Not for kitchen daily activities plants`)(
      dispatch
    );
  }, [dispatch]);
  console.log("plant categories", plantCategory);
  return (
    <>
      <div className="bg-white relative top-[19%] px-5">
        <h1 className="font-bold text-center text-2xl pt-5">Spices</h1>
        <div className="p-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 w-full m-auto">
          {plantCategory.length > 0
            ? plantCategory?.map((el, i) => {
                console.log("plant data", el);
                return (
                  <ProductCard
                    key={i}
                    status={el?.status}
                    img1={el?.images[0]?.url}
                    img2={el?.images[1]?.url}
                    name={el?.title}
                    btnName={"ReadMore"}
                    description={el?.description}
                    onClick={() => navigate(`/plant/view/${el?._id}`)}
                  />
                );
              })
            : "No Data Found"}
        </div>
        <div className="p-2 border rounded-md w-40 text-center">View More </div>
      </div>
    </>
  );
};

export default Spices;
