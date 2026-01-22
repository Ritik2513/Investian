import React from "react";

const Design = () => {
  return (
    <section className="w-full py-16 font-poppins">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden h-105 md:h-120">
          
          {/* Background Image */}
          <img
            src="/Dream/d3.avif"
            alt="Timeless interior design"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/55"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-lg px-6 md:px-12">
              <h2 className="text-3xl md:text-4xl font-serif text-white leading-snug">
                Our timeless <span className="italic">inclusions</span>
              </h2>

              <p className="text-gray-200 mt-4 text-sm md:text-base leading-relaxed">
                We’ve been creating dream homes our clients are thrilled to
                call their own. Delighting them with handcrafted finishes,
                amenities, and accents that stand the test of time.
              </p>

              <button className="mt-6 inline-flex items-center px-6 py-3 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-100 transition">
                View Inclusions
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Design;
