import React, { useState } from 'react';
import { submitAppointmentRequest } from '../services/api';
import { Phone, Calendar, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { HealthcareImage } from '../components/HealthcareImage';

export const AppointmentPage: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    service_needed: 'General Outpatient / Medical Consultation',
    preferred_date: '',
    preferred_time: '',
    message: '',
    consent: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const heroRef = useScrollReveal();
  const formRef = useScrollReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.full_name || !formData.phone_number || !formData.message) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (!formData.consent) {
      setErrorMessage('You must check the consent box to submit an appointment request.');
      return;
    }

    try {
      setSubmitting(true);
      await submitAppointmentRequest(formData);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit appointment request. Please try calling the hospital directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans pb-16">
      {/* Hero Header */}
      <section ref={heroRef} className="py-16 md:py-24 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Appointments</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 mb-4">
          Request an Appointment
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Send an appointment request to Starlight Hospital. A hospital representative can contact you to confirm availability and next steps.
        </p>
        
        <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-4 inline-block text-left text-sm text-slate-700 max-w-2xl">
          <p>
            <strong>Note:</strong> Submitting an appointment request does not confirm the appointment. The hospital will contact you to confirm availability and next steps.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section ref={formRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Visual Side */}
          <div className="hidden lg:block space-y-6">
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <HealthcareImage 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200" 
                alt="Book Appointment" 
                aspectRatio="aspect-[4/3]"
              />
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-semibold text-navy-900 mb-4 text-lg">Urgent Matters</h3>
              <p className="text-slate-600 mb-4">
                If your condition is urgent, please do not use this form. Contact us directly.
              </p>
              <div className="space-y-2">
                <a href="tel:08053587646" className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700">
                  <Phone className="w-5 h-5" /> 08053587646
                </a>
                <a href="tel:07079333090" className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700">
                  <Phone className="w-5 h-5" /> 07079333090
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form Side */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <h2 className="text-2xl font-semibold text-navy-900">
                  Appointment Request Received.
                </h2>
                <p className="text-slate-600 max-w-md mx-auto">
                  Your request has been submitted to Starlight Hospital. Please keep your phone available for confirmation. If urgent, contact the hospital directly.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <a href="tel:08053587646" className="btn-outline">
                    Call 08053587646
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
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
                      value={formData.phone_number}
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                      className="input-healthcare"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-1">
                      Service Needed *
                    </label>
                    <select
                      value={formData.service_needed}
                      onChange={(e) => setFormData({ ...formData, service_needed: e.target.value })}
                      className="input-healthcare bg-white"
                    >
                      <option value="General Outpatient / Medical Consultation">General Outpatient / Medical Consultation</option>
                      <option value="Obstetrics & Gynaecology">Obstetrics & Gynaecology</option>
                      <option value="Paediatrics">Paediatrics</option>
                      <option value="Surgery">Surgery</option>
                      <option value="Health Education & Counseling">Health Education & Counseling</option>
                      <option value="Laboratory / Diagnostic Services">Laboratory / Diagnostic Services</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy-900 mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferred_date}
                        onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                        className="input-healthcare bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy-900 mb-1">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        value={formData.preferred_time}
                        onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                        className="input-healthcare bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-1">
                      Reason for Visit / Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-healthcare"
                    ></textarea>
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
                        I consent to Starlight Hospital contacting me via phone or SMS using the information provided to process my appointment request. *
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-teal flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  {submitting ? 'Submitting Request...' : 'Submit Appointment Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
