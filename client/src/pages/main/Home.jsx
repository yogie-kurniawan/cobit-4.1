import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/main/images/undraw_mobile_content_xvgr.png";
const Home = () => {
  return (
    <section className="min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex gap-5">
          <div className="w-full pt-40">
            <h1 className="text-primary text-6xl font-bold capitalize">
              Berikan Penilaian Anda Terhadap Sistem Kami
            </h1>
            <p className="text-lg text-gray-700 mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Blanditiis excepturi, recusandae assumenda
            </p>
            <div className="mt-4">
              <Link to="/survey" className="btn-lg-primary">
                Berikan Penilaian
              </Link>
            </div>
          </div>
          <div className="w-full pt-32">
            <img
              src={heroImage}
              alt="hero-image"
              className="w-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
