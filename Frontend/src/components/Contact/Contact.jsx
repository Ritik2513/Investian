import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />

      <section className="w-full bg-gray-50 py-12 md:py-16 font-poppins mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
            Get in Touch
          </h2>
          <p className="text-gray-500 mb-8 md:mb-10 max-w-2xl text-sm md:text-base">
            We're here to help with your voucher redemption, project inquiries,
            and technical support. Our team typically responds within 24 hours.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN */}
            <div className="space-y-4">
              {/* Email */}
              <div className="bg-white rounded-xl p-5 shadow-sm flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  ✉️
                </div>
                <div>
                  <p className="font-medium text-gray-900">Support Email</p>
                  <p className="text-sm text-gray-500">
                    support@plotpoint.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-xl p-5 shadow-sm flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  📞
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone Support</p>
                  <p className="text-sm text-gray-500">
                    +1 (555) 012-3456
                  </p>
                  <p className="text-xs text-gray-400">
                    Mon–Fri, 9am–6pm
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-xl p-5 shadow-sm flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  📍
                </div>
                <div>
                  <p className="font-medium text-gray-900">Office Location</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    123 Estate Blvd, Suite 400 <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN – FORM */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
                Send us a message
              </h3>

              <form className="space-y-5">
                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Topic */}
                <select className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select a topic</option>
                  <option>Voucher Redemption</option>
                  <option>Project Inquiry</option>
                  <option>Technical Support</option>
                </select>

                {/* Message */}
                <textarea
                  rows="4"
                  placeholder="Please describe your issue or question in detail..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Consent */}
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="mt-1" />
                  <p className="leading-relaxed">
                    I agree to allow the platform to store and process my
                    personal data to handle my inquiry.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full sm:w-auto custom-bg text-white px-8 py-3 rounded-lg font-medium transition"
                >
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
