import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Domain from "../models/Domain.js";
import Process from "../models/Process.js";
import Question from "../models/Question.js";
import hashPassword from "../utils/hashPassword.js";
import mongoose from "mongoose";
import express from "express";
const router = express.Router();
const dataAdmins = [
  {
    _id: 1,
    nama: "John",
    username: "john",
    password: "123",
    noTelepon: "082388382700",
  },
  {
    _id: 2,
    nama: "Ron",
    username: "ron",
    password: "123",
    noTelepon: "081430394160",
  },
];
const dataUsers = [
  {
    _id: 1,
    nama: "Dayat",
    username: "dayat",
    password: "123",
    noTelepon: "081248385939",
  },
  {
    _id: 2,
    nama: "Intan Oktazulinda",
    username: "intan",
    password: "123",
    noTelepon: "088482940382",
  },
  {
    _id: 3,
    nama: "Muthia Ega Pratiwi",
    username: "muthia",
    password: "123",
    noTelepon: "08382949392",
  },
  {
    _id: 4,
    nama: "Hafiz",
    username: "hafiz",
    password: "123",
    noTelepon: "083849392034",
  },
  {
    _id: 5,
    nama: "aditya",
    username: "aditya",
    password: "123",
    noTelepon: "084829403945",
  },
  {
    _id: 6,
    nama: "Fajri",
    username: "fajri",
    password: "123",
    noTelepon: "083748593828",
  },
  {
    _id: 7,
    nama: "Yusuf Ilham",
    username: "yusuf",
    password: "123",
    noTelepon: "083849583828",
  },
  {
    _id: 8,
    nama: "Syofiani",
    username: "syofiani",
    password: "123",
    noTelepon: "083948384593",
  },
  {
    _id: 9,
    nama: "rizky",
    username: "rizky",
    password: "123",
    noTelepon: "084160294039",
  },
  {
    _id: 10,
    nama: "Lovely Memory",
    username: "lovely",
    password: "123",
    noTelepon: "0837492938593",
  },
  {
    _id: 11,
    nama: "Ryan",
    username: "ryan",
    password: "123",
    noTelepon: "081430394160",
  },
  {
    _id: 12,
    nama: "Fizi",
    username: "fizi",
    password: "123",
    noTelepon: "080304872738",
  },
];
const dataDomains = [
  {
    _id: 1,
    kode: "PO",
    nama: "Plan and Organize",
    deskripsi: "",
  },
  {
    _id: 1,
    kode: "AI",
    nama: "Acquire and Implement",
    deskripsi: "",
  },
  {
    _id: 1,
    kode: "DS",
    nama: "Deliver and Support",
    deskripsi: "",
  },
  {
    _id: 1,
    kode: "ME",
    nama: "Monitor and Evaluate",
    deskripsi: "",
  },
];
const dataProcesses = [
  {
    _id: 1,
    idDomain: "66b572c20f260095ad0e29bb",
    kode: "DS1",
    nama: "Define and Manage Service Levels",
    deskripsi: "",
  },
  {
    _id: 2,
    idDomain: "66b572c20f260095ad0e29bb",
    kode: "DS2",
    nama: "Manage Third-party Services",
    deskripsi: "",
  },
  {
    _id: 3,
    idDomain: "66b572c20f260095ad0e29bb",
    kode: "DS3",
    nama: "Manage Performance and Capacity",
    deskripsi: "",
  },
  {
    _id: 4,
    idDomain: "66b572c20f260095ad0e29bb",
    kode: "DS4",
    nama: "Ensure Continuous Service",
    deskripsi: "",
  },
  {
    _id: 5,
    idDomain: "66b572c20f260095ad0e29bb",
    kode: "DS5",
    nama: "Ensure Systems Security",
    deskripsi: "",
  },
  {
    _id: 6,
    idDomain: "66b572c20f260095ad0e29bb",
    kode: "DS6",
    nama: "Identify and Allocate Costs",
    deskripsi: "",
  },
  {
    _id: 6,
    idDomain: "66b572c20f260095ad0e29bc",
    kode: "ME1",
    nama: "Monitor and Evaluate IT Performance",
    deskripsi: "",
  },
  {
    _id: 6,
    idDomain: "66b572c20f260095ad0e29bc",
    kode: "ME2",
    nama: "Monitor and Evaluate Internal Control",
    deskripsi: "",
  },
  {
    _id: 6,
    idDomain: "66b572c20f260095ad0e29bc",
    kode: "ME3",
    nama: "Ensure Compliance with External Requirements",
    deskripsi: "",
  },
  {
    _id: 6,
    idDomain: "66b572c20f260095ad0e29bc",
    kode: "ME4",
    nama: "Provide IT Governance",
    deskripsi: "",
  },
];
const dataQuestions = [
  {
    _id: 1,
    idProses: "66b5746626adb5b65f8acc76",
    pertanyaan:
      "Seberapa baik pengguna layanan memahami tingkat layanan yang diharapkan?",
  },
  {
    _id: 1,
    idProses: "66b5746626adb5b65f8acc77",
    pertanyaan: "Kebijakan manajemen pihak ketiga ditinjau dan diperbarui?",
  },
  {
    _id: 1,
    idProses: "66b5746626adb5b65f8acc78",
    pertanyaan:
      "Seberapa baik proses untuk memantau kinerja sistem dan aplikasi secara rutin",
  },
  {
    _id: 1,
    idProses: "66b5746626adb5b65f8acc79",
    pertanyaan:
      "Prosedur yang jelas untuk pemulihan layanan dalam kasus kegagalan sistem",
  },
  {
    _id: 1,
    idProses: "66b5746626adb5b65f8acc7a",
    pertanyaan:
      "Seberapa sering kebijakan keamanan informasi diperbarui untuk mencerminkan perubahan teknologi dan ancaman keamanan",
  },
  {
    _id: 1,
    idProses: "66b5746626adb5b65f8acc7b",
    pertanyaan:
      "Seberapa baik indikator kinerja utama (KPI) untuk mengukur efektivitas sistem",
  },
  {
    _id: 1,
    idProses: "66b5746626adb5b65f8acc7e",
    pertanyaan:
      "Seberapa baik kinerja sistem penjualan dievaluasi untuk memastikan bahwa sistem berfungsi sesuai ekspektasi",
  },
  {
    _id: 1,
    idProses: "66b5746626adb5b65f8acc7f",
    pertanyaan:
      "Seberapa baik kontrol sistem penjualan dievaluasi untuk memastikan efektivitasnya",
  },
  {
    _id: 1,
    idProses: "66b5746626adb5b65f8acc7c",
    pertanyaan:
      "Seberapa baik evaluasi independen terhadap praktik tata kelola sistem penjualan di organisasi",
  },
  {
    _id: 1,
    idProses: "66b5746626adb5b65f8acc7d",
    pertanyaan:
      "Seberapa baik pelatihan dan kesadaran yang memadai mengenai kepatuhan sistem penjualan untuk pengguna sistem dalam proses penjualan dan TI",
  },
];
const createDomains = (req, res) => {
  dataUsers.forEach(async (item) => {
    let { nama, username, password, noTelepon } = item;
    try {
      password = await hashPassword(password);
      const newAdmin = new User({
        nama,
        username,
        password,
        noTelepon,
      });

      await newAdmin.save();
      //   return res
      //     .status(201)
      //     .json({ admin: newAdmin, message: "Berhasil menyimpan admin!" });
    } catch (error) {
      console.log(error);
      //   return res.status(400).json({ message: error.message });
    }
  });
  return res.json({ msg: "y" });
};
router.post("/", createDomains);

export default router;
