import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { useProjects } from "./Context/ProjectsContext";

const Projects = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  const { projectsData, loading } = useProjects();

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading projects...</div>
    );
  }

  /* -----------------------------
     HELPER: PRICE RANGE LOGIC
  ----------------------------- */
  const getPriceRange = (inventory = []) => {
    if (!inventory.length) return "";

    const prices = inventory.map((i) => i.price);
    const min = Math.min(...prices);

    if (min < 500000) return "Low";
    if (min < 1000000) return "Medium";
    return "High";
  };

  const filteredProjects = projectsData.filter((project) => {
    const projectCity = project.location?.city ?? "";
    const inventory = project.inventory ?? [];

    const projectPriceRange = getPriceRange(inventory);
    const isAvailable = inventory.some((i) => i.available);

    const matchesSearch =
      project.projectName?.toLowerCase().includes(search.toLowerCase()) ||
      projectCity.toLowerCase().includes(search.toLowerCase());

    return (
      matchesSearch &&
      (city ? projectCity === city : true) &&
      (price ? projectPriceRange === price : true) &&
      (availableOnly ? isAvailable : true)
    );
  });

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setPrice("");
    setAvailableOnly(false);
  };

  return (
    <section className="bg-gray-50 py-14 font-poppins" id="projects">
      <div className="max-w-7xl mx-auto px-16">
        {/* FILTER BAR */}
        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search by project name or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-55 border rounded-lg px-4 py-2 text-sm border-gray-300"
          />

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
          >
            <option value="">City</option>
            {[...new Set(projectsData.map((p) => p.location.city))].map(
              (city) => (
                <option key={city}>{city}</option>
              ),
            )}
          </select>

          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
          >
            <option value="">Price Range</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            onClick={() => setAvailableOnly(!availableOnly)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              availableOnly
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Available Units
          </button>

          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:underline cursor-pointer"
          >
            Clear All
          </button>
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-center mt-10 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Available Projects
          </h2>
          <p className="text-sm text-gray-500">
            Showing {filteredProjects.length} projects
          </p>
        </div>

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
