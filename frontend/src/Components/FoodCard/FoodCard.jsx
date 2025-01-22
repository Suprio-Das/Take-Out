import { FaCartArrowDown } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../CartContext/CartContext"

const FoodCard = ({ filteredItem }) => {
    const { name, description, img, options, _id } = filteredItem;
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [priceOption, setPriceOption] = useState(Object.keys(options[0])[0]);

    const priceOptionsArray = options[0];
    const priceOptions = Object.keys(priceOptionsArray);

    const handleAddToCart = () => {
        addToCart({ id: _id, name, price: priceOptionsArray[priceOption], img }, quantity, priceOption);
        alert(`${quantity} x ${name} (${priceOption}) added to cart!`);
    };

    return (
        <div>
            <div className="card card-compact bg-base-100 w-96 h-96 shadow-xl">
                <figure>
                    <img src={img} alt={name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p className="mb-2">{description}</p>
                    <div className="flex justify-around items-center gap-2">
                        <select
                            className="select select-bordered w-[50%] max-w-xs"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                        >
                            {Array.from({ length: 5 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <select
                            className="select select-bordered w-[50%] max-w-xs"
                            value={priceOption}
                            onChange={(e) => setPriceOption(e.target.value)}
                        >
                            {priceOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-between items-center gap-5 my-3">
                        <p>
                            <span className="font-semibold text-md">Total Price:</span> {quantity * priceOptionsArray[priceOption]} BDT
                        </p>
                        <button className="btn btn-success text-white" onClick={handleAddToCart}>
                            Add To Cart <FaCartArrowDown />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
