import React from "react";
import Section from "../../components/admin/Section";
import SectionTitle from "../../components/admin/SectionTitle";
import InfoCard from "../../components/admin/InfoCard";

const Dashboard = () => {
  return (
    <Section>
      <SectionTitle title="Dashboard" />
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        <InfoCard className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <h1 className="text-xl font-semibold">Admin</h1>
          <h3 className="text-md font-semibold">2</h3>
        </InfoCard>
        <InfoCard className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <h1 className="text-xl font-semibold">User</h1>
          <h3 className="text-md font-semibold">12</h3>
        </InfoCard>
        <InfoCard className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <h1 className="text-xl font-semibold">Petanyaan</h1>
          <h3 className="text-md font-semibold">10</h3>
        </InfoCard>
        <InfoCard className="bg-gradient-to-r from-green-500 to-green-400 text-white">
          <h1 className="text-xl font-semibold">Domain</h1>
          <h3 className="text-md font-semibold">4</h3>
        </InfoCard>
        <InfoCard className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white">
          <h1 className="text-xl font-semibold">Proses</h1>
          <h3 className="text-md font-semibold">10</h3>
        </InfoCard>
      </div>
    </Section>
  );
};

export default Dashboard;
