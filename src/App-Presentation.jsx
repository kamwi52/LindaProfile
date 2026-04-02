import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, MapPin, Users, BookOpen, Trophy, Star, Clock, Phone, Mail, Building2, AlertCircle, RefreshCw, ArrowRight, FlaskConical, GraduationCap, Award, Camera, Plus, Trash2, Copy, Download, Upload, Printer, Search, Image as ImageIcon, ChevronUp, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { sportsImages, alumniImages, alumniProfiles } from './imageConfig';

const PLACEHOLDER_IMG = 'https://placehold.co/90x110/e8e8e8/666666?text=Staff+Photo';

const INITIAL_STAFF_DATA = {
  head: [{ fullName: 'KALUSA A.', position: 'HEAD TEACHER', imageUrl: '/images/staff/head.jpg' }],
  deputy: [{ fullName: 'MUNTANGA B.', position: 'DEPUTY H. TEACHER', imageUrl: '/images/staff/deputy.jpg' }],
  hods: [
    { fullName: 'KAGO N. G.', position: 'HOD MATHEMATICS & ICT', imageUrl: '/images/staff/hod-maths.jpg' },
    { fullName: 'KANGAI B.', position: 'HOD LITERATURE & LANGUAGES', imageUrl: '/images/staff/hod-languages.jpg' },
    { fullName: 'MUKUBESA D. N.', position: 'HOD NATURAL SCIENCES', imageUrl: '/images/staff/hod-sciences.jpg' },
    { fullName: 'MULINGA R. O.', position: 'HOD SOCIAL SCIENCES', imageUrl: '/images/staff/hod-social.jpg' },
    { fullName: 'CHIKUSU R.', position: 'HOD BUSINESS & FINANCE', imageUrl: '/images/staff/hod-business.jpg' },
    { fullName: 'SYAMWENYA B.', position: 'HOD PRACTICAL', imageUrl: '/images/staff/hod-practical.jpg' },
    { fullName: 'NJEKWA S. M.', position: 'HOD EXPRESSIVE ARTS', imageUrl: '/images/staff/hod-arts.jpg' }
  ],
  teachers: [
    { fullName: 'BANDA M.', subject: 'DESIGN AND TECHNOLOGY' },
    { fullName: 'CHIBOMBAMILIMO L. B.', subject: 'BIOLOGY' },
    { fullName: 'CHIKOSOLA K.', subject: 'ZAMBIAN LANGUAGES' },
    { fullName: 'CHIKUSU R.', subject: 'ACCOUNTS' },
    { fullName: 'CHILESHIE E.', subject: 'MATHEMATICS' },
    { fullName: 'CHILUNDU D. J.', subject: 'ENGLISH' },
    { fullName: 'CHOCHO T.', subject: 'CHEMISTRY' },
    { fullName: 'HALUMBA M.', subject: 'HISTORY' },
    { fullName: 'HAMPEYO C.', subject: 'MATHEMATICS' },
    { fullName: 'HIMWEETE B.', subject: 'ENGLISH' },
    { fullName: 'HIMWITA W.', subject: 'GEOGRAPHY' },
    { fullName: 'KABUDULA M.', subject: 'ENGLISH' },
    { fullName: 'KAGO N. G.', subject: 'BIOLOGY' },
    { fullName: 'KALUBA G.', subject: 'CIVIC EDUCATION' },
    { fullName: 'KAMBUNGA S.', subject: 'ENGLISH' },
    { fullName: 'LUBINDA M.', subject: 'MUSIC' },
    { fullName: 'MAINZA M. I.', subject: 'MATHEMATICS' },
    { fullName: 'MAKAMO D.', subject: 'GEOGRAPHY' },
    { fullName: 'MAKAYI B.', subject: 'BIOLOGY' },
    { fullName: 'MAKLICHI S.', subject: 'CIVIC EDUCATION' },
    { fullName: 'MAYANGWA M.', subject: 'ENGLISH' },
    { fullName: 'MICHELO K.', subject: 'BIOLOGY' },
    { fullName: 'MIYOBA T.', subject: 'FOOD SCIENCE/HOSPITALITY' },
    { fullName: 'MOONO C.', subject: 'BUSINESS STUDIES' },
    { fullName: 'MOONO K.', subject: 'ART & DESIGN' },
    { fullName: 'MUCHIMBA B.', subject: 'MATHEMATICS' },
    { fullName: 'MUCHIMBA L.', subject: 'BIOLOGY' },
    { fullName: 'MUIMANZOVU H.', subject: 'ART & DESIGN' },
    { fullName: 'MUKOSHA M.', subject: 'COMMERCE' },
    { fullName: 'MUKUBESA D. N.', subject: 'BIOLOGY' },
    { fullName: 'MUTALE I.', subject: 'MATHEMATICS' },
    { fullName: 'MWANGALA E. M.', subject: 'ICT' },
    { fullName: 'MWEEMBA M.', subject: 'NUTRITIONAL SCIENCE' },
    { fullName: 'MWINDWE N.', subject: 'RE' },
    { fullName: 'NAKUSHOWA A.', subject: 'HISTORY' },
    { fullName: 'NAWA L.', subject: 'RE' },
    { fullName: 'NCHIMUNYA C.', subject: 'MATHEMATICS' },
    { fullName: 'NGOMA S.', subject: 'PHYSICS' },
    { fullName: 'NJEKWA S. M.', subject: 'MATHEMATICS' },
    { fullName: 'PHIRI M.', subject: 'MUSIC' },
    { fullName: 'SAKAPANDA S.', subject: 'MATHEMATICS' },
    { fullName: 'SAMENDE G. A.', subject: 'HISTORY' },
    { fullName: 'SIAMALYATA M.', subject: 'MUSIC' },
    { fullName: 'SIYAUYA K.', subject: 'ICT' },
    { fullName: 'SOKO D.', subject: 'CIVIC EDUCATION' },
    { fullName: 'SYAMWENYA B.', subject: 'RE' },
    { fullName: 'TEMBO S.', subject: 'MUSIC' },
    { fullName: 'WALUBITA I.', subject: 'FRENCH' },
    { fullName: 'WAMUNDILA M.', subject: 'DESIGN AND TECHNOLOGY' },
    { fullName: 'ZULU M.', subject: 'ART & DESIGN' }
  ]
};

// Indices for section navigation
const SECTIONS = [
  'overview',
  'about',
  'facilities',
  'programs',
  'sports',
  'orgchart',
  'classof',
  'alumni',
  'contact',
];

