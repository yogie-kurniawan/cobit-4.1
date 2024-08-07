import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/main/images/undraw_mobile_content_xvgr.png";
const Home = () => {
  return (
    <section className="min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-2 md:gap-5">
          <div className="flex flex-col justify-center lg:justify-start w-full pt-20 text-center lg:text-left md:max-w-full">
            <h1 className="text-primary text-4xl md:text-5xl lg:text-6xl font-bold capitalize">
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
          <div className="w-full pt-8 md:pt-16 flex items-center justify-center lg:justify-start">
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
