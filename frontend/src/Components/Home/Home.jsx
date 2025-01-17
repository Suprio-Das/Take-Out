import { useEffect, useState } from "react";
import FoodCard from "../FoodCard/FoodCard";
import { getAllFoods } from "../../api";

const Home = () => {
    const slides = [
        "https://static.vecteezy.com/system/resources/thumbnails/036/804/331/small_2x/ai-generated-assorted-indian-food-on-dark-wooden-background-free-photo.jpg",
        "https://png.pngtree.com/thumb_back/fh260/background/20230610/pngtree-many-different-kinds-of-dishes-and-foods-image_2951715.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZPp1q_t_UGzIYLwQ-gRZoY8i6bTG7rzBo5Q&s",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []); // Use an empty dependency array to prevent reinitializing the interval

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const handleSearch = () => {
        console.log("Search Query:", searchQuery);
        alert(`You searched for: ${searchQuery}`);
    };
    // Carousel Logic Ends Here

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
            {/* Carousel Starts Here */}

            <div className="relative w-full mx-auto overflow-hidden">
                {/* Slides */}
                <div className="relative h-96">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentIndex === index ? "opacity-100" : "opacity-0"
                                }`}
                            style={{
                                backgroundImage: `url(${slide})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                    ))}
                </div>

                {/* Search Bar */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="bg-black bg-opacity-80 p-4 rounded-lg shadow-md w-1/2">
                        <div className="flex">
                            <input
                                type="search"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Previous Button */}
                <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full"
                    onClick={prevSlide}
                >
                    &#8249;
                </button>

                {/* Next Button */}
                <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full"
                    onClick={nextSlide}
                >
                    &#8250;
                </button>
            </div>

            {/* Carousel Ends Here */}
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
                                        foodData.filter(food => food.CategoryName === foodCat.CategoryName && food.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
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