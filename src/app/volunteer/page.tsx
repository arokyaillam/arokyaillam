"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Users, CheckCircle, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { volunteerFormSchema, type VolunteerFormData } from "@/lib/validations/volunteer-form";
import { supabaseUtils } from "@/lib/supabase/utils";

const volunteerOpportunities = [
  {
    title: "Community Outreach",
    description: "Help us reach more beneficiaries in your local community",
    commitment: "2-4 hours per week"
  },
  {
    title: "Administrative Support",
    description: "Assist with documentation, data entry, and office tasks",
    commitment: "Flexible hours"
  },
  {
    title: "Event Management",
    description: "Help organize and manage health camps and awareness events",
    commitment: "Event-based"
  },
  {
    title: "Fundraising",
    description: "Support our fundraising campaigns and donor engagement",
    commitment: "As per availability"
  },
  {
    title: "Technical Support",
    description: "Help with website maintenance, social media, and digital outreach",
    commitment: "Remote work possible"
  },
  {
    title: "Healthcare Support",
    description: "Medical professionals to support our health camps and programs",
    commitment: "As per expertise"
  }
];

export default function VolunteerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerFormSchema),
  });

  const onSubmit = async (data: VolunteerFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = {
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        skills: data.skills,
        availability: data.availability,
        notes: data.notes || null,
      };

      await supabaseUtils.submitVolunteerForm(formData);

      setSubmitStatus("success");
      setSubmitMessage("Thanks for volunteering! We will get in touch soon to discuss opportunities that match your interests and availability.");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setSubmitMessage("There was an error submitting your volunteer application. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Join Our Volunteer Team</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Make a meaningful difference in the lives of persons with disability. Join our dedicated team of volunteers across India.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Volunteer Opportunities */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Volunteer Opportunities</h2>
            <p className="text-muted-foreground mb-6">
              We offer various volunteer opportunities that match different skills, interests, and availability levels.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {volunteerOpportunities.map((opportunity, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                  <CardDescription>{opportunity.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-primary font-medium">
                    Commitment: {opportunity.commitment}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Volunteer Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Volunteer Application
            </CardTitle>
            <CardDescription>
              Fill out this form and we'll match you with suitable volunteer opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  {...register("full_name")}
                  placeholder="Enter your full name"
                />
                {errors.full_name && (
                  <p className="text-sm text-destructive">{errors.full_name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="+91 XXXXX XXXXX"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills & Experience *</Label>
                <Textarea
                  id="skills"
                  {...register("skills")}
                  placeholder="Tell us about your skills, professional background, and relevant experience..."
                  rows={4}
                />
                {errors.skills && (
                  <p className="text-sm text-destructive">{errors.skills.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability *</Label>
                <Textarea
                  id="availability"
                  {...register("availability")}
                  placeholder="When are you available to volunteer? (days, times, frequency, location preferences, etc.)"
                  rows={3}
                />
                {errors.availability && (
                  <p className="text-sm text-destructive">{errors.availability.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  {...register("notes")}
                  placeholder="Any specific preferences, questions, or additional information..."
                  rows={3}
                />
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
                {isSubmitting ? "Submitting Application..." : "Submit Volunteer Application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}