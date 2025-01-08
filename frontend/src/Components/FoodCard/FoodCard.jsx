const FoodCard = () => {
    return (
        <div>
            <div className="card card-compact bg-base-100 w-96 h-96 shadow-xl">
                <figure>
                    <img
                        src="https://images.mrcook.app/recipe-image/01915ba9-1590-76a5-81f6-4417ecb47538"
                        alt="Biriyani" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Bashmati Chicken Biriyani</h2>
                    <p className="mb-2">Buy the Best Biriyani in the City.</p>
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
                            <option>Half</option>
                            <option>Full</option>
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