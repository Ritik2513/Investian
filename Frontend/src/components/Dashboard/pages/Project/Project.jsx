import { useState } from "react";

import BasicInfo from "./BasicInfo";
import Media from "./Media";
import Location from "./Location";
import Amenities from "./Amenities";
import Inventory from "./Inventory";

import { serverUrl } from "../../../../App";
import { toast } from "react-toastify";

const Project = () => {
  const [basicInfo, setBasicInfo] = useState({});
  const [location, setLocation] = useState({});
  const [amenities, setAmenities] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        ...basicInfo,
        location,
        featuresAndAmenities: amenities,
        inventory,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      images.forEach((img) => formData.append("images", img));
      if (video) formData.append("video", video);

      const res = await fetch(`${serverUrl}/api/projects/create-projects`, {
        method: "POST",
        body: formData, // ✅ correct
      });

      const result = await res.json(); // ✅ fetch parsing

      if (!res.ok) {
        throw new Error(result.message || "Project creation failed");
      }

      toast.success("Project created successfully");
      console.log(result);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Project creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold">Projects Management</h2>

      <BasicInfo onChange={setBasicInfo} />
      <Media onImages={setImages} onVideo={setVideo} />
      <Location onChange={setLocation} />
      <Amenities onChange={setAmenities} />
      <Inventory onChange={setInventory} />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
      >
        {loading ? "Submitting..." : "Create Project"}
      </button>
    </>
  );
};

export default Project;
