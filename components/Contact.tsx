'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const STUDENT_COUNT_OPTIONS = [
  'Under 200',
  '200 – 500',
  '500 – 1,000',
  '1,000+',
];

const inputClassName =
  'bg-[#E5E5E5] border-2 border-[#14213D] text-[#000000] focus-visible:ring-[#FCA311] py-6';

const labelClassName = 'block text-sm font-bold text-[#14213D] mb-2';

export default function Contact() {
  const [fullName, setFullName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [cityCountry, setCityCountry] = useState('');
  const [email, setEmail] = useState('');
  const [studentCount, setStudentCount] = useState('');
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

        <Card className="max-w-2xl mx-auto bg-[#FFFFFF] border-2 border-[#000000] rounded-xl p-6 md:p-8 shadow-none mt-12 text-left">
          <CardHeader className="p-0">
            <CardTitle className="sr-only">Request Early Access</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
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
                  <Input
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
                  <Input
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
                  <Input
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
                  <Input
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
                  <Select
                    name="studentCount"
                    required
                    value={studentCount}
                    onValueChange={(value) => setStudentCount(value ?? '')}
                  >
                    <SelectTrigger
                      id="studentCount"
                      className="w-full bg-[#E5E5E5] border-2 border-[#14213D] text-[#000000] focus-visible:ring-[#FCA311] py-6"
                    >
                      <SelectValue placeholder="Select student count" />
                    </SelectTrigger>
                    <SelectContent>
                      {STUDENT_COUNT_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full py-6 bg-[#FCA311] hover:bg-[#FCA311]/90 text-[#000000] font-bold text-lg rounded-lg border-2 border-[#000000]"
                >
                  Request Early Access
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
