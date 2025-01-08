import { useState, useEffect } from "react";

const Carousel = () => {
    const slides = [
        "https://static.vecteezy.com/system/resources/thumbnails/036/804/331/small_2x/ai-generated-assorted-indian-food-on-dark-wooden-background-free-photo.jpg",
        "https://png.pngtree.com/thumb_back/fh260/background/20230610/pngtree-many-different-kinds-of-dishes-and-foods-image_2951715.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZPp1q_t_UGzIYLwQ-gRZoY8i6bTG7rzBo5Q&s",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    // Auto-slider functionality
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [currentIndex]);

    const handleSearch = () => {
        console.log("Search Query:", searchQuery);
        alert(`You searched for: ${searchQuery}`);
    };

    return (
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
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none"
                        />
                        <button
                            onClick={handleSearch}
                            className="p-2 bg-orange-400 text-white rounded-r-md hover:bg-orange-700"
                        >
                            Search
                        </button>
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
    );
};

export default Carousel;
