import React, { useState, useEffect } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdmins, deleteAdmin } from "../../../features/admin/adminSlice";
import DataTable from "react-data-table-component";
import { FaPenNib } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.admins);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getAdmins())
      .then((res) => {
        if (res.payload.status == "error") throw new Error(res.payload.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [dispatch]);

  const handleRowsPerPage = (newPerPage) => {
    setRowsPerPage(newPerPage);
  };

  const showDeleteConfirmation = (id) => {
    toast(
      <div>
        <p>Anda yakin ingin menghapus?</p>
        <div className="flex gap-1">
          <button
            onClick={() => {
              dispatch(deleteAdmin(id))
                .then((res) => {
                  if (res.payload.status == "error")
                    throw new Error(res.payload.message);
                  toast.success(res.payload.message);
                })
                .catch((error) => {
                  toast.error(error.message);
                });
              toast.dismiss();
            }}
            className="btn-md-secondary"
          >
            Ya
          </button>
          <button onClick={handleCancel} className="btn-md-primary">
            Tidak
          </button>
        </div>
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
      width: "100px",
    },
    {
      name: "Username",
      selector: (row) => row.username,
      width: "100px",
    },
    {
      name: "No Telepon",
      selector: (row) => row.noTelepon,
      width: "200px",
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/admins/${row._id}/edit`}>
            <FaPenNib size={15} className="text-green-500" />
          </Link>
          <Link
            onClick={() => {
              showDeleteConfirmation(row._id);
            }}
          >
            <FaTrashCan size={15} className="text-red-500" />
          </Link>
        </div>
      ),
      width: "200px",
    },
  ];

  return (
    <Section>
      <SectionTitle title="Admin"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <Link to="/admin/admins/create" className="btn-md-primary">
              Tambah
            </Link>
          </div>
        </div>
        <div>
          <ToastContainer />
          <DataTable
            columns={columns}
            data={admins}
            pagination
            paginationPerPage={rowsPerPage}
            onChangeRowsPerPage={handleRowsPerPage}
          />
        </div>
      </Box>
    </Section>
  );
};

export default Admin;
