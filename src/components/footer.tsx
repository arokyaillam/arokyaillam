import * as React from "react"
import Link from "next/link"
import { Heart, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AICT</span>
              </div>
              <div>
                <h3 className="font-bold">AROKYA ILLAM</h3>
                <p className="text-sm text-muted-foreground">CHARITABLE TRUST</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Think better. Providing healthcare and aided support for persons with disability across India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/programs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Programs
              </Link>
              <Link href="/get-support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Get Support
              </Link>
              <Link href="/volunteer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Volunteer
              </Link>
              <Link href="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Events
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/news" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                News & Updates
              </Link>
              <Link href="/donate" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Donate
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Use
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Get in Touch</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>India</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@arokyaillam.org</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+91 XXXXX XXXXX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} AROKYA ILLAM CHARITABLE TRUST. All rights reserved.
          </div>

          {/* Bank Details Note */}
          <div className="text-xs text-muted-foreground text-center sm:text-right">
            <p>Donations by bank transfer only.</p>
            <p>80G tax exemption details available upon request.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}