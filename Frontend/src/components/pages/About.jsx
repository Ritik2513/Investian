import React from "react";

const About = () => {
  return (
    <section className="max-w-7xl mx-auto px-16 py-12" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-lg">
        {/* Left Content */}
        <div className="bg-[#1f1f1f] text-white p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">
            About <span className="custom-text">Us</span>
          </h2>

          <p className="text-gray-300 mb-4 leading-relaxed">
            Invest your trusted partner in the world of real estate. We take
            pride in offering transparent services by blending expertise with
            modern technology across residential and commercial projects.
          </p>

          <p className="text-gray-300 mb-4 leading-relaxed">
            Our agency specializes in finding the perfect homes and investment
            properties for our clients. We believe that every real estate
            journey should be seamless, secure, and rewarding.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Through years of experience, we have built a reputation for
            integrity, professionalism, and customer satisfaction. Your goals
            are our priority.
          </p>
        </div>

        {/* Right Image */}
        <div className="w-full h-full">
          <img
            src="/About/about.jpg"
            alt="About us"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
