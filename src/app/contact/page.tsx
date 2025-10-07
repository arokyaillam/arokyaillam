"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, Clock, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { type ContactFormData, contactFormSchema } from "@/lib/validations/contact-form";
import { supabaseUtils } from "@/lib/supabase/utils";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 XXXXX XXXXX", "+91 XXXXX XXXXX"],
    description: "Call us during business hours"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@arokyaillam.org", "support@arokyaillam.org"],
    description: "We respond within 24 hours"
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["Registered Office:", "AROKYA ILLAM CHARITABLE TRUST", "8/194, Branch School Street, Idaikal, Tenkasi, Tamil Nadu", "India - 627804"],
    description: "Visit us for in-person consultations"
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 9:00 AM - 2:00 PM", "Sunday: Closed"],
    description: "Emergency support available 24/7"
  }
];

const faqs = [
  {
    question: "How quickly do you respond to support requests?",
    answer: "We review all support applications within 48 hours and provide an initial response with next steps."
  },
  {
    question: "Do you provide services nationwide?",
    answer: "Yes, we work across India and partner with local organizations to deliver services in all states."
  },
  {
    question: "Are your services completely free?",
    answer: "Most of our services are free for eligible beneficiaries. Some specialized services may have minimal charges which we can discuss based on your needs."
  },
  {
    question: "How can I make a donation?",
    answer: "You can donate through bank transfer to our registered account. Visit our donate page for bank details and 80G tax exemption information."
  }
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
      };

      await supabaseUtils.submitContactForm(formData);

      setSubmitStatus("success");
      setSubmitMessage("Message received. Our team will respond soon.");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setSubmitMessage("There was an error sending your message. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get in touch with us. We&apos;re here to help and answer any questions you may have about our services and support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Choose the most convenient way to reach us. We&apos;re always happy to help with your questions and support needs.
            </p>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-3">
                      <Icon className="w-5 h-5 text-primary" />
                      {info.title}
                    </CardTitle>
                    <CardDescription>{info.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm font-medium">{detail}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact Form & FAQ */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Status */}
                {submitStatus && (
                  <Alert className={submitStatus === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                    {submitStatus === "success" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={submitStatus === "success" ? "text-green-800" : "text-red-800"}>
                      {submitMessage}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending Message..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions about our services and support.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-semibold text-base">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}