"use client";

import { useEffect, useState } from "react";

// Force this page to be dynamic (not statically generated)
export const dynamic = 'force-dynamic';

// Force dynamic rendering to avoid static generation issues
export const dynamicParams = true;
import { useRouter } from "next/navigation";
import {
  Bell,
  Calendar,
  FileText,
  LogOut,
  MessageSquare,
  Settings,
  Users
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/lib/auth/auth-context";
import { createServiceClient } from "@/lib/supabase/service";

interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  totalVolunteers: number;
  totalContacts: number;
  recentEvents: number;
  recentPosts: number;
}

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    pendingApplications: 0,
    totalVolunteers: 0,
    totalContacts: 0,
    recentEvents: 0,
    recentPosts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const supabase = createServiceClient();

      // Fetch stats in parallel
      const [
        { count: totalApplications },
        { count: pendingApplications },
        { count: totalVolunteers },
        { count: totalContacts },
        { count: recentEvents },
        { count: recentPosts }
      ] = await Promise.all([
        supabase.from('forms_support_applications').select('*', { count: 'exact', head: true }),
        supabase.from('forms_support_applications').select('*', { count: 'exact', head: true }).eq('status', 'submitted'),
        supabase.from('forms_volunteers').select('*', { count: 'exact', head: true }),
        supabase.from('forms_contacts').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }).gte('start_at', new Date().toISOString()),
        supabase.from('posts').select('*', { count: 'exact', head: true }).eq('published_at', null).eq('locale', 'en'),
      ]);

      setStats({
        totalApplications: totalApplications || 0,
        pendingApplications: pendingApplications || 0,
        totalVolunteers: totalVolunteers || 0,
        totalContacts: totalContacts || 0,
        recentEvents: recentEvents || 0,
        recentPosts: recentPosts || 0,
      });
    } catch {
      // Error fetching dashboard stats - could show user notification here
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-muted/30">
        {/* Admin Header */}
        <header className="bg-background border-b sticky top-0 z-40">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <Badge variant="outline" className="capitalize">
                {user?.user_metadata?.role || 'User'}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {user?.email?.split('@')[0]}!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s an overview of your organization&apos;s activity.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalApplications}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.pendingApplications} pending review
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Volunteers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalVolunteers}</div>
                <p className="text-xs text-muted-foreground">
                  Registered volunteers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalContacts}</div>
                <p className="text-xs text-muted-foreground">
                  Contact form submissions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.recentEvents}</div>
                <p className="text-xs text-muted-foreground">
                  Events scheduled
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="applications" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="applications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Support Applications</CardTitle>
                  <CardDescription>
                    Review and manage support applications from beneficiaries.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-4">Applications management interface will be implemented here.</p>
                    <Button asChild>
                      <a href="/admin/applications">View All Applications</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="volunteers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Volunteer Management</CardTitle>
                  <CardDescription>
                    Manage volunteer registrations and assignments.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-4">Volunteer management interface will be implemented here.</p>
                    <Button asChild>
                      <a href="/admin/volunteers">View All Volunteers</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Posts & News</CardTitle>
                    <CardDescription>
                      Manage blog posts and news updates.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6 text-muted-foreground">
                      <p className="mb-4">{stats.recentPosts} draft posts pending review</p>
                      <Button asChild variant="outline">
                        <a href="/admin/posts">Manage Posts</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Events</CardTitle>
                    <CardDescription>
                      Manage upcoming events and camps.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6 text-muted-foreground">
                      <p className="mb-4">{stats.recentEvents} upcoming events</p>
                      <Button asChild variant="outline">
                        <a href="/admin/events">Manage Events</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Messages</CardTitle>
                  <CardDescription>
                    View and respond to contact form submissions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-4">{stats.totalContacts} messages received</p>
                    <Button asChild>
                      <a href="/admin/messages">View All Messages</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}