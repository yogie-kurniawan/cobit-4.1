import React, { useState, useEffect } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { FaPenNib } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteProcess,
  getProcesses,
} from "../../../features/admin/processSlice";

const Process = () => {
  const dispatch = useDispatch();
  const processes = useSelector((state) => state.processes.processes);
  console.log(processes);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getProcesses());
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
            dispatch(deleteProcess(id));
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
      name: "Domain",
      selector: (row) => row.domain.kode, // Generates row numbers
      width: "100px",
    },
    {
      name: "Kode",
      selector: (row) => row.kode,
      width: "100px",
    },
    {
      name: "Nama",
      selector: (row) => row.nama,
      width: "300px",
    },
    {
      name: "Deskripsi",
      selector: (row) => row.deskripsi,
      width: "300px",
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/processes/${row._id}/edit`}>
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
      <SectionTitle title="Proses"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <Link to="/admin/processes/create" className="btn-sm-primary">
              Tambah
            </Link>
          </div>
        </div>
        <div>
          <DataTable
            columns={columns}
            data={processes}
            pagination
            paginationPerPage={rowsPerPage}
            onChangeRowsPerPage={handleRowsPerPage}
          />
          {/* <ToastContainer /> */}
        </div>
      </Box>
    </Section>
  );
};

export default Process;
