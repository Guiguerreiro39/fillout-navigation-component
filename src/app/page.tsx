import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen p-8 sm:p-20 bg-[#F9FAFB]">
      <Button>
        <Plus className="text-icon-primary" />
        Button
      </Button>
      <Button>
        <Plus />
        Button
      </Button>
      <Button variant="default">
        <Plus />
        Button
      </Button>
    </div>
  );
}
