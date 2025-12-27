import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function MessagesPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Send Message to All Users</h1>
      <div className="space-y-4">
        <Input placeholder="Subject" />
        <Textarea placeholder="Message content..." className="min-h-[200px]" />
        <Button>Send Broadcast</Button>
      </div>
    </div>
  );
}
