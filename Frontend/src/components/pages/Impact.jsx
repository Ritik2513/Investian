import React from "react";

const Impact = () => {
  return (
    <section className="bg-white py-20 font-poppins">
      <div className="max-w-7xl mx-auto px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 leading-tight">
              Your Trusted Real <br />
              Estate Advisors
            </h2>

            <p className="text-sm text-gray-500 max-w-md mb-8">
              Find Your Property I’ve put together more than 50 examples of
              automated real estate text message scripts to use in your first
              text messaging campaign.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="bg-gray-100 rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-gray-900">30+</h3>
                <p className="text-sm text-gray-500 mt-1">Satisfied Customer</p>
              </div>

              <div className="custom-bg rounded-xl p-6 text-white">
                <h3 className="text-2xl font-semibold">5k+</h3>
                <p className="text-sm text-indigo-200 mt-1">Award winning</p>
              </div>

              <div className="bg-gray-100 rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-gray-900">07+</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Years of Experience
                </p>
              </div>

              <div className="bg-gray-100 rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-gray-900">33+</h3>
                <p className="text-sm text-gray-500 mt-1">Projects Delivered</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGES */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/Impact/i1.jpg"
                alt="Building"
                className="rounded-xl object-cover w-full h-40 md:h-48"
              />
              <img
                src="/Impact/i2.jpg"
                alt="Happy family"
                className="rounded-xl object-cover w-full h-40 md:h-48"
              />
            </div>

            <img
              src="/Impact/i3.jpg"
              alt="Moving home"
              className="rounded-xl object-cover w-full h-48 md:h-60 mt-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
