import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import ContentControl from "../../../ContentControl/ContentControl";
import Server, { userAxios } from "../../../Config/Server";
import Loading from "../../Loading/Loading";
import Modal from "./Modal";

function CheckoutComp({
  amount,
  setAmount,
  amountOrg,
  OrderType,
  setOrderType,
  setDiscount,
  discount,
  setLogError,
  setLoading,
  loading,
  razorpayKey,
  savedAddress,
}) {
  const [cuponErr, setCuponErr] = useState(false);
  const [cupon, setCupon] = useState("");
  const [width, setWidth] = useState(500);

  const { userLogged, setUserLogged, setLoginModal } =
    useContext(ContentControl);
  const navigate = useRouter();

  const [orderDetails, setOrderDetails] = useState({
    name: "",
    number: "",
    address: "",
    city: "",
    order: OrderType,
    email: userLogged.email,
    payType: "cod",
    discount: discount,
  });

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  });

  useEffect(() => {
    setOrderDetails((orderDetails) => ({
      ...orderDetails,
      totalAmount: amount.totalPrice,
      discount: discount,
    }));
  }, [amount]);

  const razorpay = (data) => {
    var options = {
      key: razorpayKey,
      amount: data.totalAmount,
      currency: "INR",
      name: "Aquariun",
      description: "Test Transaction",
      order_id: data.razOrderId,
      handler: function (response) {
        response.userId = data.userId;
        setLoading(true);
        Server.post("/users/order-item-razorpay", {
          razorpayRes: response,
          order: orderDetails,
        })
          .then(() => {
            setLoading(false);
            setOrderType((type) => ({
              ...type,
              order: false,
              type: "",
              exAction: true,
              exActionData: {
                failed: false,
                success: true,
              },
            }));
            navigate.push("/ordersuccess"); // done page
          })
          .catch((data) => {
            setLoading(false);
            if (data.data === "payment") {
              alert("Payment Failed");
            } else {
              setOrderType((type) => ({
                ...type,
                order: false,
                type: "",
                exAction: true,
                exActionData: {
                  failed: true,
                  success: false,
                },
              }));
              navigate.push("/orderfailed"); // fail page
            }
          });
      },
      modal: {
        ondismiss: function () {
          console.log("cancelled");
        },
      },
      prefill: {
        name: userLogged.name,
        email: userLogged.email,
        contact: userLogged.number,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      console.log("Payment Failed");
    });
  };

  const checkoutForm = (e) => {
    e.preventDefault();

    if (orderDetails.pin.length === 6) {
      if (orderDetails.number.length === 10) {
        setLoading(true);
        Server.post("/users/checkPincode", {
          pin: parseInt(orderDetails.pin),
        })
          .then((res) => {
            if (res.data) {
              if (orderDetails.payType === "online") {
                userAxios((server) => {
                  server
                    .post("/users/createRazorpayPayment", {
                      totalAmount: orderDetails.totalAmount,
                    })
                    .then((data) => {
                      if (data.data.login) {
                        setLoading(false);
                        setUserLogged({ status: false });
                        localStorage.removeItem("token");
                        setLogError(true);
                        setLoginModal((loginModal) => ({
                          ...loginModal,
                          btn: true,
                          member: true,
                          active: true,
                          forgot: false,
                        }));
                      } else {
                        setLoading(false);
                        razorpay(data.data);
                      }
                    })
                    .catch(() => {
                      alert("Error");
                    });
                });
              } else {
                setLoading(true);
                Server.post("/users/order-item-cod", {
                  userId: userLogged._id,
                  order: orderDetails,
                })
                  .then(() => {
                    setLoading(false);
                    setOrderType((type) => ({
                      ...type,
                      order: false,
                      type: "",
                      exAction: true,
                      exActionData: {
                        failed: false,
                        success: true,
                      },
                    }));
                    navigate.push("/ordersuccess"); // done page
                  })
                  .catch((data) => {
                    setLoading(false);

                    setOrderType((type) => ({
                      ...type,
                      order: false,
                      type: "",
                      exAction: true,
                      exActionData: {
                        failed: true,
                        success: false,
                      },
                    }));
                    navigate.push("/orderfailed"); // fail page
                  });
              }
            } else {
              setLoading(false);
              alert("Delivery not available your selected pincode");
            }
          })
          .catch(() => {
            setLoading(false);
            alert("Error");
          });
      } else {
        alert("Pincode must 10 numbers");
      }
    } else {
      alert("Pincode must 6 numbers");
    }
  };

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
}

export default CheckoutComp;
