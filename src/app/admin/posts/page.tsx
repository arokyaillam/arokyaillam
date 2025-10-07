"use client";

import { useState } from "react";

// Force this page to be dynamic (not statically generated)
export const dynamic = 'force-dynamic';

// Force dynamic rendering to avoid static generation issues
export const dynamicParams = true;
import { Plus, Edit, Trash2, Eye, Calendar, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProtectedRoute } from "@/components/auth/protected-route";

// Mock data for now - will be replaced with real Supabase data
const mockPosts = [
  {
    id: "1",
    title: "Successful Medical Camp in Mumbai Benefits 500+ Beneficiaries",
    slug: "medical-camp-mumbai-success",
    excerpt: "Our recent medical camp in Mumbai provided essential healthcare services...",
    published_at: "2024-01-15T10:00:00Z",
    status: "published",
    author: "Dr. Sarah Johnson",
    locale: "en"
  },
  {
    id: "2",
    title: "Wheelchair Distribution Drive Reaches Remote Villages",
    slug: "wheelchair-distribution-drive",
    excerpt: "In partnership with local NGOs, we distributed 150 wheelchairs...",
    published_at: null,
    status: "draft",
    author: "Rajesh Kumar",
    locale: "en"
  },
  {
    id: "3",
    title: "Mental Health Awareness Month: Breaking the Stigma",
    slug: "mental-health-awareness-month",
    excerpt: "Throughout October, our mental health team conducted awareness sessions...",
    published_at: "2024-01-05T09:15:00Z",
    status: "published",
    author: "Priya Sharma",
    locale: "en"
  }
];

export default function AdminPostsPage() {
  const [posts, setPosts] = useState(mockPosts);

  const handleDeletePost = async (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        // In real implementation: await deletePost(postId);
        setPosts(posts.filter(post => post.id !== postId));
      } catch {
        // Error deleting post - could show user notification here
      }
    }
  };

  const handleTogglePublish = async (postId: string) => {
    try {
      // In real implementation: await togglePostPublish(postId);
      setPosts(posts.map(post =>
        post.id === postId
          ? {
              ...post,
              status: post.status === 'published' ? 'draft' : 'published',
              published_at: post.status === 'published' ? null : new Date().toISOString()
            }
          : post
      ));
    } catch {
      // Error updating post - could show user notification here
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Posts Management</h1>
            <p className="text-muted-foreground">
              Create, edit, and manage news posts and updates.
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {posts.filter(p => p.status === 'published').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {posts.filter(p => p.status === 'draft').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {posts.filter(p => p.published_at && new Date(p.published_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Posts</CardTitle>
            <CardDescription>
              Manage your news posts and updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-muted-foreground">{post.slug}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {post.author}
                      </div>
                    </TableCell>
                    <TableCell>
                      {post.published_at ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {new Date(post.published_at).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Not published</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTogglePublish(post.id)}
                        >
                          {post.status === 'published' ? 'Unpublish' : 'Publish'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}