'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

const STUDENT_COUNT_OPTIONS = [
  'Select student count',
  'Under 200',
  '200 – 500',
  '500 – 1,000',
  '1,000+',
];

const inputClassName =
  'w-full px-4 py-3 bg-[#E5E5E5] border-2 border-[#14213D] rounded-lg text-[#000000] focus:outline-none focus:border-[#FCA311]';

const labelClassName = 'block text-sm font-bold text-[#14213D] mb-2';

export default function Contact() {
  const [fullName, setFullName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [cityCountry, setCityCountry] = useState('');
  const [email, setEmail] = useState('');
  const [studentCount, setStudentCount] = useState(
    STUDENT_COUNT_OPTIONS[0]
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="bg-[#14213D] px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl text-center">
        <span className="bg-[#FCA311] text-[#000000] font-bold text-xs uppercase px-3 py-1 rounded-full inline-block mb-3">
          Limited V1 Onboarding
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#FFFFFF] text-center">
          Bring Modern Management to Your School
        </h2>
        <p className="text-base md:text-lg text-[#E5E5E5] mt-4 max-w-2xl mx-auto text-center">
          We are accepting a select group of global private schools for our V1
          launch. Reserve your spot for dedicated setup and early partner
          pricing.
        </p>

        <div className="max-w-2xl mx-auto mt-12 bg-[#FFFFFF] border-2 border-[#000000] rounded-xl p-6 md:p-10 shadow-none text-left">
          {isSubmitted ? (
            <p className="text-center text-lg font-bold text-[#14213D]">
              Thank you for your interest! We will contact you shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="text-left mb-5">
                <label htmlFor="fullName" className={labelClassName}>
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className={inputClassName}
                />
              </div>

              <div className="text-left mb-5">
                <label htmlFor="schoolName" className={labelClassName}>
                  School Name
                </label>
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
              </div>

              <div className="text-left mb-5">
                <label htmlFor="cityCountry" className={labelClassName}>
                  City &amp; Country
                </label>
                <input
                  id="cityCountry"
                  name="cityCountry"
                  type="text"
                  required
                  value={cityCountry}
                  onChange={(e) => setCityCountry(e.target.value)}
                  placeholder="Casablanca, Morocco"
                  className={inputClassName}
                />
              </div>

              <div className="text-left mb-5">
                <label htmlFor="email" className={labelClassName}>
                  Institutional Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@school.edu"
                  className={inputClassName}
                />
              </div>

              <div className="text-left mb-5">
                <label htmlFor="studentCount" className={labelClassName}>
                  Estimated Student Count
                </label>
                <select
                  id="studentCount"
                  name="studentCount"
                  required
                  value={studentCount}
                  onChange={(e) => setStudentCount(e.target.value)}
                  className={inputClassName}
                >
                  {STUDENT_COUNT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#FCA311] text-[#000000] font-bold text-lg rounded-lg border-2 border-[#000000] hover:brightness-95 transition-all mt-4 cursor-pointer"
              >
                Request Early Access
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
