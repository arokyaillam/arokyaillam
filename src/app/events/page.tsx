import Link from "next/link";
import { ArrowRight, Calendar, Clock, ExternalLink, MapPin } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data for now - will be replaced with real Supabase data
const events = [
  {
    id: "1",
    title: "Free Medical Camp - Mumbai",
    description: "Comprehensive health check-ups, consultations with specialists, and distribution of assistive devices for persons with disability in the Mumbai region.",
    start_at: "2024-02-15T09:00:00Z",
    end_at: "2024-02-15T17:00:00Z",
    venue: "Mumbai Municipal Corporation Hall",
    city: "Mumbai",
    state: "Maharashtra",
    registration_url: "https://forms.gle/example1",
    category: "Medical Camp"
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
    registration_url: "https://forms.gle/example2",
    category: "Workshop"
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
    registration_url: "https://forms.gle/example3",
    category: "Distribution"
  },
  {
    id: "4",
    title: "Nutrition Support Camp - Chennai",
    description: "Free nutrition consultation and food package distribution for underprivileged persons with disability in the Chennai area.",
    start_at: "2024-03-01T08:00:00Z",
    end_at: "2024-03-01T14:00:00Z",
    venue: "Chennai Community Center",
    city: "Chennai",
    state: "Tamil Nadu",
    registration_url: "https://forms.gle/example4",
    category: "Nutrition Camp"
  }
];

const upcomingEvents = events.filter(event =>
  new Date(event.start_at) > new Date()
);

const pastEvents = events.filter(event =>
  new Date(event.end_at) < new Date()
);

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Events & Camps</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join us at our upcoming events, medical camps, and workshops designed to support persons with disability across India.
        </p>
      </div>

      {/* Upcoming Events */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {upcomingEvents.length} Events
          </Badge>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge>{event.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(event.start_at).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {new Date(event.start_at).toLocaleDateString()} - {new Date(event.end_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {new Date(event.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                        {new Date(event.end_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{event.venue}, {event.city}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button asChild className="flex-1">
                      <Link href={`/events/${event.id}`}>
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    {event.registration_url && (
                      <Button variant="outline" asChild className="flex-1">
                        <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                          Register
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Upcoming Events</h3>
              <p className="text-muted-foreground">
                Check back soon for upcoming events and camps in your area.
              </p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Past Events</h2>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {pastEvents.length} Events
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <Card key={event.id} className="opacity-75">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{event.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      Completed
                    </span>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(event.start_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <span>{event.city}</span>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/events/${event.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="bg-muted/30 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Want to Organize an Event?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Partner with us to organize medical camps, workshops, or awareness events in your community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/volunteer">
              Volunteer at Events
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}