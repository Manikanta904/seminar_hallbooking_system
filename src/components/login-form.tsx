"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { KeyRound, Mail, LogIn, Building, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export type UserRole = 'Admin' | 'Supervisor' | 'HOD' | 'TPO' | 'Club' | 'Management';

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  department: z.string().optional(),
  club: z.string().optional(),
});

const roleDetails: Record<UserRole, { icon: React.ElementType; title: string }> = {
  Admin: { icon: KeyRound, title: "Admin Login" },
  Supervisor: { icon: KeyRound, title: "Supervisor Login" },
  HOD: { icon: Building, title: "HOD Login" },
  TPO: { icon: KeyRound, title: "TPO Login" },
  Club: { icon: Users, title: "Club Login" },
  Management: { icon: KeyRound, title: "Management Login" },
};

export function LoginForm({ role }: { role: UserRole }) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Login Successful",
      description: `Welcome! Redirecting to dashboard...`,
    });
    // Simulate API call and redirect
    setTimeout(() => router.push("/dashboard"), 1000);
  }

  const { icon: Icon, title } = roleDetails[role] || roleDetails.Admin;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
          <Icon className="size-6 text-primary" /> {title}
        </DialogTitle>
        <DialogDescription>
          Enter your credentials to access the booking system.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <FormControl>
                    <Input placeholder="you@college.edu" {...field} className="pl-9" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} className="pl-9" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {role === 'HOD' && (
             <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cse">CSE</SelectItem>
                      <SelectItem value="cse-aiml">CSE-AIML</SelectItem>
                      <SelectItem value="csd">CSD</SelectItem>
                      <SelectItem value="it">IT</SelectItem>
                      <SelectItem value="ece">ECE</SelectItem>
                      <SelectItem value="eee">EEE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {role === 'Club' && (
            <FormField
              control={form.control}
              name="club"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Club</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your club" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ecell">E-Cell</SelectItem>
                      <SelectItem value="nss">NSS</SelectItem>
                      <SelectItem value="ncc">NCC</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <Button type="submit" className="w-full">
            <LogIn className="mr-2 size-4" />
            Sign In
          </Button>
        </form>
      </Form>
    </>
  );
}
