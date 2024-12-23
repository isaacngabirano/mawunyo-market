import ContentControl from "@/ContentControl/ContentControl";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { adminAxios } from "../../../Config/Server";

function VendorDetailsComp({ vendorId }) {
  const { setAdminLogged } = useContext(ContentControl);
  let router = useRouter();
  const [data, setData] = useState({
    _id: "",
    name: "",
    email: "",
    number: "",
    location: "",
  });

  const logOut = () => {
    setAdminLogged({ status: false });
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  useEffect(() => {
    if (vendorId) {
      adminAxios((server) => {
        server
          .get("/admin/getSpecificVendor", {
            params: {
              vendorId: vendorId,
            },
          })
          .then((res) => {
            if (res.data.login) {
              logOut();
            } else {
              setData(res.data);
            }
          })
          .catch((err) => {
            if (err.response.data["status"] === 404) {
              alert("Vendor Not Found");
            } else {
              alert("Error");
            }

            router.push("/admin/vendors");
          });
      });
    }
  }, [vendorId]);

  return (
    <div className="AdminContainer">
      <div className="VendorDetailsComp">
        <div className="row">
          <div className="col-md-6">
            <label>Name</label>
            <input value={data.name} type="text" readOnly disabled />
          </div>

          <div className="col-md-6">
            <label>Email</label>
            <input value={data.email} type="text" readOnly disabled />
          </div>

          <div className="col-md-6">
            <label>Number</label>
            <input value={data.number} type="text" readOnly disabled />
          </div>

          <div className="col-md-6">
            <label>Location</label>
            <input value={data.location} type="text" readOnly disabled />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDetailsComp;
