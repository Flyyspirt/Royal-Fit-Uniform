import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ChevronDown, Shield, Users, Truck } from 'lucide-react';

const BulkOrder: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    sector: 'Hospitality',
    quantity: '',
    requirements: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'companyName':
        if (!value.trim()) error = 'Company name is required';
        break;
      case 'contactPerson':
        if (!value.trim()) error = 'Contact person is required';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address';
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone number is required';
        else if (!/^\+?[\d\s-]{10,}$/.test(value)) error = 'Please enter a valid phone number (min 10 digits)';
        break;
      case 'quantity':
        if (!value) error = 'Quantity is required';
        else if (parseInt(value) <= 0) error = 'Quantity must be greater than 0';
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
        if (key === 'requirements' && !formData.requirements) return;

        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) {
            newErrors[key] = error;
            isValid = false;
        }
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({...acc, [key]: true}), {}));

    if (isValid) {
      console.log('Form Submitted:', formData);
      setSubmitted(true);
    } else {
        const firstError = document.querySelector('[aria-invalid="true"]');
        if (firstError) {
            (firstError as HTMLElement).focus();
        }
    }
  };

  const getInputClass = (fieldName: string) => {
    const baseClass = "w-full bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-2 focus:bg-white block p-3 transition-colors outline-none";
    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50`;
    }
    if (touched[fieldName] && !errors[fieldName] && formData[fieldName as keyof typeof formData] !== '') {
        return `${baseClass} border-gray-200 focus:border-green-500 focus:ring-green-100`;
    }
    return `${baseClass} border-gray-200 focus:ring-royal-gold/50 focus:border-royal-gold`;
  };

  const getLabelClass = () => "block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2";

  return (
    <div className="bg-royal-light min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side: Value Proposition (Sidebar) */}
        <div className="lg:w-2/5 bg-royal-navy text-white p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Abstract Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="relative z-10">
                <div className="mb-8">
                   <h2 className="text-3xl font-serif font-bold text-royal-gold mb-4">Partner with Excellence</h2>
                   <p className="text-gray-300 leading-relaxed font-light">
                      Equip your workforce with uniforms that blend durability with dignity. Join hundreds of organizations trusting Royal Fit for their apparel needs.
                   </p>
                </div>

                <div className="space-y-8">
                    <div className="flex items-start">
                        <div className="bg-royal-gold/20 p-3 rounded-xl mr-4 backdrop-blur-sm">
                            <Shield className="text-royal-gold" size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Premium Durability</h3>
                            <p className="text-sm text-gray-400">Fabrics engineered to withstand industrial washing cycles and maintain color.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-royal-gold/20 p-3 rounded-xl mr-4 backdrop-blur-sm">
                            <Users className="text-royal-gold" size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Smart Sizing</h3>
                            <p className="text-sm text-gray-400">Inclusive sizing options ensuring comfort and confidence for every team member.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-royal-gold/20 p-3 rounded-xl mr-4 backdrop-blur-sm">
                            <Truck className="text-royal-gold" size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Reliable Logistics</h3>
                            <p className="text-sm text-gray-400">Consistent, on-time delivery for orders ranging from 50 to 5,000 units.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                <p className="italic text-gray-400 text-sm leading-relaxed">"The quality and service provided by Royal Fit have been exceptional. Our staff loves the comfort."</p>
                <div className="flex items-center gap-2 mt-3">
                   <div className="h-0.5 w-6 bg-royal-gold"></div>
                   <p className="font-bold text-white text-sm">General Manager, Grand Hotel</p>
                </div>
            </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-3/5 p-8 md:p-12 bg-white relative">
            {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="text-green-600" size={40} aria-hidden="true" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-royal-navy mb-4">Request Received</h2>
                    <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                        Thank you for choosing Royal Fit Uniform. Our sales team will review your requirements and get back to you within 24 hours with a custom quote.
                    </p>
                    <button
                        onClick={() => {
                            setSubmitted(false);
                            setFormData({
                                companyName: '',
                                contactPerson: '',
                                email: '',
                                phone: '',
                                sector: 'Hospitality',
                                quantity: '',
                                requirements: ''
                            });
                            setTouched({});
                            setErrors({});
                        }}
                        className="bg-royal-light text-royal-navy font-bold py-3 px-8 rounded-lg hover:bg-royal-gold/20 transition-colors"
                    >
                        Submit New Request
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} noValidate className="h-full flex flex-col justify-center">
                  <div className="mb-8">
                    <h1 className="text-3xl font-serif font-bold text-royal-navy mb-2">Request a Bulk Quote</h1>
                    <p className="text-gray-500">Fill in the details below for a customized solution.</p>
                  </div>

                  <div className="space-y-6">
                      {/* Section: Organization */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="companyName" className={getLabelClass()}>Company Name *</label>
                          <div className="relative">
                            <input
                              type="text"
                              id="companyName"
                              name="companyName"
                              placeholder="e.g. Grand Hotel"
                              className={getInputClass('companyName')}
                              value={formData.companyName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              aria-required="true"
                              aria-invalid={touched.companyName && !!errors.companyName}
                            />
                            {touched.companyName && errors.companyName && (
                              <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                                <AlertCircle size={12} /> {errors.companyName}
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="sector" className={getLabelClass()}>Industry Sector</label>
                          <div className="relative">
                            <select
                              id="sector"
                              name="sector"
                              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold block p-3 appearance-none outline-none cursor-pointer"
                              value={formData.sector}
                              onChange={handleChange}
                            >
                              <option value="Hospitality">Hospitality</option>
                              <option value="Healthcare">Healthcare</option>
                              <option value="Corporate">Corporate</option>
                              <option value="Education">Education</option>
                              <option value="Industrial">Industrial</option>
                              <option value="Other">Other</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-3.5 text-gray-500 pointer-events-none" aria-hidden="true" />
                          </div>
                        </div>
                      </div>

                      {/* Section: Contact */}
                      <div className="pt-4 border-t border-gray-100">
                          <label className="block text-sm font-medium text-royal-navy mb-4">Contact Details</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="contactPerson" className={getLabelClass()}>Contact Person *</label>
                                <input
                                type="text"
                                id="contactPerson"
                                name="contactPerson"
                                placeholder="Full Name"
                                className={getInputClass('contactPerson')}
                                value={formData.contactPerson}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-required="true"
                                aria-invalid={touched.contactPerson && !!errors.contactPerson}
                                />
                                {touched.contactPerson && errors.contactPerson && (
                                <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1"><AlertCircle size={12} /> {errors.contactPerson}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="phone" className={getLabelClass()}>Phone Number *</label>
                                <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="+91"
                                className={getInputClass('phone')}
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-required="true"
                                aria-invalid={touched.phone && !!errors.phone}
                                />
                                {touched.phone && errors.phone && (
                                <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1"><AlertCircle size={12} /> {errors.phone}</p>
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="email" className={getLabelClass()}>Email Address *</label>
                                <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="name@company.com"
                                className={getInputClass('email')}
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-required="true"
                                aria-invalid={touched.email && !!errors.email}
                                />
                                {touched.email && errors.email && (
                                <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>
                                )}
                            </div>
                          </div>
                      </div>

                      {/* Section: Order Details */}
                      <div className="pt-4 border-t border-gray-100">
                           <label className="block text-sm font-medium text-royal-navy mb-4">Order Specifics</label>
                           <div className="space-y-6">
                                <div>
                                    <label htmlFor="quantity" className={getLabelClass()}>Estimated Quantity *</label>
                                    <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    min="1"
                                    placeholder="e.g., 50"
                                    className={getInputClass('quantity')}
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-required="true"
                                    aria-invalid={touched.quantity && !!errors.quantity}
                                    />
                                    {touched.quantity && errors.quantity && (
                                    <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1"><AlertCircle size={12} /> {errors.quantity}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="requirements" className={getLabelClass()}>Specific Requirements</label>
                                    <textarea
                                    id="requirements"
                                    name="requirements"
                                    rows={3}
                                    placeholder="Tell us about fabric preferences, branding/logo needs, or specific colors..."
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold block p-3 transition-colors outline-none resize-none"
                                    value={formData.requirements}
                                    onChange={handleChange}
                                    ></textarea>
                                </div>
                           </div>
                      </div>

                      <div className="pt-6">
                        <button
                          type="submit"
                          className="w-full bg-royal-navy text-white font-bold text-lg py-4 rounded-lg hover:bg-royal-gold hover:text-royal-navy transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-navy"
                          disabled={Object.keys(errors).length > 0 && Object.keys(touched).length > 0}
                        >
                          Submit Quote Request
                        </button>
                      </div>
                  </div>
                </form>
            )}
        </div>

      </div>
    </div>
  );
};

export default BulkOrder;