import { useNavigate } from "react-router-dom";
import Badge from "./Badge";
import { useEffect } from "react";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const coverImage = project.media?.images?.[0]?.src || "/placeholder.jpg";

  const showBadge = project.amenities?.hotProject;

  return (
    <div
      onClick={() => navigate(`/projects/${project.slug}`)}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={coverImage}
          alt={project.projectName}
          className="h-52 w-full object-cover"
        />

        {showBadge && (
          <Badge
            label="Hot Project"
            bgColor="bg-red-600"
            textColor="text-white"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{project.projectName}</h3>

        <p className="text-sm text-gray-500">
          {project.location.city}, {project.location.state}
        </p>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {project.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-gray-500">
            Status:{" "}
            <span className="font-medium text-gray-700">
              {project.projectStatus}
            </span>
          </span>

          <button className="text-blue-600 text-sm font-medium">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
