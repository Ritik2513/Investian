import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { serverUrl } from "../../../App";

const ProjectContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${serverUrl}/api/projects/get-projects`);

        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await res.json();

        // ✅ DIRECTLY USE THE CORRECT KEY
        setProjectsData(Array.isArray(data.projects) ? data.projects : []);
      } catch (error) {
        toast.error(error.message);
        setProjectsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projectsData, loading }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    toast.error("useProjects must be used within ProjectsProvider");
  }
  return context;
};
