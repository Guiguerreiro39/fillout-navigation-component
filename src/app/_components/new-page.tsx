"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigationStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  defaultName: string;
};

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(36, "Name must be at most 36 characters long"),
});

export const NewPage = ({ defaultName }: Props) => {
  const [open, setOpen] = useState(false);
  const addItem = useNavigationStore((state) => state.addItem);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultName,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const newItem = addItem(data.name);
    router.push(`?activeItem=${newItem.id}`);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="!text-foreground" />
          Add page
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <FileText />
            <DialogTitle>Name your new page</DialogTitle>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of your new page" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-6">
              <Button
                disabled={form.formState.isSubmitting}
                variant="primary"
                type="submit"
              >
                Continue
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
