import { Shield, Users, FileText, Award, Heart, Target, Eye, Scale } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We approach every individual with empathy, understanding, and genuine care for their unique needs and circumstances.",
  },
  {
    icon: Target,
    title: "Accessibility",
    description: "We are committed to breaking down barriers and ensuring that all persons with disability have equal access to opportunities.",
  },
  {
    icon: Eye,
    title: "Inclusion",
    description: "We believe in creating a society where persons with disability are fully included and valued as equal members.",
  },
  {
    icon: Scale,
    title: "Justice",
    description: "We advocate for the rights and dignity of persons with disability, ensuring fair treatment and equal opportunities.",
  },
];

const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Founder & CEO",
    description: "Leading healthcare professional with 15+ years of experience in disability care and rehabilitation.",
    achievements: ["MD in Physical Medicine", "PhD in Rehabilitation Sciences", "Former WHO Consultant"],
  },
  {
    name: "Rajesh Kumar",
    role: "Program Director",
    description: "Expert in community health programs and disability inclusion initiatives across India.",
    achievements: ["MPH from AIIMS", "10+ years in NGO sector", "State Health Award 2022"],
  },
  {
    name: "Priya Sharma",
    role: "Clinical Director",
    description: "Specialist in mental health and counseling services for persons with disability.",
    achievements: ["MSc Clinical Psychology", "Certified CBT Therapist", "Mental Health Advocate"],
  },
  {
    name: "Michael D'Souza",
    role: "Operations Manager",
    description: "Ensures smooth delivery of services and manages our nationwide network of support programs.",
    achievements: ["MBA Healthcare Management", "Former MSF Coordinator", "Logistics Excellence Award"],
  },
];

const governance = [
  {
    title: "Board of Trustees",
    description: "Our board consists of healthcare professionals, legal experts, and community leaders ensuring transparent governance.",
  },
  {
    title: "Annual Audits",
    description: "All financial and operational activities are audited annually by certified chartered accountants.",
  },
  {
    title: "Compliance",
    description: "Registered under the Indian Trusts Act 1882 and compliant with all regulatory requirements for charitable organizations.",
  },
  {
    title: "Transparency",
    description: "We publish annual reports detailing our activities, impact metrics, and financial statements for public scrutiny.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="outline">About AROKYA ILLAM</Badge>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Building a More Inclusive India
              </h1>
              <p className="text-xl text-muted-foreground">
                AROKYA ILLAM CHARITABLE TRUST (AICT) is a public charitable trust working across India to ensure dignity, access, and inclusion for persons with disability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
                <p className="text-lg leading-relaxed">
                  To provide healthcare, rehabilitation, education, and social support that improves the quality of life for persons with disability. We envision a society where every person with disability can live with dignity, achieve their potential, and participate fully in community life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and shape our approach to supporting persons with disability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated professionals working to make a difference in the lives of persons with disability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-lg font-medium text-primary">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {member.description}
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {member.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center">
                          <Award className="w-4 h-4 mr-2 text-primary" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Governance & Transparency</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest standards of governance and transparency in all our operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {governance.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Policies</h2>
              <p className="text-xl text-muted-foreground">
                We are committed to ethical practices, data protection, and responsible resource management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <CardHeader className="pb-4">
                  <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We protect the personal information of all beneficiaries and maintain strict confidentiality standards.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardHeader className="pb-4">
                  <Scale className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Terms of Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Clear guidelines for using our services and participating in our programs across India.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardHeader className="pb-4">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Inclusion Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Our commitment to serving all persons with disability regardless of background or circumstances.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}