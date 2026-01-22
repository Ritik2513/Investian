import slugify from "../utils/slugify";
import {
  FaSwimmingPool,
  FaDumbbell,
  FaShip,
  FaParking,
  FaShieldAlt,
  FaPaw,
} from "react-icons/fa";

export const projectsData = [
  {
    /* ===============================
       BASIC PROJECT DETAILS
    =============================== */
    id: 1,
    projectName: "Azure Heights",
    township: "Azure Bay Township",
    reraId: "RERA-FL-MIA-2020-4589",
    projectStatus: "Completed",
    yearBuilt: 2022,
    publishDate: "2023-01-15",
    submittedBy: "Azure Developers Pvt Ltd",

    description:
      "Azure Heights is a premium waterfront residential development offering luxury living with panoramic ocean views, world-class amenities, and sustainable construction practices.",

    /* ===============================
       MEASUREMENTS
    =============================== */
    measurements: {
      projectLotSizeAcres: 12.5,
    },

    /* ===============================
       IMAGES & VIDEOS
    =============================== */
    media: {
      video: "/Projects/Azure/video.mp4",
      videoDescription:
        "A cinematic walkthrough showcasing Azure Heights' waterfront views, luxury interiors, and lifestyle amenities.",

      images: [
        {
          src: "/Projects/Azure/p1.jpg",
          description: "Aerial view of Azure Heights facing the ocean",
        },
        {
          src: "/Projects/Azure/p2.jpg",
          description: "Luxury living room with ocean-facing balcony",
        },
        {
          src: "/Projects/Azure/p3.jpg",
          description: "Infinity pool overlooking the marina",
        },
      ],
    },

    /* ===============================
       PHASE DETAILS
    =============================== */
    phases: [
      {
        phaseName: "Phase 1",
        constructionStatusPercent: 100,
        constructionStartDate: "2019-02-01",
        constructionEndDate: "2021-08-30",
        hasTowers: true,

        towers: [
          {
            towerName: "Tower A",
            totalFloors: 22,
            totalUnits: 110,
          },
          {
            towerName: "Tower B",
            totalFloors: 18,
            totalUnits: 90,
          },
        ],
      },
    ],

    /* ===============================
       LOCATION DETAILS
    =============================== */
    location: {
      address: "1200 Ocean Drive, Azure Bay",
      pincode: "33139",
      city: "Miami",
      state: "Florida",
      nearbyLandmark: "Azure Marina",
    },

    amenities: {
      roadType: "Concrete",
      dwellingType: "Apartment",
      foundationType: "Pile Foundation",
      basementType: "Underground Parking Basement",
      featuresForDisabled: true,
      hotProject: true,

      categories: {
        fitness: ["Fully equipped gym", "Yoga & meditation room"],
        leisure: ["Infinity swimming pool", "Clubhouse", "Private marina"],
        safety: [
          "24/7 CCTV surveillance",
          "Fire safety systems",
          "Gated community",
        ],
        sports: ["Indoor games room", "Jogging track"],
        environment: ["Rainwater harvesting", "Solar lighting in common areas"],
        otherSpecifications: ["High-speed elevators", "Smart home automation"],
      },
    },

    nearbyFacilities: {
      school: "2.5 km",
      hospital: "1.8 km",
      college: "4.2 km",
      market: "1 km",

      convenience: {
        metro: "3.5 km",
        busStand: "1.2 km",
        airport: "12 km",
      },
    },

    featuresAndAmenities: [
      {
        label: "Infinity Pool",
        sublabel: "Heated rooftop pool",
        icon: FaSwimmingPool,
      },
      {
        label: "Gym & Spa",
        sublabel: "24/7 Wellness Center",
        icon: FaDumbbell,
      },
      {
        label: "Private Marina",
        sublabel: "Direct boat access",
        icon: FaShip,
      },
      {
        label: "Valet Parking",
        sublabel: "Secure underground parking",
        icon: FaParking,
      },
      {
        label: "24/7 Security",
        sublabel: "CCTV & gated entry",
        icon: FaShieldAlt,
      },
      {
        label: "Pet Friendly",
        sublabel: "Dedicated pet zones",
        icon: FaPaw,
      },
    ],

    inventory: [
      {
        unit: "A-1201",
        beds: 2,
        baths: 2,
        size: "1,800 sq.ft",
        view: "City",
        direction: "North",
        available: true,
        oldPrice: 1250000,
        price: 1150000,
      },
      {
        unit: "A-1202",
        beds: 3,
        baths: 3,
        size: "2,500 sq.ft",
        view: "Sea",
        direction: "East",
        available: true,
        oldPrice: null,
        price: 1750000,
      },
    ],
  },
];

projectsData.forEach((project) => {
  project.slug = slugify(
    project.id,
    project.projectName,
    project.location.city,
    project.location.state,
    project.projectStatus,
  );
});
