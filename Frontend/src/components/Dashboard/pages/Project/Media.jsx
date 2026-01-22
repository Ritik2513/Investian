import { useEffect, useState } from "react";
import { GrGallery } from "react-icons/gr";
import { IoMdAdd, IoMdTrash } from "react-icons/io";

const Media = ({ onImages, onVideo }) => {
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);

  /* ---------------- Fake Progress (UI Only) ---------------- */
  const simulateProgress = (setter, index) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setter((prev) => {
        const updated = [...prev];
        if (updated[index]) updated[index].progress = progress;
        return updated;
      });

      if (progress >= 100) {
        clearInterval(interval);
        setter((prev) => {
          const updated = [...prev];
          if (updated[index]) updated[index].uploaded = true;
          return updated;
        });
      }
    }, 150);
  };

  /* ---------------- Video Upload ---------------- */
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const videoObj = {
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
    };

    setVideos([videoObj]);
    onVideo(file); // 👉 send raw file to parent
    simulateProgress(setVideos, 0);
  };

  /* ---------------- Image Upload ---------------- */
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
    }));

    setImages((prev) => {
      const updated = [...prev, ...newImages];

      // Start progress for newly added images
      newImages.forEach((_, i) => {
        const index = prev.length + i;
        simulateProgress(setImages, index);
      });

      return updated;
    });
  };

  /* ---------------- Sync Images to Parent ---------------- */
  useEffect(() => {
    onImages(images.map((img) => img.file));
  }, [images, onImages]);


  /* ---------------- Remove Media ---------------- */
  const removeVideo = () => {
    setVideos([]);
    onVideo(null);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="mt-6 font-poppins">
      <div className="bg-white text-black rounded-lg p-4 md:p-6">
        {/* Header */}
        <div className="flex gap-2 items-center">
          <GrGallery size={25} />
          <p className="text-xl md:text-2xl font-semibold">Media Management</p>
        </div>

        <hr className="text-gray-300 my-4" />

        {/* ================= Video ================= */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">Project Video</p>

            <label className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded cursor-pointer hover:bg-blue-700">
              <IoMdAdd />
              Upload Video
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                hidden
              />
            </label>
          </div>

          {videos.length === 0 ? (
            <p className="text-gray-500 text-sm">No video uploaded</p>
          ) : (
            <div className="relative border rounded-lg p-2 max-w-lg">
              <video
                src={videos[0].preview}
                controls
                className="w-full h-48 object-cover rounded"
              />

              {!videos[0].uploaded && (
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 rounded">
                    <div
                      className="h-2 bg-blue-600 rounded"
                      style={{ width: `${videos[0].progress}%` }}
                    />
                  </div>
                  <p className="text-xs mt-1">
                    Uploading... {videos[0].progress}%
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={removeVideo}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded"
              >
                <IoMdTrash size={16} />
              </button>
            </div>
          )}
        </div>

        {/* ================= Images ================= */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">Project Images</p>

            <label className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded cursor-pointer hover:bg-blue-700">
              <IoMdAdd />
              Upload Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                hidden
              />
            </label>
          </div>

          {images.length === 0 ? (
            <p className="text-gray-500 text-sm">No images uploaded</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img, index) => (
                <div key={index} className="relative border rounded-lg p-2">
                  <img
                    src={img.preview}
                    className="w-full h-40 object-cover rounded"
                    alt="preview"
                  />

                  {!img.uploaded && (
                    <div className="mt-2">
                      <div className="h-2 bg-gray-200 rounded">
                        <div
                          className="h-2 bg-green-600 rounded"
                          style={{ width: `${img.progress}%` }}
                        />
                      </div>
                      <p className="text-xs mt-1">
                        Uploading... {img.progress}%
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded"
                  >
                    <IoMdTrash size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Media;
