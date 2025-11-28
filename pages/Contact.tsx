import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, AlertCircle, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address';
        break;
      case 'subject':
        if (!value.trim()) error = 'Subject is required';
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required';
        else if (value.length < 10) error = 'Message must be at least 10 characters';
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) {
            newErrors[key] = error;
            isValid = false;
        }
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({...acc, [key]: true}), {}));

    if (isValid) {
      console.log('Contact Form Submitted:', formData);
      setSubmitted(true);
    } else {
        const firstError = document.querySelector('[aria-invalid="true"]');
        if (firstError) {
            (firstError as HTMLElement).focus();
        }
    }
  };

  const getInputClass = (fieldName: string) => {
    const baseClass = "w-full border rounded-md px-4 py-2 focus:ring-2 outline-none transition";
    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50`;
    }
    if (touched[fieldName] && !errors[fieldName] && formData[fieldName as keyof typeof formData] !== '') {
        return `${baseClass} border-green-500 focus:border-green-500 focus:ring-green-200`;
    }
    return `${baseClass} border-gray-300 focus:ring-royal-navy focus:border-royal-navy`;
  };

  return (
    <div className="bg-royal-light min-h-screen pt-16 pb-0">
       <div className="text-center mb-16 px-4">
          <h1 className="text-4xl font-serif font-bold text-royal-navy mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or need assistance with an existing order? Reach out to our team.
          </p>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-md p-8 h-full">
            <h2 className="text-2xl font-serif font-bold text-royal-navy mb-8">Get In Touch</h2>
            
            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="bg-royal-navy/10 p-3 rounded-full mr-4 group-hover:bg-royal-gold/20 transition-colors">
                  <MapPin className="text-royal-navy group-hover:text-royal-navy" size={24} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Visit Our Office</h4>
                  <address className="text-gray-600 mt-1 not-italic">
                    House No: 5-6-105/1, Road No 7,<br />
                    Vaidehi Nagar, Vanasthalipuram,<br />
                    Hyderabad, Telangana 500070
                  </address>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="bg-royal-navy/10 p-3 rounded-full mr-4 group-hover:bg-royal-gold/20 transition-colors">
                  <Phone className="text-royal-navy" size={24} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Call Us</h4>
                  <p className="text-gray-600 mt-1">
                    <a href="tel:+919346549694" className="hover:text-royal-navy focus:outline-none focus:underline">+91 93465 49694</a>
                  </p>
                  <p className="text-sm text-gray-500">Mon-Fri from 9am to 6pm</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="bg-royal-navy/10 p-3 rounded-full mr-4 group-hover:bg-royal-gold/20 transition-colors">
                  <Mail className="text-royal-navy" size={24} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email Us</h4>
                  <p className="text-gray-600 mt-1">
                    <a href="mailto:royalfituniform@gmail.com" className="hover:text-royal-navy focus:outline-none focus:underline">royalfituniform@gmail.com</a>
                  </p>
                  <p className="text-sm text-gray-500">We reply within 24 hours.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gray-50 p-6 rounded border border-gray-100">
               <div className="flex items-center mb-2">
                  <Clock size={20} className="text-royal-gold mr-2" aria-hidden="true" />
                  <h4 className="font-bold text-gray-800">Business Hours</h4>
               </div>
               <p className="text-gray-600 ml-7">Monday - Saturday: 9:00 AM - 7:00 PM<br/>Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8 h-full">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-fade-in-up" role="status" aria-live="polite">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="text-green-600" size={32} aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-royal-navy mb-2">Message Sent</h3>
                  <p className="text-gray-600 mb-6">We've received your message and will get back to you shortly.</p>
                  <button 
                    onClick={() => {
                        setSubmitted(false);
                        setFormData({name: '', email: '', subject: '', message: ''});
                        setErrors({});
                        setTouched({});
                    }}
                    className="text-royal-gold font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-royal-navy rounded px-1"
                  >
                    Send another message
                  </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2 className="text-2xl font-serif font-bold text-royal-navy mb-6">Send a Message</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className={getInputClass('name')}
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-invalid={touched.name && !!errors.name}
                        aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                      />
                      {touched.name && errors.name && <AlertCircle size={16} className="absolute right-3 top-3 text-red-500" aria-hidden="true" />}
                    </div>
                    {touched.name && errors.name && <p id="name-error" className="mt-1 text-xs text-red-600" role="alert">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className={getInputClass('email')}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-invalid={touched.email && !!errors.email}
                        aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                      />
                      {touched.email && errors.email && <AlertCircle size={16} className="absolute right-3 top-3 text-red-500" aria-hidden="true" />}
                    </div>
                    {touched.email && errors.email && <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        className={getInputClass('subject')}
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-invalid={touched.subject && !!errors.subject}
                        aria-describedby={touched.subject && errors.subject ? "subject-error" : undefined}
                      />
                      {touched.subject && errors.subject && <AlertCircle size={16} className="absolute right-3 top-3 text-red-500" aria-hidden="true" />}
                    </div>
                    {touched.subject && errors.subject && <p id="subject-error" className="mt-1 text-xs text-red-600" role="alert">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <div className="relative">
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={5} 
                        className={getInputClass('message')}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-invalid={touched.message && !!errors.message}
                        aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                      ></textarea>
                      {touched.message && errors.message && <AlertCircle size={16} className="absolute right-3 top-3 text-red-500" aria-hidden="true" />}
                    </div>
                    {touched.message && errors.message && <p id="message-error" className="mt-1 text-xs text-red-600" role="alert">{errors.message}</p>}
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-royal-navy text-white font-bold py-3 px-4 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-navy"
                  >
                    Send Message <Send size={18} aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-96 w-full relative bg-gray-200">
         <iframe 
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.665798485741!2d78.567!3d17.336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIwJzEwLjAiTiA3OMKwMzQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1630000000000!5m2!1sen!2sin" 
           width="100%" 
           height="100%" 
           style={{border:0}} 
           allowFullScreen 
           loading="lazy"
           title="Office Location"
           className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
         ></iframe>
      </div>
    </div>
  );
};

export default Contact;