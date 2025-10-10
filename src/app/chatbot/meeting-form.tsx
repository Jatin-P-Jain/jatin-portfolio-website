"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  CalendarIcon,
  ClockIcon,
  MailIcon,
  UserIcon,
  FileTextIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(1, { message: "Email is required." }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must be less than 50 characters." }),
  topic: z
    .string()
    .min(3, { message: "Topic must be at least 3 characters." })
    .max(100, { message: "Topic must be less than 100 characters." }),
  date: z
    .string()
    .min(1, { message: "Please select a date." })
    .refine(
      (val) => {
        const selectedDate = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: "Please select a future date." }
    ),
  time: z
    .string()
    .min(1, { message: "Please select a time." })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Please enter a valid time format.",
    }),
});

type FormData = z.infer<typeof formSchema>;

interface MeetingFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting?: boolean;
}

export default function MeetingForm({
  onSubmit,
  isSubmitting = false,
}: MeetingFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      topic: "",
      date: "",
      time: "",
    },
  });

  const handleSubmit = async (data: FormData) => {
    try {
      await onSubmit(data);
      form.reset(); // Reset form on successful submission
    } catch (error) {
      console.error("Failed to submit meeting form:", error);
      // You could add toast notification here
    }
  };

  return (
    <div className="flex flex-col mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
        <CalendarIcon className="h-4 w-4" />
        Schedule Meeting
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MailIcon className="h-3 w-3" />
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  We'll send the calendar invite to this email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <UserIcon className="h-3 w-3" />
                  Your Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FileTextIcon className="h-3 w-3" />
                  Meeting Topic
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project discussion"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Brief description of what you'd like to discuss.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <CalendarIcon className="h-3 w-3" />
                    Date
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      disabled={isSubmitting}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <ClockIcon className="h-3 w-3" />
                    Time
                  </FormLabel>
                  <FormControl>
                    <Input type="time" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Scheduling..." : "Schedule Meeting"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
