"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { createProject, updateProject } from "@/app/actions/portfolio";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  url: z.string().optional(),
  githubUrl: z.string().optional(),
  image: z.string().optional(),
  technologies: z.string().optional(), // We'll convert string to array
  featured: z.boolean(),
});

interface ProjectFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
    content?: string | null;
    url?: string | null;
    githubUrl?: string | null;
    image?: string | null;
    technologies?: string[] | null;
    featured: boolean;
  };
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      content: initialData?.content || "",
      url: initialData?.url || "",
      githubUrl: initialData?.githubUrl || "",
      image: initialData?.image || "",
      technologies: initialData?.technologies?.join(", ") || "",
      featured: initialData?.featured || false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    
    const projectData = {
      ...values,
      technologies: values.technologies ? values.technologies.split(",").map(t => t.trim()).filter(Boolean) : [],
    };

    let res;
    if (initialData) {
      res = await updateProject(initialData.id, projectData);
    } else {
      res = await createProject(projectData);
    }

    setLoading(false);

    if (res.success) {
      toast.success(initialData ? "Project updated" : "Project created");
      router.push("/admin/projects");
      router.refresh();
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Project title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies</FormLabel>
                <FormControl>
                  <Input placeholder="React, Node.js, Drizzle" {...field} />
                </FormControl>
                <FormDescription>Comma separated</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief summary" className="h-20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Live URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed Content (Markdown)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="# Project Details" 
                  className="min-h-[200px] font-mono" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-white/50">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Featured Project
                </FormLabel>
                <FormDescription>
                  Featured projects appear on the home page.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
            className="border-red-950 text-red-950 hover:bg-red-50"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={loading}
            className="bg-red-950 text-[#e6dcc6] hover:bg-red-900"
          >
            {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            {initialData ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
