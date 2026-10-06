'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

import { CheckCircle2, Loader2 } from 'lucide-react';
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

const FORMSPREE_FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? 'YOUR_FORMSPREE_FORM_ID';

const SCHOOL_SIZE_OPTIONS = [
  'Under 200',
  '200 – 500',
  '500 – 1,000',
  '1,000+',
];

const inputClassName =
  'bg-[#E5E5E5] border-2 border-[#14213D] text-[#000000] focus-visible:ring-[#FCA311] py-6';

const labelClassName = 'block text-sm font-bold text-[#14213D] mb-2';

const FRIENDLY_ERROR_MESSAGE =
  'Something went wrong. Please try again or contact us directly on WhatsApp.';

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
            {isSuccess ? (
              <div className="text-center py-6">
                <CheckCircle2
                  className="h-14 w-14 text-green-600 mx-auto mb-4"
                  aria-hidden="true"
                />
                <p className="text-lg font-bold text-[#14213D]">
                  Thank you! Your request has been received. Our team will
                  contact you within 24 hours.
                </p>
                <Button
                  type="button"
                  onClick={handleSendAnother}
                  className="mt-6 bg-[#FCA311] hover:bg-[#FCA311]/90 text-[#000000] font-bold rounded-lg"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="text-left mb-5">
                  <label htmlFor="fullName" className={labelClassName}>
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    name="name"
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
                  <label htmlFor="email" className={labelClassName}>
                    Email Address
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
                  <label htmlFor="phone" className={labelClassName}>
                    Phone / WhatsApp Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6 00 00 00 00"
                    className={inputClassName}
                  />
                </div>

                <div className="text-left mb-5">
                  <label htmlFor="schoolSize" className={labelClassName}>
                    School Student Capacity
                  </label>
                  <Select
                    name="schoolSize"
                    required
                    value={schoolSize}
                    onValueChange={(value) => setSchoolSize(value ?? '')}
                  >
                    <SelectTrigger
                      id="schoolSize"
                      className="w-full bg-[#E5E5E5] border-2 border-[#14213D] text-[#000000] focus-visible:ring-[#FCA311] py-6"
                    >
                      <SelectValue placeholder="Select student capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      {SCHOOL_SIZE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-left mb-5">
                  <label htmlFor="message" className={labelClassName}>
                    Additional Notes / Message
                  </label>
                  <Input
                    id="message"
                    name="message"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your school's needs..."
                    className={inputClassName}
                  />
                </div>

                {errorMessage && (
                  <p role="alert" className="text-sm font-medium text-red-600 mb-4">
                    {errorMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-[#FCA311] hover:bg-[#FCA311]/90 text-[#000000] font-bold text-lg rounded-lg border-2 border-[#000000] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Sending request...
                    </span>
                  ) : (
                    'Book a Demo'
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
