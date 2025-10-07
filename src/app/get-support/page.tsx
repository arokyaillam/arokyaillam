"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, FileText, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { type SupportFormData, supportFormSchema } from "@/lib/validations/support-form";
import { supabaseUtils } from "@/lib/supabase/utils";
import { createClient } from "@/lib/supabase/client";

const disabilityTypes = [
  "Visual Impairment",
  "Hearing Impairment",
  "Speech and Language Disability",
  "Locomotor Disability",
  "Mental Illness",
  "Intellectual Disability",
  "Learning Disability",
  "Cerebral Palsy",
  "Autism Spectrum Disorder",
  "Muscular Dystrophy",
  "Chronic Neurological Conditions",
  "Blood Disorder",
  "Multiple Sclerosis",
  "Parkinson's Disease",
  "Hemophilia",
  "Thalassemia",
  "Sickle Cell Disease",
  "Multiple Disabilities",
  "Other"
];

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep"
];

export default function GetSupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SupportFormData>({
    resolver: zodResolver(supportFormSchema),
  });

  const incomeProofFile = watch("income_proof_file");
  const medicalProofFile = watch("medical_proof_file");

  const handleFileUpload = async (file: File, type: "income" | "medical") => {
    if (!file) return null;

    try {
      // Use centralized Supabase client
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from('uploads')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error uploading ${type} proof:`, error);
      return null;
    }
  };

  const onSubmit = async (data: SupportFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Upload files if provided
      const incomeProofUrl = data.income_proof_file
        ? await handleFileUpload(data.income_proof_file, "income")
        : null;

      const medicalProofUrl = data.medical_proof_file
        ? await handleFileUpload(data.medical_proof_file, "medical")
        : null;

      // Submit form data to Supabase
      const formData = {
        full_name: data.full_name,
        guardian_name: data.guardian_name || null,
        email: data.email || null,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        disability_type: data.disability_type,
        support_needed: data.support_needed,
        income_proof_url: incomeProofUrl,
        medical_proof_url: medicalProofUrl,
        additional_notes: data.additional_notes || null,
        status: "submitted",
      };

      await supabaseUtils.submitSupportApplication(formData);

      setSubmitStatus("success");
      setSubmitMessage("Thank you. Your application has been received. Our team will review it and contact you soon.");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setSubmitMessage("There was an error submitting your application. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Get Support</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Apply for the support services you need. Our team will review your application and get back to you within 48 hours.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Support Application Form
          </CardTitle>
          <CardDescription>
            Please fill out all required fields. Fields marked with * are mandatory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    {...register("full_name")}
                    placeholder="Enter your full name"
                    aria-required="true"
                    aria-invalid={errors.full_name ? "true" : "false"}
                    aria-describedby={errors.full_name ? "full_name-error" : undefined}
                  />
                  {errors.full_name && (
                    <p id="full_name-error" className="text-sm text-destructive" role="alert">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardian_name">Guardian Name</Label>
                  <Input
                    id="guardian_name"
                    {...register("guardian_name")}
                    placeholder="Enter guardian's name (if applicable)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
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
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Address Information</h3>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  {...register("address")}
                  placeholder="Street address, locality, landmark"
                  rows={3}
                />
                {errors.address && (
                  <p className="text-sm text-destructive">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    {...register("city")}
                    placeholder="City name"
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select onValueChange={(value: string) => setValue("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-sm text-destructive">{errors.state.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    {...register("pincode")}
                    placeholder="123456"
                    maxLength={6}
                  />
                  {errors.pincode && (
                    <p className="text-sm text-destructive">{errors.pincode.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Disability & Support Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Support Requirements</h3>

              <div className="space-y-2">
                <Label htmlFor="disability_type">Type of Disability *</Label>
                <Select onValueChange={(value: string) => setValue("disability_type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select disability type" />
                  </SelectTrigger>
                  <SelectContent>
                    {disabilityTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.disability_type && (
                  <p className="text-sm text-destructive">{errors.disability_type.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="support_needed">Support Needed *</Label>
                <Textarea
                  id="support_needed"
                  {...register("support_needed")}
                  placeholder="Please describe in detail what kind of support you need (medical care, mobility devices, financial assistance, etc.)"
                  rows={4}
                />
                {errors.support_needed && (
                  <p className="text-sm text-destructive">{errors.support_needed.message}</p>
                )}
              </div>
            </div>

            {/* Document Uploads */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Document Uploads (Optional)</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="income_proof">Income Proof</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="space-y-2">
                      <Input
                        id="income_proof"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setValue("income_proof_file", file);
                        }}
                      />
                      <Label htmlFor="income_proof" className="cursor-pointer text-sm text-primary hover:underline">
                        Click to upload income proof
                      </Label>
                      {incomeProofFile && (
                        <p className="text-xs text-muted-foreground">
                          Selected: {incomeProofFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload salary slip, income certificate, or BPL card (PDF, JPG, PNG)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medical_proof">Medical Proof</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="space-y-2">
                      <Input
                        id="medical_proof"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setValue("medical_proof_file", file);
                        }}
                      />
                      <Label htmlFor="medical_proof" className="cursor-pointer text-sm text-primary hover:underline">
                        Click to upload medical proof
                      </Label>
                      {medicalProofFile && (
                        <p className="text-xs text-muted-foreground">
                          Selected: {medicalProofFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload disability certificate or medical reports (PDF, JPG, PNG)
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="additional_notes">Additional Notes</Label>
              <Textarea
                id="additional_notes"
                {...register("additional_notes")}
                placeholder="Any additional information you'd like to share..."
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting Application..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}