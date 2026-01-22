import { useEffect, useState } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import { FaLocationDot, FaTrainTram, FaBus } from "react-icons/fa6";
import { FaUniversity } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { MdLocalHospital, MdLocalAirport } from "react-icons/md";
import { FaBasketShopping } from "react-icons/fa6";

const inputClass =
  "block w-full border rounded border-gray-300 p-2 mt-2 outline-none focus:ring-1 focus:ring-blue-500";

const Location = ({ onChange }) => {
  const [formData, setFormData] = useState({
    address: "",
    pincode: "",
    city: "",
    state: "",
    landmark: "",
    school: "",
    hospital: "",
    college: "",
    market: "",
    metro: "",
    busStand: "",
    airport: "",
  });

  /* ---------------- Handlers ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- Sync with Parent ---------------- */
  useEffect(() => {
    onChange({
      address: formData.address,
      pincode: formData.pincode,
      city: formData.city,
      state: formData.state,
      landmark: formData.landmark,
      nearbyFacilities: {
        school: formData.school,
        hospital: formData.hospital,
        college: formData.college,
        market: formData.market,
        convenience: {
          metro: formData.metro,
          busStand: formData.busStand,
          airport: formData.airport,
        },
      },
    });
  }, [formData, onChange]);

  /* ---------------- Facility Config ---------------- */

  const facilities = [
    { key: "school", label: "School", icon: <IoSchool size={20} /> },
    { key: "hospital", label: "Hospital", icon: <MdLocalHospital size={20} /> },
    { key: "college", label: "College", icon: <FaUniversity size={20} /> },
    { key: "market", label: "Market", icon: <FaBasketShopping size={20} /> },
    { key: "metro", label: "Metro", icon: <FaTrainTram size={20} /> },
    { key: "busStand", label: "Bus Stand", icon: <FaBus size={20} /> },
    { key: "airport", label: "Airport", icon: <MdLocalAirport size={20} /> },
  ];

  return (
    <section className="mt-6 font-poppins">
      <div className="bg-white rounded-lg p-4 md:p-6 text-black">
        {/* Header */}
        <div className="flex items-center gap-2">
          <IoMdInformationCircle size={24} className="text-blue-600" />
          <h2 className="text-xl md:text-2xl font-semibold">
            Location & Proximity
          </h2>
        </div>

        <hr className="my-4" />

        {/* Address Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
          <Input label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
          <Input label="City" name="city" value={formData.city} onChange={handleChange} />
          <Input label="State" name="state" value={formData.state} onChange={handleChange} />
          <Input label="Nearby Landmark" name="landmark" value={formData.landmark} onChange={handleChange} />
        </div>

        {/* Proximity Section */}
        <div className="flex items-center gap-2 mt-10">
          <FaLocationDot size={24} className="text-blue-600" />
          <h2 className="text-xl md:text-2xl font-semibold">
            Distance to Key Facilities
          </h2>
        </div>

        <hr className="my-4" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {facilities.map(({ key, label, icon }) => (
            <div key={key} className="flex gap-3 items-center">
              <div className="bg-gray-100 p-3 rounded-xl">{icon}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-600">{label}</p>
                <input
                  type="text"
                  placeholder="e.g. 2.5 km"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="border-b w-full outline-none py-1 focus:border-gray-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Reusable Input ---------------- */

const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="font-semibold">{label}</label>
    <input
      type="text"
      name={name}
      placeholder={name}
      value={value}
      onChange={onChange}
      className={inputClass}
      autoComplete="off"
    />
  </div>
);

export default Location;
