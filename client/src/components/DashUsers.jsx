import axios from "axios";
import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("access_token"); 
        const res = await axios.get(` https://blog-system-n8p8.onrender.com/api/user/getusers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        console.log(data);
  
        setUsers(data.users);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };
    
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);
  
  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get(
        `/api/user/getusers?startIndex=${startIndex}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      setUsers((prev) => [...prev, ...data.users]);
      if (data.users.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };
  
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.delete(
        `https://blog-system-n8p8.onrender.com/api/user/delete/${userIdToDelete}`,//render
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (res.status === 200) {
        setUsers((prev) => prev.filter(({ _id }) => _id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };  

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table>
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users.map(
                ({
                  _id,
                  username,
                  email,
                  profilePicture,
                  isAdmin,
                  createdAt,
                }) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={_id}
                  >
                    <Table.Cell>
                      {new Date(createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={profilePicture}
                        alt={username}
                        className=" rounded-full w-10 h-10 object-cover bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{username}</Table.Cell>
                    <Table.Cell>{email}</Table.Cell>
                    <Table.Cell>{isAdmin ? <FaCheck className="text-green-500"/> : <FaTimes className="text-red-500" />}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(_id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                )
              )}
            </Table.Body>
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>Yes, I'm sure</Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default DashUsers;
