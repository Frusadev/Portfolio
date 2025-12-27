"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { createExperience, updateExperience } from "@/app/actions/portfolio";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  company: z.string().min(2, "Company must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  endDate: z.string().optional().or(z.literal("")),
  current: z.boolean().default(false),
}).refine((data) => {
  if (data.current) return true;
  if (!data.endDate) return false;
  return Date.parse(data.endDate) > Date.parse(data.startDate);
}, {
  message: "End date must be after start date",
  path: ["endDate"],
});

interface ExperienceFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  experience?: any;
}

export default function ExperienceForm({ experience }: ExperienceFormProps) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: experience?.company || "",
      position: experience?.position || "",
      description: experience?.description || "",
      startDate: experience?.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : "",
      endDate: experience?.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : "",
      current: experience?.current || false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formattedValues = {
        ...values,
        endDate: values.current ? null : values.endDate,
      };

      if (experience) {
        await updateExperience(experience.id, formattedValues);
        toast.success("Experience updated successfully");
      } else {
        await createExperience(formattedValues);
        toast.success("Experience created successfully");
      }
      router.push("/admin/experience");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Job Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Job Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    disabled={form.watch("current")}
                    value={form.watch("current") ? "" : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="current"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Current Position</FormLabel>
                <FormDescription>
                  I am currently working here.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">
          {experience ? "Update Experience" : "Add Experience"}
        </Button>
      </form>
    </Form>
  );
}
