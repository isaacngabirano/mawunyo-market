import React from 'react';
import Xicon from '@/Assets/Xicon';

function Modal({ setOrderDetails, savedAddress }) {
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

            {savedAddress['saved'].map((obj, key) => (
              <div key={key} className="col-md-4 col-5" style={{ textAlign: 'right' }}>
                <div className="row">
                  <div className="col-12">
                    <button
                      type="button"
                      data-for="select"
                      onClick={() => {
                        setOrderDetails((orderDetails) => ({
                          ...orderDetails,
                          name: obj.name,
                          number: obj.number,
                          address: obj.address,
                          city: obj.city,
                        }));
                        alert("Selected");
                      }}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
