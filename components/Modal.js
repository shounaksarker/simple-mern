import { Button, Modal, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyModal = ({ show, setShow }) => {
  const [info, setInfo] = useState({
    name: "",
    area: "",
    blood: "",
    gender: "",
    mobile: "",
    status: "",
  });
 // toast
  const showToastMessage = () => {
    toast.success("Registration Successful.!", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  //? ---------- input data taking function
  const handleBlur = (e) => {
    let details = { ...info };
    details[e.target.name] = e.target.value;
    setInfo(details);
  };

  //! ---------- form submit function --> create user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      info.name === "" ||
      info.blood === "" ||
      info.gender === "" ||
      info.mobile === "" ||
      info.area === "" ||
      info.status === ""
    ) {
      alert("Please Fill all the input feild");
    } else {
      const res = await fetch("/api/User", {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.success) {
            alert(json.errors);
          } else {
            setShow(false);
            e.target.reset();
            showToastMessage();
          }
        });
    }
  };

  return (
    <React.Fragment>
      <Modal show={show} size="xl" popup={true} onClose={() => setShow(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Register Yourself as a Blood Donor
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <TextInput
                  name="name"
                  placeholder="Your Name"
                  required={true}
                  onBlur={handleBlur}
                />
              </div>

              <div className="flex justify-between flex-wrap mb-6">
                <TextInput
                  name="area"
                  placeholder="Your Area"
                  required={true}
                  onBlur={handleBlur}
                />
                <div>
                  <Select name="gender" onChange={handleBlur} required={true}>
                    <option disabled selected>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                </div>
                <div>
                  <Select name="blood" onChange={handleBlur} required={true}>
                    <option disabled selected>
                      Blood Group
                    </option>
                    <option value="a+">A+</option>
                    <option value="a-">A-</option>
                    <option value="b+">B+</option>
                    <option value="b-">B-</option>
                    <option value="o+">O+</option>
                    <option value="o-">O-</option>
                    <option value="ab+">AB+</option>
                    <option value="ab-">AB-</option>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between flex-wrap">
                <div>
                  <TextInput
                    name="mobile"
                    type="number"
                    placeholder="Your Mobile Number"
                    required={true}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <Select name="status" onChange={handleBlur} required={true}>
                    <option disabled selected>
                      Status
                    </option>
                    <option value="avilable">Available</option>
                    <option value="rest">Rest</option>
                  </Select>
                </div>
                <div>
                  <Button color="purple" pill={true} type="submit">
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {/* toster  */}
      <ToastContainer autoClose={2500} pauseOnHover={false} />
    </React.Fragment>
  );
};

export default MyModal;
