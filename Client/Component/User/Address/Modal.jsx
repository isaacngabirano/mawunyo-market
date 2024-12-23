import { userAxios } from '@/Config/Server';
import React, { useEffect, useState } from 'react';
import Xicon from '@/Assets/Xicon';

function Modal({ Address, setUpdate, setUserLogged }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    number: '',
    address: '',
    city: '',
  });

  useEffect(() => {
    if (Address.name && !Address.new) {
      setFormData(Address);
    } else {
      setFormData({
        name: '',
        number: '',
        address: '',
        city: '',
      });
    }
  }, [Address]);

  const formHandle = (e) => {
    e.preventDefault();
    if (formData.number.length === 10) {
      if (!Address.new) {
        userAxios((server) => {
          server.put('/users/editAddress', formData).then((res) => {
            if (res.data.login) {
              setUserLogged({ status: false });
              localStorage.removeItem('token');
            } else {
              setUpdate((update) => !update);
              alert("Updated");
            }
          }).catch(() => {
            alert("Error");
          });
        });
      } else {
        userAxios((server) => {
          server.post('/users/addAddress', formData).then((res) => {
            if (res.data.login) {
              setUserLogged({ status: false });
              localStorage.removeItem('token');
            } else {
              setUpdate((update) => !update);
              setFormData({
                name: '',
                number: '',
                address: '',
                city: '',
              });
              alert("Done");
            }
          }).catch(() => {
            alert("Error");
          });
        });
      }
    } else {
      alert("Number Must 10 Digit");
    }
  };

  return (
    <div className="modal fade" id="addressModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div style={{ textAlign: 'right' }} className="pb-2">
              <button type="button" data-for="exit" data-bs-dismiss="modal">
                <Xicon color={'#333'} />
              </button>
            </div>

            <div>
              <form onSubmit={formHandle}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input type="text" value={formData.name} onInput={(e) => {
                      setFormData({
                        ...formData,
                        name: e.target.value
                      });
                    }} placeholder='Name' required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="number" value={formData.number} onInput={(e) => {
                      setFormData({
                        ...formData,
                        number: e.target.value
                      });
                    }} placeholder='10-digit mobile number' required />
                  </div>
                  <div className="col-12 mb-3">
                    <textarea value={formData.address} onInput={(e) => {
                      setFormData({
                        ...formData,
                        address: e.target.value
                      });
                    }} placeholder='Address (Area and Street)' cols="30" rows="10" required></textarea>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input value={formData.city} onInput={(e) => {
                      setFormData({
                        ...formData,
                        city: e.target.value
                      });
                    }} type="text" placeholder='City/District/Town' required />
                  </div>
                  <div className="col-12">
                    <button type='submit'>Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;