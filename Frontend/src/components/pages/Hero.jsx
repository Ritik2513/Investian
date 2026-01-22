import React from "react";

const Hero = () => {
  return (
    <section className="relative h-screen w-full font-poppins">
      {/* Background Image */}
      <img
        src="/Hero/hero.png"
        alt="City skyline"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full max-w-7xl mx-auto px-6 md:px-10 text-white">
        {/* Tagline */}
        <span className="bg-white custom-text px-4 py-1 rounded-full text-sm font-medium mb-4">
          Premium Real Estate Voucher Redemption
        </span>

        {/* Headline */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
          Unlock Your <span className="custom-text">Dream Property</span>
          <br />
          with Exclusive Vouchers
        </h1>

        {/* Subtext */}
        <p className="text-sm md:text-base lg:text-lg text-gray-200 max-w-xl mb-8">
          Browse our curated collection of luxury properties and redeem your
          vouchers for extraordinary savings on your next investment.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="custom-bg transition text-white px-6 py-3 rounded-md font-medium">
            Explore Projects &rarr;
          </button>
          <button className="border border-white hover:bg-white hover:text-black transition-colors text-white px-6 py-3 rounded-md font-medium duration-200 cursor-pointer">
            How It Works
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
