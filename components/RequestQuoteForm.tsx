'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, Building2, Stethoscope, Check, Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, name: 'Business Info', description: 'Tell us about your organization' },
  { id: 2, name: 'Requirements', description: 'What uniforms do you need?' },
  { id: 3, name: 'Contact', description: 'How can we reach you?' },
]

const hotelDepartments = ['Front of House', 'Kitchen & Service', 'Housekeeping', 'Management']
const hospitalDepartments = ['Nursing & Care', 'Surgical & Specialist', 'Admin & Support', 'Management & Leadership']

export default function RequestQuoteForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    companyType: '' as '' | 'hotel' | 'hospital' | 'other',
    companyName: '',
    facilitySize: '',
    hasCurrentSupplier: false,
    timeline: '' as '' | 'urgent' | 'planned' | 'exploratory',
    departments: [] as string[],
    totalQuantity: '',
    customizationNeeds: { logo: false, embroidery: false, colorMatch: false },
    name: '',
    title: '',
    email: '',
    phone: '',
    budgetRange: '',
    preferredContact: 'email' as 'email' | 'phone' | 'whatsapp',
    marketingOptIn: true,
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleDepartment = (dept: string) => {
    setFormData((prev) => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter((d) => d !== dept)
        : [...prev.departments, dept],
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
      } else {
        console.error('Submission failed:', result.error)
        alert('Failed to submit quote request. Please try again or contact us directly.')
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const departments = formData.companyType === 'hotel' ? hotelDepartments :
    formData.companyType === 'hospital' ? hospitalDepartments : []

  if (isSubmitted) {
    return (
      <section id="quote" className="section-padding bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <Check className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 mb-4">
            Thank You!
          </h2>
          <p className="text-xl text-charcoal-600 mb-8">
            We have received your quote request. Our team will review your requirements and get back to you within 24 hours.
          </p>
          <div className="bg-white rounded-sm p-6 border border-charcoal-100">
            <p className="text-charcoal-700 mb-2">What happens next?</p>
            <ul className="text-left text-charcoal-600 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary-600" />
                Our team reviews your requirements
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary-600" />
                We prepare a customized quote
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary-600" />
                You receive the quote via email within 24 hours
              </li>
            </ul>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="quote" className="section-padding bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="decorative-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Request Your Free Quote
          </h2>
          <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
            Tell us about your uniform needs and receive a customized quote within 24 hours.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors',
                    currentStep >= step.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-charcoal-200 text-charcoal-500'
                  )}>
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <div className="mt-2 text-center hidden md:block">
                    <p className={cn(
                      'font-medium text-sm',
                      currentStep >= step.id ? 'text-charcoal-900' : 'text-charcoal-500'
                    )}>
                      {step.name}
                    </p>
                    <p className="text-xs text-charcoal-400">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    'flex-1 h-1 mx-4 rounded',
                    currentStep > step.id ? 'bg-primary-600' : 'bg-charcoal-200'
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-sm shadow-xl border border-charcoal-100 p-8">
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-semibold text-charcoal-900 mb-6">Business Information</h3>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-3">
                  What type of establishment are you?
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'hotel', label: 'Hotel', icon: Building2 },
                    { id: 'hospital', label: 'Hospital', icon: Stethoscope },
                    { id: 'other', label: 'Other', icon: Building2 },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => updateFormData('companyType', type.id)}
                      className={cn(
                        'p-4 rounded-sm border-2 transition-all text-center',
                        formData.companyType === type.id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-charcoal-200 hover:border-charcoal-300'
                      )}
                    >
                      <type.icon className={cn(
                        'w-8 h-8 mx-auto mb-2',
                        formData.companyType === type.id ? 'text-primary-600' : 'text-charcoal-400'
                      )} />
                      <span className={cn(
                        'font-medium',
                        formData.companyType === type.id ? 'text-primary-700' : 'text-charcoal-700'
                      )}>
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Company/Organization Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-sm"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Facility Size
                </label>
                <select
                  value={formData.facilitySize}
                  onChange={(e) => updateFormData('facilitySize', e.target.value)}
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-sm bg-white"
                >
                  <option value="">Select facility size</option>
                  <option value="small">Small (Under 50 staff)</option>
                  <option value="medium">Medium (50-150 staff)</option>
                  <option value="large">Large (150-500 staff)</option>
                  <option value="enterprise">Enterprise (500+ staff)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Timeline
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'urgent', label: 'Urgent (2 weeks)' },
                    { id: 'planned', label: 'Planned (1-2 months)' },
                    { id: 'exploratory', label: 'Just Exploring' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => updateFormData('timeline', t.id)}
                      className={cn(
                        'p-3 rounded-sm border-2 transition-all text-sm',
                        formData.timeline === t.id
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-charcoal-200 text-charcoal-700 hover:border-charcoal-300'
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-semibold text-charcoal-900 mb-6">Uniform Requirements</h3>

              {departments.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-3">
                    Which departments need uniforms?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {departments.map((dept) => (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => toggleDepartment(dept)}
                        className={cn(
                          'p-4 rounded-sm border-2 transition-all text-left',
                          formData.departments.includes(dept)
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-charcoal-200 hover:border-charcoal-300'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'w-5 h-5 rounded border-2 flex items-center justify-center',
                            formData.departments.includes(dept)
                              ? 'border-primary-600 bg-primary-600'
                              : 'border-charcoal-300'
                          )}>
                            {formData.departments.includes(dept) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="font-medium text-charcoal-700">{dept}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Estimated Total Quantity
                </label>
                <select
                  value={formData.totalQuantity}
                  onChange={(e) => updateFormData('totalQuantity', e.target.value)}
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-sm bg-white"
                >
                  <option value="">Select quantity range</option>
                  <option value="under-50">Under 50 pieces</option>
                  <option value="50-100">50-100 pieces (10% discount)</option>
                  <option value="100-200">100-200 pieces (15% discount)</option>
                  <option value="200-500">200-500 pieces (20% discount)</option>
                  <option value="500+">500+ pieces (25% discount)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-3">
                  Customization Needs
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'logo', label: 'Logo Printing' },
                    { id: 'embroidery', label: 'Embroidery' },
                    { id: 'colorMatch', label: 'Custom Colors' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => updateFormData('customizationNeeds', {
                        ...formData.customizationNeeds,
                        [opt.id]: !formData.customizationNeeds[opt.id as keyof typeof formData.customizationNeeds]
                      })}
                      className={cn(
                        'p-3 rounded-sm border-2 transition-all text-sm',
                        formData.customizationNeeds[opt.id as keyof typeof formData.customizationNeeds]
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-charcoal-200 text-charcoal-700 hover:border-charcoal-300'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-semibold text-charcoal-900 mb-6">Contact Information</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="w-full px-4 py-3 border border-charcoal-300 rounded-sm"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                    className="w-full px-4 py-3 border border-charcoal-300 rounded-sm"
                    placeholder="Your role"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full px-4 py-3 border border-charcoal-300 rounded-sm"
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-charcoal-300 rounded-sm"
                    placeholder="+91 93465 49694"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Budget Range (Optional)
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => updateFormData('budgetRange', e.target.value)}
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-sm bg-white"
                >
                  <option value="">Prefer not to say</option>
                  <option value="under-1L">Under 1 Lakh</option>
                  <option value="1-5L">1-5 Lakhs</option>
                  <option value="5-10L">5-10 Lakhs</option>
                  <option value="10L+">10+ Lakhs</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-3">
                  Preferred Contact Method
                </label>
                <div className="flex gap-4">
                  {[
                    { id: 'email', label: 'Email' },
                    { id: 'phone', label: 'Phone' },
                    { id: 'whatsapp', label: 'WhatsApp' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => updateFormData('preferredContact', m.id)}
                      className={cn(
                        'px-4 py-2 rounded-sm border-2 transition-all',
                        formData.preferredContact === m.id
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-charcoal-200 text-charcoal-700 hover:border-charcoal-300'
                      )}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="marketingOptIn"
                  checked={formData.marketingOptIn}
                  onChange={(e) => updateFormData('marketingOptIn', e.target.checked)}
                  className="w-5 h-5 text-primary-600 rounded"
                />
                <label htmlFor="marketingOptIn" className="text-sm text-charcoal-600">
                  Keep me updated about new products and exclusive offers
                </label>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-charcoal-200">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 text-charcoal-700 hover:text-charcoal-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-gold disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Quote Request
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
