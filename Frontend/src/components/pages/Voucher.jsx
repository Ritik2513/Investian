const Voucher = () => {
  return (
    <>
      <section className="font-poppins px-4 sm:px-6 md:px-8 py-20 bg-linear-to-b from-[#F8FAFF] to-[#EEF2FF]">
        {/* Heading + Description */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 tracking-wide mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
            Have a <span className="custom-text">Voucher</span> to{" "}
            <span className="custom-text">Redeem?</span>
          </h2>
          <p className="text-lg md:text-sm text-gray-600">
            Select your preferred property from our catalogue and apply your
            voucher at checkout for exclusive savings.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowPopup(true)}
            className="px-6 py-3 rounded-lg text-white custom-bg hover:bg-black transition-all duration-300 shadow-md font-medium text-lg cursor-pointer"
          >
            Start Shopping →
          </button>
        </div>
      </section>
    </>
  );
};

export default Voucher;
