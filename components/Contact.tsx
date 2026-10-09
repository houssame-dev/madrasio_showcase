'use client';

import { useEffect, useState } from 'react';
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
  FaSpinner,
  FaUser,
  FaUsers,
} from 'react-icons/fa6';
import { IoPeopleSharp } from "react-icons/io5";

import { useLanguage } from '@/components/LanguageProvider';

const FORMSPREE_FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? 'YOUR_FORMSPREE_FORM_ID';

const FEATURE_ICONS = [FaRocket, FaCrown, FaHeadset];

const inputClassName =
  'bg-transparent border-none outline-none text-white w-full ms-3 placeholder-white/30 text-sm';

const FRIENDLY_ERROR_MESSAGE =
  'Something went wrong. Please try again or contact us directly on WhatsApp.';

function FieldWrapper({
  label,
  htmlFor,
  icon,
  children,
  className = '',
  error,
}: {
  label: string;
  htmlFor: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  error?: string;
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
      {error && (
        <p role="alert" className="text-xs font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

const fieldIconClassName = 'text-white/50 text-sm shrink-0';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PLAN_SELECT_EVENT = 'madrasio:select-plan';

export default function Contact() {
  const [fullName, setFullName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [schoolSize, setSchoolSize] = useState('');
  const [message, setMessage] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Pre-select the plan chosen on a Pricing card ("Choose Plan" /
  // "Start Free Month" / enterprise CTA dispatches this event).
  useEffect(() => {
    const onSelectPlan = (e: Event) => {
      const plan = (e as CustomEvent<string>).detail;
      if (typeof plan === 'string' && plan) {
        setSelectedPlan(plan);
        setIsSuccess(false);
      }
    };
    window.addEventListener(PLAN_SELECT_EVENT, onSelectPlan);
    return () => window.removeEventListener(PLAN_SELECT_EVENT, onSelectPlan);
  }, []);

  const clearFieldError = (key: string) =>
    setFieldErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const { t, tp } = useLanguage();
  const features = tp<Array<{ title: string; subtext: string }>>(
    'contact.features',
  );
  const capacityOptions = tp<string[]>('contact.capacityOptions');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = t('contact.errors.fullName');
    if (!schoolName.trim()) errs.schoolName = t('contact.errors.schoolName');
    if (!email.trim()) errs.email = t('contact.errors.email');
    else if (!EMAIL_RE.test(email.trim()))
      errs.email = t('contact.errors.emailInvalid');
    const digitCount = (phone.match(/\d/g) || []).length;
    if (!phone.trim()) errs.phone = t('contact.errors.phone');
    else if (digitCount < 8)
      errs.phone = t('contact.errors.phoneDigits');
    if (!schoolSize) errs.schoolSize = t('contact.errors.schoolSize');
    return errs;
  };

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
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
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
          plan: selectedPlan ?? '',
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
              <span>{t('contact.badge')}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#14213D] tracking-tight mb-6 leading-tight">
              {t('contact.titleA')}{' '}
              <br className="hidden sm:block" />{' '}
              <span className="text-[#FCA311]">{t('contact.titleB')}</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-lg mb-10">
              {t('contact.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-12 items-center">
              {features.map(({ title, subtext }, index) => {
                const Icon = FEATURE_ICONS[index] ?? FaRocket;
                return (
                <div key={title} className="flex-1 text-center sm:text-start">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-[#14213D]/10 text-[#14213D] p-3 shadow-sm text-xl mb-3">
                    <Icon aria-hidden="true" />
                  </span>
                  <p className="text-[#14213D] font-bold text-sm mb-1">
                    {title}
                  </p>
                  <p className="text-gray-600 text-sm">{subtext}</p>
                </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-[#14213D]/10 flex-1"></div>
              <span className="text-[#14213D]/40 text-xs font-bold uppercase tracking-wider">
                {t('contact.trustedBy')}
              </span>
              <div className="h-px bg-[#14213D]/10 flex-1"></div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="bg-[#14213D] border border-[#14213D] shadow-2xl rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            {isSuccess ? (
              <div className="text-center py-10" aria-live="polite">
                <FaCircleCheck
                  className="h-14 w-14 text-green-500 mx-auto mb-4"
                  aria-hidden="true"
                />
                <p className="text-lg font-bold text-white">
                  {t('contact.success')}
                </p>
                <button
                  type="button"
                  onClick={handleSendAnother}
                  className="mt-6 bg-[#FCA311] hover:bg-[#E5930F] text-[#14213D] font-bold rounded-xl px-6 py-3 transition-all"
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-2">
                  <span className="bg-[#FCA311]/20 text-[#FCA311] p-3 rounded-xl text-xl">
                    <FaCalendarDays aria-hidden="true" />
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {t('contact.formTitle')}
                  </h3>
                </div>
                <p className="text-[#E5E5E5]/70 text-sm mb-8">
                  {t('contact.formSubtitle')}
                </p>

                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    name="plan"
                    value={selectedPlan ?? ''}
                  />
                  {selectedPlan && (
                    <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-[#FCA311]/40 bg-[#FCA311]/10 px-4 py-3">
                      <p className="text-sm font-semibold text-white">
                        {t('contact.selectedPlan')}{' '}
                        <span className="text-[#FCA311]">{selectedPlan}</span>
                      </p>
                      <button
                        type="button"
                        onClick={() => setSelectedPlan(null)}
                        className="text-xs font-bold text-white/60 hover:text-white transition-colors"
                      >
                        {t('contact.clear')}
                      </button>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldWrapper
                      label={t('contact.labels.fullName')}
                      htmlFor="fullName"
                      error={fieldErrors.fullName}
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
                        onChange={(e) => {
                          setFullName(e.target.value);
                          clearFieldError('fullName');
                        }}
                        placeholder={t('contact.placeholders.fullName')}
                        className={inputClassName}
                      />
                    </FieldWrapper>

                    <FieldWrapper
                      label={t('contact.labels.schoolName')}
                      htmlFor="schoolName"
                      error={fieldErrors.schoolName}
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
                        onChange={(e) => {
                          setSchoolName(e.target.value);
                          clearFieldError('schoolName');
                        }}
                        placeholder={t('contact.placeholders.schoolName')}
                        className={inputClassName}
                      />
                    </FieldWrapper>

                    <FieldWrapper
                      label={t('contact.labels.email')}
                      htmlFor="email"
                      error={fieldErrors.email}
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
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearFieldError('email');
                        }}
                        placeholder={t('contact.placeholders.email')}
                        className={inputClassName}
                      />
                    </FieldWrapper>

                    <FieldWrapper
                      label={t('contact.labels.phone')}
                      htmlFor="phone"
                      error={fieldErrors.phone}
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
                        onChange={(e) => {
                          setPhone(e.target.value);
                          clearFieldError('phone');
                        }}
                        placeholder={t('contact.placeholders.phone')}
                        className={inputClassName}
                      />
                    </FieldWrapper>

                    <FieldWrapper
                      label={t('contact.labels.schoolSize')}
                      htmlFor="schoolSize"
                      error={fieldErrors.schoolSize}
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
                        onChange={(e) => {
                          setSchoolSize(e.target.value);
                          clearFieldError('schoolSize');
                        }}
                        className={`${inputClassName} appearance-none cursor-pointer pe-6 [&>option]:bg-[#14213D] [&>option]:text-white ${
                          schoolSize ? 'text-white' : 'text-white/30'
                        }`}
                      >
                        <option value="" disabled>
                          Select capacity
                        </option>
                        {capacityOptions.map((option: string) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown
                        className="absolute end-4 text-white/40 text-xs pointer-events-none"
                        aria-hidden="true"
                      />
                    </FieldWrapper>

                    <FieldWrapper
                      label={t('contact.labels.message')}
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
                        placeholder={t('contact.placeholders.message')}
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
                      <span className="inline-flex items-center gap-2">
                        <FaSpinner
                          className="animate-spin"
                          aria-hidden="true"
                        />
                        {t('contact.sending')}
                      </span>
                    ) : (
                      <>
                        {t('contact.submit')}
                        <FaArrowRight aria-hidden="true" className="rtl:rotate-180" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-white/40 text-center">
                    <FaLock aria-hidden="true" />
                    <span>{t('contact.lockNote')}</span>
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
