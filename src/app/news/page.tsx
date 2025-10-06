import Link from "next/link";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabaseUtils } from "@/lib/supabase/utils";

// Mock data for now - will be replaced with real data from Supabase
const newsPosts = [
  {
    id: "1",
    slug: "medical-camp-mumbai-success",
    title: "Successful Medical Camp in Mumbai Benefits 500+ Beneficiaries",
    excerpt: "Our recent medical camp in Mumbai provided essential healthcare services to over 500 persons with disability, including free consultations, assistive device distribution, and therapy sessions.",
    published_at: "2024-01-15T10:00:00Z",
    author: "Dr. Sarah Johnson",
    read_time: "3 min read",
    category: "Medical Camps"
  },
  {
    id: "2",
    slug: "wheelchair-distribution-drive",
    title: "Wheelchair Distribution Drive Reaches Remote Villages",
    excerpt: "In partnership with local NGOs, we distributed 150 wheelchairs and mobility aids to persons with disability in remote villages across Maharashtra and Karnataka.",
    published_at: "2024-01-10T14:30:00Z",
    author: "Rajesh Kumar",
    read_time: "4 min read",
    category: "Mobility Support"
  },
  {
    id: "3",
    slug: "mental-health-awareness-month",
    title: "Mental Health Awareness Month: Breaking the Stigma",
    excerpt: "Throughout October, our mental health team conducted awareness sessions and provided counseling services to over 200 beneficiaries and their families.",
    published_at: "2024-01-05T09:15:00Z",
    author: "Priya Sharma",
    read_time: "5 min read",
    category: "Mental Health"
  },
  {
    id: "4",
    slug: "new-education-scholarships",
    title: "New Education Scholarships Available for Students with Disability",
    excerpt: "We're excited to announce 50 new scholarships for students with disability pursuing higher education across India, covering tuition fees and study materials.",
    published_at: "2024-01-01T16:45:00Z",
    author: "Michael D'Souza",
    read_time: "2 min read",
    category: "Education"
  }
];

const categories = ["All", "Medical Camps", "Mental Health", "Mobility Support", "Education", "Nutrition", "Events"];

export default async function NewsPage() {
  // In a real implementation, this would fetch from Supabase
  // const posts = await supabaseUtils.getPublishedPosts('en');

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">News & Updates</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Stay updated with our latest initiatives, success stories, and important announcements from AROKYA ILLAM CHARITABLE TRUST.
        </p>
      </div>

      {/* Featured Post */}
      {newsPosts.length > 0 && (
        <div className="mb-12">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <Badge className="mb-4">Featured</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {newsPosts[0].title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {newsPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(newsPosts[0].published_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {newsPosts[0].read_time}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {newsPosts[0].author}
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/news/${newsPosts[0].slug}`}>
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/2 bg-muted min-h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Featured image placeholder</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsPosts.slice(1).map((post) => (
          <Card key={post.id} className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{post.category}</Badge>
                <span className="text-xs text-muted-foreground">{post.read_time}</span>
              </div>
              <CardTitle className="text-lg leading-tight">
                <Link href={`/news/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <CardDescription className="flex-1 mb-4">
                {post.excerpt}
              </CardDescription>
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.published_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/news/${post.slug}`}>
                    Read More
                    <ArrowRight className="ml-2 w-3 h-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter Signup CTA */}
      <div className="mt-16">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="mb-6 opacity-90">
              Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button variant="secondary" size="lg" className="flex-1">
                Subscribe to Newsletter
              </Button>
              <Button variant="outline" size="lg" className="flex-1 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Follow on Social Media
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}