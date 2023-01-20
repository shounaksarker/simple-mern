/* eslint-disable react/no-unescaped-entities */
import { Button, Table } from "flowbite-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import man from "../Imgs/man.png";
import woman from "../Imgs/woman.png";
import EditModal from "./EditModal";
import Modal from "./Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tables = ({ user, mount }) => {
  const [singleUser, setSingleUser] = useState("")
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  useEffect(() => {
    mount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  //? -------- toast
  const showToastMessage = () => {
    toast.error("Deleted", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  //! ------------ delete function 
  const handleDelete = (e) => {
    const result = confirm("Are you sure, you want to delete?");
    if (result) {
      fetch(`/api/User/${e}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          mount();
          showToastMessage()
        });
    }
  };

  //! ------------ single user data fetching
  const getSingleUserData = async (e) => {
      await fetch(`/api/User/${e}`)
      .then(res => res.json())
      .then(response => {setSingleUser(response.data)
      setEditShow(true)
      })
  }
  return (
    <div>
      <Button
        outline={true}
        gradientDuoTone="cyanToBlue"
        className="my-4"
        onClick={() => setShow(!show)}
      >
        Add New
      </Button>
      <Table hoverable={true}>
        <Table.Head className="text-center">
          <Table.HeadCell>SL</Table.HeadCell>
          <Table.HeadCell className="w-[10px]">Name</Table.HeadCell>
          <Table.HeadCell>Blood Group</Table.HeadCell>
          <Table.HeadCell>Area</Table.HeadCell>
          <Table.HeadCell>Mobile No.</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y capitalize">
          {user?.map((x, i) => {
            return (
              <Table.Row key={i} className="bg-white text-lg text-center">
                <Table.Cell>{i+1}</Table.Cell>
                <Table.Cell className="flex items-center gap-4 whitespace-nowrap font-medium text-gray-900 dark:text-white justify-start">
                  <Image
                    className="w-10 h-10 rounded-full"
                    src={x.gender === "male" ? man : woman}
                    alt="User's avatar"
                  />
                  {x.name}
                </Table.Cell>
                <Table.Cell>{x.blood}</Table.Cell>
                <Table.Cell>{x.area}</Table.Cell>
                <Table.Cell>{x.mobile}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center justify-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        x.status === "rest" ? "bg-red-700" : "bg-green-400"
                      } mr-2`}
                    ></div>
                    {x.status}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      className="text-blue-500"
                      onClick={() => getSingleUserData(x._id)}
                    >
                      <AiFillEdit />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(x._id)}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

          {/* toast  */}
      <ToastContainer autoClose={2500} pauseOnHover={false} containerId={"success"}/>
          {/* new user and edit modal  */}
      <Modal show={show} setShow={setShow} />
      <EditModal prop = {[singleUser, setSingleUser, editShow, setEditShow, mount]}/>
    </div>
  );
};

export default Tables;
