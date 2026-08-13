import React, { useState } from 'react';
import { submitContactEnquiry } from '../services/api';
import { Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { HealthcareImage } from '../components/HealthcareImage';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Service enquiry',
    message: '',
    preferred_contact: 'Phone',
    consent: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const heroRef = useScrollReveal();
  const gridRef = useScrollReveal();
  const mapRef = useScrollReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name || !formData.phone || !formData.message) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (!formData.consent) {
      setErrorMessage('You must consent to data processing to submit an enquiry.');
      return;
    }

    try {
      setSubmitting(true);
      await submitContactEnquiry(formData);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-16 font-sans">
      {/* Hero Header */}
      <section ref={heroRef} className="bg-navy-500 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A4A_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy-950/80 border border-amber-400/50 text-amber-300 text-xs font-extrabold tracking-wider uppercase shadow-md backdrop-blur-md">
            <img src="/starlight-logo.png" alt="Starlight Logo" className="w-5 h-5 object-contain bg-white rounded-full p-0.5" />
            <span className="text-amber-300 font-extrabold">CONTACT STARLIGHT HOSPITAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Contact Starlight Hospital
          </h1>
          <p className="text-slate-200 text-base sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
            Get in touch for appointments, service enquiries, and directions to our hospital.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-3xl border border-slate-200/80 shadow-card">
          
          {/* Left Column: Visual Side */}
          <div className="lg:col-span-5 relative hidden sm:block min-h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=1200" 
              alt="Contact Starlight Hospital" 
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-navy-900/80"></div>
            <div className="relative z-10 p-8 sm:p-12 text-white h-full flex flex-col justify-between">
              <div>
                <img src="/starlight-logo.png" alt="Starlight Logo" className="w-14 h-14 object-contain bg-white rounded-xl p-1 mb-6" />
                <h2 className="text-3xl font-extrabold tracking-tight mb-2">Starlight Hospital</h2>
                <p className="text-gold-400 font-mono font-extrabold tracking-widest text-sm mb-10">DEO MEDICE</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider text-teal-400 mb-1">Location</h3>
                      <p className="text-slate-200 leading-relaxed font-medium">
                        Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate,<br/>
                        along Imowo-Nla Road, Jajo, Ikorodu, Lagos.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider text-teal-400 mb-1">Call Us</h3>
                      <div className="space-y-1">
                        <a href="tel:08053587646" className="block text-white font-extrabold hover:text-gold-400 transition-colors text-lg">
                          08053587646
                        </a>
                        <a href="tel:07079333090" className="block text-white font-extrabold hover:text-gold-400 transition-colors text-lg">
                          07079333090
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <a
                  href="https://maps.google.com/?q=Starlight+Hospital+Jajo+Ikorodu+Lagos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors"
                >
                  <MapPin className="w-4 h-4" /> Get Directions on Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Mobile info (visible only on small screens) */}
          <div className="sm:hidden bg-navy-900 p-8 text-white">
            <h2 className="text-2xl font-extrabold mb-1">Starlight Hospital</h2>
            <p className="text-gold-400 font-mono font-extrabold tracking-widest text-xs mb-6">DEO MEDICE</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <p className="text-sm text-slate-200">
                  Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate, Jajo, Ikorodu, Lagos.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <div className="space-y-1 text-sm font-bold">
                  <a href="tel:08053587646" className="block hover:text-gold-400">08053587646</a>
                  <a href="tel:07079333090" className="block hover:text-gold-400">07079333090</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white">
            <div className="p-8 sm:p-10 h-full">
              
              {submitted ? (
                <div className="text-center py-10 space-y-4 flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-navy-500 tracking-tight">Enquiry Submitted</h3>
                  <p className="text-slate-700 text-base max-w-md mx-auto leading-relaxed font-normal">
                    Thank you. Your enquiry has been received. The hospital team will contact you using the details provided.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-extrabold text-navy-500 tracking-tight">Send an Enquiry</h2>

                  {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-bold">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-healthcare"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 08053587646"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input-healthcare"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2 sm:col-span-2">
                      <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-healthcare"
                      />
                    </div>

                    {/* Reason Dropdown */}
                    <div className="space-y-2 sm:col-span-2">
                      <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
                        Reason for Enquiry <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="input-healthcare bg-white"
                      >
                        <option value="Appointment request">Appointment request</option>
                        <option value="Service enquiry">Service enquiry</option>
                        <option value="Directions / location">Directions / location</option>
                        <option value="Health information enquiry">Health information enquiry</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2 sm:col-span-2">
                      <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Write your enquiry message..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="input-healthcare"
                      ></textarea>
                    </div>

                    {/* Preferred Contact Method */}
                    <div className="space-y-2 sm:col-span-2">
                      <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
                        Preferred Contact Method <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-6 pt-1">
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                          <input
                            type="radio"
                            name="contact_method"
                            value="Phone"
                            checked={formData.preferred_contact === 'Phone'}
                            onChange={() => setFormData({ ...formData, preferred_contact: 'Phone' })}
                            className="text-teal-600 focus:ring-teal-500"
                          />
                          Phone Call
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                          <input
                            type="radio"
                            name="contact_method"
                            value="Email"
                            checked={formData.preferred_contact === 'Email'}
                            onChange={() => setFormData({ ...formData, preferred_contact: 'Email' })}
                            className="text-teal-600 focus:ring-teal-500"
                          />
                          Email
                        </label>
                      </div>
                    </div>

                    {/* Consent Checkbox */}
                    <div className="space-y-2 sm:col-span-2">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={formData.consent}
                          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                          className="mt-1 w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                        />
                        <span className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
                          I consent to Starlight Hospital storing and using my contact details to process and respond to this enquiry. <span className="text-red-500">*</span>
                        </span>
                      </label>
                    </div>

                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full btn-primary text-xs uppercase tracking-wider"
                    >
                      <Send className="w-4 h-4" />
                      {submitting ? 'Sending Enquiry...' : 'SEND ENQUIRY'}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* Google Maps Embed Section */}
      <section ref={mapRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-card p-2 sm:p-4">
          <iframe
            title="Starlight Hospital Detailed Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15850.550186985023!2d3.5135!3d6.6212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b935d21df266f%3A0x8e833446059d99bf!2sIkorodu%2C%20Lagos!5e0!3m2!1sen!2sng!4v1690000000000!5m2!1sen!2sng"
            className="w-full h-80 rounded-2xl border-0"
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};
