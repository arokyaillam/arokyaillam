import Link from "next/link";
import { Heart, Users, Accessibility, Calendar, Utensils, GraduationCap, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const programs = [
  {
    icon: Users,
    title: "Mental health wellness support",
    description: "Comprehensive mental health services and counseling for persons with disability and their families.",
  },
  {
    icon: Accessibility,
    title: "Patient care",
    description: "Medical care, rehabilitation services, and assistive devices for improved quality of life.",
  },
  {
    icon: Accessibility,
    title: "Accessibility devices for mobility",
    description: "Providing wheelchairs, prosthetics, and other mobility aids to enhance independence.",
  },
  {
    icon: Calendar,
    title: "Camps for underprivileged PwDs",
    description: "Medical camps and support programs specifically designed for underprivileged persons with disability.",
  },
  {
    icon: Utensils,
    title: "Food and groceries support for underprivileged PwDs",
    description: "Nutritional support and food assistance for persons with disability in need.",
  },
  {
    icon: GraduationCap,
    title: "Education support for PwDs",
    description: "Educational assistance, scholarships, and learning resources for persons with disability.",
  },
];

const impactStats = [
  { label: "Beneficiaries", value: "—" },
  { label: "Assistive devices delivered", value: "—" },
  { label: "Camps conducted", value: "—" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="outline" className="text-sm">
              AROKYA ILLAM CHARITABLE TRUST · Think better.
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Health, dignity, and access for every person with disability.
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Care, devices, camps, nutrition, and education support — across India.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/get-support">
                  Get Support
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link href="/donate">
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Programs</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support services designed to improve the quality of life for persons with disability across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {program.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-muted-foreground">
              Making a difference in the lives of persons with disability across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-muted-foreground">
                  {stat.label}
                </div>
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
                Ready to Make a Difference?
              </h2>
              <p className="text-xl opacity-90">
                Whether you need support or want to contribute to our mission, we're here to help.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <Link href="/get-support">
                  Get Support
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/volunteer">
                  Join as Volunteer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
