const Project = require("../../models/project/project");
const slugify = require("../../utils/slugify");
const uploadStream = require("../../utils/cloudinaryStream");

const createProject = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);

    if (!data.projectName || !data.location?.city) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const slug = `${slugify(
      data.projectName,
      data.location.city,
      data.location.state,
      data.projectStatus,
    )}-${Date.now()}`;

    // ✅ STEP 1: Create project immediately (FAST)
    const project = await Project.create({
      ...data,
      slug,
      media: { images: [], videos: [] },
    });

    // ✅ STEP 2: Respond immediately
    res.status(201).json({
      success: true,
      message: "Project created. Media uploading in background.",
      projectId: project._id,
    });

    // ✅ STEP 3: Upload media ASYNC (NON-BLOCKING)
    setImmediate(async () => {
      try {
        const images = [];
        const videos = [];

        if (req.files?.images) {
          const imageUploads = req.files.images.map((file) =>
            uploadStream(file.buffer, {
              folder: "projects/images",
            }),
          );

          const imageResults = await Promise.all(imageUploads);
          imageResults.forEach((r) => images.push({ src: r.secure_url }));
        }

        if (req.files?.video?.[0]) {
          const videoResult = await uploadStream(req.files.video[0].buffer, {
            resource_type: "video",
            folder: "projects/videos",
          });

          videos.push({ src: videoResult.secure_url });
        }

        await Project.findByIdAndUpdate(project._id, {
          $set: {
            "media.images": images,
            "media.videos": videos,
          },
        });
      } catch (err) {
        console.error("Media upload failed:", err.message);
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Project creation failed: ${error.message}`,
    });
  }
};

const getProjects = async (_, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, message: "Get Project Successfully", projects });
  } catch (error) {
    res.status(500).json({ success: false, message: `Get Projects ${error}` });
  }
};

const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project)
      return res.status(404).json({ success: false, message: "Not Found" });

    res.status(200).json({
      success: true,
      message: "Get Project By Slug Successful",
      project,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Get Projects By Slug ${error}` });
  }
};

const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      JSON.parse(req.body.data),
      { new: true },
    );
    res
      .status(200)
      .json({ success: true, message: "Update Project Successfully", updated });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Update Project ${error}` });
  }
};

const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Deleted Successfully", deleted });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Delete Project ${error}` });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
};
