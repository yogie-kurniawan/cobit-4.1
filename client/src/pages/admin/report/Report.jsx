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
    index: 4.9,
    namaProses: "Define and Manage Service Levels",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "DS2",
    index: 3.2,
    namaProses: "Manage Third-party Services",
    status: "3 - Defined",
    keterangan:
      "Proses terdefinisi dengan baik, namun perlu peningkatan manajemen.",
  },
  {
    proses: "DS3",
    index: 4.6,
    namaProses: "Manage Performance and Capacity",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "DS4",
    index: 4.7,
    namaProses: "Ensure Continuous Service",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "DS5",
    index: 4.4,
    namaProses: "Ensure Systems Security",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "DS6",
    index: 4.9,
    namaProses: "Identify and Allocate Costs",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "ME1",
    index: 4.9,
    namaProses: "Monitor and Evaluate IT Performance",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "ME2",
    index: 4.8,
    namaProses: "Monitor and Evaluate Internl Control",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "ME3",
    index: 4.6,
    namaProses: "Ensuring Regulatory Compliance",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "ME4",
    index: 2.8,
    namaProses: "Providing IT Governance",
    status: "2 - Repeatable",
    keterangan: "Belum terlaksana sepenuhnya",
  },
];

const Report = () => {
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

  const columns = [
    {
      name: "No.",
      selector: (row, index) => (row.proses === "Total" ? "" : index + 1), // Skip number for the totals row
      width: "100px",
    },
    {
      name: "Kode Proses",
      selector: (row) => row.proses,
      width: "100px",
    },
    {
      name: "Nama Proses",
      selector: (row) => row.namaProses,
      width: "300px",
    },
    {
      name: "Index Maturity Sekarang",
      selector: (row) => row.index,
      width: "150px",
    },
    {
      name: "Skala",
      selector: (row) => row.status,
      width: "150px",
    },
    {
      name: "Keterangan",
      selector: (row) => row.keterangan,
      width: "5000px",
    },
  ];

  return (
    <Section>
      <SectionTitle title="Laporan Hasil"></SectionTitle>
      <Box>
        <div className="flex gap-1">
          <Link
            target="_blank"
            to="/admin/report/print"
            className="btn-md-secondary"
          >
            Cetak
          </Link>
        </div>
        <div className="mb-6">
          <ToastContainer />
          <DataTable
            columns={columns}
            data={ml}
            pagination
            paginationPerPage={rowsPerPage}
            onChangeRowsPerPage={handleRowsPerPage}
          />
        </div>
      </Box>
    </Section>
  );
};

export default Report;
