'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  FaArrowRight,
  FaBuilding,
  FaCalendarDays,
  FaChevronDown,
  FaCircleCheck,
  FaCrown,
  FaEnvelope,
  FaHeadset,
  FaLock,
  FaMessage,
  FaPhone,
  FaRocket,
  FaUser,
  FaUsers,
} from 'react-icons/fa6';
import { IoPeopleSharp } from "react-icons/io5";

const FORMSPREE_FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? 'YOUR_FORMSPREE_FORM_ID';

const SCHOOL_SIZE_OPTIONS = [
  'Under 200',
  '200 – 500',
  '500 – 1,000',
  '1,000+',
];

const FEATURES = [
  {
    title: 'Dedicated Setup',
    subtext: 'Personalized onboarding and data migration support.',
    Icon: FaRocket,
  },
  {
    title: 'Early Partner Pricing',
    subtext: 'Exclusive rates for early schools.',
    Icon: FaCrown,
  },
  {
    title: 'Priority Support',
    subtext: 'Direct access to our team during launch.',
    Icon: FaHeadset,
  },
];

const inputClassName =
  'bg-transparent border-none outline-none text-white w-full ml-3 placeholder-white/30 text-sm';

const FRIENDLY_ERROR_MESSAGE =
  'Something went wrong. Please try again or contact us directly on WhatsApp.';

function FieldWrapper({
  label,
  htmlFor,
  icon,
  children,
  className = '',
}: {
  label: string;
  htmlFor: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-white/90">
        {label}
      </label>
      <div className="relative flex items-center bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus-within:border-[#FCA311]/50 transition-colors">
        {icon}
        {children}
      </div>
    </div>
  );
}

const fieldIconClassName = 'text-white/50 text-sm shrink-0';

