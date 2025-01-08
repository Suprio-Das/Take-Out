import Carousel from "../Carousel/Carousel";
import FoodCard from "../FoodCard/FoodCard";

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <div className="w-[95%] mx-auto my-5 grid grid-cols-1 lg:grid-cols-3">
                <FoodCard></FoodCard>
            </div>
        </div>
    );
};

export default Home;