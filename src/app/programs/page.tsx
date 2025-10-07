import Link from "next/link";
import { Accessibility, ArrowRight, Calendar, GraduationCap, Mail, Users, Utensils } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const programs = [
  {
    id: "mental-health",
    icon: Users,
    title: "Mental health wellness support",
    description: "Comprehensive mental health services and counseling for persons with disability and their families.",
    longDescription: "Our mental health wellness program provides accessible and inclusive mental health support tailored to the unique needs of persons with disability. We offer individual counseling, group therapy sessions, family counseling, and crisis intervention services.",
    features: [
      "Individual counseling sessions with qualified psychologists",
      "Group therapy and support groups",
      "Family counseling and caregiver support",
      "Crisis intervention and emergency support",
      "Tele-counseling services for remote areas",
      "Mental health awareness workshops"
    ],
    eligibility: "Available to all persons with disability and their families across India.",
    contact: "Contact us to schedule an initial consultation."
  },
  {
    id: "patient-care",
    icon: Accessibility,
    title: "Patient care",
    description: "Medical care, rehabilitation services, and assistive devices for improved quality of life.",
    longDescription: "Our patient care program encompasses comprehensive medical care, rehabilitation services, and assistive technology support. We work with healthcare professionals to ensure persons with disability receive the care they need.",
    features: [
      "Medical consultations with specialists",
      "Physical therapy and rehabilitation services",
      "Occupational therapy programs",
      "Speech therapy for communication support",
      "Pain management and palliative care",
      "Regular health check-ups and monitoring"
    ],
    eligibility: "Open to persons with disability requiring medical care and rehabilitation support.",
    contact: "Medical records may be required for specialized treatments."
  },
  {
    id: "mobility-devices",
    icon: Accessibility,
    title: "Accessibility devices for mobility",
    description: "Providing wheelchairs, prosthetics, and other mobility aids to enhance independence.",
    longDescription: "We provide a range of mobility aids and assistive devices to help persons with disability achieve greater independence and participate more fully in daily activities. All devices are fitted and customized to individual needs.",
    features: [
      "Manual and powered wheelchairs",
      "Prosthetic limbs and orthotic devices",
      "Walking aids and mobility scooters",
      "Home modification equipment",
      "Vehicle adaptations for accessibility",
      "Device maintenance and repair services"
    ],
    eligibility: "Available based on medical assessment and individual mobility requirements.",
    contact: "Assessment by qualified professionals required for device fitting."
  },
  {
    id: "camps",
    icon: Calendar,
    title: "Camps for underprivileged PwDs",
    description: "Medical camps and support programs specifically designed for underprivileged persons with disability.",
    longDescription: "Our specialized camps bring healthcare services directly to underprivileged communities. These camps provide comprehensive health screenings, treatments, and support services in accessible locations.",
    features: [
      "Free medical consultations",
      "Health screenings and diagnostics",
      "Distribution of assistive devices",
      "Therapy and rehabilitation sessions",
      "Awareness and education programs",
      "Follow-up care coordination"
    ],
    eligibility: "Priority given to persons with disability from economically disadvantaged backgrounds.",
    contact: "Camp schedules announced through local networks and our website."
  },
  {
    id: "nutrition-support",
    icon: Utensils,
    title: "Food and groceries support for underprivileged PwDs",
    description: "Nutritional support and food assistance for persons with disability in need.",
    longDescription: "Good nutrition is essential for health and wellbeing. Our nutrition support program ensures that persons with disability have access to nutritious food and groceries, especially those facing economic challenges.",
    features: [
      "Monthly grocery packages",
      "Nutritional counseling and guidance",
      "Special diet support for medical conditions",
      "Emergency food relief during crises",
      "Nutrition education workshops",
      "Community kitchen partnerships"
    ],
    eligibility: "Available to persons with disability facing food insecurity or nutritional challenges.",
    contact: "Assessment of needs and regular support coordination provided."
  },
  {
    id: "education-support",
    icon: GraduationCap,
    title: "Education support for PwDs",
    description: "Educational assistance, scholarships, and learning resources for persons with disability.",
    longDescription: "Education is a fundamental right and a pathway to independence. We support persons with disability in their educational journey from school to higher education and vocational training.",
    features: [
      "School fee assistance and scholarships",
      "Educational materials and assistive technology",
      "Tutoring and academic support",
      "Vocational training programs",
      "Higher education scholarships",
      "Career counseling and placement support"
    ],
    eligibility: "Open to students with disability pursuing education at any level.",
    contact: "Academic records and disability certificate may be required."
  }
];

const supportProcess = [
  {
    step: "1",
    title: "Submit Application",
    description: "Fill out our Get Support form with your details and requirements."
  },
  {
    step: "2",
    title: "Assessment",
    description: "Our team reviews your application and conducts necessary assessments."
  },
  {
    step: "3",
    title: "Support Plan",
    description: "We create a personalized support plan based on your needs."
  },
  {
    step: "4",
    title: "Implementation",
    description: "We coordinate and deliver the support services you need."
  }
];

export default function ProgramsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="outline">Our Programs</Badge>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Comprehensive Support Services
              </h1>
              <p className="text-xl text-muted-foreground">
                We provide a wide range of services and support to improve the quality of life for persons with disability across India.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/get-support">
                Get Support Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <Card key={program.id} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-6 flex-1">
                      {program.longDescription}
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/get-support?program=${program.id}`}>
                        Apply for Support
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Get Support</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our simple four-step process ensures you get the support you need efficiently and effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {supportProcess.map((process, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
                {index < supportProcess.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 w-8 h-8 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Access Support?
              </h2>
              <p className="text-xl opacity-90">
                Take the first step towards getting the support you need. Our team is here to help you every step of the way.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <Link href="/get-support">
                  Apply for Support
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
            </div>

            <div className="pt-8 border-t border-primary-foreground/20">
              <p className="text-sm opacity-75">
                For urgent support needs, call us directly or visit our nearest support center.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}