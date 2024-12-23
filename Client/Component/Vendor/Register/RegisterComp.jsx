import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Server from "../../../Config/Server";

function RegisterComp() {
  useEffect(() => {
    document.body.style.background = "#080710";
  }, []);

  const navigate = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    location: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Server.post("/vendor/register", formData);
      if (response.data.found) {
        alert("Vendor Already Found");
      } else {
        alert("Vendor Successfully Registered");
        navigate.push("/vendor/login");
      }
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div className="RegisterComp">
      <div className="background">
        <div className="shape" type="top"></div>
        <div className="shape" type="bottom"></div>

        <div className="registerForm">
          <div className="inner">
            <h3 type="title">Register Here</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Number</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Register</button>
            </form>
            <button data-for="register">
              Already a member?{" "}
              <span onClick={() => navigate.push("/vendor/login")}>Login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterComp;
