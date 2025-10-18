"use client";

import { useState } from 'react';
import { Building2, KeyRound, LogIn, Users, User, Shield, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { LoginForm, UserRole } from '@/components/login-form';

const roles: {
  type: 'Admin' | 'Supervisor' | 'User';
  title: UserRole;
  description: string;
  icon: React.ReactNode;
  subRoles?: { title: UserRole; description: string }[];
}[] = [
  {
    type: 'Admin',
    title: 'Admin',
    description: 'Manage halls, users, and system settings.',
    icon: <Shield className="size-8 text-primary" />,
  },
  {
    type: 'Supervisor',
    title: 'Supervisor',
    description: 'Oversee bookings and manage approvals.',
    icon: <User className="size-8 text-primary" />,
  },
  {
    type: 'User',
    title: 'User',
    description: 'Book seminar halls for events.',
    icon: <Users className="size-8 text-primary" />,
    subRoles: [
      { title: 'HOD', description: 'Heads of Departments' },
      { title: 'TPO', description: 'Training & Placement Office' },
      { title: 'Club', description: 'Student Clubs & Organizations' },
      { title: 'Management', description: 'College Management' },
    ],
  },
];

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  return (
    <>
      <div className="relative min-h-screen w-full bg-background">
        <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[10px_10px] [mask-image:linear-gradient(180deg,transparent,black)]"></div>
        <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
          <header className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Building2 className="h-12 w-12 text-primary" />
              <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
                Hallway
              </h1>
            </div>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Smart Seminar Hall Booking for a Seamless College Experience.
            </p>
          </header>

          <main className="mt-12 w-full max-w-4xl">
            <h2 className="mb-6 text-center font-headline text-3xl font-semibold">Select Your Role to Login</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {roles.map((role) => (
                <Card
                  key={role.type}
                  className="group flex transform-gpu flex-col overflow-hidden border-2 border-transparent bg-card/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-2xl hover:shadow-primary/20"
                >
                  <CardHeader className="items-center text-center">
                    {role.icon}
                    <CardTitle className="font-headline text-2xl">{role.title}</CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-end">
                    {role.subRoles ? (
                      <div className="grid grid-cols-2 gap-2">
                        {role.subRoles.map((subRole) => (
                          <Button key={subRole.title} variant="secondary" onClick={() => handleRoleSelect(subRole.title)}>
                            {subRole.title}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <Button onClick={() => handleRoleSelect(role.title)}>
                        <LogIn className="mr-2 size-4" /> Login as {role.title}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>

          <footer className="mt-16 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Hallway. All rights reserved.</p>
            <p className="mt-1">A Vibe Coding Event Project</p>
          </footer>
        </div>
      </div>

      <Dialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedRole && <LoginForm role={selectedRole} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
