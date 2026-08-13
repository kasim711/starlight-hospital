import React, { useState } from 'react';
import { submitAppointmentRequest } from '../services/api';
import { Phone, Calendar, CheckCircle2, AlertTriangle, ShieldCheck, MapPin, User, Mail, Clock, FileText } from 'lucide-react';

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
    <div className="space-y-16 pb-16 font-sans">
      {/* Hero Header */}
      <section className="bg-navy-500 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A4A_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="badge-gold">
            APPOINTMENT REQUEST FORM
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Request an Appointment
          </h1>
          <p className="text-slate-200 text-base sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
            Send an appointment request to Starlight Hospital. A hospital representative can contact you to confirm availability and next steps.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-12">
          
          {submitted ? (
            /* Confirmation Feedback UX */
            <div className="space-y-6 text-center py-8">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500 tracking-tight">
                  Appointment Request Received
                </h2>
                <p className="text-slate-700 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-normal">
                  Your request has been submitted to Starlight Hospital. Please keep your phone available for confirmation.
                </p>
              </div>

              <div className="bg-gold-50/80 border border-gold-200/80 rounded-2xl p-5 text-slate-800 text-sm max-w-xl mx-auto space-y-2 text-left shadow-sm">
                <div className="flex items-center gap-2 text-gold-800 font-bold uppercase tracking-wider text-xs">
                  <AlertTriangle className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  Urgent Notice
                </div>
                <p className="leading-relaxed text-xs sm:text-sm font-normal">
                  If your matter is urgent, contact the hospital directly by phone rather than relying on this form.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:08053587646"
                  className="w-full sm:w-auto btn-primary text-xs uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4 text-gold-400" /> CALL 08053587646
                </a>
                <a
                  href="tel:07079333090"
                  className="w-full sm:w-auto btn-secondary text-xs uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4 text-teal-600" /> CALL 07079333090
                </a>
              </div>
            </div>
          ) : (
            /* Appointment Request Form */
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="bg-teal-50/80 border border-teal-200/80 rounded-2xl p-5 text-slate-800 text-xs sm:text-sm flex items-start gap-3 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-navy-500 block uppercase tracking-wider text-xs">Appointment Confirmation Note</span>
                  <p className="leading-relaxed font-normal pt-0.5">
                    Submitting this form does not mean your appointment is immediately confirmed. Hospital staff will call your phone number to confirm scheduling details.
                  </p>
                </div>
              </div>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-bold">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
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
                    placeholder="e.g. 08012345678"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    className="input-healthcare"
                  />
                </div>

                {/* Service Needed */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
                    Service Needed <span className="text-red-500">*</span>
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

                {/* Preferred Date */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
                    Preferred Date (Requested)
                  </label>
                  <input
                    type="date"
                    value={formData.preferred_date}
                    onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                    className="input-healthcare bg-white"
                  />
                </div>

                {/* Preferred Time */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
                    Preferred Time (Requested)
                  </label>
                  <input
                    type="time"
                    value={formData.preferred_time}
                    onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                    className="input-healthcare bg-white"
                  />
                </div>

                {/* Message / Reason */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
                    Message / Reason for Visit <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe your symptoms or reason for appointment..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-healthcare"
                  ></textarea>
                </div>

                {/* Consent Checkbox */}
                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                    />
                    <span className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
                      I consent to Starlight Hospital contacting me via phone or SMS using the information provided to process my appointment request. <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>

              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto btn-teal text-xs uppercase tracking-wider"
                >
                  <Calendar className="w-4 h-4" />
                  {submitting ? 'Submitting Request...' : 'SUBMIT APPOINTMENT REQUEST'}
                </button>

                <div className="text-xs text-slate-500 font-medium">
                  Or call directly: <a href="tel:08053587646" className="text-teal-600 font-bold hover:underline">08053587646</a>
                </div>
              </div>

            </form>
          )}

        </div>
      </section>

      {/* Hospital Location Summary */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-100/90 rounded-2xl p-6 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700">
              <span className="font-extrabold text-navy-500 block uppercase tracking-wider text-xs">Starlight Hospital Address</span>
              Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate, along Imowo-Nla Road, Jajo, Ikorodu, Lagos.
            </div>
          </div>
          <a
            href="tel:08053587646"
            className="btn-primary text-xs uppercase tracking-wider whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-gold-400" /> 08053587646
          </a>
        </div>
      </section>
    </div>
  );
};
