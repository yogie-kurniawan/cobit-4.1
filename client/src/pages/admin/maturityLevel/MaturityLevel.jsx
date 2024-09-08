import React, { useState, useEffect } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMaturityLevels } from "../../../features/admin/maturityLevelSlice";
import DataTable from "react-data-table-component";
import { FaPenNib } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ml = [
  {
    proses: "DS1",
    jumlahPertanyaan: 10,
    jumlahResponden: 12,
    jumlahNilai: 49,
    index: 4.9,
  },
  {
    proses: "DS2",
    jumlahPertanyaan: 10,
    jumlahResponden: 12,
    jumlahNilai: 32,
    index: 3.2,
  },
  {
    proses: "DS3",
    jumlahPertanyaan: 10,
    jumlahResponden: 12,
    jumlahNilai: 46,
    index: 4.6,
  },
  {
    proses: "DS4",
    jumlahPertanyaan: 10,
    jumlahResponden: 12,
    jumlahNilai: 47,
    index: 4.7,
  },
  {
    proses: "DS5",
    jumlahPertanyaan: 10,
    jumlahResponden: 12,
    jumlahNilai: 44,
    index: 4.4,
  },
  {
    proses: "DS6",
    jumlahPertanyaan: 10,
    jumlahResponden: 12,
    jumlahNilai: 49,
    index: 4.9,
  },
  {
    proses: "ME1",
    jumlahPertanyaan: 10,
    jumlahResponden: 12,
    jumlahNilai: 49,
    index: 4.9,
  },
  {
    proses: "ME2",
    jumlahPertanyaan: 10,
    jumlahResponden: 12,
    jumlahNilai: 48,
    index: 4.8,
  },
  {
    proses: "ME3",
    jumlahPertanyaan: 10,
    jumlahResponden: 12,
    jumlahNilai: 46,
    index: 4.6,
  },
  {
    proses: "ME4",
    jumlahPertanyaan: 10,
    jumlahResponden: 12,
    jumlahNilai: 28,
    index: 2.8,
  },
];

const MaturityLevel = () => {
  const dispatch = useDispatch();
  const maturityLevels = useSelector(
    (state) => state.maturityLevels.maturityLevels
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getMaturityLevels());
  }, [dispatch]);

  const handleRowsPerPage = (newPerPage) => {
    setRowsPerPage(newPerPage);
  };

  const totals = ml.reduce(
    (acc, row) => {
      acc.jumlahPertanyaan += row.jumlahPertanyaan;
      acc.jumlahResponden += row.jumlahResponden;
      acc.jumlahNilai += row.jumlahNilai;
      acc.index += row.index;

      // Round the results to 2 decimal places
      acc.jumlahPertanyaan = parseFloat(acc.jumlahPertanyaan.toFixed(2));
      acc.jumlahResponden = parseFloat(acc.jumlahResponden.toFixed(2));
      acc.jumlahNilai = parseFloat(acc.jumlahNilai.toFixed(2));
      acc.index = parseFloat(acc.index.toFixed(2));

      return acc;
    },
    {
      proses: "Total",
      jumlahPertanyaan: 0,
      jumlahResponden: 0,
      jumlahNilai: 0,
      index: 0,
    }
  );

  const columns = [
    {
      name: "No.",
      selector: (row, index) => (row.proses === "Total" ? "" : index + 1), // Skip number for the totals row
      width: "100px",
    },
    {
      name: "Proses",
      selector: (row) => row.proses,
      width: "100px",
    },
    {
      name: "Jumlah Pertanyaan",
      selector: (row) => row.jumlahPertanyaan,
      width: "150px",
    },
    {
      name: "Jumlah Responden",
      selector: (row) => row.jumlahResponden,
      width: "150px",
    },
    {
      name: "Jumlah Nilai",
      selector: (row) => row.jumlahNilai,
      width: "150px",
    },
    {
      name: "Index",
      selector: (row) => row.index,
      width: "150px",
    },
  ];

  return (
    <Section>
      <SectionTitle title="Maturity Level"></SectionTitle>
      <Box>
        <div className="flex gap-1">
          <Link
            target="_blank"
            to="/admin/maturity-level/print"
            className="btn-md-secondary"
          >
            Cetak
          </Link>
        </div>
        <div className="mb-6">
          <ToastContainer />
          <DataTable
            columns={columns}
            data={[...ml, totals]}
            pagination
            paginationPerPage={rowsPerPage}
            onChangeRowsPerPage={handleRowsPerPage}
          />
        </div>
        <div>
          <h6 className="font-bold">Hasil analisa :</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dolor
            natus fuga consequatur tenetur harum deleniti provident, tempore
            quae ipsam distinctio dolorum obcaecati suscipit, iure ducimus qui.
            Maxime, fuga dignissimos!
          </p>
        </div>
      </Box>
    </Section>
  );
};

export default MaturityLevel;
