const express = require("express");
const upload = require("../../middlewares/multer/multer");
const {
  createProject,
  getProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
} = require("../../controllers/project/projectControllers");

const router = express.Router();

router.post(
  "/create-projects",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "video", maxCount: 1 },
  ]),
  createProject
);

router.get("/get-projects", getProjects);
router.get("/:slug", getProjectBySlug);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
