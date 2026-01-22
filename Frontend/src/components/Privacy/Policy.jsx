import React from "react";
import Footer from "../pages/Footer";

const Policy = () => {
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
            Privacy Policy
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-14 font-poppins">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-gray-700 text-sm leading-relaxed space-y-6">
          <p className="text-gray-500">
            Last updated: January 2026
          </p>

          <p>
            plotpoint respects your privacy and is committed to protecting
            the personal information you share with us. This Privacy Policy
            explains how we collect, use, and safeguard your data when you use
            our platform.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">
            1. Information We Collect
          </h2>
          <p>
            We collect personal information such as name, email address, phone
            number, voucher details, and transaction-related information when
            you register, browse properties, or redeem vouchers on our platform.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">
            2. Use of Information
          </h2>
          <p>
            Your information is used to provide platform functionality, process
            voucher redemptions, improve user experience, offer personalized
            recommendations, and ensure compliance with legal requirements.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">
            3. Data Security
          </h2>
          <p>
            We use industry-standard security measures including encryption,
            secure servers, and access controls to protect your data from
            unauthorized access or disclosure.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">
            4. Data Sharing
          </h2>
          <p>
            We do not sell or rent your personal information. Data may be shared
            only with trusted service providers, developers, or legal
            authorities when required to fulfill services or comply with law.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">
            5. Cookies
          </h2>
          <p>
            We may use cookies and similar technologies to improve website
            performance and user experience. You can control cookie preferences
            through your browser settings.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">
            6. Your Rights
          </h2>
          <p>
            You have the right to access, update, or request deletion of your
            personal information. You may also opt out of marketing
            communications at any time.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">
            7. Policy Updates
          </h2>
          <p>
            We may update this Privacy Policy periodically. Any changes will be
            reflected on this page with a revised date.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">
            8. Contact Information
          </h2>
          <p>
            If you have questions regarding this Privacy Policy, please contact
            us at{" "}
            <span className="text-blue-600">
              support@plotpoint.com
            </span>.
          </p>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Policy;
