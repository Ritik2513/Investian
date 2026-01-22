import { FaBuilding } from "react-icons/fa";

const Phase = () => {
  return (
    <section className="mt-6 font-poppins">
      <div className="bg-white text-black rounded-lg p-4 md:p-6">
        {/* Header */}
        <div className="flex gap-2 items-center">
          <FaBuilding size={25} />
          <p className="text-xl md:text-2xl font-semibold">Phase & Tower Management</p>
        </div>

        <hr className="text-gray-300 my-4" />
      </div>
    </section>
  );
};

export default Phase;
