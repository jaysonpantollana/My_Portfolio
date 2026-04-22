import { Award, GraduationCap, Truck, Building2 } from "lucide-react";

export const droneImages = [
  "/drone_1.png",
  "/drone_2.png"
];

export const startupsData = [
  {
    id: "01",
    title: "DAILYDROP",
    category: "Food delivery app",
    images: [
      "/daily-drop_image1.jpg",
      "/daily-drop_image2.jpg",
      "/daily-drop_image3.jpg",
      "/daily-drop_image4.jpg",
      "/fd8e1b4b-6c00-4934-8e9a-def8cc5e4188.jpg"
    ],
    description: "A logistics-first delivery architecture designed to minimize pathing latency through machine learning optimization. Currently operating with a 24% increase in driver efficiency compared to legacy models.",
    feed: "LIVE_FEED: NODE_TX_99",
    metrics: [
      { label: "LAT_SPEED", value: "0.42ms" },
      { label: "OPT_PATH", value: "14.2km" },
      { label: "ENERGY_S", value: "A++" }
    ],
    icon: Truck
  },
  {
    id: "02",
    title: "KHUBO",
    category: "Renttal property listing app",
    images: [
      "/start-up_1.jpg",
      "/start-up_2.jpg",
      "/start-up_3.jpg",
      "/start-up_4.jpg",
      "/start-up_5.jpg",
      "/start-up_6.jpg"
    ],
    description: "A rental ecosystem built on structural connectivity. We treat real estate listings as dynamic engineering components, allowing for seamless integration between multi-tenant systems and smart infrastructure.",
    feed: "CONNECTIVITY_MAP",
    metrics: [
      { label: "NODES", value: "1,482 / ACTIVE" },
      { label: "RELIABILITY", value: "99.9%" }
    ],
    icon: Building2
  }
];

export const awardsData = [
  {
    id: "01",
    title: "INNOVATION AWARD",
    category: "ACADEMIC RECOGNITION",
    description: "Breakthrough award for highly original and impactful development and design projects",
    institution: "ILIGAN CITY NATIONAL HIGH SCHOOL",
    type: "standard"
  },
  {
    id: "SPECIAL",
    title: "DOST-TAPI",
    category: "Regional Qualifier",
    description: "Regional Invention Contest",
    subtext: "CLUSTER RICE 2024",
    institution: "DOST-TAPI",
    type: "feature",
    icon: GraduationCap
  },
  {
    id: "02",
    title: "BANTUGAN AWARDEE",
    category: "ILIGAN CITY MAYOR'S ACADEMIC EXCELLENCE AWARD",
    description: "The student's achievements and dedication on research, development and academic excellence.",
    institution: "ILIGAN CITY MAYOR'S OFFICE",
    type: "standard"
  },
  {
    id: "03",
    title: "WITH HIGH HONOR",
    category: "TOP OVERALL",
    description: "Top honor for autonomous navigation and control system integration projects.",
    institution: "ILIGAN CITY NATIONAL HIGH SCHOOL",
    type: "standard"
  },
  {
    id: "04",
    title: "DSTF 1ST PLACER",
    category: "DISTRICT LEVEL",
    description: "Recognizing outstanding achievement in the deployment of innovative student research and development.",
    institution: "DEPED-DIVISION OF ILIGAN",
    type: "standard"
  },
  {
    id: "05",
    title: "DSTF 2ND PLACER",
    category: "DIVISION LEVEL",
    description: "Recognizing outstanding achievement in the deployment of innovative student research and development.",
    institution: "DEPED-DIVISION OF ILIGAN",
    type: "standard"
  },
  {
    id: "06",
    title: "QBO START-UP CHALLENGE QUALIFIER",
    category: "NATIONAL LEVEL",
    description: "Commending the successful transformation of student research into a functional, market-ready startup venture.",
    institution: "QBO INNOVATION HUB",
    type: "standard"
  },
  {
    id: "07",
    title: "SEAMEO FINALIST",
    category: "INTERNATIONAL LEVEL",
    description: "Awarded for student-led research projects that drive the advancement of technology and sustainability in Southeast Asia.",
    institution: "SEAMEO INNOTECH",
    type: "standard"
  },
  {
    id: "08",
    title: "MIPTAC 2025 QUALIFIER",
    category: "REGIONAL LEVEL",
    description: "Exceptional engineering application in modern communication infrastructure.",
    institution: "MIPTAC TECHNOLOGY COUNCIL",
    type: "standard"
  },
  {
    id: "10",
    title: "IDEYA FUTUREILIGANX QUALIFIER",
    category: "INNOVATION CHALLENGE",
    description: "Future-focused design thinking and prototype development for urban mobility.",
    institution: "IDEYA INNOVATION CENTER",
    type: "standard"
  },
  {
    id: "11",
    title: "PSCX 2025 QUALIFIER",
    category: "NATIONAL START-UP CHALLENGE",
    description: "Recognized for novel mechanical designs promoting environmental sustainability.",
    institution: "DICT",
    type: "standard"
  },
  {
    id: "12",
    title: "YOUNG INVENTORS CHALLENGE",
    category: "INTERNATIONAL TRACK",
    description: "Recognized for novel mechanical designs promoting environmental sustainability.",
    institution: "INTERNATIONAL INVENTION COMMITTEE",
    type: "standard"
  }
];

