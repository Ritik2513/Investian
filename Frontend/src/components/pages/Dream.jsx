import { Link } from "react-router-dom";

const Dream = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24 font-poppins">
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10">
          {/* LEFT IMAGE */}
          <div className="flex justify-center lg:justify-start">
            <img
              src="/Dream/d1.jpg"
              alt="Modern home design"
              className="w-full max-w-sm h-90 object-cover rounded-3xl"
            />
          </div>

          {/* CENTER CONTENT */}
          <div className="text-center px-4">
            <span className="block text-xl mb-4">✦</span>

            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 leading-snug">
              If you can <span className="italic">dream</span> it, we <br />
              can <span className="italic">build</span> it.
            </h2>

            <p className="text-gray-600 text-sm md:text-base mt-6 max-w-md mx-auto leading-relaxed">
              We adopt a uniquely personalized perspective to each project to
              deliver stunning spaces of optimal function. Renowned for our
              architectural understanding and meticulous craftsmanship, our
              portfolio of residential projects speaks for itself.
            </p>

            <Link to="/contact-us">
              <button className="mt-8 px-6 py-3 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition cursor-pointer">
                Get in touch
              </button>
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/Dream/d2.jpg"
              alt="Luxury villa"
              className="w-full max-w-sm h-90 object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dream;
