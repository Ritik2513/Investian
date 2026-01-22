import { useState } from "react";
import { toast } from "react-toastify";
import { FiTag } from "react-icons/fi";

const VoucherBox = ({ onApply }) => {
  const [code, setCode] = useState("");

  const apply = () => {
    if (code.trim().toUpperCase() === "PP2026") {
      onApply(50000);
      toast.success("Voucher applied");
    } else {
      onApply(0);
      toast.error("Invalid voucher");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-2">
        <FiTag size={20} className="text-gray-700" />
        <p className="text-black text-2xl font-medium">Voucher Redemption</p>
      </div>

      <div className="flex gap-3 mt-4 items-start">
        <div className="flex-1">
          <input
            className="w-full border rounded px-3 py-2"
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter voucher code"
          />
          <p className="text-gray-500 text-sm mt-2">
            Try <span className="font-semibold text-black">"PP2026"</span> for
            demo
          </p>
        </div>

        <button
          onClick={apply}
          className="custom-bg font-semibold text-white px-4 py-2 rounded-lg h-fit cursor-pointer"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default VoucherBox;
