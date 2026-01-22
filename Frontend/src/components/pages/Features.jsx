import React from "react";
import {
  HiHome,
  HiBadgeCheck,
  HiClock,
  HiShieldCheck,
} from "react-icons/hi";

const services = [
  {
    title: "Affordable Property Taxes",
    desc: "We help you find a new home by offering a smart real estate experience",
    icon: <HiHome size={28} />,
    active: true,
  },
  {
    title: "Guaranteed Quality Homes",
    desc: "We help you find a new home by offering a smart real estate experience",
    icon: <HiBadgeCheck size={28} />,
    active: false,
  },
  {
    title: "Fast and Easy Process",
    desc: "We help you find a new home by offering a smart real estate experience",
    icon: <HiClock size={28} />,
    active: false,
  },
  {
    title: "Property Insurance",
    desc: "We help you find a new home by offering a smart real estate experience",
    icon: <HiShieldCheck size={28} />,
    active: false,
  },
];

const Features = () => {
  return (
    <section className="bg-white py-10 font-poppins">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Our Services
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Enhance your property listings and videos with accurate
            <br className="hidden sm:block" />
            and engaging subtitles.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-6 rounded-xl transition
                ${
                  item.active
                    ? "custom-bg text-white"
                    : "bg-[#EAEAF4] text-gray-800"
                }
              `}
            >
              {/* Icon */}
              <div
                className={`p-3 rounded-lg ${
                  item.active
                    ? "bg-white/20 text-white"
                    : "bg-white custom-text"
                }`}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="font-semibold text-base mb-1">
                  {item.title}
                </h3>
                <p
                  className={`text-sm ${
                    item.active ? "text-indigo-100" : "text-gray-500"
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
