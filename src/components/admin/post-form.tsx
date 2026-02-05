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
import { createPost, updatePost } from "@/app/actions/blog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase, numbers, and hyphens only"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().optional(),
  tags: z.string().optional(), // We'll convert string to array
});

interface PostFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    coverImage?: string | null;
    tags?: string[] | null;
  };
}

export function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      content: initialData?.content || "",
      coverImage: initialData?.coverImage || "",
      tags: initialData?.tags?.join(", ") || "",
    },
  });

  // Auto-generate slug from title if slug is empty
  const handleTitleBlur = () => {
    const title = form.getValues("title");
    const slug = form.getValues("slug");
    if (title && !slug) {
      form.setValue("slug", title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    
    const postData = {
      ...values,
      tags: values.tags ? values.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
      coverImage: values.coverImage || undefined,
    };

    let res;
    if (initialData) {
      res = await updatePost(initialData.id, postData);
    } else {
      res = await createPost(postData);
    }

    setLoading(false);

    if (res.success) {
      toast.success(initialData ? "Post updated" : "Post created");
      router.push("/admin/blog");
      router.refresh();
    } else {
      toast.error(res.error || "Something went wrong");
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
                  <Input placeholder="Post title" {...field} onBlur={handleTitleBlur} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="post-slug" {...field} />
                </FormControl>
                <FormDescription>URL friendly identifier</FormDescription>
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Short summary for cards and SEO" className="h-20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="react, nextjs, typescript" {...field} />
              </FormControl>
              <FormDescription>Comma separated</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (Markdown)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="# Hello World" 
                  className="min-h-[400px] font-mono" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
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
            {initialData ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
