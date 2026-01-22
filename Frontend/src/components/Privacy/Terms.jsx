import React from "react";
import Footer from "../pages/Footer";

const Terms = () => {
  return (
    <>
      {/* Top Banner */}
      <section className="relative h-64 w-full">
        <img
          src="/Privacy/privacy.webp"
          alt="Privacy Policy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-semibold font-poppins">
            Terms of Service
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white  font-poppins">
        <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
          <p className="mb-4">
            Welcome to our website. By accessing or using this platform, you
            agree to comply with and be bound by the following Terms and
            Conditions. Please read them carefully before using our services.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By accessing this website, you confirm that you accept these Terms
            and Conditions and agree to comply with them. If you do not agree,
            you must not use this website.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">2. Use of Website</h2>
          <p className="mb-4">
            You agree to use this website only for lawful purposes and in a way
            that does not infringe the rights of others or restrict their use of
            the platform.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            3. Intellectual Property
          </h2>
          <p className="mb-4">
            All content, design, text, graphics, logos, and software on this
            website are the property of the company and are protected by
            applicable intellectual property laws.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            4. User Information
          </h2>
          <p className="mb-4">
            Any information you provide must be accurate and up to date. We
            reserve the right to suspend or terminate access if false or
            misleading information is provided.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            5. Limitation of Liability
          </h2>
          <p className="mb-4">
            We shall not be liable for any direct, indirect, incidental, or
            consequential damages arising from the use or inability to use this
            website.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">6. External Links</h2>
          <p className="mb-4">
            This website may contain links to third-party websites. We are not
            responsible for the content or practices of these external sites.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">7. Modifications</h2>
          <p className="mb-4">
            We reserve the right to revise these Terms and Conditions at any
            time. Continued use of the website constitutes acceptance of the
            updated terms.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">8. Governing Law</h2>
          <p className="mb-4">
            These Terms and Conditions shall be governed and interpreted in
            accordance with the laws of India.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            9. Contact Information
          </h2>
          <p>
            If you have any questions regarding these Terms & Conditions, please
            contact us through the official communication channels provided on
            the website.
          </p>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Terms;
