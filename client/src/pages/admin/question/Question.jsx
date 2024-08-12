import React, { useState, useEffect } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuestion,
  getQuestions,
} from "../../../features/admin/questionSlice";
import DataTable from "react-data-table-component";
import { FaPenNib } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdClose } from "react-icons/md";

const Question = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getQuestions());
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
              dispatch(deleteQuestion(id)).then((action) => {
                if (deleteQuestion.fulfilled.match(action)) {
                  toast.success(action.payload.message);
                } else if (deleteQuestion.rejected.match(action)) {
                  toast.error(
                    `Gagal menghapus pertanyaan: ${action.error.message}`
                  );
                }
              });
              toast.dismiss(); // Dismiss the toast after confirmation
            }}
            className="btn-sm-secondary"
          >
            Yes
          </button>
          <button onClick={handleCancel} className="btn-sm-primary">
            No
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        theme: "colored",
      }
    );
  };

  const handleCancel = () => {
    toast.dismiss();
  };
  const CloseButton = ({ closeToast }) => <MdClose onClick={closeToast} />;

  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1, // Generates row numbers
      width: "100px",
    },
    {
      name: "Proses",
      selector: (row) => {
        if (row.process !== undefined) {
          return row.process.kode;
        }
        return "";
      },
      width: "100px",
    },
    {
      name: "Id",
      selector: (row) => row._id,
      width: "400px",
    },
    {
      name: "Pertanyaan",
      selector: (row) => row.pertanyaan,
      width: "400px",
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/questions/${row._id}/edit`}>
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
      <SectionTitle title="Pertanyaan"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <Link to="/admin/questions/create" className="btn-sm-primary">
              Tambah
            </Link>
          </div>
        </div>
        <div>
          <ToastContainer closeButton={CloseButton} />
          <DataTable
            columns={columns}
            data={questions}
            pagination
            paginationPerPage={rowsPerPage}
            onChangeRowsPerPage={handleRowsPerPage}
          />
        </div>
      </Box>
    </Section>
  );
};

export default Question;
