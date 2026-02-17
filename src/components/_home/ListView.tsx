import { ListViewType } from "@/lib/type";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PenLine, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

type Props = { params: ListViewType };

const ListView = ({ params }: Props) => {
  async function editToDo(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;
    const id = Number(formData.get("id"));

    await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title,
        desc: desc ?? "",
      },
    });

    revalidatePath("/");
  }

  async function deleteToDo(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));

    await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/");
  }

  return (
    <Card className="w-1/3">
      <CardContent className="w-full flex justify-between items-center">
        <h1>{params.title}</h1>
        <div className="flex gap-5 items-center">
          <Dialog>
            <DialogTrigger asChild>
              <PenLine className="cursor-pointer" />
            </DialogTrigger>

            <DialogContent className="sm:max-w-106.25">
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>

              <form action={editToDo}>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    id="id"
                    name="id"
                    className="hidden"
                    defaultValue={params.id}
                  ></input>

                  <div className="grid grid-cols-1 gap-3">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      name="title"
                      id="title"
                      defaultValue={params.title}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <Label htmlFor="desc">Description</Label>
                    <Input name="desc" id="desc" defaultValue={params.desc} />
                  </div>

                  <Button type="submit">Update</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <form action={deleteToDo}>
            <input type="hidden" name="id" id="id" value={params.id} />
            <button type="submit">
              <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700 transition-colors duration-200" />
            </button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListView;
