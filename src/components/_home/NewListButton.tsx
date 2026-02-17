import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "@base-ui/react";
import { Textarea } from "../ui/textarea";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

type Props = {};

async function createTask(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;

  await prisma.todo.create({
    data: {
      title,
      desc: desc ?? "",
      updatedAt: new Date(),
    },
  });

  revalidatePath("/");
}

const NewListButton = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild className=" text-white px-4 py-2 rounded">
        <Button>Create New List</Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-4 rounded shadow-lg">
        <AlertDialogHeader></AlertDialogHeader>
        <DialogTitle className="text-lg font-bold mb-4">
          Add New Task
        </DialogTitle>

        <form action={createTask}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input name="title" id="title" placeholder="Task title" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="desc">Description</Label>
              <Textarea name="desc" id="desc" placeholder="Task description" />
            </div>
          </div>
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewListButton;
