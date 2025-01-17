const FoodCard = ({ filteredItem }) => {
    const { name, description, img, options } = filteredItem
    const priceOptionsArray = options[0]
    const priceOptions = Object.keys(priceOptionsArray)
    console.log(priceOptions)
    return (
        <div>
            <div className="card card-compact bg-base-100 w-96 h-96 shadow-xl">
                <figure>
                    <img
                        src={img}
                        alt="Biriyani" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p className="mb-2">{description}</p>
                    <div className="flex justify-around items-center gap-2">
                        <select className="select select-bordered w-[50%] max-w-xs">
                            {
                                Array.from(Array(5), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })
                            }
                        </select>
                        <select className="select select-bordered w-[50%] max-w-xs">
                            {
                                priceOptions.map((option, index) => {
                                    return (
                                        <option key={index} value={option}>{option}</option>
                                    )
                                })
                            }
                        </select>
                        <div className="w-full max-w-xs">
                            <p><span className="font-semibold">Total Price:</span> 1000BDT.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;