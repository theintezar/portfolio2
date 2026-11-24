import nykaa from './assets/nykaa.jpg'
import fm from './assets/frontmasters.jpg'
import uniqlo from './assets/uniqlo.jpg'
import social from './assets/social.jpg'

export const profile = {
  name: 'Intezar Ahmad',
  roles: ['Frontend Developer', 'React & Next.js Engineer', 'Real-time Maps Builder', 'Logistics Platform Specialist'],
  email: 'intezarkhan8292@gmail.com',
  phone: '+91 91751 53376',
  location: 'Mumbai, Maharashtra',
  github: 'https://github.com/theintezar',
  linkedin: 'https://www.linkedin.com/in/theintezar',
  resume: '/Intezar_Ahmad_Resume.pdf',
  summary:
    'Frontend Engineer with 4+ years of experience building scalable, production-ready web apps with React.js, Next.js, TypeScript and JavaScript. I specialize in logistics and fleet platforms — real-time vehicle tracking, route planning and complex API integrations — owning frontend architecture and shipping reusable UI systems with cross-functional teams.',
}

export const stats = [
  { value: 4, suffix: '+', label: 'Years of experience' },
  { value: 2, suffix: '', label: 'Logistics platforms built' },
  { value: 6, suffix: '', label: 'Developers led' },
  { value: 1, suffix: 'st', label: 'Place, Masai Build Week' },
]

export const skills = [
  { group: 'Frontend', items: ['React.js', 'Next.js', 'React Native', 'TypeScript', 'JavaScript (ES6+)', 'Redux', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material UI', 'Bootstrap'] },
  { group: 'Backend & Data', items: ['Node.js', 'Express.js', 'MongoDB', 'Firebase', 'REST APIs', 'Webhooks'] },
  { group: 'Real-time & Maps', items: ['Socket.IO', 'Google Maps API', 'OpenStreetMap'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Bitbucket'] },
]

export const projects = [
  {
    title: 'Mobilix TMS',
    tag: 'WHA Thailand · Enterprise',
    featured: true,
    desc: 'Transportation management system with shipment & driver workflows, intelligent route planning and fleet analytics dashboards.',
    stack: ['React', 'Next.js', 'TypeScript', 'Google Maps', 'Socket.IO'],
    hue: 262,
    icon: 'truck',
  },
  {
    title: 'GeoFleet AI',
    tag: 'Real-time Fleet Platform',
    featured: true,
    desc: 'Live vehicle tracking, reusable high-performance data grids, bulk CSV import with live progress, and webhook management with delivery audit views.',
    stack: ['React', 'Next.js', 'TypeScript', 'OpenStreetMap', 'Socket.IO'],
    hue: 190,
    icon: 'map',
  },
  {
    title: 'Global Dukan',
    tag: 'E-commerce Platform',
    featured: true,
    desc: 'End-to-end order & payment system — cart, checkout, order page and order history.',
    stack: ['React', 'REST APIs', 'Redux'],
    hue: 330,
    icon: 'cart',
  },
  {
    title: 'PINCHFIT',
    tag: 'Pinch Lifestyle',
    featured: true,
    desc: 'Meal-plan web app with Firebase Google authentication, custom meal requirement forms and a breakfast–lunch–dinner calendar.',
    stack: ['React', 'Firebase', 'Google Auth'],
    hue: 150,
    icon: 'meal',
  },
  {
    title: 'Nykaa Clone',
    tag: '🏆 1st Place · Masai Build Week',
    desc: 'Full-stack e-commerce clone built end-to-end during project-building week — secured 1st position.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    img: nykaa,
    github: 'https://github.com/theintezar/Nykaa-Clone',
    demo: 'https://nykaa-clone2.vercel.app/',
  },
  {
    title: 'Frontend Masters',
    tag: 'Team of 6 · Led',
    desc: 'Educational platform clone for front-end courses, built with a 6-member team I led — product description page, footer and core user flows.',
    stack: ['React', 'JavaScript', 'CSS'],
    img: fm,
    github: 'https://github.com/theintezar/frontendmasters',
    demo: 'https://frontendmasters.vercel.app/',
  },
  {
    title: 'Uniqlo Clone',
    tag: 'Team of 5',
    desc: 'Sign-in / sign-up, landing page, header/footer and product listing with local storage.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    img: uniqlo,
    github: 'https://github.com/theintezar/Uniqlo2',
    demo: 'https://theintezar.github.io/Uniqlo2/',
  },
  {
    title: 'Social Media App',
    tag: 'MERN Stack',
    desc: 'MERN social app where users can post, make friends, like posts and browse other users.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    img: social,
    github: 'https://github.com/theintezar/Social-Media',
  },
]

export const experience = [
  {
    role: 'Frontend Developer',
    company: 'PixelCrews Solution',
    period: 'Nov 2023 – Present',
    points: [
      'Architected the frontend of two enterprise logistics platforms — Mobilix TMS (WHA Thailand) and GeoFleet AI — from scratch with React, Next.js and TypeScript.',
      'Built complete workflows for shipment management, driver tracking, vehicle monitoring, route planning and fleet analytics with live maps and Socket.IO updates.',
      'Created a bulk CSV import system with templates, dynamic field mapping, validation and live progress tracking.',
      'Developed reusable high-performance data grids with search, sorting, pagination and full CRUD.',
      'Integrated REST APIs and webhook modules, including delivery audit views.',
    ],
  },
  {
    role: 'Software Development Engineer',
    company: 'Pinch Lifestyle',
    period: 'Jun 2022 – Jul 2023',
    points: [
      'Improved performance and engagement across customer-facing web and Android apps.',
      'Implemented a website chatbot that significantly improved customer support.',
      'Developed a bill management system with multi-level approvals and electronic proof tracking.',
      'Built a CRM module that improved customer-candidate matching efficiency.',
    ],
  },
  {
    role: 'Full Stack Web Developer',
    company: 'Masai School',
    period: 'Apr 2021 – Apr 2022',
    points: [
      'Led a 6-member team building a complete e-commerce web application.',
      'Contributed to a 5-member Uniqlo clone: auth, landing page, header/footer and product listing.',
      'Built interactive frontends with HTML, CSS, JavaScript and local storage.',
    ],
  },
]

export const education = [
  { title: 'Full-Stack Development Bootcamp', place: 'Masai School, Bangalore', years: '2021 – 2022' },
  { title: 'Bachelor of Computer Science', place: 'Mumbai University', years: '2017 – 2020' },
  { title: 'HSC in Computer Science', place: 'Vidya Varidhi Vidyalaya, Mumbai', years: '2015 – 2017' },
]
