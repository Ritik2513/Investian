import { useEffect, useState } from "react";
import { IoMdInformationCircle } from "react-icons/io";

const inputClass =
  "block w-full border rounded border-gray-400 p-2 mt-2 outline-none";

const BasicInfo = ({ onChange }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    reraId: "",
    township: "",
    lotSize: "",
    yearBuilt: "",
    publishDate: "",
    submittedBy: "",
    projectStatus: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
  };

  // Push Data to parent whenever form changes

  useEffect(() => {
    onChange({
      projectName: formData.projectName,
      reraId: formData.reraId,
      township: formData.township,
      measurements: {
        projectLotSizeAcres: formData.lotSize
          ? Number(formData.lotSize)
          : undefined,
      },
      yearBuilt: formData.yearBuilt ? Number(formData.yearBuilt) : undefined,
      publishDate: formData.publishDate || undefined,
      submittedBy: formData.submittedBy,
      projectStatus: formData.projectStatus,
      description: formData.description,
    });
  }, [formData, onChange]);

  return (
    <section className="mt-6 font-poppins">
      <div className="bg-white text-black rounded-lg p-4 md:p-6">
        {/* Header */}
        <div className="flex gap-2 items-center">
          <IoMdInformationCircle size={25} />
          <p className="text-xl md:text-2xl font-semibold">Basic Information</p>
        </div>

        <hr className="text-gray-300 my-4" />

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="font-semibold">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Enter Project Name"
              className={inputClass}
              required
              autoComplete="off"
            />
          </div>
          
          <div>
            <label className="font-semibold">RERA ID</label>
            <input
              type="text"
              name="reraId"
              value={formData.reraId}
              onChange={handleChange}
              placeholder="PRJ12345678"
              className={inputClass}
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label className="font-semibold">Township</label>
            <input
              type="text"
              name="township"
              value={formData.township}
              onChange={handleChange}
              placeholder="Township Name"
              className={inputClass}
              autoComplete="off"
            />
          </div>

          <div>
            <label className="font-semibold">Lot Size (Acres)</label>
            <input
              type="number"
              step="0.01"
              name="lotSize"
              value={formData.lotSize}
              onChange={handleChange}
              placeholder="12.5"
              className={inputClass}
              autoComplete="off"
            />
          </div>

          <div>
            <label className="font-semibold">Year Built</label>
            <input
              type="number"
              name="yearBuilt"
              value={formData.yearBuilt}
              onChange={handleChange}
              placeholder="2000"
              className={inputClass}
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label className="font-semibold">Publish Date</label>
            <input
              type="date"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleChange}
              className={inputClass}
              autoComplete="off"
            />
          </div>

          <div>
            <label className="font-semibold">Submitted By</label>
            <input
              type="text"
              name="submittedBy"
              value={formData.submittedBy}
              onChange={handleChange}
              placeholder="Developer Name"
              className={inputClass}
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label className="font-semibold">Project Status</label>
            <select
              name="projectStatus"
              value={formData.projectStatus}
              onChange={handleChange}
              className={inputClass}
              autoComplete="off"
            >
              <option value="">Select Status</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Under Construction">Under Construction</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder="Project description..."
            autoComplete="off"
          />
        </div>
      </div>
    </section>
  );
};

export default BasicInfo;