const SchoolOverview = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const fileInputRef = useRef(null);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [staffSearchTerm, setStaffSearchTerm] = useState('');
  const [dailyQuote, setDailyQuote] = useState({ text: 'Linda for Life Long Education', author: 'School Motto' });
  const [alumniSearchTerm, setAlumniSearchTerm] = useState('');
  const [selectedAlumnus, setSelectedAlumnus] = useState(alumniProfiles[0]);
  const alumniDetailRef = useRef(null);

  // Org Chart State
  const [orgData, setOrgData] = useState({ rows: [] });
  const [activePhotoUpload, setActivePhotoUpload] = useState(null);
  const [showOrgControls, setShowOrgControls] = useState(false);
  const [sportsGallery, setSportsGallery] = useState(sportsImages);
  const [alumniGallery, setAlumniGallery] = useState(alumniImages);

  // Alumni Profile Modal State
  const [alumniProfileModal, setAlumniProfileModal] = useState({
    isOpen: false,
    profile: null,
    currentPhotoIndex: 0,
    showFullStory: false
  });

  // Image Slideshow State
  const [imageSlideshow, setImageSlideshow] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: ''
  });

  const getDepartmentForSubject = (subject) => {
    const s = subject.toUpperCase();
    if (['MATHEMATICS', 'ICT'].includes(s)) return 'MATHEMATICS & ICT';
    if (['ENGLISH', 'ZAMBIAN LANGUAGES', 'FRENCH', 'LITERATURE'].includes(s)) return 'LITERATURE & LANGUAGES';
    if (['BIOLOGY', 'CHEMISTRY', 'PHYSICS'].includes(s)) return 'NATURAL SCIENCES';
    if (['HISTORY', 'GEOGRAPHY', 'CIVIC EDUCATION', 'RE'].includes(s)) return 'SOCIAL SCIENCES';
    if (['ACCOUNTS', 'COMMERCE', 'BUSINESS STUDIES'].includes(s)) return 'BUSINESS & FINANCE';
    if (['DESIGN AND TECHNOLOGY', 'FOOD SCIENCE/HOSPITALITY', 'NUTRITIONAL SCIENCE'].includes(s)) return 'PRACTICAL';
    if (['MUSIC', 'ART & DESIGN'].includes(s)) return 'EXPRESSIVE ARTS';
    return 'OTHER';
  };

  const initializeOrgChart = () => {
    const rows = [];
    rows.push({ id: 1, level: 1, title: 'HEAD TEACHER', cards: INITIAL_STAFF_DATA.head.map(s => ({ id: Math.random(), fullName: s.fullName, position: s.position, image: s.imageUrl || PLACEHOLDER_IMG })) });
    rows.push({ id: 2, level: 2, title: 'DEPUTY HEAD TEACHER', cards: INITIAL_STAFF_DATA.deputy.map(s => ({ id: Math.random(), fullName: s.fullName, position: s.position, image: s.imageUrl || PLACEHOLDER_IMG })) });
    
    const teachersByDept = {};
    INITIAL_STAFF_DATA.teachers.forEach(t => {
      const dept = getDepartmentForSubject(t.subject);
      if (!teachersByDept[dept]) teachersByDept[dept] = [];
      teachersByDept[dept].push(t.fullName);
    });

    rows.push({ id: 3, level: 3, title: 'DEPARTMENTS & STAFF', cards: INITIAL_STAFF_DATA.hods.map(s => ({ 
      id: Math.random(), 
      fullName: s.fullName, 
      position: s.position, 
      image: s.imageUrl || PLACEHOLDER_IMG,
      subordinates: teachersByDept[s.position.replace('HOD ', '')] || []
    })) });
    
    setOrgData({ rows });
  };

  // School data
  const schoolData = {
    name: 'LINDA SECONDARY SCHOOL',
    location: 'Livingstone, Zambia',
    founded: '2005',
    motto: 'Linda for Life Long Education',
    phone: '0979889122',
    email: 'info@lindasecondary.edu.zm',
    website: 'www.lindasecondary.edu.zm',
    
    overview: `Linda Secondary School is a leading educational institution in Livingstone, dedicated to providing quality teaching and learning coupled with life long skills and values. As of 2025, we have achieved an exceptional 98.4% pass rate for Grade 12, reflecting our commitment to academic excellence through effective supervision.`,
    
    vision: 'To excel in academic, extra-curricular performance and moral conduct for life-long education (Target set for 2020 and maintained).',
    
    mission: 'To provide quality teaching and learning coupled with life long skills and values to all through effective supervision.',
    
    stats: [
      { label: 'Teaching Staff', value: '69', icon: Users },
      { label: 'Classrooms', value: '32', icon: Building2 },
      { label: 'Grade 12 Pass', value: '98.4%', icon: Trophy },
      { label: 'Science Labs', value: '02', icon: FlaskConical },
    ],
    
    highlights: [
      '98.4% Grade 12 pass rate (2025)',
      'Seven specialized academic departments',
      'Comprehensive practical skills training',
      'Effective management committee supervision',
      'Excellent sports and recreational grounds',
      'Strong focus on moral conduct',
    ],

    management: [
      { name: 'Mr. Kalusa Alex Z.', role: 'Headteacher (Chairperson)' },
      { name: 'Mr. Bornwell Muntanga', role: 'Deputy Headteacher (Vice Chairperson)' },
      { name: 'Mr. Likanduko Clyde', role: 'Accounts Assistant' },
      { name: 'Mrs. Simunchembu S.', role: 'G & C Secretary' },
      { name: 'Mr. Mulinga R.', role: 'HOD Member' },
      { name: 'Ms. Doreen M. Zaza', role: 'HOD Member' },
      { name: 'Mr. Kangai B.', role: 'HOD Member' },
      { name: 'Mr. Njekwa M.', role: 'HOD Member' },
      { name: 'Mr. Siamwenya B.', role: 'HOD Member' },
      { name: 'Mr. Kago G.N.', role: 'HOD Member' },
      { name: 'Mr. Chikusi R.', role: 'HOD Member' },
    ],

    departments: [
      { name: 'Mathematics & ICT', hod: 'Mr. Kago G. Nanja', staff: '07' },
      { name: 'Literature & Languages', hod: 'Mr. Kangai Boyd', staff: '15' },
      { name: 'Natural Sciences', hod: 'Ms. Doreen Mukubesa', staff: '10' },
      { name: 'Social Sciences', hod: 'Mr. Mulinga Register', staff: '21' },
      { name: 'Business & Finance', hod: 'Mr. Chikusi Rhody', staff: '03' },
      { name: 'Practical', hod: 'Mr. Syamwenya Binga', staff: '07' },
      { name: 'Expressive Arts', hod: 'Mr. Njekwa Misozi S.', staff: '06' },
    ],

    staff: [
      { name: 'KALUSA A.', pos: 'Head Teacher', spec: '—' },
      { name: 'BORNWELL M.', pos: 'Deputy H. Teacher', spec: '—' },
      { name: 'BANDA M.', pos: 'Subject Teacher', spec: 'Design and Technology' },
      { name: 'CHIBOMBAMILIMO L. B.', pos: 'Subject Teacher', spec: 'Biology' },
      { name: 'CHIKOSOLA K.', pos: 'Subject Teacher', spec: 'Zambian Languages' },
      { name: 'CHIKUSU R.', pos: 'Subject Teacher', spec: 'Accounts' },
      { name: 'CHILESHIE E.', pos: 'Subject Teacher', spec: 'Mathematics' },
      { name: 'CHILUNDU D. J.', pos: 'Subject Teacher', spec: 'English' },
      { name: 'CHOCHO T.', pos: 'Subject Teacher', spec: 'Chemistry' },
      { name: 'HALUMBA M.', pos: 'Subject Teacher', spec: 'History' },
      { name: 'HAMPEYO C.', pos: 'Subject Teacher', spec: 'Mathematics' },
      { name: 'HIMWEETE B.', pos: 'Subject Teacher', spec: 'English' },
      { name: 'HIMWITA W.', pos: 'Subject Teacher', spec: 'Geography' },
      { name: 'KABUDULA M.', pos: 'Subject Teacher', spec: 'English' },
      { name: 'KAGO N. G.', pos: 'Subject Teacher', spec: 'Biology' },
      { name: 'KALUBA G.', pos: 'Subject Teacher', spec: 'Civic Education' },
      { name: 'KAMBUNGA S.', pos: 'Subject Teacher', spec: 'English' },
      { name: 'LUBINDA M.', pos: 'Subject Teacher', spec: 'Music' },
      { name: 'MAINZA M. I.', pos: 'Subject Teacher', spec: 'Mathematics' },
      { name: 'MAKAMO D.', pos: 'Subject Teacher', spec: 'Geography' },
      { name: 'MAKAYI B.', pos: 'Subject Teacher', spec: 'Biology' },
      { name: 'MAKLICHI S.', pos: 'Subject Teacher', spec: 'Civic Education' },
      { name: 'MAYANGWA M.', pos: 'Subject Teacher', spec: 'English' },
      { name: 'MICHELO K.', pos: 'Subject Teacher', spec: 'Biology' },
      { name: 'MIYOBA T.', pos: 'Subject Teacher', spec: 'Food Science/Hospitality' },
      { name: 'MOONO C.', pos: 'Subject Teacher', spec: 'Business Studies' },
      { name: 'MOONO K.', pos: 'Subject Teacher', spec: 'Art & Design' },
      { name: 'MUCHIMBA B.', pos: 'Subject Teacher', spec: 'Mathematics' },
      { name: 'MUCHIMBA L.', pos: 'Subject Teacher', spec: 'Biology' },
      { name: 'MUIMANZOVU H.', pos: 'Subject Teacher', spec: 'Art & Design' },
      { name: 'MUKOSHA M.', pos: 'Subject Teacher', spec: 'Commerce' },
      { name: 'MUKUBESA D. N.', pos: 'Subject Teacher', spec: 'Biology' },
      { name: 'MUTALE I.', pos: 'Subject Teacher', spec: 'Mathematics' },
      { name: 'MWANGALA E. M.', pos: 'Subject Teacher', spec: 'ICT' },
      { name: 'MWEEMBA M.', pos: 'Subject Teacher', spec: 'Nutritional Science' },
      { name: 'MWINDWE N.', pos: 'Subject Teacher', spec: 'RE' },
      { name: 'NAKUSHOWA A.', pos: 'Subject Teacher', spec: 'History' },
      { name: 'NAWA L.', pos: 'Subject Teacher', spec: 'RE' },
      { name: 'NCHIMUNYA C.', pos: 'Subject Teacher', spec: 'Mathematics' },
      { name: 'NGOMA S.', pos: 'Subject Teacher', spec: 'Physics' },
      { name: 'NJEKWA S. M.', pos: 'Subject Teacher', spec: 'Mathematics' },
      { name: 'PHIRI M.', pos: 'Subject Teacher', spec: 'Music' },
      { name: 'SAKAPANDA S.', pos: 'Subject Teacher', spec: 'Mathematics' },
      { name: 'SAMENDE G. A.', pos: 'Subject Teacher', spec: 'History' },
      { name: 'SIAMALYATA M.', pos: 'Subject Teacher', spec: 'Music' },
      { name: 'SIYAUYA K.', pos: 'Subject Teacher', spec: 'ICT' },
      { name: 'SOKO D.', pos: 'Subject Teacher', spec: 'Civic Education' },
      { name: 'SYAMWENYA B.', pos: 'Subject Teacher', spec: 'RE' },
      { name: 'TEMBO S.', pos: 'Subject Teacher', spec: 'Music' },
      { name: 'WALUBITA I.', pos: 'Subject Teacher', spec: 'French' },
      { name: 'WAMUNDILA M.', pos: 'Subject Teacher', spec: 'Design and Technology' },
      { name: 'ZULU M.', pos: 'Subject Teacher', spec: 'Art & Design' }
    ],
    
    facilities: [
      { name: 'Classrooms', description: '32 classrooms supporting student learning.', fullDescription: 'The school features 32 dedicated classrooms designed to provide a conducive environment for both teaching and learning.', icon: '🏫', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800' },
      { name: 'Science Laboratories', description: '02 labs for Physics, Chemistry, and Biology.', fullDescription: 'Equipped with modern scientific tools, our two laboratories allow students to engage in practical natural science studies.', icon: '🔬', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800' },
      { name: 'Computer Lab', description: '01 Lab for ICT and coding education.', fullDescription: 'Our computer lab provides students with access to digital tools and ICT training essential for the modern world.', icon: '💻', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800' },
      { name: 'Multipurpose Hall', description: '01 Hall for assemblies and events.', fullDescription: 'A large multipurpose hall used for school assemblies, expressive arts performances, and community events.', icon: '🎭', image: 'https://images.unsplash.com/photo-1505373633562-2371707d412e?q=80&w=800' },
      { name: 'Practical Rooms', description: '04 Rooms for vocational and skills training.', fullDescription: 'Specialized rooms for practical subjects, ensuring students develop hands-on lifelong skills.', icon: '🛠️', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800' },
      { name: 'Sports Grounds', description: 'Football ground and Netball court.', fullDescription: 'Extensive grounds featuring one full-sized football field and one netball court for extra-curricular development.', icon: '⚽', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800' },
      { name: 'Sanitation', description: '45 Student and 4 Staff toilets.', fullDescription: 'Well-maintained sanitation facilities including 20 toilets for boys, 25 for girls, and 4 dedicated staff toilets.', icon: '🚻', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800' },
    ],
    
    performance: {
      grade9: [
        { year: '2023', sat: '180', passed: '168', rate: '93.3%' },
        { year: '2024', sat: '200', passed: '182', rate: '90.5%' },
        { year: '2025', sat: '149', passed: '135', rate: '90.5%' },
      ],
      grade12: [
        { year: '2023', sat: '298', passed: '231', rate: '77.5%' },
        { year: '2024', sat: '313', passed: '268', rate: '85.0%' },
        { year: '2025', sat: '433', passed: '433', rate: '98.4%' },
      ],
    },

    keyContacts: [
      { name: 'Mr. Kalusa Alex', role: 'Headteacher', phone: '0979889122' },
      { name: 'Mr. Kamwi Siyauya', role: 'ICT Class Teacher & Data Officer', phone: '0979983682' },
      { name: 'Mr. Chikusi Royd', role: 'Staff Member', phone: '0972788191' },
      { name: 'Ms. Chilokota Bless', role: 'Staff Member', phone: '0976045050' },
    ],

    sports: {
      history: "Linda Secondary School has been a powerhouse in Southern Province sports for over a decade. Our 'Lions' and 'Lionesses' are known for their discipline and competitive spirit on and off the field.",
      trophies: [
        { year: '2024', title: 'Provincial Football Champions', level: 'Regional', icon: '🏆' },
        { year: '2023', title: 'National Netball Runners-up', level: 'National', icon: '🥈' },
        { year: '2023', title: 'District Athletics Overall Winners', level: 'District', icon: '🏆' },
        { year: '2022', title: 'Coca-Cola Youth Cup Winners', level: 'Regional', icon: '🏆' },
      ],
      records: [
        { event: '100m Dash', record: '10.45s', holder: 'M. Phiri', year: '2024' },
        { event: 'Long Jump', record: '6.82m', holder: 'L. Banda', year: '2023' },
      ]
    },

    programs: [
      {
        title: '1. NATURAL SCIENCES',
        description: 'A rigorous pathway focusing on mathematical and scientific inquiry for future STEM professionals.',
        subjects: ['Maths', 'English', 'Civic Education', 'I.C.T', 'Biology', 'Chemistry', 'Physics'],
      },
      {
        title: '2. BUSINESS AND FINANCE',
        description: 'Designed for students interested in commerce, accounting, and economic systems.',
        subjects: ['Maths', 'English', 'Civic Education', 'I.C.T', 'Biology', 'Commerce', 'P.A (Principles of Accounts)'],
      },
      {
        title: '3. PERFORMING & CREATIVE ARTS',
        description: 'Fostering artistic expression, cultural literature, and creative design skills.',
        subjects: ['Mathematics 1', 'Civic Education', 'Biology', 'I.C.T', 'Literature in Tonga', 'Art & Design', 'Tonga'],
      },
      {
        title: '4. SOCIAL SCIENCES',
        description: 'Exploring human society, history, and linguistic arts for a well-rounded humanities background.',
        subjects: ['Maths', 'English', 'Civic Education', 'I.C.T', 'History', 'Biology', 'Literature in English'],
      },
      {
        title: '5. TECHNOLOGY STUDIES',
        description: 'Integrating technical skills and scientific principles for industrial innovation.',
        subjects: ['Design & Technology', 'Maths', 'English', 'Civic Education', 'I.C.T', 'Chemistry', 'Physics'],
      },
    ],
  };

  // Navigation handler for arrow keys
  const handleNavigation = (direction) => {
    if (direction === 'down' || direction === 'right') {
      const nextIndex = (currentSectionIndex + 1) % SECTIONS.length;
      setCurrentSectionIndex(nextIndex);
      setActiveSection(SECTIONS[nextIndex]);
    } else if (direction === 'up' || direction === 'left') {
      const prevIndex = (currentSectionIndex - 1 + SECTIONS.length) % SECTIONS.length;
      setCurrentSectionIndex(prevIndex);
      setActiveSection(SECTIONS[prevIndex]);
    }
  };

  // Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedFacility || importModalOpen) return; // Don't navigate if modal is open
      
      switch(e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          handleNavigation('down');
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          handleNavigation('up');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFacility, importModalOpen, currentSectionIndex]);

  useEffect(() => {
    // PULLING DATA FROM NET: Fetching an educational quote
    fetch('https://api.quotable.io/random?tags=education,wisdom')
      .then(res => res.json())
      .then(data => setDailyQuote({ text: data.content, author: data.author }))
      .catch(() => {}); // Fallback to motto if network fails

    const saved = localStorage.getItem('linda_org_chart');
    if (saved) {
      setOrgData(JSON.parse(saved));
    } else {
      initializeOrgChart();
    }

    const savedSports = localStorage.getItem('linda_sports_gallery');
    if (savedSports) {
      setSportsGallery(JSON.parse(savedSports));
    }

    const savedAlumni = localStorage.getItem('linda_alumni_gallery');
    if (savedAlumni) {
      setAlumniGallery(JSON.parse(savedAlumni));
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (orgData.rows.length > 0) {
      localStorage.setItem('linda_org_chart', JSON.stringify(orgData));
    }
  }, [orgData]);

  useEffect(() => {
    localStorage.setItem('linda_sports_gallery', JSON.stringify(sportsGallery));
  }, [sportsGallery]);

  useEffect(() => {
    localStorage.setItem('linda_alumni_gallery', JSON.stringify(alumniGallery));
  }, [alumniGallery]);

  const handleUpdateCard = (rowId, cardId, field, value) => {
    setOrgData(prev => ({
      rows: prev.rows.map(row => row.id === rowId ? {
        ...row, cards: row.cards.map(card => card.id === cardId ? { ...card, [field]: value } : card)
      } : row)
    }));
  };

  const handleAddTeacherRow = () => {
    const newRow = {
      id: Math.random(), level: 4, title: 'SUBJECT TEACHERS',
      cards: [{ id: Math.random(), fullName: 'NEW TEACHER', position: 'SUBJECT', image: PLACEHOLDER_IMG }]
    };
    setOrgData(prev => ({ rows: [...prev.rows, newRow] }));
  };

  const handleAction = (type, rowId, cardId) => {
    if (type === 'duplicate') {
      setOrgData(prev => ({
        rows: prev.rows.map(row => row.id === rowId ? {
          ...row, cards: (() => {
            const cardToCopy = row.cards.find(c => c.id === cardId);
            return [...row.cards, { ...cardToCopy, id: Math.random(), fullName: cardToCopy.fullName + ' (Copy)' }];
          })()
        } : row)
      }));
    } else if (type === 'remove') {
      setOrgData(prev => ({
        rows: prev.rows.map(row => row.id === rowId ? {
          ...row, cards: row.cards.filter(c => c.id !== cardId)
        } : row).filter(row => row.cards.length > 0 || row.level !== 4)
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && activePhotoUpload) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleUpdateCard(activePhotoUpload.rowId, activePhotoUpload.cardId, 'image', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSportsImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImg = { id: Math.random(), url: event.target.result, caption: 'New Sports Moment' };
        setSportsGallery(prev => [...prev, newImg]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAlumniImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImg = { id: Math.random(), url: event.target.result, caption: 'New Alumni Moment' };
        setAlumniGallery(prev => [...prev, newImg]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Image Slideshow Functions
  const openImageSlideshow = (images, startIndex = 0, title = 'Gallery') => {
    setImageSlideshow({
      isOpen: true,
      images,
      currentIndex: startIndex,
      title
    });
  };

  const closeImageSlideshow = () => {
    setImageSlideshow({
      isOpen: false,
      images: [],
      currentIndex: 0,
      title: ''
    });
  };

  const nextImage = () => {
    setImageSlideshow(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  const prevImage = () => {
    setImageSlideshow(prev => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1
    }));
  };

  // Alumni Profile Modal Functions
  const openAlumniProfileModal = (profileId) => {
    const profile = alumniProfiles.find(p => p.id === profileId);
    if (profile) {
      setAlumniProfileModal({
        isOpen: true,
        profile: profile,
        currentPhotoIndex: 0,
        showFullStory: false
      });
    }
  };

  const closeAlumniProfileModal = () => {
    setAlumniProfileModal({
      isOpen: false,
      profile: null,
      currentPhotoIndex: 0,
      showFullStory: false
    });
  };

  const nextAlumniPhoto = () => {
    setAlumniProfileModal(prev => ({
      ...prev,
      currentPhotoIndex: (prev.currentPhotoIndex + 1) % prev.profile.photos.length
    }));
  };

  const prevAlumniPhoto = () => {
    setAlumniProfileModal(prev => ({
      ...prev,
      currentPhotoIndex: prev.currentPhotoIndex === 0 ? prev.profile.photos.length - 1 : prev.currentPhotoIndex - 1
    }));
  };

  const toggleFullStory = () => {
    setAlumniProfileModal(prev => ({
      ...prev,
      showFullStory: !prev.showFullStory
    }));
  };

  const exportOrgData = () => {
    const dataStr = JSON.stringify(orgData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linda-org-chart-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const doImport = () => {
    try {
      const parsed = JSON.parse(importText);
      setOrgData(parsed);
      setImportModalOpen(false);
    } catch (e) { alert('Invalid data format: ' + e.message); }
  };

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-white via-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-900 text-lg font-medium">Loading school overview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="presentation-root bg-gradient-to-br from-white via-blue-50 to-white text-gray-900">
      {/* Slide Navigation Controls */}
      <div className="presentation-nav fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border-2 border-blue-900 shadow-lg">
        <button
          onClick={() => handleNavigation('up')}
          className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
          title="Previous (↑)"
        >
          <ChevronUp className="w-5 h-5 text-blue-900 group-hover:scale-110 transition-transform" />
        </button>
        
        <div className="flex items-center gap-1">
          {SECTIONS.map((section, idx) => (
            <button
              key={section}
              onClick={() => {
                setCurrentSectionIndex(idx);
                setActiveSection(section);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentSectionIndex === idx ? 'bg-blue-900 w-8' : 'bg-blue-300 hover:bg-blue-500'
              }`}
              title={
                section === 'orgchart' ? 'Staff' : 
                section === 'classof' ? 'Class Of ...' : 
                section.charAt(0).toUpperCase() + section.slice(1)
              }
            />
          ))}
        </div>
        
        <button
          onClick={() => handleNavigation('down')}
          className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
          title="Next (↓)"
        >
          <ChevronDown className="w-5 h-5 text-blue-900 group-hover:scale-110 transition-transform" />
        </button>

        <div className="text-xs text-gray-500 ml-2 font-medium">
          {currentSectionIndex + 1} / {SECTIONS.length}
        </div>
      </div>

      {/* Slide Container */}
      <div className="presentation-container h-screen overflow-hidden relative">
        {/* Navbar */}
        <nav className="border-b-2 border-blue-900 backdrop-blur-sm z-50 bg-white">
          <div className="max-w-full px-6 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center font-bold text-white">
                  LS
                </div>
                <div>
                  <h1 className="text-lg font-black text-blue-900">
                    Linda Secondary
                  </h1>
                  <p className="text-xs text-blue-700">Presentation Mode</p>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-blue-100 rounded-lg text-blue-900"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden grid grid-cols-2 gap-2 mt-3 pb-2 border-t-2 border-blue-200 pt-2">
                {SECTIONS.map(section => (
                  <button
                    key={section}
                    onClick={() => {
                      const idx = SECTIONS.indexOf(section);
                      setCurrentSectionIndex(idx);
                      setActiveSection(section);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
                      activeSection === section
                        ? 'bg-blue-900 text-white'
                        : 'text-gray-700 hover:bg-blue-100'
                    }`}
                  >
                    {
                      section === 'orgchart' ? 'Staff' : 
                      section === 'classof' ? 'Class Of ...' : 
                      section.charAt(0).toUpperCase() + section.slice(1)
                    }
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Slide Content - 100vh minus navbar */}
        <div className="slide-content h-calc(100vh - 64px) overflow-y-auto presentation-scroll">
          {/* Decade Grouping Logic */}
          {(() => {
            if (activeSection !== 'classof') return null;
            const grouped = alumniProfiles
              .filter(p => 
                p.name.toLowerCase().includes(alumniSearchTerm.toLowerCase()) || 
                p.graduationYear.toString().includes(alumniSearchTerm)
              )
              .reduce((acc, curr) => {
                const decade = Math.floor(curr.graduationYear / 10) * 10;
                const key = `${decade}s`;
                if (!acc[key]) acc[key] = [];
                acc[key].push(curr);
                return acc;
              }, {});
            window._sortedDecadesPres = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
            window._groupedAlumniPres = grouped;
          })()}

          {/* Overview Section */}
          {activeSection === 'overview' && (
            <section style={{ minHeight: 'calc(100vh - 70px)' }} className="bg-gradient-to-b from-white to-blue-50 flex flex-col justify-center p-6 md:p-12">
              {/* Hero */}
              <div className="relative mb-12 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 md:p-12 text-white text-center">
                <h1 className="text-4xl md:text-5xl font-black mb-4 drop-shadow-lg">{schoolData.name}</h1>
                <p className="text-lg italic opacity-90 mb-4">"{dailyQuote.text}"</p>
                <p className="text-lg flex items-center justify-center gap-2 drop-shadow-lg">
                  <MapPin className="w-5 h-5" />
                  {schoolData.location}
                </p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {schoolData.stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-white border-2 border-blue-900 rounded-xl p-4 text-center shadow-md">
                      <Icon className="w-6 h-6 text-blue-900 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
                      <div className="text-gray-700 text-xs md:text-sm font-medium">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Highlights Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {schoolData.highlights.map((highlight, idx) => (
                  <div key={idx} className="bg-white border-2 border-blue-900 rounded-lg p-4 flex items-start gap-3 shadow-sm">
                    <Star className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800 text-sm font-medium">{highlight}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* About Section */}
          {activeSection === 'about' && (
            <section style={{ minHeight: 'calc(100vh - 70px)' }} className="bg-gradient-to-b from-white to-blue-50 p-6 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">Our Vision & Mission</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-white border-2 border-blue-900 rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" /> Vision
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {schoolData.vision}
                  </p>
                </div>
                <div className="bg-white border-2 border-blue-900 rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" /> Mission
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {schoolData.mission}
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-blue-900 mb-4">School Management Committee</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {schoolData.management.slice(0, 8).map((leader, idx) => (
                  <div key={idx} className="bg-blue-50 p-3 rounded-lg border border-blue-200 shadow-sm">
                    <p className="text-blue-900 font-bold text-sm">{leader.name}</p>
                    <p className="text-blue-700 text-xs">{leader.role}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Facilities Section */}
          {activeSection === 'facilities' && (
            <section style={{ minHeight: 'calc(100vh - 70px)' }} className="bg-gradient-to-b from-white to-blue-50 p-6 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">Our Facilities</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {schoolData.facilities.map((facility, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (facility.name === 'Sports Grounds') {
                        const idx = SECTIONS.indexOf('sports');
                        setCurrentSectionIndex(idx);
                        setActiveSection('sports');
                      } else {
                        setSelectedFacility(facility);
                      }
                    }}
                    className="bg-white border-2 border-blue-900 rounded-lg p-4 hover:shadow-lg hover:bg-blue-50 transition-all text-left shadow-md"
                  >
                    <div className="text-3xl mb-2">{facility.icon}</div>
                    <h3 className="font-bold text-blue-900 mb-1 text-sm">{facility.name}</h3>
                    <p className="text-gray-700 text-xs mb-2">{facility.description}</p>
                    <div className="flex items-center gap-2 text-blue-900 font-semibold text-xs">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Programs Section */}
          {activeSection === 'programs' && (
            <section style={{ minHeight: 'calc(100vh - 70px)' }} className="bg-gradient-to-b from-white to-blue-50 p-6 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Form 1-4 Subject Pathways</h2>
              <p className="text-gray-700 text-sm mb-8 max-w-2xl">Specialized academic pathways optimized for student success and career readiness.</p>
              
              <div style={{ maxHeight: 'calc(100vh - 200px)' }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
                {schoolData.programs.map((program, idx) => (
                  <div key={idx} className="bg-white border-2 border-blue-900 rounded-lg p-5 shadow-md">
                    <h3 className="text-base font-bold text-blue-900 mb-2">{program.title}</h3>
                    <p className="text-gray-700 text-xs mb-3 leading-snug">{program.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {program.subjects.map((subject, sidx) => (
                        <span key={sidx} className="px-2 py-0.5 bg-blue-900 text-white rounded text-xs font-medium">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sports Section */}
          {activeSection === 'sports' && (
            <section style={{ minHeight: 'calc(100vh - 70px)' }} className="bg-gradient-to-b from-white to-blue-50 p-6 md:p-12 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-yellow-500" /> Sports & Athletics
                </h2>
                <button 
                  onClick={() => { if(confirm('Sync gallery with imageConfig.js?')) { setSportsGallery(sportsImages); localStorage.removeItem('linda_sports_gallery'); } }}
                  className="p-2 text-blue-300 hover:text-blue-900 transition-colors"
                  title="Sync with Config"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Trophies */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">Victory Cabinet</h3>
                  {schoolData.sports.trophies.map((t, i) => (
                    <div key={i} className="bg-white border-2 border-blue-900 rounded-lg p-3 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{t.icon}</span>
                          <div>
                            <div className="font-bold text-blue-900 text-sm">{t.title}</div>
                            <div className="text-xs text-gray-600">{t.level}</div>
                          </div>
                        </div>
                        <div className="text-sm font-bold text-blue-800 bg-blue-50 px-2 py-1 rounded">{t.year}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Records*/}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">School Records</h3>
                  <div className="bg-white border-2 border-blue-900 rounded-lg shadow-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-blue-900 text-white">
                        <tr>
                          <th className="p-2 text-left text-xs">Event</th>
                          <th className="p-2 text-left text-xs">Record</th>
                          <th className="p-2 text-left text-xs font-semibold">Year</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-100">
                        {schoolData.sports.records.map((r, i) => (
                          <tr key={i} className="hover:bg-blue-50">
                            <td className="p-2 font-semibold text-blue-900 text-xs">{r.event}</td>
                            <td className="p-2 text-blue-700 font-black text-xs">{r.record}</td>
                            <td className="p-2 text-gray-600 text-xs">{r.year}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Org Chart Section */}
          {activeSection === 'orgchart' && (
            <section style={{ minHeight: 'calc(100vh - 70px)' }} className="bg-gradient-to-b from-white to-blue-50 p-6 md:p-12 flex flex-col justify-start pt-8">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Administrative Structure</h2>
              
              <div className="org-capture-area flex-1 border-2 border-blue-900 rounded-lg p-6 overflow-x-auto overflow-y-hidden shadow-md bg-white mb-8">
                <div className="space-y-8 min-w-max">
                  {orgData.rows && orgData.rows.map((row, idx) => (
                    <div key={row.id} className="text-center">
                      <div className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-widest">{row.title}</div>
                      <div className="flex flex-nowrap justify-start gap-1 sm:gap-2 md:justify-center md:gap-3">
                        {row.cards && row.cards.map(card => (
                          <div key={card.id} className="flex flex-col items-center flex-shrink-0">
                            <div className="bg-white border-2 border-blue-900 rounded p-2 w-28 shadow-sm">
                              <img src={card.image} className="w-full h-20 object-cover rounded mb-1" />
                              <div className="text-xs font-bold text-blue-900 line-clamp-2">{card.fullName}</div>
                              <div className="text-xs text-blue-700 line-clamp-1">{card.position}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staff Directory */}
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Staff Directory</h2>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search by name or subject..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-blue-100 rounded-lg focus:border-blue-900 outline-none text-sm"
                  value={staffSearchTerm}
                  onChange={(e) => setStaffSearchTerm(e.target.value)}
                />
              </div>

              <div style={{ maxHeight: 'calc(100vh - 250px)' }} className="overflow-x-auto bg-white border-2 border-blue-900 rounded-lg shadow-md flex-1">
                <table className="w-full text-sm">
                  <thead className="bg-blue-900 text-white sticky top-0">
                    <tr>
                      <th className="p-2 text-left text-xs">Name</th>
                      <th className="p-2 text-left text-xs">Position</th>
                      <th className="p-2 text-left text-xs">Subject</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100 text-xs">
                    {schoolData.staff.filter(m => 
                      m.name.toLowerCase().includes(staffSearchTerm.toLowerCase()) || 
                      m.spec.toLowerCase().includes(staffSearchTerm.toLowerCase())
                    ).map((member, idx) => (
                      <tr key={idx} className="hover:bg-blue-50">
                        <td className="p-2 font-semibold text-blue-900">{member.name}</td>
                        <td className="p-2 text-gray-700">{member.pos}</td>
                        <td className="p-2 text-gray-700">{member.spec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Class Of Section */}
          {activeSection === 'classof' && (
            <section style={{ minHeight: 'calc(100vh - 70px)' }} className="bg-gradient-to-b from-white to-blue-50 p-6 md:p-12 flex flex-col justify-start pt-8">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Past History</h2>
              <p className="text-blue-700 mb-8">Explore the rich history of Linda Secondary School and the remarkable journeys of our former students.</p>

              <div className="bg-white border-2 border-blue-900 rounded-lg p-8 shadow-md">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Historical Images */}
                  <div className="flex-shrink-0 w-full md:w-1/3">
                    <div 
                      className="aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-blue-100 hover:border-blue-900 transition-all cursor-pointer group relative shadow-md"
                      onClick={() => openImageSlideshow([
                        { id: 1, url: '/images/alumini/tony-luo/img-1.jpeg', caption: 'Tony Luo - Former Pupil, Class of 1992' },
                        { id: 2, url: '/images/alumini/tony-luo/img-2.jpg', caption: 'Tony Luo during school days' },
                        { id: 3, url: '/images/alumini/tony-luo/img-3.jpg', caption: 'Tony Luo - Professional Career' }
                      ], 0, 'Tony Luo History')}
                    >
                      <img src="/images/alumini/tony-luo/img-1.jpeg" className="w-full h-full object-cover" alt="Tony Luo" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {[2, 3].map(i => (
                        <div 
                          key={i}
                          className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-blue-100 hover:border-blue-900 transition-all cursor-pointer group relative shadow-sm"
                          onClick={() => openImageSlideshow([
                            { id: 1, url: '/images/alumini/tony-luo/img-1.jpeg', caption: 'Tony Luo - Former Pupil, Class of 1992' },
                            { id: 2, url: '/images/alumini/tony-luo/img-2.jpg', caption: 'Tony Luo during school days' },
                            { id: 3, url: '/images/alumini/tony-luo/img-3.jpg', caption: 'Tony Luo - Professional Career' }
                          ], i - 1, 'Tony Luo History')}
                        >
                          <img src={`/images/alumini/tony-luo/img-${i}.jpg`} className="w-full h-full object-cover" alt={`Tony Luo ${i}`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">Tony Luo — Former Pupil, Class of 1992</h3>
                    <div className="text-sm text-gray-700 space-y-4">
                      <p>Tony Luo attended Linda Secondary School from 1987 to 1992, beginning in Grade 8 Class Z and completing his secondary education in Grade 12 Class C. He credits Linda Secondary School as the foundation of both his character and his career.</p>
                      
                      <p>During his time at the school, Tony held the position of class captain across both junior and senior secondary levels, and was an active member of the Scripture Union, where he played a key role in establishing branches at neighbouring schools. Academically, he excelled particularly in Mathematics, earning consistent top scores under the mentorship of the late Mr. Shumba, Head of the Mathematics Department. He was also recognised for outstanding academic achievement by the school head at the time, Mr. Alisinda.</p>
                      
                      <p>Beyond the classroom, Tony distinguished himself in chess, representing Linda at schoolboy international level through the Stone Castles Chess Club of Zambia Railways. In 1992, he was part of the Linda chess team that won the Harry Mwanga Nkumbula Memorial Cup at St. Canisius Secondary School. He also served as Red Cross President that same year, contributing to district-level humanitarian activities and providing first aid support at Batoka Hospital during a period of significant national transition.</p>
                      
                      <p>Tony went on to build a distinguished career in industry. He currently serves as Regional Customer Experience Manager for Central and East Africa at an international company based in Gothenburg, Sweden, and holds a Level 3 Lubrication Management Consultant certification, with specialist involvement in the mining sector.</p>
                      
                      <p>He attributes the discipline, leadership, and values that have guided his professional journey to the education and experiences he gained at Linda Secondary School.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Alumni Section */}
          {activeSection === 'alumni' && (
            <section style={{ minHeight: 'calc(100vh - 70px)' }} className="bg-gradient-to-b from-white to-blue-50 p-6 md:p-12 flex flex-col justify-start pt-8">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Alumni Testimonials</h2>
              <p className="text-blue-700 mb-8">Hear from our former students who have gone on to achieve great things in their lives and careers.</p>

              <div className="space-y-8">
                {/* Tony Luo Testimonial */}
                <div className="bg-white border-2 border-blue-900 rounded-lg p-6 shadow-md">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-28 h-28 bg-blue-100 rounded-lg overflow-hidden border-2 border-blue-200">
                        <img 
                          src="/images/alumini/tony-luo/img-1.jpeg" 
                          alt="Tony Luo - Former Pupil, Class of 1992"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                        <h3 className="text-xl font-bold text-blue-900">Tony Luo</h3>
                        <span className="text-blue-700 font-medium">Former Pupil, Class of 1992</span>
                      </div>
                      <div className="text-sm text-gray-700 space-y-3">
                        <p>
                          Tony Luo attended Linda Secondary School from 1987 to 1992, beginning in Grade 8 Class Z and completing his secondary education in Grade 12 Class C. He credits Linda Secondary School as the foundation of both his character and his career.
                        </p>
                        <p>
                          During his time at the school, Tony held the position of class captain across both junior and senior secondary levels, and was an active member of the Scripture Union, where he played a key role in establishing branches at neighbouring schools. Academically, he excelled particularly in Mathematics, earning consistent top scores under the mentorship of the late Mr. Shumba, Head of the Mathematics Department. He was also recognised for outstanding academic achievement by the school head at the time, Mr. Alisinda.
                        </p>
                        <p>
                          Beyond the classroom, Tony distinguished himself in chess, representing Linda at schoolboy international level through the Stone Castles Chess Club of Zambia Railways. In 1992, he was part of the Linda chess team that won the Harry Mwanga Nkumbula Memorial Cup at St. Canisius Secondary School. He also served as Red Cross President that same year, contributing to district-level humanitarian activities and providing first aid support at Batoka Hospital during a period of significant national transition.
                        </p>
                        <p>
                          Tony went on to build a distinguished career in industry. He currently serves as Regional Customer Experience Manager for Central and East Africa at an international company based in Gothenburg, Sweden, and holds a Level 3 Lubrication Management Consultant certification, with specialist involvement in the mining sector.
                        </p>
                        <p>
                          He attributes the discipline, leadership, and values that have guided his professional journey to the education and experiences he gained at Linda Secondary School.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Placeholder for additional testimonials */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-dashed border-blue-200 rounded-lg p-6 text-center">
                  <Award className="w-12 h-12 text-blue-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Share Your Story</h3>
                  <p className="text-blue-700 mb-3">
                    Are you a former student of Linda Secondary School? We'd love to hear your story and achievements.
                  </p>
                  <p className="text-xs text-blue-600">
                    Contact us to share your testimonial and be featured here.
                  </p>
                </div>
              </div>

              {/* Alumni Gallery */}
              <div className="mt-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900">Alumni Profiles</h3>
                    <p className="text-blue-700">Success stories and achievements of our former students.</p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAlumniImageUpload}
                      className="hidden"
                      id="alumni-upload"
                    />
                    <label
                      htmlFor="alumni-upload"
                      className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Photo
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {alumniProfiles && alumniProfiles.length > 0 ? alumniProfiles.map((profile) => (
                    <div key={profile.id} className="bg-white border-2 border-blue-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <div
                        className="aspect-video bg-gray-200 cursor-pointer relative overflow-hidden"
                        onClick={() => openAlumniProfileModal(profile.id)}
                      >
                        <img
                          src={profile.photos[0]?.url || '/images/alumini/default.jpg'}
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center">
                          <div className="opacity-0 hover:opacity-100 transition-opacity">
                            <ImageIcon className="w-12 h-12 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-blue-900 mb-1">{profile.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Class of {profile.graduationYear} • {profile.class}
                        </p>
                        <p className="text-sm font-medium text-blue-700 mb-2">
                          {profile.currentPosition}
                        </p>
                        <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                          {profile.shortBio}
                        </p>
                        <button
                          onClick={() => openAlumniProfileModal(profile.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                        >
                          View Full Story <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-500">No alumni profiles available</p>
                    </div>
                  )}
                </div>

                {/* Additional Alumni Photos Gallery */}
                {alumniGallery.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-xl font-bold text-blue-900 mb-4">Community Photos</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {alumniGallery.map((img) => (
                        <div key={img.id} className="relative group">
                          <div
                            className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => openImageSlideshow(alumniGallery, alumniGallery.indexOf(img), 'Alumni Community Gallery')}
                          >
                            <img
                              src={img.url}
                              alt={img.caption}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <ImageIcon className="w-8 h-8 text-white" />
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 flex justify-between items-center">
                            <p className="text-sm text-gray-600 truncate">{img.caption}</p>
                            <button
                              onClick={() => setAlumniGallery(prev => prev.filter(i => i.id !== img.id))}
                              className="text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Contact Section */}
          {activeSection === 'contact' && (
            <section style={{ minHeight: 'calc(100vh - 70px)' }} className="bg-gradient-to-b from-white to-blue-50 p-6 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">Get In Touch</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Contact Cards */}
                <div className="space-y-4">
                  {schoolData.keyContacts.map((contact, idx) => (
                    <div key={idx} className="bg-white border-2 border-blue-900 rounded-lg p-4 shadow-md">
                      <p className="font-bold text-blue-900 text-sm">{contact.name}</p>
                      <p className="text-blue-700 text-xs mb-1">{contact.role}</p>
                      <p className="text-lg font-black text-blue-900">{contact.phone}</p>
                    </div>
                  ))}
                </div>

                {/* Quick Info */}
                <div className="space-y-4">
                  <div className="bg-white border-2 border-blue-900 rounded-lg p-4 shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-blue-900" />
                      <div>
                        <p className="text-xs text-gray-600">Location</p>
                        <p className="font-bold text-blue-900 text-sm">{schoolData.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-blue-900 rounded-lg p-4 shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-5 h-5 text-blue-900" />
                      <div>
                        <p className="text-xs text-gray-600">Office Hours</p>
                        <p className="font-bold text-blue-900 text-sm">Mon-Fri: 7:30 AM - 4:30 PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-900 text-white rounded-lg p-4 text-center">
                    <p className="font-bold mb-1">Website</p>
                    <p className="text-sm">{schoolData.website}</p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Facility Detail Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedFacility(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-blue-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{selectedFacility.icon}</div>
                  <h2 className="text-2xl font-bold text-blue-900">{selectedFacility.name}</h2>
                </div>
                <button onClick={() => setSelectedFacility(null)} className="text-2xl font-bold text-gray-500 hover:text-blue-900">✕</button>
              </div>
              {selectedFacility.image && (
                <div className="mb-4 rounded-lg overflow-hidden border-2 border-blue-100 h-60">
                  <img src={selectedFacility.image} alt={selectedFacility.name} className="w-full h-full object-cover" />
                </div>
              )}
              <p className="text-gray-700 text-sm leading-relaxed mb-6">{selectedFacility.fullDescription}</p>
              <button onClick={() => setSelectedFacility(null)} className="px-6 py-2 bg-blue-900 hover:bg-primary-600 text-white rounded-lg font-medium text-sm">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Alumni Profile Modal */}
      {alumniProfileModal.isOpen && alumniProfileModal.profile && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={closeAlumniProfileModal}
        >
          <div
            className="relative max-w-7xl w-full max-h-[95vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side - Photo Gallery */}
            <div className="w-1/2 bg-gray-100 flex flex-col">
              {/* Photo Display */}
              <div className="flex-1 relative overflow-hidden">
                <img
                  src={alumniProfileModal.profile.photos[alumniProfileModal.currentPhotoIndex]?.url}
                  alt={alumniProfileModal.profile.photos[alumniProfileModal.currentPhotoIndex]?.caption}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                {alumniProfileModal.profile.photos.length > 1 && (
                  <>
                    <button
                      onClick={prevAlumniPhoto}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-300 text-4xl font-bold p-4 bg-black/30 hover:bg-black/50 rounded-full transition-all opacity-70 hover:opacity-100"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextAlumniPhoto}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-300 text-4xl font-bold p-4 bg-black/30 hover:bg-black/50 rounded-full transition-all opacity-70 hover:opacity-100"
                    >
                      ›
                    </button>
                  </>
                )}

                {/* Photo Counter */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {alumniProfileModal.currentPhotoIndex + 1} of {alumniProfileModal.profile.photos.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {alumniProfileModal.profile.photos.length > 1 && (
                <div className="p-4 bg-white border-t">
                  <div className="flex justify-center gap-2 overflow-x-auto max-w-full">
                    {alumniProfileModal.profile.photos.map((photo, index) => (
                      <button
                        key={photo.id}
                        onClick={() => setAlumniProfileModal(prev => ({ ...prev, currentPhotoIndex: index }))}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg border-3 overflow-hidden transition-all ${
                          index === alumniProfileModal.currentPhotoIndex
                            ? 'border-blue-500 shadow-lg scale-110'
                            : 'border-gray-300 hover:border-blue-300 hover:scale-105'
                        }`}
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Profile Information */}
            <div className="w-1/2 flex flex-col max-h-[95vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-6 bg-blue-900 text-white">
                <div>
                  <h2 className="text-2xl font-bold">{alumniProfileModal.profile.name}</h2>
                  <p className="text-blue-100">
                    Class of {alumniProfileModal.profile.graduationYear} • {alumniProfileModal.profile.class}
                  </p>
                </div>
                <button
                  onClick={closeAlumniProfileModal}
                  className="text-white hover:text-red-300 text-3xl font-bold transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Profile Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Current Position */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Current Position</h3>
                  <p className="text-gray-800 font-medium">{alumniProfileModal.profile.currentPosition}</p>
                  <p className="text-gray-600">{alumniProfileModal.profile.company}</p>
                </div>

                {/* Photo Caption */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Current Photo</h3>
                  <p className="text-gray-700 italic">
                    {alumniProfileModal.profile.photos[alumniProfileModal.currentPhotoIndex]?.caption}
                  </p>
                </div>

                {/* Story */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-blue-900">Story</h3>
                    <button
                      onClick={toggleFullStory}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                    >
                      {alumniProfileModal.showFullStory ? 'Show Less' : 'Read More'}
                    </button>
                  </div>
                  <div className="text-gray-700 leading-relaxed">
                    {alumniProfileModal.showFullStory ? (
                      <div className="space-y-4">
                        {alumniProfileModal.profile.fullStory.split('\n\n').map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    ) : (
                      <p>{alumniProfileModal.profile.shortBio}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Slideshow Modal */}
      {imageSlideshow.isOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={closeImageSlideshow}
        >
          <div
            className="relative max-w-6xl w-full max-h-[95vh] flex flex-col bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-black/30 backdrop-blur-sm">
              <h3 className="text-white text-2xl font-bold">{imageSlideshow.title}</h3>
              <button
                onClick={closeImageSlideshow}
                className="text-white hover:text-red-400 text-3xl font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="relative">
                <img
                  src={imageSlideshow.images[imageSlideshow.currentIndex]?.url}
                  alt={imageSlideshow.images[imageSlideshow.currentIndex]?.caption}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl transition-transform duration-300"
                />
                {/* Navigation Arrows Overlay */}
                {imageSlideshow.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-300 text-4xl font-bold p-4 bg-black/30 hover:bg-black/50 rounded-full transition-all opacity-70 hover:opacity-100"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-300 text-4xl font-bold p-4 bg-black/30 hover:bg-black/50 rounded-full transition-all opacity-70 hover:opacity-100"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Navigation and Caption */}
            <div className="flex items-center justify-between p-6 bg-black/30 backdrop-blur-sm">
              <div className="text-center flex-1">
                <p className="text-white text-lg font-medium mb-2">
                  {imageSlideshow.images[imageSlideshow.currentIndex]?.caption}
                </p>
                <p className="text-white/70 text-sm">
                  {imageSlideshow.currentIndex + 1} of {imageSlideshow.images.length}
                </p>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {imageSlideshow.images.length > 1 && (
              <div className="p-6 bg-black/20 backdrop-blur-sm">
                <div className="flex justify-center gap-3 overflow-x-auto max-w-full">
                  {imageSlideshow.images.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => setImageSlideshow(prev => ({ ...prev, currentIndex: index }))}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg border-4 overflow-hidden transition-all ${
                        index === imageSlideshow.currentIndex
                          ? 'border-blue-400 shadow-lg scale-110'
                          : 'border-white/30 hover:border-white/60 hover:scale-105'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Keyboard Help Indicator */}
      <div className="fixed top-6 right-6 text-xs text-gray-500 hidden md:block">
        <div className="bg-white/80 backdrop-blur px-3 py-2 rounded-lg border border-gray-300">
          <div className="font-semibold text-gray-700 mb-1">Keyboard Navigation</div>
          <div>↑↓ Navigate | ← → Cycle</div>
        </div>
      </div>
    </div>
  );
};

export default SchoolOverview;
