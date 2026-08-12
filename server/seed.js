import db, { initDb } from './db.js';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Initializing SQLite database schema...');
  await initDb();

  console.log('Seeding production baseline data...');

  // 1. Seed Multi-Role Staff Accounts
  const staff = [
    { name: 'Starlight Super Admin', email: 'admin@starlight.com', role: 'Super Admin' },
    { name: 'Senior Clinical Editor', email: 'editor@starlight.com', role: 'Editor' },
    { name: 'Medical Content Author', email: 'author@starlight.com', role: 'Author' },
    { name: 'Patient Enquiry Officer', email: 'enquiry@starlight.com', role: 'Enquiry Manager' }
  ];

  const defaultPasswordHash = await bcrypt.hash('password123', 10);
  for (const user of staff) {
    const existing = await db.get('SELECT id FROM users WHERE email = ?', [user.email]);
    if (!existing) {
      await db.run(
        'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [user.name, user.email, defaultPasswordHash, user.role]
      );
    }
  }
  console.log('Staff accounts created (admin@starlight.com, editor@starlight.com, author@starlight.com, enquiry@starlight.com).');

  const mainAdmin = await db.get('SELECT id FROM users WHERE email = ?', ['admin@starlight.com']);

  // 2. Seed 8 Categories
  const categories = [
    { name: 'General Health', slug: 'general-health' },
    { name: "Women's Health", slug: 'womens-health' },
    { name: 'Pregnancy & Maternal Health', slug: 'pregnancy-maternal-health' },
    { name: 'Child Health', slug: 'child-health' },
    { name: 'Surgery & Recovery', slug: 'surgery-recovery' },
    { name: 'Laboratory / Diagnostics', slug: 'laboratory-diagnostics' },
    { name: 'Preventive Health', slug: 'preventive-health' },
    { name: 'Hospital News & Announcements', slug: 'hospital-news' }
  ];

  const catMap = {};
  for (const cat of categories) {
    let existing = await db.get('SELECT id FROM categories WHERE slug = ?', [cat.slug]);
    if (!existing) {
      const res = await db.run('INSERT INTO categories (name, slug) VALUES (?, ?)', [cat.name, cat.slug]);
      catMap[cat.name] = res.lastID;
    } else {
      catMap[cat.name] = existing.id;
    }
  }
  console.log('8 Specification categories seeded.');

  // 3. Seed 6 Launch Health Articles (Linked via category_id & author_id)
  const articlesCount = await db.get('SELECT count(*) as count FROM articles');
  if (articlesCount.count === 0) {
    const articles = [
      {
        title: 'When Should You See a Doctor for a Persistent Health Concern?',
        slug: 'when-should-you-see-a-doctor-persistent-health-concern',
        excerpt: 'Understanding when everyday symptoms require clinical assessment is key to early diagnosis and effective healthcare management.',
        content: `
<h2>Understanding Your Body's Warning Signals</h2>
<p>Many common health concerns resolve naturally with rest and basic care. However, persistent symptoms often serve as important indicators that a professional medical evaluation is recommended.</p>

<h3>Key Signs It Is Time to Consult a Doctor</h3>
<p>At Starlight Hospital, we advise individuals and families to seek medical consultation if they experience any of the following:</p>
<ul>
  <li><strong>Symptoms lasting longer than usual:</strong> Fever, cough, or stomach discomfort that does not improve after a few days.</li>
  <li><strong>Unexplained fatigue or weight changes:</strong> Sudden shifts in energy levels or weight without changes in diet or physical activity.</li>
  <li><strong>Persistent or localized pain:</strong> Discomfort in the abdomen, chest, joints, or head that recurs or worsens over time.</li>
  <li><strong>Changes in skin or bodily functions:</strong> New lumps, unusual skin changes, or alterations in digestion.</li>
</ul>

<h3>Why Early Consultation Matters</h3>
<p>Seeking early clinical advice allows healthcare professionals to evaluate symptoms thoroughly, order necessary laboratory or diagnostic tests, and establish an appropriate care plan before minor issues develop into complex health conditions.</p>

<p><em>Medical Disclaimer: The health information published on this website is provided for general educational purposes and is not a substitute for an examination, diagnosis, or personalised medical advice from a qualified healthcare professional.</em></p>
        `,
        categoryName: 'General Health',
        featured_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
        image_alt: 'Doctor consulting with a patient at Starlight Hospital',
        status: 'Published',
        medical_review_status: 'Reviewed',
        published_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        reading_time: 4
      },
      {
        title: 'Questions to Ask During a Medical Consultation',
        slug: 'questions-to-ask-during-a-medical-consultation',
        excerpt: 'Maximize the value of your outpatient visit by preparing clear questions about your symptoms, diagnosis, and recommended treatments.',
        content: `
<h2>Making the Most of Your Consultation</h2>
<p>A medical consultation is a collaborative conversation between you and your healthcare practitioner. Being prepared helps ensure all your concerns are addressed clearly and thoroughly.</p>

<h3>Recommended Questions for Your Visit</h3>
<ol>
  <li><strong>About your diagnosis:</strong> What is the likely cause of my symptoms, and are further diagnostic tests needed?</li>
  <li><strong>About your treatment plan:</strong> What are the recommended next steps, and how will this treatment help?</li>
  <li><strong>About medications:</strong> How should I take this medication, and are there any specific instructions or side effects to watch for?</li>
  <li><strong>About follow-up:</strong> When should I return for a follow-up assessment, or what signs indicate I should contact the hospital earlier?</li>
</ol>

<h3>What to Bring to Your Visit</h3>
<p>To assist your clinician, please bring any previous lab results, a list of current medications, and notes detailing when your symptoms started.</p>
        `,
        categoryName: 'General Health',
        featured_image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
        image_alt: 'Patient taking notes during medical consultation',
        status: 'Published',
        medical_review_status: 'Reviewed',
        published_at: new Date(Date.now() - 86400000 * 4).toISOString(),
        reading_time: 5
      },
      {
        title: 'Practical Health Tips for Parents of Young Children',
        slug: 'practical-health-tips-for-parents-of-young-children',
        excerpt: 'Essential advice for safeguarding child health, managing common childhood illnesses, and knowing when to visit the paediatrician.',
        content: `
<h2>Supporting Healthy Child Development</h2>
<p>Children's health needs evolve rapidly as they grow. Providing routine wellness checks, balanced nutrition, and safe environments lays a strong foundation for lifelong wellbeing.</p>

<h3>Key Focus Areas for Paediatric Wellbeing</h3>
<ul>
  <li><strong>Routine Monitoring:</strong> Track growth milestones, temperature, and feeding habits consistently.</li>
  <li><strong>Hydration and Nutrition:</strong> Ensure children have access to clean drinking water, whole grains, fruits, and adequate protein.</li>
  <li><strong>Hygiene Practices:</strong> Encourage regular handwashing to prevent common infections in school and play settings.</li>
  <li><strong>Recognizing Warning Signs:</strong> High fever, persistent lethargy, difficulty breathing, or poor fluid intake warrant prompt paediatric evaluation.</li>
</ul>

<p>Starlight Hospital's paediatric service is designed to support parents and caregivers through every stage of child growth and healthcare assessment.</p>
        `,
        categoryName: 'Child Health',
        featured_image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
        image_alt: 'Paediatric specialist evaluating a child at Starlight Hospital',
        status: 'Published',
        medical_review_status: 'Reviewed',
        published_at: new Date(Date.now() - 86400000 * 3).toISOString(),
        reading_time: 4
      },
      {
        title: 'Understanding the Importance of Antenatal Care',
        slug: 'understanding-the-importance-of-antenatal-care',
        excerpt: 'Regular antenatal consultations support maternal wellbeing, monitor fetal development, and prepare mothers for safe delivery.',
        content: `
<h2>Comprehensive Care Throughout Pregnancy</h2>
<p>Antenatal care provides essential health monitoring for expectant mothers and unborn babies. Early and regular visits allow clinicians to track progress and identify potential health needs proactively.</p>

<h3>What Antenatal Visits Include</h3>
<ul>
  <li>Regular blood pressure and blood sugar checks</li>
  <li>Monitoring fetal growth and positioning</li>
  <li>Maternal health counseling and nutritional guidance</li>
  <li>Screening tests and diagnostic assessments</li>
</ul>

<p>Our Obstetrics & Gynaecology service in Jajo, Ikorodu offers compassionate, practical consultations tailored to expectant mothers.</p>
        `,
        categoryName: 'Pregnancy & Maternal Health',
        featured_image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800',
        image_alt: 'Expectant mother receiving healthcare guidance at Starlight Hospital',
        status: 'Published',
        medical_review_status: 'Reviewed',
        published_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        reading_time: 6
      },
      {
        title: 'What Patients Should Know Before a Laboratory Test',
        slug: 'what-patients-should-know-before-a-laboratory-test',
        excerpt: 'How to prepare properly for routine blood tests, urine investigations, and diagnostic assessments for accurate results.',
        content: `
<h2>Preparing for Your Diagnostic Investigation</h2>
<p>Diagnostic laboratory tests are crucial tools that aid clinicians in accurately evaluating health conditions. Proper preparation ensures test results are reliable and actionable.</p>

<h3>General Preparation Guidelines</h3>
<ul>
  <li><strong>Fasting instructions:</strong> Certain blood tests require 8–12 hours of fasting from food and beverages other than plain water.</li>
  <li><strong>Medication review:</strong> Inform your clinician about any prescription drugs, herbal supplements, or vitamins you currently take.</li>
  <li><strong>Follow hospital directions:</strong> Always verify test-specific preparation details with Starlight Hospital staff before your visit.</li>
</ul>
        `,
        categoryName: 'Laboratory / Diagnostics',
        featured_image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
        image_alt: 'Laboratory diagnostic equipment at Starlight Hospital',
        status: 'Published',
        medical_review_status: 'Reviewed',
        published_at: new Date(Date.now() - 86400000 * 1).toISOString(),
        reading_time: 3
      },
      {
        title: 'Healthy Habits That Support Everyday Wellbeing',
        slug: 'healthy-habits-that-support-everyday-wellbeing',
        excerpt: 'Simple, sustainable lifestyle practices that foster preventive health, immunity, and overall energy for individuals and families.',
        content: `
<h2>Building Long-Term Health Through Daily Choices</h2>
<p>Preventive health education empowers individuals to make informed daily decisions that improve overall quality of life and reduce the risk of chronic conditions.</p>

<h3>Pillars of Everyday Wellness</h3>
<ul>
  <li><strong>Balanced Nutrition:</strong> Incorporating fresh vegetables, fruits, and adequate hydration daily.</li>
  <li><strong>Physical Activity:</strong> Engaging in moderate exercise such as walking or active outdoor routines.</li>
  <li><strong>Restful Sleep:</strong> Aiming for 7 to 8 hours of quality sleep to aid recovery and mental clarity.</li>
  <li><strong>Regular Health Check-ups:</strong> Visiting your local healthcare clinic for routine baseline assessments.</li>
</ul>
        `,
        categoryName: 'Preventive Health',
        featured_image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
        image_alt: 'Healthy lifestyle illustration for family health',
        status: 'Published',
        medical_review_status: 'Reviewed',
        published_at: new Date().toISOString(),
        reading_time: 4
      }
    ];

    for (const art of articles) {
      const categoryId = catMap[art.categoryName];
      await db.run(`
        INSERT INTO articles (title, slug, excerpt, content, category_id, author_id, featured_image, image_alt, status, medical_review_status, published_at, reading_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        art.title, art.slug, art.excerpt, art.content, categoryId, mainAdmin.id,
        art.featured_image, art.image_alt, art.status, art.medical_review_status,
        art.published_at, art.reading_time
      ]);
    }
    console.log('6 Specification health articles seeded.');
  }

  // 4. Seed 6 Core Services
  const servicesCount = await db.get('SELECT count(*) as count FROM services');
  if (servicesCount.count === 0) {
    const services = [
      {
        service_id: 'general-outpatient',
        title: 'General Outpatient / Medical Consultation',
        short_desc: 'Medical consultation for everyday health concerns, assessment, and appropriate next steps.',
        hero_heading: 'Medical Consultation for Everyday Healthcare Needs',
        description: 'Starlight Hospital provides general outpatient medical consultations for individuals seeking assessment of health concerns and guidance on appropriate next steps.',
        what_to_expect: 'Consultation is a starting point: the clinician reviews the concern, considers relevant history and symptoms, performs an appropriate assessment, and may recommend further testing, treatment, referral, or follow-up where clinically indicated.',
        who_it_is_for: 'Patients whose symptoms, healthcare needs, or clinical circumstances call for this service. The appropriate course of care depends on individual assessment.',
        before_your_visit_json: JSON.stringify([
          'Bring relevant medical information or previous results where available.',
          'Bring a list of current medicines or treatments where relevant.',
          'For appointments involving tests or procedures, contact the hospital in advance for any preparation instructions.'
        ]),
        faqs_json: JSON.stringify([
          { question: 'What should I do before coming for a medical consultation?', answer: 'Bring any previous medical records, a list of current medications, and a short summary of when your symptoms started.' },
          { question: 'Do I need an appointment for general outpatient care?', answer: 'Walk-ins are welcomed, but booking an appointment request in advance helps our team prepare for your visit.' }
        ]),
        icon_name: 'Stethoscope',
        image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000'
      },
      {
        service_id: 'obstetrics-gynaecology',
        title: 'Obstetrics & Gynaecology',
        short_desc: 'Care and consultation relating to pregnancy, women’s health, and gynaecological concerns.',
        hero_heading: 'Women’s Health and Obstetrics & Gynaecology Care',
        description: 'Our Obstetrics & Gynaecology service supports women seeking consultation and care for pregnancy-related and gynaecological health concerns.',
        what_to_expect: 'Patients should contact the hospital for an appointment and explain the reason for the visit so the appropriate consultation can be arranged.',
        who_it_is_for: 'Patients whose symptoms, healthcare needs, or clinical circumstances call for this service. The appropriate course of care depends on individual assessment.',
        before_your_visit_json: JSON.stringify([
          'Bring relevant medical information or previous results where available.',
          'Bring a list of current medicines or treatments where relevant.',
          'For appointments involving tests or procedures, contact the hospital in advance for any preparation instructions.'
        ]),
        faqs_json: JSON.stringify([
          { question: 'What women’s health services are provided?', answer: 'We provide consultation for general gynaecological health, routine wellness, and maternal/antenatal consultation for pregnancy.' }
        ]),
        icon_name: 'HeartPulse',
        image_url: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=1000'
      },
      {
        service_id: 'paediatrics',
        title: 'Paediatrics',
        short_desc: 'Healthcare support for children, including assessment of common childhood concerns and follow-up care.',
        hero_heading: 'Healthcare for Children and Young Patients',
        description: 'Our paediatric service provides healthcare assessment and support for children and young patients.',
        what_to_expect: 'Parents and caregivers can contact Starlight Hospital to discuss the child’s concern and arrange an appropriate consultation.',
        who_it_is_for: 'Patients whose symptoms, healthcare needs, or clinical circumstances call for this service. The appropriate course of care depends on individual assessment.',
        before_your_visit_json: JSON.stringify([
          'Bring relevant medical information or previous results where available.',
          'Bring a list of current medicines or treatments where relevant.',
          'For appointments involving tests or procedures, contact the hospital in advance for any preparation instructions.'
        ]),
        faqs_json: JSON.stringify([
          { question: 'What should parents bring to a paediatric visit?', answer: 'Please bring the child’s immunisation record, medical history notes, and details of any ongoing medication.' }
        ]),
        icon_name: 'Baby',
        image_url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000'
      },
      {
        service_id: 'surgery',
        title: 'Surgery',
        short_desc: 'Surgical consultation, evaluation, and care pathways where clinically appropriate.',
        hero_heading: 'Surgical Consultation and Care Pathways',
        description: 'Starlight Hospital provides surgical services for patients who require surgical assessment and care where clinically appropriate.',
        what_to_expect: 'A surgical pathway may begin with consultation and assessment, followed by investigations, treatment planning, the appropriate procedure where indicated, and follow-up.',
        who_it_is_for: 'Patients whose symptoms, healthcare needs, or clinical circumstances call for this service. The appropriate course of care depends on individual assessment.',
        before_your_visit_json: JSON.stringify([
          'Bring relevant medical information or previous results where available.',
          'Bring a list of current medicines or treatments where relevant.',
          'For appointments involving tests or procedures, contact the hospital in advance for any preparation instructions.'
        ]),
        faqs_json: JSON.stringify([
          { question: 'How is a surgical procedure planned?', answer: 'Surgical pathways begin with a thorough clinical assessment, pre-operative evaluation, and clear patient guidance.' }
        ]),
        icon_name: 'Activity',
        image_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000'
      },
      {
        service_id: 'health-education-counseling',
        title: 'Health Education & Counseling',
        short_desc: 'Practical health information, counselling, and guidance to support healthier decisions.',
        hero_heading: 'Helping Patients Understand and Manage Their Health',
        description: 'Health education and counselling services provide practical information and support designed to help individuals make informed health decisions.',
        what_to_expect: 'Content and counselling may cover general health awareness, prevention, healthy living, and understanding health information.',
        who_it_is_for: 'Patients whose symptoms, healthcare needs, or clinical circumstances call for this service. The appropriate course of care depends on individual assessment.',
        before_your_visit_json: JSON.stringify([
          'Bring relevant medical information or previous results where available.',
          'Bring a list of current medicines or treatments where relevant.',
          'For appointments involving tests or procedures, contact the hospital in advance for any preparation instructions.'
        ]),
        faqs_json: JSON.stringify([
          { question: 'Who can benefit from health education & counselling?', answer: 'Individuals, parents, and caregivers seeking clear, practical understanding regarding preventive health and lifestyle management.' }
        ]),
        icon_name: 'BookOpenCheck',
        image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000'
      },
      {
        service_id: 'laboratory-diagnostic',
        title: 'Laboratory / Diagnostic Services',
        short_desc: 'Laboratory and diagnostic support to help clinicians assess and manage patient concerns.',
        hero_heading: 'Laboratory and Diagnostic Support',
        description: 'Laboratory and diagnostic services support clinicians in investigating and understanding patient health concerns.',
        what_to_expect: 'Patients should follow the hospital’s instructions for preparation, sample collection, testing, and result collection where applicable.',
        who_it_is_for: 'Patients whose symptoms, healthcare needs, or clinical circumstances call for this service. The appropriate course of care depends on individual assessment.',
        before_your_visit_json: JSON.stringify([
          'Bring relevant medical information or previous results where available.',
          'Bring a list of current medicines or treatments where relevant.',
          'For appointments involving tests or procedures, contact the hospital in advance for any preparation instructions.'
        ]),
        faqs_json: JSON.stringify([
          { question: 'Are there fasting requirements for lab tests?', answer: 'Some tests require fasting. Please contact the hospital ahead of your visit for specific test preparation instructions.' }
        ]),
        icon_name: 'Microscope',
        image_url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1000'
      }
    ];

    for (const s of services) {
      await db.run(`
        INSERT INTO services (service_id, title, short_desc, hero_heading, description, what_to_expect, who_it_is_for, before_your_visit_json, faqs_json, icon_name, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        s.service_id, s.title, s.short_desc, s.hero_heading, s.description,
        s.what_to_expect, s.who_it_is_for, s.before_your_visit_json, s.faqs_json,
        s.icon_name, s.image_url
      ]);
    }
    console.log('6 Core Services seeded.');
  }

  // 5. Seed Site Settings
  const settings = [
    { key: 'hospital_name', value: 'Starlight Hospital', group: 'general' },
    { key: 'motto', value: 'DEO MEDICE', group: 'general' },
    { key: 'phone_primary', value: '08053587646', group: 'contact' },
    { key: 'phone_secondary', value: '07079333090', group: 'contact' },
    { key: 'address', value: 'Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate, along Imowo-Nla Road, Jajo, Ikorodu, Lagos.', group: 'contact' },
    { key: 'footer_microcopy', value: 'Starlight Hospital - DEO MEDICE. Healthcare services for individuals and families in Jajo, Ikorodu, Lagos.', group: 'footer' }
  ];

  for (const st of settings) {
    const existing = await db.get('SELECT id FROM site_settings WHERE setting_key = ?', [st.key]);
    if (!existing) {
      await db.run('INSERT INTO site_settings (setting_key, setting_value, group_name) VALUES (?, ?, ?)', [st.key, st.value, st.group]);
    }
  }
  console.log('Site settings seeded.');

  // 6. Seed Dynamic Pages
  const pages = [
    {
      slug: 'home',
      title: 'Home Page',
      content_json: JSON.stringify({
        hero_headline: 'Quality Healthcare for You and Your Family',
        hero_copy: 'Starlight Hospital provides accessible healthcare services for individuals and families in Jajo, Ikorodu and surrounding communities.',
        why_heading: 'A Hospital You Can Reach When You Need Healthcare',
        about_preview_heading: 'About Starlight Hospital',
        about_preview_copy: 'Starlight Hospital serves patients and families with a practical range of healthcare services, from general medical consultation to women’s health, paediatrics, surgery, diagnostics, and health education.'
      })
    },
    {
      slug: 'about',
      title: 'About Page',
      content_json: JSON.stringify({
        headline: 'About Starlight Hospital',
        subcopy: 'Local healthcare services for individuals and families in Jajo, Ikorodu and surrounding communities.',
        profile_story: 'Starlight Hospital is a healthcare facility serving the Jajo, Ikorodu community with a range of clinical, diagnostic, counselling, and health education services.'
      })
    }
  ];

  for (const p of pages) {
    const existing = await db.get('SELECT id FROM pages WHERE slug = ?', [p.slug]);
    if (!existing) {
      await db.run('INSERT INTO pages (slug, title, content_json) VALUES (?, ?, ?)', [p.slug, p.title, p.content_json]);
    }
  }
  console.log('Dynamic Pages copy seeded.');

  // Verify Zero Fake Data Rules
  const apptCount = (await db.get('SELECT count(*) as count FROM appointment_requests')).count;
  const enquiryCount = (await db.get('SELECT count(*) as count FROM enquiries')).count;
  const auditCount = (await db.get('SELECT count(*) as count FROM audit_logs')).count;

  console.log('----------------------------------------------------');
  console.log('VERIFICATION OF CLEAN INITIALIZATION:');
  console.log('Appointment Requests Count (Must be 0):', apptCount);
  console.log('Contact Enquiries Count (Must be 0):', enquiryCount);
  console.log('Audit Logs Count (Must be 0):', auditCount);
  console.log('----------------------------------------------------');
  console.log('Seeding completed cleanly!');
}

seed().catch(err => {
  console.error('Seeding error:', err);
});
