import React, { useState } from 'react';
import { submitContactEnquiry } from '../services/api';
import { Phone, MapPin, Mail, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

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
      <section className="bg-navy-500 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A4A_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="badge-gold">
            CONTACT STARLIGHT HOSPITAL
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Contact Starlight Hospital
          </h1>
          <p className="text-slate-200 text-base sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
            Get in touch for appointments, service enquiries, and directions to our hospital.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Hospital Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card space-y-6">
              <div className="space-y-2">
                <span className="badge-gold">DEO MEDICE</span>
                <h2 className="text-2xl font-extrabold text-navy-500 tracking-tight">Starlight Hospital</h2>
              </div>

              <div className="space-y-5 text-slate-700 text-sm font-normal">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-extrabold text-navy-500 block uppercase tracking-wider text-xs">Hospital Address</span>
                    <p className="leading-relaxed font-semibold text-slate-800">
                      Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate, along Imowo-Nla Road, Jajo, Ikorodu, Lagos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-slate-100 pt-4">
                  <Phone className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-extrabold text-navy-500 block uppercase tracking-wider text-xs">Phone Numbers</span>
                    <div className="space-y-1 pt-1">
                      <a href="tel:08053587646" className="block text-navy-600 font-extrabold hover:text-teal-600 transition-colors">
                        08053587646
                      </a>
                      <a href="tel:07079333090" className="block text-navy-600 font-extrabold hover:text-teal-600 transition-colors">
                        07079333090
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-slate-100 pt-4">
                  <ShieldCheck className="w-5 h-5 text-gold-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-extrabold text-navy-500 block uppercase tracking-wider text-xs">Hospital Motto</span>
                    <p className="text-gold-600 font-extrabold font-mono">DEO MEDICE</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href="https://maps.google.com/?q=Starlight+Hospital+Jajo+Ikorodu+Lagos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-teal text-xs uppercase tracking-wider"
                >
                  <MapPin className="w-4 h-4" /> GET DIRECTIONS ON GOOGLE MAPS
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-card">
              
              {submitted ? (
                <div className="text-center py-10 space-y-4">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-card p-4 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 gap-2">
            <div>
              <h3 className="font-extrabold text-navy-500 text-lg tracking-tight">Hospital Location Map</h3>
              <p className="text-xs text-slate-500 font-medium">Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate, Imowo-Nla Road, Jajo, Ikorodu</p>
            </div>
            <a
              href="https://maps.google.com/?q=Starlight+Hospital+Jajo+Ikorodu+Lagos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-navy-500 transition-colors uppercase tracking-wider"
            >
              <MapPin className="w-4 h-4" /> Open in Google Maps
            </a>
          </div>
          <iframe
            title="Starlight Hospital Detailed Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15850.550186985023!2d3.5135!3d6.6212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b935d21df266f%3A0x8e833446059d99bf!2sIkorodu%2C%20Lagos!5e0!3m2!1sen!2sng!4v1690000000000!5m2!1sen!2sng"
            className="w-full h-96 rounded-2xl border-0"
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};
