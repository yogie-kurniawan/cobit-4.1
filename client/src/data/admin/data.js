import React from "react";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { ImSpinner6 } from "react-icons/im";
import { TbReportAnalytics } from "react-icons/tb";
import { RiFundsBoxLine } from "react-icons/ri";

export const menu = [
  {
    title: "Data Master",
    links: [
      {
        id: 1,
        url: "/admin/questions",
        text: "Pertanyaan",
        icon: <MdOutlineQuestionAnswer size={20} />,
      },
      {
        id: 2,
        url: "/admin/users",
        text: "Responden",
        icon: <BsPeople size={20} />,
      },
      {
        id: 3,
        url: "/admin/domains",
        text: "Domain",
        icon: <CiGlobe size={20} />,
      },
      {
        id: 4,
        url: "/admin/proses",
        text: "Proses",
        icon: <ImSpinner6 size={20} />,
      },
    ],
  },
  {
    title: "Laporan",
    links: [
      {
        id: 1,
        url: "/admin/maturity-level",
        text: "Maturity Level",
        icon: <TbReportAnalytics size={20} />,
      },
      {
        id: 2,
        url: "/admin/gap",
        text: "Gap",
        icon: <RiFundsBoxLine size={20} />,
      },
    ],
  },
];
