import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  FaBed,
  FaBath,
  FaEye,
  FaCompass,
  FaCartShopping,
  FaLocationDot,
} from "react-icons/fa6";
import { PiRulerBold } from "react-icons/pi";
import { useCart } from "./Context/CartContext";
import { useProjects } from "./Context/ProjectsContext";
import {
  FaBuilding,
  FaCalendarAlt,
  FaUserTie,
  FaRulerCombined,
  FaCheckCircle,
  FaIdCard,
  FaMapMarkerAlt,
  FaCity,
  FaMapPin,
  FaLandmark,
  FaHospital,
  FaSchool,
  FaUniversity,
  FaShoppingBag,
  FaBus,
  FaTrain,
  FaPlane,
  FaStore,
  FaPlayCircle,
  FaImage,
} from "react-icons/fa";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { addToCart, cart } = useCart();
  const { projectsData, loading } = useProjects();

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading project details...
      </div>
    );
  }

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return <p className="text-center mt-20 text-gray-500">Project not found</p>;
  }

  const inventory = project.inventory ?? [];
  const images = project.media?.images ?? [];
  const videos = project.media?.videos ?? [];

  const coverImage = images[0]?.src ?? "/placeholder.jpg";
  const isAvailable = inventory.some((i) => i.available);

  const getPriceRange = () => {
    if (!inventory.length) return "N/A";
    const prices = inventory.map((i) => i.price);
    const min = Math.min(...prices);
    if (min < 500000) return "Low";
    if (min < 1000000) return "Medium";
    return "High";
  };

  const facilityIcons = {
    hospital: FaHospital,
    school: FaSchool,
    college: FaUniversity,
    market: FaShoppingBag,
    metro: FaTrain,
    busStand: FaBus,
    airport: FaPlane,
    convenience: FaStore,
  };

  return (
    <>
      <Navbar />

      <section className="font-poppins bg-gray-50 min-h-screen pb-12">
        <div className="max-w-7xl mx-auto px-6 mt-22">
          {/* BACK */}
          <div
            onClick={() => navigate(-1)}
            className="flex gap-2 cursor-pointer items-center mb-4"
          >
            <IoIosArrowRoundBack size={22} />
            <span className="text-sm text-gray-600">Back to Catalogue</span>
          </div>

          {/* HERO */}
          <div className="relative rounded-2xl overflow-hidden shadow-md">
            <img
              src={coverImage}
              alt={project.projectName}
              className="w-full h-105 object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white max-w-3xl">
              <h1 className="text-4xl font-bold">{project.projectName}</h1>
              <p className="mt-2 opacity-90">{project.description}</p>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Overview */}
              <Section title="Project Overview">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InfoCard
                    icon={FaBuilding}
                    label="Township"
                    value={project.township}
                    bg="bg-sky-100"
                    iconColor="text-sky-600"
                  />

                  <InfoCard
                    icon={FaIdCard}
                    label="RERA ID"
                    value={project.reraId}
                    bg="bg-indigo-100"
                    iconColor="text-indigo-600"
                  />

                  <InfoCard
                    icon={FaCheckCircle}
                    label="Project Status"
                    value={project.projectStatus}
                    bg="bg-green-100"
                    iconColor="text-green-600"
                  />

                  <InfoCard
                    icon={FaCalendarAlt}
                    label="Year Built"
                    value={project.yearBuilt}
                    bg="bg-purple-100"
                    iconColor="text-purple-600"
                  />

                  <InfoCard
                    icon={FaCalendarAlt}
                    label="Publish Date"
                    value={new Date(project.publishDate).toLocaleDateString()}
                    bg="bg-purple-100"
                    iconColor="text-purple-600"
                  />

                  <InfoCard
                    icon={FaUserTie}
                    label="Submitted By"
                    value={project.submittedBy}
                    bg="bg-orange-100"
                    iconColor="text-orange-600"
                  />

                  <InfoCard
                    icon={FaRulerCombined}
                    label="Lot Size"
                    value={
                      project.measurements?.projectLotSizeAcres
                        ? `${project.measurements.projectLotSizeAcres} Acres`
                        : null
                    }
                    bg="bg-emerald-100"
                    iconColor="text-emerald-600"
                  />
                </div>
              </Section>

              {/* Gallery */}
              <Section title="Gallery">
                {images.length === 0 && videos.length === 0 ? (
                  <p className="text-sm text-gray-500">No media available.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {/* Images */}
                    {images.map((img, i) => (
                      <div
                        key={`img-${i}`}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
                      >
                        <img
                          src={img.src}
                          alt={img.description || "Project image"}
                          loading="lazy"
                          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <FaImage className="text-white text-2xl" />
                        </div>
                      </div>
                    ))}

                    {/* Videos */}
                    {videos.map((vid, i) => (
                      <div
                        key={`vid-${i}`}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-black"
                      >
                        <video
                          src={vid.src}
                          controls
                          preload="metadata"
                          className="h-48 w-full object-cover"
                        />

                        {/* Video Badge */}
                        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                          Video
                        </div>

                        {/* Play Icon Overlay */}
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                          <FaPlayCircle className="text-white text-4xl opacity-80" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Section>

              {/* Available Unit */}
              <Section title="Available Units">
                {inventory.map((item, i) => (
                  <div
                    key={i}
                    className="border rounded-xl p-4 mb-4 border-gray-300"
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold">{item.unit}</span>
                      <span
                        className={
                          item.available ? "text-green-600" : "text-red-600"
                        }
                      >
                        {item.available ? "Available" : "Sold Out"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>
                          <FaBed /> {item.beds}
                        </span>
                        <span>
                          <FaBath /> {item.baths}
                        </span>
                        <span>
                          <PiRulerBold /> {item.size}
                        </span>
                        <span>
                          <FaEye /> {item.view}
                        </span>
                        <span>
                          <FaCompass /> {item.direction}
                        </span>
                      </div>

                      <div className="text-right">
                        {item.oldPrice && (
                          <p className="line-through text-gray-500 text-sm">
                            ₹ {item.oldPrice.toLocaleString()}
                          </p>
                        )}
                        <strong>₹ {item.price.toLocaleString()}</strong>
                        <button
                          onClick={() =>
                            addToCart({
                              projectId: project._id,
                              projectName: project.projectName,
                              inventory: item, // ✅ FULL UNIT DATA
                            })
                          }
                          className="mt-3 custom-bg text-white px-4 py-2 rounded-lg"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Section>
            </div>

            {/* RIGHT */}
            <div className="sticky top-24 space-y-6">
              {/* Location Details */}
              <Section title="Location Details">
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
                  <InfoCard
                    icon={FaMapMarkerAlt}
                    label="Address"
                    value={project.location?.address}
                    bg="bg-rose-100"
                    iconColor="text-rose-600"
                  />

                  <InfoCard
                    icon={FaCity}
                    label="City"
                    value={project.location?.city}
                    bg="bg-sky-100"
                    iconColor="text-sky-600"
                  />

                  <InfoCard
                    icon={FaMapPin}
                    label="State"
                    value={project.location?.state}
                    bg="bg-indigo-100"
                    iconColor="text-indigo-600"
                  />

                  <InfoCard
                    icon={FaMapPin}
                    label="Pincode"
                    value={project.location?.pincode}
                    bg="bg-gray-100"
                    iconColor="text-gray-700"
                  />

                  <InfoCard
                    icon={FaLandmark}
                    label="Nearby Landmark"
                    value={project.location?.nearbyLandmark}
                    bg="bg-amber-100"
                    iconColor="text-amber-600"
                  />
                </div>
              </Section>

              {/* NearBy Facilities */}
              <Section title="Nearby Facilities">
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
                  {Object.entries(project.location?.nearbyFacilities || {}).map(
                    ([key, value]) => {
                      // SIMPLE STRING VALUES
                      if (typeof value === "string") {
                        const Icon = facilityIcons[key] || FaLocationDot;

                        return (
                          <FacilityCard
                            key={key}
                            icon={Icon}
                            label={key}
                            value={value}
                          />
                        );
                      }

                      // NESTED OBJECT (convenience)
                      if (typeof value === "object" && value !== null) {
                        return Object.entries(value).map(
                          ([subKey, subValue]) => {
                            const Icon = facilityIcons[subKey] || FaLocationDot;

                            return (
                              <FacilityCard
                                key={`${key}-${subKey}`}
                                icon={Icon}
                                label={subKey}
                                value={subValue}
                              />
                            );
                          },
                        );
                      }

                      return null;
                    },
                  )}
                </div>
              </Section>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                {" "}
                <h3 className="font-semibold mb-4">Quick Summary</h3>{" "}
                <Info label="City" value={project.location?.city} />{" "}
                <Info label="Price Range" value={getPriceRange()} />{" "}
                <Info
                  label="Availability"
                  value={isAvailable ? "Available" : "Sold Out"}
                />{" "}
                <button
                  onClick={() => navigate("/cart")}
                  className="mt-6 w-full custom-bg text-white py-3 rounded-lg flex justify-center gap-3"
                >
                  {" "}
                  <FaCartShopping /> View Cart ({cart.length}){" "}
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

/* ---------- HELPERS ---------- */

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const Info = ({ label, value }) => (
  <p className="flex justify-between text-sm text-gray-700 mb-2">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value ?? "N/A"}</span>
  </p>
);

const InfoCard = ({
  icon: Icon,
  label,
  value,
  bg = "bg-gray-100",
  iconColor = "text-gray-700",
}) => {
  if (!value) return null;

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white">
      <div className={`p-3 rounded-lg ${bg}`}>
        <Icon className={`${iconColor} text-lg`} />
      </div>

      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium text-gray-800 mt-1">{value}</p>
      </div>
    </div>
  );
};

const FacilityCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 bg-gray-50 border rounded-lg p-4">
    <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
      <Icon size={18} />
    </div>

    <div>
      <p className="text-sm text-gray-500 capitalize">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

export default ProjectDetails;