export default function Contact() {
  const [fullName, setFullName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [schoolSize, setSchoolSize] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetForm = () => {
    setFullName('');
    setSchoolName('');
    setEmail('');
    setPhone('');
    setSchoolSize('');
    setMessage('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formId = FORMSPREE_FORM_ID;

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          schoolName,
          email,
          phone,
          schoolSize,
          message,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        resetForm();
      } else {
        setErrorMessage(FRIENDLY_ERROR_MESSAGE);
      }
    } catch {
      setErrorMessage(FRIENDLY_ERROR_MESSAGE);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendAnother = () => {
    setIsSuccess(false);
    setErrorMessage(null);
  };

  return (
    <section
      id="contact"
      className="scroll-mt-16 relative w-full bg-[#E5E5E5] overflow-hidden"
    >
      <div className="relative w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & Value Props */}
          <div>
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#FCA311] text-[#14213D] text-xs font-black tracking-widest uppercase mb-6 shadow-md">
              <IoPeopleSharp size={18} />
              <span>LIMITED EARLY ACCESS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#14213D] tracking-tight mb-6 leading-tight">
              Bring Modern Management{' '}
              <br className="hidden sm:block" />{' '}
              <span className="text-[#FCA311]">to Your School</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-lg mb-10">
              We are accepting a select group of global private schools for
              our v1 launch. Reserve your spot for dedicated setup and early
              partner pricing.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-12 items-center">
              {FEATURES.map(({ title, subtext, Icon }) => (
                <div key={title} className="flex-1 text-center sm:text-left">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-[#14213D]/10 text-[#14213D] p-3 shadow-sm text-xl mb-3">
                    <Icon aria-hidden="true" />
                  </span>
                  <p className="text-[#14213D] font-bold text-sm mb-1">
                    {title}
                  </p>
                  <p className="text-gray-600 text-sm">{subtext}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-[#14213D]/10 flex-1"></div>
              <span className="text-[#14213D]/40 text-xs font-bold uppercase tracking-wider">
                TRUSTED BY SCHOOLS WORLDWIDE
              </span>
              <div className="h-px bg-[#14213D]/10 flex-1"></div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="bg-[#14213D] border border-[#14213D] shadow-2xl rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            {isSuccess ? (
              <div className="text-center py-10">
                <FaCircleCheck
                  className="h-14 w-14 text-green-500 mx-auto mb-4"
                  aria-hidden="true"
                />
                <p className="text-lg font-bold text-white">
                  Thank you! Your request has been received. Our team will
                  contact you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={handleSendAnother}
                  className="mt-6 bg-[#FCA311] hover:bg-[#E5930F] text-[#14213D] font-bold rounded-xl px-6 py-3 transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-2">
                  <span className="bg-[#FCA311]/20 text-[#FCA311] p-3 rounded-xl text-xl">
                    <FaCalendarDays aria-hidden="true" />
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Book a Demo
                  </h3>
                </div>
                <p className="text-[#E5E5E5]/70 text-sm mb-8">
                  Fill in the details and we&apos;ll get in touch to schedule
                  your demo.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldWrapper
                      label="Full Name"
                      htmlFor="fullName"
                      icon={
                        <FaUser
                          className={fieldIconClassName}
                          aria-hidden="true"
                        />
                      }
                    >
                      <input
                        id="fullName"
                        name="name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className={inputClassName}
                      />
                    </FieldWrapper>

                    <FieldWrapper
                      label="School Name"
                      htmlFor="schoolName"
                      icon={
                        <FaBuilding
                          className={fieldIconClassName}
                          aria-hidden="true"
                        />
                      }
                    >
                      <input
                        id="schoolName"
                        name="schoolName"
                        type="text"
                        required
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="International Academy"
                        className={inputClassName}
                      />
                    </FieldWrapper>

                    <FieldWrapper
                      label="Email Address"
                      htmlFor="email"
                      icon={
                        <FaEnvelope
                          className={fieldIconClassName}
                          aria-hidden="true"
                        />
                      }
                    >
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@school.com"
                        className={inputClassName}
                      />
                    </FieldWrapper>

                    <FieldWrapper
                      label="Phone / WhatsApp"
                      htmlFor="phone"
                      icon={
                        <FaPhone
                          className={fieldIconClassName}
                          aria-hidden="true"
                        />
                      }
                    >
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+212 6 00 00 00 00"
                        className={inputClassName}
                      />
                    </FieldWrapper>

                    <FieldWrapper
                      label="School Student Capacity"
                      htmlFor="schoolSize"
                      icon={
                        <FaUsers
                          className={fieldIconClassName}
                          aria-hidden="true"
                        />
                      }
                    >
                      <select
                        id="schoolSize"
                        name="schoolSize"
                        required
                        value={schoolSize}
                        onChange={(e) => setSchoolSize(e.target.value)}
                        className={`${inputClassName} appearance-none cursor-pointer pr-6 [&>option]:bg-[#14213D] [&>option]:text-white ${
                          schoolSize ? 'text-white' : 'text-white/30'
                        }`}
                      >
                        <option value="" disabled>
                          Select capacity
                        </option>
                        {SCHOOL_SIZE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown
                        className="absolute right-4 text-white/40 text-xs pointer-events-none"
                        aria-hidden="true"
                      />
                    </FieldWrapper>

                    <FieldWrapper
                      label="Additional Notes"
                      htmlFor="message"
                      icon={
                        <FaMessage
                          className={`${fieldIconClassName} mt-1 self-start`}
                          aria-hidden="true"
                        />
                      }
                      className="sm:col-span-2"
                    >
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your school's needs..."
                        className={`${inputClassName} resize-none`}
                      />
                    </FieldWrapper>
                  </div>

                  {errorMessage && (
                    <p
                      role="alert"
                      className="text-sm font-medium text-red-400 mt-4"
                    >
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-[#FCA311] hover:bg-[#E5930F] text-[#14213D] font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(252,163,17,0.4)] disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      'Sending request...'
                    ) : (
                      <>
                        Book a Demo
                        <FaArrowRight aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-white/40 text-center">
                    <FaLock aria-hidden="true" />
                    <span>
                      Your information is secure and will only be used to
                      contact you about a demo.
                    </span>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
