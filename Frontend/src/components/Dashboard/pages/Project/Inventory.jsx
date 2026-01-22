import { useEffect, useState } from "react";
import { MdInventory } from "react-icons/md";
import { FaPlus, FaTrash } from "react-icons/fa";

const Inventory = ({ onChange }) => {
  const [inventory, setInventory] = useState([
    {
      unit: "",
      beds: "",
      baths: "",
      size: "",
      view: "",
      direction: "",
      available: true,
      oldPrice: "",
      price: "",
    },
  ]);

  /* -------- Sync with Parent (Optional) -------- */

  useEffect(() => {
    if (onChange) onChange(inventory);
  }, [inventory, onChange]);

  /* ---------------- Handlers ---------------- */

  const handleChange = (index, field, value) => {
    setInventory((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const toggleAvailability = (index) => {
    setInventory((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, available: !item.available } : item
      )
    );
  };

  const addUnit = () => {
    setInventory((prev) => [
      ...prev,
      {
        unit: "",
        beds: "",
        baths: "",
        size: "",
        view: "",
        direction: "",
        available: true,
        oldPrice: "",
        price: "",
      },
    ]);
  };

  const removeUnit = (index) => {
    if (inventory.length === 1) return;
    setInventory((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="mt-6 font-poppins">
      <div className="bg-white rounded-lg p-4 md:p-6 text-black">
        {/* Header */}
        <div className="flex items-center gap-2">
          <MdInventory size={24} className="text-blue-600" />
          <h2 className="text-xl md:text-2xl font-semibold">
            Unit Inventory
          </h2>
        </div>

        <hr className="my-4" />

        {/* Inventory List */}
        <div className="space-y-6">
          {inventory.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 grid grid-cols-1 lg:grid-cols-4 gap-4"
            >
              <Input
                label="Unit No."
                placeholder="A-1201"
                value={item.unit}
                onChange={(e) =>
                  handleChange(index, "unit", e.target.value)
                }
              />

              <Input
                label="Beds"
                type="number"
                placeholder="3"
                value={item.beds}
                onChange={(e) =>
                  handleChange(index, "beds", e.target.value)
                }
              />

              <Input
                label="Baths"
                type="number"
                placeholder="2"
                value={item.baths}
                onChange={(e) =>
                  handleChange(index, "baths", e.target.value)
                }
              />

              <Input
                label="Size (sq.ft)"
                placeholder="1800"
                value={item.size}
                onChange={(e) =>
                  handleChange(index, "size", e.target.value)
                }
              />

              <Input
                label="View"
                placeholder="Sea / City"
                value={item.view}
                onChange={(e) =>
                  handleChange(index, "view", e.target.value)
                }
              />

              <Input
                label="Direction"
                placeholder="North / East"
                value={item.direction}
                onChange={(e) =>
                  handleChange(index, "direction", e.target.value)
                }
              />

              <Input
                label="Old Price"
                type="number"
                placeholder="Optional"
                value={item.oldPrice}
                onChange={(e) =>
                  handleChange(index, "oldPrice", e.target.value)
                }
              />

              <Input
                label="Current Price"
                type="number"
                placeholder="1750000"
                value={item.price}
                onChange={(e) =>
                  handleChange(index, "price", e.target.value)
                }
              />

              {/* Availability + Delete */}
              <div className="flex items-center justify-between col-span-full mt-2">
                <button
                  type="button"
                  onClick={() => toggleAvailability(index)}
                  className={`px-4 py-2 rounded text-sm font-semibold transition ${
                    item.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.available ? "Available" : "Sold Out"}
                </button>

                {inventory.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeUnit(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Unit */}
        <button
          type="button"
          onClick={addUnit}
          className="mt-6 flex items-center gap-2 text-blue-600 font-semibold hover:underline"
        >
          <FaPlus /> Add Unit
        </button>
      </div>
    </section>
  );
};

/* ---------------- Reusable Input ---------------- */

const Input = ({ label, type = "text", ...props }) => (
  <div>
    <label className="text-sm font-semibold">{label}</label>
    <input
      type={type}
      className="mt-1 w-full border rounded p-2 outline-none focus:ring-1 focus:ring-blue-500"
      {...props}
    />
  </div>
);

export default Inventory;
