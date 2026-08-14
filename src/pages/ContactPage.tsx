import React, { useState } from 'react';
import { submitContactEnquiry } from '../services/api';
import { Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

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
  const contentRef = useScrollReveal();

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
    <div className="bg-white min-h-screen font-sans pb-16">
      {/* Hero Header */}
      <section ref={heroRef} className="py-16 md:py-24 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Contact</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 mb-4">
          Contact Starlight Hospital
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Get in touch for appointments, service enquiries, and directions to our hospital.
        </p>
      </section>

      {/* Two Column Layout: Info+Map Left, Form Right */}
      <section ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Info & Map */}
          <div className="space-y-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h2 className="text-2xl font-semibold text-navy-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-teal-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">Location</h3>
                    <p className="text-slate-600 mb-3">
                      Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate,<br/>
                      along Imowo-Nla Road, Jajo, Ikorodu, Lagos.
                    </p>
                    <a
                      href="https://maps.google.com/?q=Starlight+Hospital+Jajo+Ikorodu+Lagos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 font-semibold hover:text-teal-700 inline-flex items-center gap-1"
                    >
                      Get Directions <MapPin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-teal-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">Call Us</h3>
                    <div className="space-y-1">
                      <a href="tel:08053587646" className="block text-slate-600 hover:text-teal-600 transition-colors">
                        08053587646
                      </a>
                      <a href="tel:07079333090" className="block text-slate-600 hover:text-teal-600 transition-colors">
                        07079333090
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                title="Starlight Hospital Detailed Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15850.550186985023!2d3.5135!3d6.6212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b935d21df266f%3A0x8e833446059d99bf!2sIkorodu%2C%20Lagos!5e0!3m2!1sen!2sng!4v1690000000000!5m2!1sen!2sng"
                className="w-full min-h-[300px] border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-navy-900">Enquiry Submitted</h3>
                <p className="text-slate-600">
                  Thank you. Your enquiry has been received. The hospital team will contact you using the details provided.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold text-navy-900 mb-6">Send an Enquiry</h2>

                {errorMessage && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm">
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-1">
                      Full Name *
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

                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-1">
                      Phone Number *
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

                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-1">
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

                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-1">
                      Reason for Enquiry *
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

                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-1">
                      Message *
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

                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-2">
                      Preferred Contact Method *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
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
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
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

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-1 w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                      />
                      <span className="text-slate-600 text-sm">
                        I consent to Starlight Hospital storing and using my contact details to process and respond to this enquiry. *
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Sending Enquiry...' : 'Send Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
