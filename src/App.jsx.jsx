import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, MapPin, Users, BookOpen, Trophy, Star, Clock, Phone, Mail, Building2, AlertCircle, RefreshCw, ArrowRight, FlaskConical, GraduationCap, Award, Camera, Plus, Trash2, Copy, Download, Upload, Printer, Search, Image as ImageIcon } from 'lucide-react';

const PLACEHOLDER_IMG = 'https://placehold.co/90x110/e8e8e8/666666?text=Staff+Photo';

const INITIAL_STAFF_DATA = {
  head: [{ fullName: 'KALUSA A.', position: 'HEAD TEACHER' }],
  deputy: [{ fullName: 'MUNTANGA B.', position: 'DEPUTY H. TEACHER' }],
  hods: [
    { fullName: 'KAGO N. G.', position: 'HOD MATHEMATICS & ICT' },
    { fullName: 'KANGAI B.', position: 'HOD LITERATURE & LANGUAGES' },
    { fullName: 'MUKUBESA D. N.', position: 'HOD NATURAL SCIENCES' },
    { fullName: 'MULINGA R. O.', position: 'HOD SOCIAL SCIENCES' },
    { fullName: 'CHIKUSU R.', position: 'HOD BUSINESS & FINANCE' },
    { fullName: 'SYAMWENYA B.', position: 'HOD PRACTICAL' },
    { fullName: 'NJEKWA S. M.', position: 'HOD EXPRESSIVE ARTS' }
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

const SchoolOverview = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const fileInputRef = useRef(null);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [staffSearchTerm, setStaffSearchTerm] = useState('');
  const [dailyQuote, setDailyQuote] = useState({ text: 'Linda for Life Long Education', author: 'School Motto' });

  // Org Chart State
  const [orgData, setOrgData] = useState({ rows: [] });
  const [activePhotoUpload, setActivePhotoUpload] = useState(null);
  const [showOrgControls, setShowOrgControls] = useState(false);
  const [sportsGallery, setSportsGallery] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800', caption: 'Football Finals 2024' },
    { id: 2, url: 'https://images.unsplash.com/photo-1526676023131-d352423b0694?q=80&w=800', caption: 'Inter-School Athletics' }
  ]);

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
    rows.push({ id: 1, level: 1, title: 'HEAD TEACHER', cards: INITIAL_STAFF_DATA.head.map(s => ({ id: Math.random(), fullName: s.fullName, position: s.position, image: PLACEHOLDER_IMG })) });
    rows.push({ id: 2, level: 2, title: 'DEPUTY HEAD TEACHER', cards: INITIAL_STAFF_DATA.deputy.map(s => ({ id: Math.random(), fullName: s.fullName, position: s.position, image: PLACEHOLDER_IMG })) });
    
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
      image: PLACEHOLDER_IMG,
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
      // Removed duplicate MUTALE I.
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
      { name: 'Mr. Kamwi Siyauya', role: 'Mathematics Teacher', phone: '0979983682' },
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
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary-500 text-lg font-medium">Loading school overview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-white text-gray-900">
      {/* Navigation Bar */}
      <nav className="border-b-2 border-primary-500 backdrop-blur-sm sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center font-bold text-white">
                LS
              </div>
              <div>
                <h1 className="text-xl font-black text-primary-500">
                  Linda Secondary
                </h1>
                <p className="text-xs text-primary-700">School Overview</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-1">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'about', label: 'About' },
                { id: 'facilities', label: 'Facilities' },
                { id: 'programs', label: 'Programs' },
                { id: 'sports', label: 'Sports' },
                { id: 'staff', label: 'Staff' },
                { id: 'orgchart', label: 'Org Chart' },
                { id: 'contact', label: 'Contact' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeSection === item.id
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:bg-primary-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-accent-50 rounded-lg text-primary-500"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t-2 border-primary-100 pt-4">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'about', label: 'About' },
                { id: 'facilities', label: 'Facilities' },
                { id: 'programs', label: 'Programs' },
                { id: 'sports', label: 'Sports' },
                { id: 'staff', label: 'Staff' },
                { id: 'orgchart', label: 'Org Chart' },
                { id: 'contact', label: 'Contact' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeSection === item.id
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:bg-primary-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      {activeSection === 'overview' && (
        <div className="relative h-96 bg-gradient-to-r from-primary-500 to-primary-600 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_25%,rgba(68,68,68,.2)_50%,transparent_50%,transparent_75%,rgba(68,68,68,.2)_75%,rgba(68,68,68,.2))] bg-[length:40px_40px]"></div>
          </div>
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div>
              <h1 className="text-5xl font-black mb-4 text-white drop-shadow-lg">{schoolData.name}</h1>
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="bg-black/20 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <p className="text-accent-50 text-lg italic">"{dailyQuote.text}"</p>
                  <p className="text-accent-300 text-sm font-bold mt-2">— {dailyQuote.author}</p>
                </div>
                <p className="text-xl text-accent-50 flex items-center justify-center gap-2 drop-shadow-lg">
                  <MapPin className="w-5 h-5" />
                  {schoolData.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-12">
            {/* About Intro */}
            <div className="bg-white border-2 border-primary-500 rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-primary-500 mb-4">Welcome to Linda Secondary School</h2>
              <p className="text-primary-700 font-bold italic mb-4">"{schoolData.motto}"</p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {schoolData.overview}
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
                  Learn More
                </button>
                <button className="px-6 py-2 bg-primary-100 hover:bg-primary-200 text-primary-500 rounded-lg font-medium transition-colors">
                  Contact Us
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div>
              <h2 className="text-3xl font-bold text-primary-500 mb-6">By The Numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {schoolData.stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white border-2 border-primary-500 rounded-xl p-6 text-center hover:shadow-lg transition-all"
                    >
                      <Icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-primary-500 mb-2">{stat.value}</div>
                      <div className="text-gray-700 text-sm">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-3xl font-bold text-primary-500 mb-6">Why Choose Us?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {schoolData.highlights.map((highlight, idx) => (
                  <div key={idx} className="bg-white border-2 border-primary-500 rounded-xl p-6 flex items-center gap-4">
                    <Star className="w-6 h-6 text-primary-500 flex-shrink-0" />
                    <p className="text-gray-800">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <div className="space-y-8">
            <div className="bg-white border-2 border-primary-500 rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-primary-500 mb-6">Our Vision & Mission</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-primary-500 mb-4">Vision</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {schoolData.vision}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-500 mb-4">Mission</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {schoolData.mission}
                  </p>
                </div>
              </div>

              <div className="border-t-2 border-primary-100 pt-8">
                <h3 className="text-2xl font-bold text-primary-500 mb-6">School Management Committee</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {schoolData.management.map((leader, idx) => (
                    <div key={idx} className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                      <p className="text-primary-500 font-bold">{leader.name}</p>
                      <p className="text-primary-700 text-sm">{leader.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Facilities Section */}
        {activeSection === 'facilities' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-primary-500 mb-6">Our Facilities</h2>
              <p className="text-gray-700 text-lg mb-8">
                Click on any facility to learn more about it
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schoolData.facilities.map((facility, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (facility.name === 'Sports Grounds') setActiveSection('sports');
                      else setSelectedFacility(facility);
                    }}
                    className="bg-white border-2 border-primary-500 rounded-xl p-6 hover:shadow-xl hover:bg-primary-50 transition-all text-left cursor-pointer active:scale-95"
                  >
                    <div className="text-4xl mb-4">{facility.icon}</div>
                    <h3 className="text-xl font-bold text-primary-500 mb-2">{facility.name}</h3>
                    <p className="text-gray-700 mb-4">{facility.description}</p>
                    <div className="flex items-center gap-2 text-primary-500 font-semibold">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Staff Section */}
        {activeSection === 'staff' && (
          <div className="space-y-8">
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-primary-500">Staff Directory</h2>
                  <p className="text-gray-700">Educators and administrators specializing in diverse fields.</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Search by name or subject..."
                    className="pl-10 pr-4 py-2 border-2 border-primary-100 rounded-xl focus:border-primary-500 outline-none w-full md:w-80"
                    value={staffSearchTerm}
                    onChange={(e) => setStaffSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto bg-white border-2 border-primary-500 rounded-xl shadow-lg">
                <table className="w-full text-left">
                  <thead className="bg-primary-500 text-white">
                    <tr>
                      <th className="p-4">Full Name</th>
                      <th className="p-4">Substantive Position</th>
                      <th className="p-4">Subject Specialization</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary-100">
                    {schoolData.staff.filter(m => 
                      m.name.toLowerCase().includes(staffSearchTerm.toLowerCase()) || 
                      m.spec.toLowerCase().includes(staffSearchTerm.toLowerCase())
                    ).map((member, idx) => (
                      <tr key={idx} className="hover:bg-primary-50 transition-colors">
                        <td className="p-4 font-bold text-primary-500">{member.name}</td>
                        <td className="p-4 text-gray-700">{member.pos}</td>
                        <td className="p-4 text-gray-700">{member.spec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Org Chart Section */}
        {activeSection === 'orgchart' && (
          <div className="space-y-8">
            <style>
              {`
                @media print {
                  @page {
                    size: landscape;
                    margin: 5mm;
                  }
                  body {
                    margin: 0;
                    -webkit-print-color-adjust: exact;
                  }
                  .no-print {
                    display: none !important;
                  }
                  .org-capture-area {
                    width: 100% !important;
                    box-shadow: none !important;
                    border: none !important;
                    padding: 0 !important;
                    margin: 0 !important;
                  }
                }
              `}
            </style>
            <div className="no-print flex justify-end -mb-6 relative z-50">
              <button 
                onClick={() => setShowOrgControls(!showOrgControls)}
                className="p-1 text-gray-300 hover:text-primary-500 transition-colors"
                title={showOrgControls ? "Hide Admin Controls" : "Show Admin Controls"}
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${showOrgControls ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {showOrgControls && (
              <div className="no-print bg-white border-2 border-primary-500 rounded-xl p-4 shadow-lg flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-2">
                  <button onClick={handleAddTeacherRow} className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Row
                  </button>
                  <button onClick={exportOrgData} className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm flex items-center gap-2">
                    <Download className="w-4 h-4" /> Save
                  </button>
                  <button onClick={() => setImportModalOpen(true)} className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Load
                  </button>
                  <button onClick={() => window.print()} className="px-4 py-2 bg-primary-700 text-white rounded-lg text-sm flex items-center gap-2">
                    <Printer className="w-4 h-4" /> Print A4
                  </button>
                  <button onClick={() => { if(confirm('⚠️ Reset chart to default data?')) initializeOrgChart(); }} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> Reset
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-xs text-gray-500 italic">Click photos to upload • Click text to edit</div>
                  <div className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold shadow-sm">Auto-saved</div>
                </div>
              </div>
            )}

            <div className="org-capture-area shadow-2xl rounded-xl border-primary-500 overflow-x-auto">
              <div className="chart-header mb-8 border-b-2 border-gray-800 pb-4">
                <div className="absolute top-4 left-4 w-16 h-16 bg-gray-100 border flex items-center justify-center text-[10px] text-gray-400">LOGO</div>
                <div className="absolute top-4 right-4 w-16 h-16 bg-gray-100 border flex items-center justify-center text-[10px] text-gray-400">ARMS</div>
                <h1 className="text-2xl font-black text-gray-900 uppercase tracking-widest">Administration Structure</h1>
                <h2 className="text-lg font-bold text-gray-700">LINDA SECONDARY SCHOOL</h2>
              </div>

              <div className="space-y-12 py-4">
                {orgData.rows.map((row, idx) => (
                  <div key={row.id} className="relative">
                    {/* Connector line between rows */}
                    {idx < orgData.rows.length - 1 && (
                      <div className="absolute left-1/2 -bottom-12 w-px h-12 bg-gray-300 -translate-x-1/2 hidden md:block z-0"></div>
                    )}
                    
                    <div className={`org-row level-${row.level} relative z-10 flex flex-nowrap justify-center gap-2 md:gap-4`}>
                    <div className="org-row-title">{row.title}</div>
                    {row.cards.map(card => (
                      <div key={card.id} className="flex flex-col items-center">
                        <div className="org-card group">
                        <div className="bg-white p-2 rounded shadow-sm border border-gray-200">
                          <div className="org-photo-box" onClick={() => { setActivePhotoUpload({ rowId: row.id, cardId: card.id }); fileInputRef.current.click(); }}>
                            <img src={card.image} className="w-full h-full object-cover" />
                            <div className="overlay"><Camera className="w-4 h-4" /></div>
                          </div>
                          <input 
                            className="org-input-name" 
                            value={card.fullName} 
                            onChange={(e) => handleUpdateCard(row.id, card.id, 'fullName', e.target.value)}
                          />
                          <input 
                            className="org-input-title" 
                            value={card.position} 
                            onChange={(e) => handleUpdateCard(row.id, card.id, 'position', e.target.value)}
                          />
                        </div>
                      </div>
                        
                        {row.level === 3 && card.subordinates && card.subordinates.length > 0 && (
                          <div className="flex flex-col items-center w-full mt-1">
                            <div className="w-px h-4 bg-gray-300"></div>
                            <div className="bg-white border border-gray-200 rounded-md p-2 text-[9px] w-full min-w-[140px] shadow-sm">
                              <div className="font-bold text-primary-500 border-b border-gray-100 mb-1 pb-1 flex items-center justify-between">
                                <span>STAFF</span>
                                <Users className="w-2 h-2 text-primary-300" />
                              </div>
                              <div className="space-y-0.5">
                                {card.subordinates.map((name, i) => (
                                  <div key={i} className="text-gray-600 text-left truncate py-0.5 border-b border-gray-50 last:border-0">{name}</div>
                                ))}
                              </div>
                            </div>
                        </div>
                        )}
                      </div>
                    ))}
                  </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-[10px] text-gray-400 italic text-right">Linda Secondary School Administration Chart</div>
            </div>
          </div>
        )}

        {/* Hidden inputs and Modals */}
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        
        {importModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-bold mb-4">Import Chart Data</h3>
              <textarea 
                className="w-full h-40 p-2 border rounded-lg text-sm font-mono mb-4" 
                placeholder="Paste JSON here..."
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setImportModalOpen(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                <button onClick={doImport} className="px-4 py-2 bg-primary-500 text-white rounded-lg">Import</button>
              </div>
            </div>
          </div>
        )}

        {/* Programs Section */}
        {activeSection === 'programs' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-primary-500 mb-2">Form 1 - 4 Subject Pathways</h2>
              <p className="text-gray-700 text-lg mb-8">
                Linda Secondary School: Specialized academic pathways optimized for student success and career readiness.
              </p>
              
              <div className="space-y-6">
                {schoolData.programs.map((program, idx) => (
                  <div key={idx} className="bg-white border-2 border-primary-500 rounded-xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold text-primary-500 mb-2">{program.title}</h3>
                    <p className="text-gray-700 mb-4">{program.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {program.subjects.map((subject, sidx) => (
                        <span
                          key={sidx}
                          className="px-3 py-1 bg-primary-500 text-white rounded-full text-sm font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sports Section */}
        {activeSection === 'sports' && (
          <div className="space-y-12">
            <div className="bg-primary-500 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Trophy className="w-64 h-64 rotate-12" />
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl font-black mb-4 flex items-center gap-4">
                  <Trophy className="w-10 h-10 text-yellow-400" />
                  Sports & Athletics
                </h2>
                <p className="text-xl text-accent-50 max-w-2xl leading-relaxed">
                  {schoolData.sports.history}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Victory Cabinet */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-primary-500 flex items-center gap-2">
                  <Award className="w-6 h-6" /> Victory Cabinet
                </h3>
                <div className="grid gap-4">
                  {schoolData.sports.trophies.map((t, i) => (
                    <div key={i} className="bg-white border-2 border-primary-500 rounded-xl p-4 flex items-center justify-between shadow-sm hover:translate-x-2 transition-transform">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{t.icon}</span>
                        <div>
                          <div className="font-black text-primary-500 uppercase">{t.title}</div>
                          <div className="text-sm text-gray-500">{t.level} Level</div>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">{t.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hall of Fame / Records */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-primary-500 flex items-center gap-2">
                  <Star className="w-6 h-6" /> School Records
                </h3>
                <div className="bg-white border-2 border-primary-500 rounded-xl overflow-hidden shadow-lg">
                  <table className="w-full">
                    <thead className="bg-primary-500 text-white">
                      <tr>
                        <th className="p-3 text-left">Event</th>
                        <th className="p-3 text-left">Record</th>
                        <th className="p-3 text-left">Holder</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary-100">
                      {schoolData.sports.records.map((r, i) => (
                        <tr key={i} className="hover:bg-primary-50">
                          <td className="p-3 font-bold text-primary-500">{r.event}</td>
                          <td className="p-3 text-primary-700 font-black">{r.record}</td>
                          <td className="p-3 text-gray-600">{r.holder} ({r.year})</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-primary-500 flex items-center gap-2">
                  <ImageIcon className="w-6 h-6" /> Sports Gallery
                </h3>
                <button 
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = handleSportsImageUpload;
                    input.click();
                  }}
                  className="no-print flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-bold hover:bg-primary-600 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Moment
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {sportsGallery.map((img) => (
                  <div key={img.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-primary-100 hover:border-primary-500 transition-all">
                    <img src={img.url} className="w-full h-full object-cover" alt={img.caption} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <p className="text-white text-[10px] font-medium leading-tight">{img.caption}</p>
                      <button 
                        onClick={() => setSportsGallery(prev => prev.filter(i => i.id !== img.id))}
                        className="mt-2 p-1 bg-red-600 text-white rounded self-end"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-primary-500 mb-8">Get In Touch</h2>
                
                {schoolData.keyContacts.map((contact, idx) => (
                  <div key={idx} className="bg-white border-2 border-primary-500 rounded-xl p-6 shadow-lg hover:bg-primary-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-primary-500">{contact.name}</p>
                        <p className="text-sm text-primary-700">{contact.role}</p>
                        <p className="text-lg font-black text-primary-500">{contact.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-white border-2 border-primary-500 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <Clock className="w-6 h-6 text-primary-500" />
                    <div>
                      <p className="text-gray-600 text-sm">Office Hours</p>
                      <p className="text-primary-500 font-medium">Monday - Friday: 7:30 AM - 4:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white border-2 border-primary-500 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-primary-500 mb-6">Send us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-500 mb-2">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-2 bg-primary-50 border-2 border-primary-100 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-500 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 bg-primary-50 border-2 border-primary-100 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-500 mb-2">Message</label>
                    <textarea
                      placeholder="Your message"
                      rows="4"
                      className="w-full px-4 py-2 bg-primary-50 border-2 border-primary-100 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Facility Detail Modal */}
      {selectedFacility && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFacility(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-primary-500 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{selectedFacility.icon}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-primary-500">{selectedFacility.name}</h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="text-gray-500 hover:text-primary-500 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>

              {selectedFacility.image && (
                <div className="mb-6 rounded-xl overflow-hidden border-2 border-primary-100 shadow-inner h-64">
                  <img src={selectedFacility.image} alt={selectedFacility.name} className="w-full h-full object-cover" />
                </div>
              )}

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {selectedFacility.fullDescription}
              </p>

              <div className="border-t-2 border-primary-100 pt-6">
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t-2 border-primary-500 bg-primary-500 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="mb-2">&copy; 2024 Linda Secondary School. All rights reserved.</p>
            <p className="text-sm">{schoolData.location} | {schoolData.website}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SchoolOverview;

