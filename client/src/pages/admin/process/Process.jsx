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
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getProcesses())
      .then((response) => {
        if (response.payload.error) {
          toast.error(response.payload.message);
        }
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
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              dispatch(deleteProcess(id))
                .then((response) => {
                  if (!response.payload.error) {
                    toast.success(response.payload.message);
                  } else {
                    toast.error(response.payload.message);
                  }
                })
                .catch((error) => {
                  toast.error(error.message);
                });
              toast.dismiss();
            }}
            className="btn-md-secondary"
          >
            Yes
          </button>
          <button onClick={handleCancel} className="btn-md-primary">
            No
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
        <div className="mb-8 ">
          <div className="flex gap-1">
            <Link to="/admin/processes/create" className="btn-md-primary">
              Tambah
            </Link>
            <Link
              target="_blank"
              to="/admin/processes/print"
              className="btn-md-secondary"
            >
              Cetak
            </Link>
          </div>
        </div>
        <div>
          <ToastContainer />
          <DataTable
            columns={columns}
            data={processes}
            pagination
            paginationPerPage={rowsPerPage}
            onChangeRowsPerPage={handleRowsPerPage}
          />
        </div>
      </Box>
    </Section>
  );
};

export default Process;
