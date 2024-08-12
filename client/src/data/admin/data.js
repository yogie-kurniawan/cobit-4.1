import React from "react";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { BsPeople } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { ImSpinner6 } from "react-icons/im";
import { TbReportAnalytics } from "react-icons/tb";
import { RiFundsBoxLine } from "react-icons/ri";
import { BiDonateHeart } from "react-icons/bi";

export const menu = [
  {
    title: "Data Master",
    links: [
      {
        id: 1,
        url: "/admin/admins",
        text: "Admin",
        icon: <GrUserAdmin size={20} />,
      },
      {
        id: 2,
        url: "/admin/users",
        text: "User",
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
        url: "/admin/processes",
        text: "Proses",
        icon: <ImSpinner6 size={20} />,
      },
      {
        id: 5,
        url: "/admin/questions",
        text: "Pertanyaan",
        icon: <MdOutlineQuestionAnswer size={20} />,
      },
      {
        id: 6,
        url: "/admin/answers",
        text: "Jawaban",
        icon: <BiDonateHeart size={20} />,
      },
    ],
  },
  {
    title: "Laporan",
    links: [
      {
        id: 1,
        url: "/admin/maturity-levels",
        text: "Maturity Level",
        icon: <TbReportAnalytics size={20} />,
      },
      {
        id: 2,
        url: "/admin/gaps",
        text: "Gap",
        icon: <RiFundsBoxLine size={20} />,
      },
    ],
  },
];
