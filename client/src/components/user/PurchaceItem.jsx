import paim from '../../img/pgqhdaq0gmes43zmlj4b.jpg'
const PurchaseItem = ({ product, loading }) => {
  if (loading) {
    // Display a loading message or spinner while loading
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4 md:mb-0 md:w-1/2 lg:w-1/3 xl:w-1/4">
        Loading...
      </div>
    );
  }

  if (!product) {
    // Display a message when the item is not available
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4 md:mb-0 md:w-1/2 lg:w-1/3 xl:w-1/4">
        No item available.
      </div>
    );
  }

  // Assuming the product details are passed as props
  // const { name, image, description, marketPrice } = product;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 md:mb-0 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <img
        src={paim}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-600 mb-4">Passenger Windows</p>
      <div className="flex justify-between items-center">
          $400
      </div>
    </div>
  );
};

export default PurchaseItem;
