import * as React from "react";
import { Button } from "react-bootstrap";
import { ResponseData } from "./Home";
import Loader from "./Loaders";
import config from "../config/prod_config";
const ProductDetails = (props) => {
  const [product, setProduct] = React.useState<ResponseData>();
  const getProductData = async () => {
    const response = await fetch(
      `https://fakestoreapi.com/products/${props.match.params.id}`
    );
    const responseData = await response.json();
    console.log(responseData);
    setProduct(responseData);
  };
  React.useEffect(() => {
    getProductData();
  }, []);
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    document.body.appendChild(script);
  }, []);
  const invokePayment = React.useCallback(
    async (price: number, id: number) => {
      const response = await fetch(
        `${config.base_url}/api/v1/create_order/${id}`
      );
      const data = await response.json();
      console.log(data.data);
      console.log(process.env.REACT_APP_RAZORPAY_KEY);
      var options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: data.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Ecomm",
        description: "Building payment flow for Ecomm app",
        image: "https://example.com/your_logo",
        order_id: data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url:
          "https://ecomm-backend-app.herokuapp.com/api/v1/verify/payment/success", // success url
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      console.log(options);
      var transaction = new (window as any).Razorpay(options);
      transaction.open();
    },
    [product]
  );
  return (
    <div>
      <div className="product-list" style={{ justifyContent: "center" }}>
        {product ? (
          <div className="product-cards">
            <img src={product.image} />
            <div className="product-description">{product.description}</div>
            {/* <div className="product-price">{product.price}</div> */}
            <Button onClick={() => invokePayment(product.price, product.id)}>
              Pay {product.price}
            </Button>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
