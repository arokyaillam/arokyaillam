"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "staff" | "viewer";
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  requiredRole = "viewer",
  fallback
}: ProtectedRouteProps) {
  const { user, loading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
      return;
    }

    if (!loading && user && !hasRole(requiredRole)) {
      router.push("/admin/unauthorized");
      return;
    }
  }, [user, loading, requiredRole, hasRole, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !hasRole(requiredRole)) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}