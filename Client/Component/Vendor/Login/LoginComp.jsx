import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Server from "../../../Config/Server";

function LoginComp() {
  useEffect(() => {
    document.body.style.background = "#080710";
  }, []);

  const navigate = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const formHandle = (e) => {
    e.preventDefault();
    Server.post("/vendor/login", formData)
      .then((response) => {
        if (response.data.request) {
          alert("Vendor Request Accepting Under Pending");
        } else {
          if (response.data.status) {
            localStorage.setItem("vendorToken", response.data.token);
            document.body.style.background = "transparent";
            navigate.push("/vendor/dashboard");
            alert("Login Successful");
          } else {
            alert("Invalid Email or Password");
          }
        }
      })
      .catch(() => {
        alert("Error");
      });
  };

  return (
    <div className="LoginComp">
      <div className="background">
        <div className="shape" type="top"></div>
        <div className="shape" type="bottom"></div>

        <div className="registerForm">
          <div className="inner">
            <h3 type="title">Login Here</h3>
            <form onSubmit={formHandle}>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onInput={(e) => {
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    });
                  }}
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onInput={(e) => {
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    });
                  }}
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div className="pt-4">
                <button type="submit">Login</button>
              </div>
            </form>
            <button data-for="register">
              Not a member ?{" "}
              <span
                onClick={() => {
                  document.body.style.background = "transparent";
                  navigate.push("/vendor/register");
                }}
              >
                Register
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComp;
