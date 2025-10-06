"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Calendar, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProtectedRoute } from "@/components/auth/protected-route";

// Mock data for now - will be replaced with real Supabase data
const mockEvents = [
  {
    id: "1",
    title: "Free Medical Camp - Mumbai",
    description: "Comprehensive health check-ups, consultations with specialists, and distribution of assistive devices for persons with disability in the Mumbai region.",
    start_at: "2024-02-15T09:00:00Z",
    end_at: "2024-02-15T17:00:00Z",
    venue: "Mumbai Municipal Corporation Hall",
    city: "Mumbai",
    state: "Maharashtra",
    status: "upcoming",
    registrations: 45
  },
  {
    id: "2",
    title: "Mental Health Awareness Workshop - Delhi",
    description: "Interactive workshop on mental health awareness, coping strategies, and available support services for persons with disability and their families.",
    start_at: "2024-02-20T10:00:00Z",
    end_at: "2024-02-20T16:00:00Z",
    venue: "India Habitat Centre",
    city: "New Delhi",
    state: "Delhi",
    status: "upcoming",
    registrations: 23
  },
  {
    id: "3",
    title: "Wheelchair Distribution Drive - Bangalore",
    description: "Distribution of wheelchairs and mobility aids to persons with disability in Bangalore. Assessment and fitting services will be provided.",
    start_at: "2024-02-25T09:30:00Z",
    end_at: "2024-02-25T15:30:00Z",
    venue: "Bangalore City Corporation",
    city: "Bangalore",
    state: "Karnataka",
    status: "upcoming",
    registrations: 67
  },
  {
    id: "4",
    title: "Nutrition Support Camp - Chennai",
    description: "Free nutrition consultation and food package distribution for underprivileged persons with disability in the Chennai area.",
    start_at: "2024-01-15T08:00:00Z",
    end_at: "2024-01-15T14:00:00Z",
    venue: "Chennai Community Center",
    city: "Chennai",
    state: "Tamil Nadu",
    status: "completed",
    registrations: 89
  }
];

export default function AdminEventsPage() {
  const [events, setEvents] = useState(mockEvents);

  const handleDeleteEvent = async (eventId: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        // In real implementation: await deleteEvent(eventId);
        setEvents(events.filter(event => event.id !== eventId));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-green-100 text-green-800">Upcoming</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const completedEvents = events.filter(event => event.status === 'completed');

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Events Management</h1>
            <p className="text-muted-foreground">
              Create, edit, and manage events and camps.
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {upcomingEvents.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {completedEvents.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {events.reduce((sum, event) => sum + (event.registrations || 0), 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Events</CardTitle>
            <CardDescription>
              Manage your events and camps.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registrations</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {event.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {new Date(event.start_at).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(event.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                          {new Date(event.end_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          {event.venue}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {event.city}, {event.state}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(event.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{event.registrations || 0}</span>
                      </div>
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
                          onClick={() => handleDeleteEvent(event.id)}
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