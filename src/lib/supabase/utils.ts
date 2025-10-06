import { createClient as createBrowserClient } from './client'

// Database Types
export type Database = {
  public: {
    Tables: {
      programs: {
        Row: {
          id: string
          slug: string
          title: string
          summary: string
          body: string
          locale: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          summary: string
          body: string
          locale?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          summary?: string
          body?: string
          locale?: string
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          body: string
          published_at: string | null
          locale: string
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt?: string | null
          body: string
          published_at?: string | null
          locale?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          excerpt?: string | null
          body?: string
          published_at?: string | null
          locale?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          start_at: string
          end_at: string | null
          venue: string | null
          city: string | null
          state: string | null
          registration_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          start_at: string
          end_at?: string | null
          venue?: string | null
          city?: string | null
          state?: string | null
          registration_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          start_at?: string
          end_at?: string | null
          venue?: string | null
          city?: string | null
          state?: string | null
          registration_url?: string | null
          created_at?: string
        }
      }
      forms_contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          created_at?: string
        }
      }
      forms_support_applications: {
        Row: {
          id: string
          full_name: string
          guardian_name: string | null
          email: string | null
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          pincode: string | null
          disability_type: string | null
          support_needed: string | null
          income_proof_url: string | null
          medical_proof_url: string | null
          additional_notes: string | null
          status: string
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          full_name: string
          guardian_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          pincode?: string | null
          disability_type?: string | null
          support_needed?: string | null
          income_proof_url?: string | null
          medical_proof_url?: string | null
          additional_notes?: string | null
          status?: string
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          full_name?: string
          guardian_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          pincode?: string | null
          disability_type?: string | null
          support_needed?: string | null
          income_proof_url?: string | null
          medical_proof_url?: string | null
          additional_notes?: string | null
          status?: string
          created_at?: string
          created_by?: string | null
        }
      }
      forms_volunteers: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          skills: string | null
          availability: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone?: string | null
          skills?: string | null
          availability?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string | null
          skills?: string | null
          availability?: string | null
          notes?: string | null
          created_at?: string
        }
      }
    }
  }
}

// Helper functions for common operations
export const supabaseUtils = {
  // Get published posts
  async getPublishedPosts(locale = 'en') {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('locale', locale)
      .not('published_at', 'is', null)
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get all programs
  async getPrograms(locale = 'en') {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('locale', locale)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get upcoming events
  async getUpcomingEvents() {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('start_at', new Date().toISOString())
      .order('start_at', { ascending: true })

    if (error) throw error
    return data
  },

  // Submit contact form
  async submitContactForm(formData: Database['public']['Tables']['forms_contacts']['Insert']) {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('forms_contacts')
      .insert(formData)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Submit support application
  async submitSupportApplication(formData: Database['public']['Tables']['forms_support_applications']['Insert']) {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('forms_support_applications')
      .insert(formData)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Submit volunteer form
  async submitVolunteerForm(formData: Database['public']['Tables']['forms_volunteers']['Insert']) {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('forms_volunteers')
      .insert(formData)
      .select()
      .single()

    if (error) throw error
    return data
  }
}