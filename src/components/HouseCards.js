

const HouseCard = ({ house }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <img src={house.imageUrl} alt={house.name} className="mb-4" />
        <h2 className="text-xl font-bold">{house.name}</h2>
        <p className="text-gray-600 mb-2">{house.description}</p>
        <p className="text-gray-800 font-semibold">{house.price}</p>
      </div>
    );
  };

  export default HouseCard;