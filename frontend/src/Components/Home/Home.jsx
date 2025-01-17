import { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";
import FoodCard from "../FoodCard/FoodCard";
import { getAllFoods } from "../../api";

const Home = () => {
    const [foodData, setFoodData] = useState([])
    const [foodCategory, setFoodCategory] = useState([])
    useEffect(() => {
        async function loadAllFoods() {
            const response = await getAllFoods()
            const foods = response.data
            setFoodData(foods.foodItems)
            setFoodCategory(foods.foodCategory)
        }
        loadAllFoods()
    }, [])
    console.log(foodData)
    return (
        <div>
            <Carousel></Carousel>
            <div className="w-[95%] mx-auto">
                {
                    foodCategory.map(foodCat => {
                        return (
                            <div key={foodCat.id} className="text-2xl font-semibold mt-5">
                                {
                                    foodCat.CategoryName
                                }
                                <hr className="border-2 rounded-md border-black w-[20%] my-3" />
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 my-5">
                                    {
                                        foodData.filter(food => food.CategoryName === foodCat.CategoryName)
                                            .map(filteredItem => <FoodCard key={filteredItem._id} filteredItem={filteredItem}></FoodCard>)
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/* <div className="w-[95%] mx-auto my-5 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {
                    foodData.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
                }
            </div> */}
        </div>
    );
};

export default Home;