import React, { useState, useEffect } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../../features/admin/userSlice";
import DataTable from "react-data-table-component";
import { FaPenNib } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleRowsPerPage = (newPerPage) => {
    setRowsPerPage(newPerPage);
  };

  const showDeleteConfirmation = (id) => {
    toast(
      <div>
        <p>Anda yakin ingin menghapus?</p>
        <button
          onClick={() => {
            dispatch(deleteUser(id))
              .then((response) => {
                toast.success(response.payload.data.message);
              })
              .catch((error) => {
                toast.error(error.message);
              });
            toast.dismiss(); // Dismiss the toast after confirmation
          }}
        >
          Yes
        </button>
        <button onClick={handleCancel}>No</button>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        theme: "light",
      }
    );
  };

  const handleCancel = () => {
    toast.dismiss();
  };

  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1, // Generates row numbers
      width: "100px",
    },
    {
      name: "Nama",
      selector: (row) => row.nama,
      width: "200px",
    },
    {
      name: "Username",
      selector: (row) => row.username,
      width: "100px",
    },
    {
      name: "No Handphone",
      selector: (row) => row.noTelepon,
      width: "200px",
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/users/${row._id}/edit`}>
            <FaPenNib size={15} className="text-green-500" />
          </Link>
          <button
            onClick={() => {
              showDeleteConfirmation(row._id);
            }}
          >
            <FaTrashCan size={15} className="text-red-500" />
          </button>
        </div>
      ),
      width: "200px",
    },
  ];

  return (
    <Section>
      <SectionTitle title="User"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <Link to="/admin/users/create" className="btn-sm-primary">
              Tambah
            </Link>
          </div>
        </div>
        <div>
          <ToastContainer />
          <DataTable
            columns={columns}
            data={users}
            pagination
            paginationPerPage={rowsPerPage}
            onChangeRowsPerPage={handleRowsPerPage}
          />
        </div>
      </Box>
    </Section>
  );
};

export default User;
