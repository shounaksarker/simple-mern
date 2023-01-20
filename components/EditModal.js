import { Button, Modal, Select, TextInput } from "flowbite-react";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditModal = ({ prop }) => {
  // props reciving start
  const singleUser = prop[0];
  const setSingleUser = prop[1];
  const show = prop[2];
  const setShow = prop[3];
  const mount = prop[4];
  // props recieving finished

  // toast
  const showToastMessage = () => {
    toast.info("Update Successful.!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  //? ---------- input data taking function
  const handleBlur = (e) => {
    let details = { ...singleUser };
    details[e.target.name] = e.target.value;
    setSingleUser(details);
  };
  //! ---------- form submit function --> edit user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/User/${singleUser._id}`, {
      method: "PUT",
      body: JSON.stringify(singleUser),
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
          mount()
          showToastMessage();
        }
      });
  };

  return (
    <React.Fragment>
      <Modal show={show} size="xl" popup={true} onClose={() => setShow(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Edit Info
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <TextInput
                  name="name"
                  defaultValue={singleUser.name}
                  required={true}
                  onBlur={handleBlur}
                />
              </div>

              <div className="flex justify-between flex-wrap mb-6">
                <TextInput
                  name="area"
                  defaultValue={singleUser.area}
                  required={true}
                  onBlur={handleBlur}
                />
                <div>
                  <Select name="gender" onChange={handleBlur} required={true}>
                    <option>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                </div>
                <div>
                  <Select name="blood" onChange={handleBlur} required={true}>
                    <option>Blood Group</option>
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
                    defaultValue={
                      singleUser.mobile && Number(singleUser.mobile)
                    }
                    required={true}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <Select name="status" onChange={handleBlur} required={true}>
                    <option>Status</option>
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
      {/* toast  */}
      <ToastContainer autoClose={2500} pauseOnHover={false} />
    </React.Fragment>
  );
};

export default EditModal;
