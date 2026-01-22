const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    reraId: String,
    township: String,
    measurements: {
      projectLotSizeAcres: Number,
    },
    yearBuilt: Number,
    publishDate: {
      type: Date,
      default: Date.now,
    },
    submittedBy: String,
    projectStatus: {
      type: String,
      enum: ["Under Construction", "Completed", "Upcoming"],
    },
    description: String,

    media: {
      videos: [
        {
          src: String, //Cloudinary URL
        },
      ],
      images: [
        {
          src: String, //Cloudinary URL
        },
      ],
    },

    location: {
      address: String,
      pincode: String,
      city: String,
      state: String,
      landmark: String,
      nearbyFacilities: {
        school: String,
        hospital: String,
        college: String,
        market: String,
        convenience: {
          metro: String,
          busStand: String,
          airport: String,
        },
      },
    },

    featuresAndAmenities: [
      {
        label: String,
        sublabel: String,
        icon: String, //Store name like 'FaSwimmingPool'
      },
    ],

    inventory: [
      {
        unit: String,
        beds: Number,
        baths: Number,
        size: String,
        view: String,
        direction: String,
        available: {
          type: Boolean,
          default: true,
        },
        oldPrice: Number,
        price: Number,
      },
    ],
  },
  { timestamps: true },
);

const Project = mongoose.model("Projects", projectSchema);
module.exports = Project;
