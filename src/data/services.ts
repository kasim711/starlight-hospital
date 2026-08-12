import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'general-outpatient',
    title: 'General Outpatient / Medical Consultation',
    shortDesc: 'Medical consultation for everyday health concerns, assessment, and appropriate next steps.',
    heroHeading: 'Medical Consultation for Everyday Healthcare Needs',
    description: 'Starlight Hospital provides general outpatient medical consultations for individuals seeking assessment of health concerns and guidance on appropriate next steps.',
    whatToExpect: 'Consultation is a starting point: the clinician reviews the concern, considers relevant history and symptoms, performs an appropriate assessment, and may recommend further testing, treatment, referral, or follow-up where clinically indicated.',
    whoItIsFor: 'Patients whose symptoms, healthcare needs, or clinical circumstances call for this service. The appropriate course of care depends on individual assessment.',
    beforeYourVisit: [
      'Bring relevant medical information or previous test results where available.',
      'Bring a list of current medicines or treatments where relevant.',
      'For appointments involving tests or procedures, contact the hospital in advance for any preparation instructions.'
    ],
    iconName: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000',
    faqs: [
      {
        question: 'What should I do before coming for a medical consultation?',
        answer: 'Bring any previous medical records, a list of current medications, and a short summary of when your symptoms started.'
      },
      {
        question: 'Do I need an appointment for general outpatient care?',
        answer: 'Walk-ins are welcomed, but booking an appointment request in advance helps our team prepare for your visit.'
      }
    ]
  },
  {
    id: 'obstetrics-gynaecology',
    title: 'Obstetrics & Gynaecology',
    shortDesc: 'Care and consultation relating to pregnancy, women’s health, and gynaecological concerns.',
    heroHeading: 'Women’s Health and Obstetrics & Gynaecology Care',
    description: 'Our Obstetrics & Gynaecology service supports women seeking consultation and care for pregnancy-related and gynaecological health concerns.',
    whatToExpect: 'Patients should contact the hospital for an appointment and explain the reason for the visit so the appropriate consultation can be arranged.',
    whoItIsFor: 'Patients whose symptoms, healthcare needs, or clinical circumstances call for this service. The appropriate course of care depends on individual assessment.',
    beforeYourVisit: [
      'Bring relevant medical information or previous results where available.',
      'Bring a list of current medicines or treatments where relevant.',
      'For appointments involving tests or procedures, contact the hospital in advance for any preparation instructions.'
    ],
    iconName: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=1000',
    faqs: [
      {
        question: 'What women’s health services are provided?',
        answer: 'We provide consultation for general gynaecological health, routine wellness, and maternal/antenatal consultation for pregnancy.'
      }
    ]
  },
  {
    id: 'paediatrics',
    title: 'Paediatrics',
    shortDesc: 'Healthcare support for children, including assessment of common childhood concerns and follow-up care.',
    heroHeading: 'Healthcare for Children and Young Patients',
    description: 'Our paediatric service provides healthcare assessment and support for children and young patients.',
    whatToExpect: 'Parents and caregivers can contact Starlight Hospital to discuss the child’s concern and arrange an appropriate consultation.',
    whoItIsFor: 'Patients whose symptoms, healthcare needs, or clinical circumstances call for this service. The appropriate course of care depends on individual assessment.',
    beforeYourVisit: [
      'Bring relevant medical information or previous results where available.',
      'Bring a list of current medicines or treatments where relevant.',
      'For appointments involving tests or procedures, contact the hospital in advance for any preparation instructions.'
    ],
    iconName: 'Baby',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000',
    faqs: [
      {
        question: 'What should parents bring to a paediatric visit?',
        answer: 'Please bring the child’s immunisation record, medical history notes, and details of any ongoing medication.'
      }
    ]
  },
  {
    id: 'surgery',
    title: 'Surgery',
    shortDesc: 'Surgical consultation, evaluation, and care pathways where clinically appropriate.',
    heroHeading: 'Surgical Consultation and Care Pathways',
    description: 'Starlight Hospital provides surgical services for patients who require surgical assessment and care where clinically appropriate.',
    whatToExpect: 'A surgical pathway may begin with consultation and assessment, followed by investigations, treatment planning, the appropriate procedure where indicated, and follow-up.',
    whoItIsFor: 'Patients whose symptoms, healthcare needs, or clinical circumstances call for this service. The appropriate course of care depends on individual assessment.',
    beforeYourVisit: [
      'Bring relevant medical information or previous results where available.',
      'Bring a list of current medicines or treatments where relevant.',
      'For appointments involving tests or procedures, contact the hospital in advance for any preparation instructions.'
    ],
    iconName: 'Activity',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000',
    faqs: [
      {
        question: 'How is a surgical procedure planned?',
        answer: 'Surgical pathways begin with a thorough clinical assessment, pre-operative evaluation, and clear patient guidance.'
      }
    ]
  },
  {
    id: 'health-education-counseling',
    title: 'Health Education & Counseling',
    shortDesc: 'Practical health information, counselling, and guidance to support healthier decisions.',
    heroHeading: 'Helping Patients Understand and Manage Their Health',
    description: 'Health education and counselling services provide practical information and support designed to help individuals make informed health decisions.',
    whatToExpect: 'Content and counselling may cover general health awareness, prevention, healthy living, and understanding health information.',
    whoItIsFor: 'Patients whose symptoms, healthcare needs, or clinical circumstances call for this service. The appropriate course of care depends on individual assessment.',
    beforeYourVisit: [
      'Bring relevant medical information or previous results where available.',
      'Bring a list of current medicines or treatments where relevant.',
      'For appointments involving tests or procedures, contact the hospital in advance for any preparation instructions.'
    ],
    iconName: 'BookOpenCheck',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000',
    faqs: [
      {
        question: 'Who can benefit from health education & counselling?',
        answer: 'Individuals, parents, and caregivers seeking clear, practical understanding regarding preventive health and lifestyle management.'
      }
    ]
  },
  {
    id: 'laboratory-diagnostic',
    title: 'Laboratory / Diagnostic Services',
    shortDesc: 'Laboratory and diagnostic support to help clinicians assess and manage patient concerns.',
    heroHeading: 'Laboratory and Diagnostic Support',
    description: 'Laboratory and diagnostic services support clinicians in investigating and understanding patient health concerns.',
    whatToExpect: 'Patients should follow the hospital’s instructions for preparation, sample collection, testing, and result collection where applicable.',
    whoItIsFor: 'Patients whose symptoms, healthcare needs, or clinical circumstances call for this service. The appropriate course of care depends on individual assessment.',
    beforeYourVisit: [
      'Bring relevant medical information or previous results where available.',
      'Bring a list of current medicines or treatments where relevant.',
      'For appointments involving tests or procedures, contact the hospital in advance for any preparation instructions.'
    ],
    iconName: 'Microscope',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1000',
    faqs: [
      {
        question: 'Are there fasting requirements for lab tests?',
        answer: 'Some tests require fasting. Please contact the hospital ahead of your visit for specific test preparation instructions.'
      }
    ]
  }
];
