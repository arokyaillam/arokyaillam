"use client";

import { useState } from "react";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createClient } from "@/lib/supabase/client";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  

  // Use centralized Supabase client (handles environment validation)
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // eslint-disable-next-line no-console
    console.log("🔐 Admin login attempt:", { email });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // eslint-disable-next-line no-console
      console.log("🔐 Auth result:", { data: data?.user?.email, error: error?.message });

      if (error) {
        // eslint-disable-next-line no-console
        console.error("🔐 Login error:", error);
        setError(error.message);
        return;
      }

      if (data.user) {
        // eslint-disable-next-line no-console
        console.log("🔐 User logged in:", data.user.email);
        // eslint-disable-next-line no-console
        console.log("🔐 User metadata:", data.user.user_metadata);

        // Check if user has admin or staff role
        const userRole = data.user.user_metadata?.role;
        // eslint-disable-next-line no-console
        console.log("🔐 User role:", userRole);

        if (userRole === 'admin' || userRole === 'staff') {
          // eslint-disable-next-line no-console
          console.log("🔐 Redirecting to admin dashboard...");
          // Use window.location for immediate redirect
          window.location.href = "/admin";
        } else {
          // eslint-disable-next-line no-console
          console.log("🔐 Access denied - insufficient role");
          setError("Access denied. Admin or staff privileges required.");
          await supabase.auth.signOut();
        }
      } else {
        // eslint-disable-next-line no-console
        console.log("🔐 No user data returned");
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("🔐 Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Sign in to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@arokyaillam.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>For admin access, please contact your system administrator.</p>
            <p className="mt-1">Don&apos;t have an account? Contact IT support.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}