export const academicsData = [
  {
    title: "KINDERGARTEN",
    subtitle: "PRE-SCHOOL JOURNEY",
    description: `beginning with the shaky courage of let-go hands at the classroom door and the gradual discovery of a world beyond home. It is a formative chapter defined by the sticky remains of craft glue, the focused silence of a coloring session, and the sudden, joyful chaos of the playground where the first foundations of friendship are built over shared toys. Through a rhythmic cycle of circle time songs, naptime stories, and the proud display of finger-painted masterpieces, a child transforms from a hesitant observer into a curious explorer. By the time the final bell rings on that first year, the journey has successfully traded separation anxiety for a newfound confidence, turning a room full of strangers into a community and a daunting school building into a second home.`,
    points: [
      "1ST HONOR",
      "MOST HELPFUL"
    ],
    tags: ["WANDERING KID", "TITA BOY","HONOR STUDENT", "HYPER KID", "IPAD KID"]
  },
  {
    title: "ELEMENTARY SCHOOL",
    subtitle: "PRIMARY EDUCATION",
    description: `Elementary school began with a very focused start, where from Grade 1 to 3, I was the typical "good student" who cared mostly about grades and lessons. However, that changed in Grade 4 when the fun of childhood games took over, and I became a bit of a slacker. Instead of following the teacher's instructions, I started skipping classes to play Takyan, Dampa, and Teks with my friends, or heading to the computer shop to get lost in video games.

Everything shifted again in Grade 5 when I discovered tennis. I decided to take the sport seriously, which actually pushed me to start caring about my academics again, too. But because my passion for the court was so strong, I often prioritized my training over everything else. My journey through those final years of elementary was a constant balancing act I was a dedicated student-athlete who would sometimes skip homework or school projects just to squeeze in more time for a tennis match.`,
    tags: ["HONOR STUDENT", "LAWN TENNIS"]
  },
  {
    title: "ICNHS",
    subtitle: "HIGH SCHOOL LIFE (2017-2023)",
    description: `The high school journey started with a lot of energy as a student-athlete from Grade 7 to 9. Those years were all about the excitement of the game, team practices, and trying to keep up with school while staying active in sports. Everything changed in Grade 10 when the pandemic hit, and suddenly the busy world of sports stopped. Being stuck at home forced a big change in focus. By Grade 11 and 12, the focus shifted away from the court and into the books. This was a major turning point, as a new love for math began to grow. The competitive spirit once used for sports was now used to solve hard equations and master academic challenges. By the end of high school, the journey had changed from being an athlete to becoming a dedicated student who truly enjoyed the challenge of numbers.`,
    points: [
      "Drone-Based Automatic Water Sampling Systematic",
      "Suspended and Power-Tethered Drone (SPTD) for Inspection of High Bridges",
      "Multi-Sensor Data Fusion for Autonomous Navigation"
    ],
    tags: ["LAWN TENNIS","STUDENT-ATHLETE","START-UP", "RESEARCH"]
  },
  {
    title: "MSU-IIT",
    subtitle: "COLLEGE LIFE (2017-2023)",
    description: "Advanced Research in Intelligent Systems (ARIS) Lab. Focused on the convergence of mechanical design and machine intelligence. Developing autonomous locomotion systems and sensor fusion modules.",
    points: [
      "Drone-Based Automatic Water Sampling Systematic",
      "Suspended and Power-Tethered Drone (SPTD) for Inspection of High Bridges",
      "Multi-Sensor Data Fusion for Autonomous Navigation"
    ],
    tags: ["UAV", "DISASTER RESPONSE", "DRONE-BASED"]
  }
];

export const instrumentationData = [
  {
    id: "MODULE_01",
    title: "SOLIDWORKS & ANSYS",
    subtitle: "FEM ANALYSIS",
    icon: "Box"
  },
  {
    id: "MODULE_02",
    title: "MATLAB / SIMULINK",
    subtitle: "LINEAR SYSTEMS",
    icon: "Sigma"
  },
  {
    id: "MODULE_03",
    title: "C++ & EMBEDDED C",
    subtitle: "FIRMWARE ARCH",
    icon: "Code"
  },
  {
    id: "MODULE_04",
    title: "ROS 2 SYSTEMS",
    subtitle: "PUB/SUB MIDDLEWARE",
    icon: "Network"
  }
];

export const projectsData = [
  {
    id: "001",
    title: "SENSOBOT",
    unit: "ASSEMBLY UNIT 001",
    description: "A modular robotic assembly designed for high-precision manufacturing environments and autonomous material handling.",
    image: "https://picsum.photos/seed/robot1/800/600"
  },
  {
    id: "002",
    title: "AQUA GUARDIAN",
    unit: "ASSEMBLY UNIT 001",
    description: "A modular robotic assembly designed for high-precision manufacturing environments and autonomous material handling.",
    image: "https://picsum.photos/seed/robot2/800/600"
  },
  {
    id: "003",
    title: "DR. ONE",
    unit: "ASSEMBLY UNIT 001",
    description: "A modular robotic assembly designed for high-precision manufacturing environments and autonomous material handling.",
    images: droneImages
  },
  {
    id: "004",
    title: "AQUA-LERT",
    unit: "ASSEMBLY UNIT 001",
    description: "A modular robotic assembly designed for high-precision manufacturing environments and autonomous material handling.",
    image: "https://picsum.photos/seed/robot4/800/600"
  },
];
