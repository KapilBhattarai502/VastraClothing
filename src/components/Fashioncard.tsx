import { useNavigate } from "react-router-dom";

const FashionCard = ({ product }: any) => {
  const { imageUrl, price, _id, discountedPrice, title , itemName,quantity} = product;
  const role: string | undefined = localStorage
    .getItem("role")
    ?.toLocaleLowerCase();
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (role) {
      role === "admin"
        ? navigate(`/admin/productpage/${_id}`)
        : navigate(`/vaidik/productpage/${_id}`);
    }
  };

  return (
    <div
      className="p-2 shadow-lg rounded-md"
      onClick={handleNavigate}
    >
      <div className="h-[600px]">
        <img
          src={imageUrl}
          alt=""
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-90"
        />
      </div>
      <div>
        <h1 className="font-semibold mt-1">{title ? title : itemName}</h1>
        <div className="flex gap-5">
          <p className=" font-light">Rs {discountedPrice}</p>
          <p className=" line-through font-light">Rs {price}</p>
          <p className=" font-light">Quantity: {quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default FashionCard;
