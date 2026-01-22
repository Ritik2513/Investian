import { useEffect, useState } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import {
  FaSwimmingPool,
  FaDumbbell,
  FaShip,
  FaParking,
  FaShieldAlt,
  FaPaw,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

/* ---------------- ICON REGISTRY ---------------- */

const ICONS = {
  FaSwimmingPool,
  FaDumbbell,
  FaShip,
  FaParking,
  FaShieldAlt,
  FaPaw,
};

const iconOptions = Object.keys(ICONS);

/* ---------------- COMPONENT ---------------- */

const Amenities = ({ onChange }) => {
  const [amenities, setAmenities] = useState([
    {
      label: "",
      description: "",
      icon: "",
    },
  ]);

  /* -------- Sync with Parent (Optional) -------- */

  useEffect(() => {
    if (onChange) onChange(amenities);
  }, [amenities, onChange]);

  /* -------- Handlers -------- */

  const handleChange = (index, field, value) => {
    setAmenities((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const addAmenity = () => {
    setAmenities((prev) => [...prev, { label: "", description: "", icon: "" }]);
  };

  const removeAmenity = (index) => {
    if (amenities.length === 1) return;
    setAmenities((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="mt-6 font-poppins">
      <div className="bg-white rounded-lg p-4 md:p-6 text-black">
        {/* Header */}
        <div className="flex items-center gap-2">
          <IoMdInformationCircle size={24} className="text-blue-600" />
          <h2 className="text-xl md:text-2xl font-semibold">
            Features & Amenities
          </h2>
        </div>

        <hr className="my-4" />

        {/* Amenities List */}
        <div className="space-y-6">
          {amenities.map((item, index) => {
            const SelectedIcon = ICONS[item.icon];

            return (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                {/* Amenity Name */}
                <div>
                  <label className="text-sm font-semibold">Amenity Name</label>
                  <input
                    type="text"
                    placeholder="Infinity Pool"
                    value={item.label}
                    onChange={(e) =>
                      handleChange(index, "label", e.target.value)
                    }
                    className="mt-1 w-full border rounded p-2 outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-semibold">Description</label>
                  <input
                    type="text"
                    placeholder="Rooftop heated pool"
                    value={item.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    className="mt-1 w-full border rounded p-2 outline-none"
                  />
                </div>

                {/* Icon Selector */}
                <div>
                  <label className="text-sm font-semibold">Icon</label>
                  <select
                    value={item.icon}
                    onChange={(e) =>
                      handleChange(index, "icon", e.target.value)
                    }
                    className="mt-1 w-full border rounded p-2"
                  >
                    <option value="">Select Icon</option>
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preview + Delete */}
                <div className="flex items-center justify-between gap-4 mt-6">
                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg min-h-10">
                    {SelectedIcon && <SelectedIcon className="text-blue-600" />}
                    <span className="text-sm font-medium text-gray-700">
                      {item.label || "Preview"}
                    </span>
                  </div>

                  {amenities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAmenity(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Button */}
        <button
          type="button"
          onClick={addAmenity}
          className="mt-6 flex items-center gap-2 text-blue-600 font-semibold hover:underline"
        >
          <FaPlus /> Add Amenity
        </button>
      </div>
    </section>
  );
};

export default Amenities;
