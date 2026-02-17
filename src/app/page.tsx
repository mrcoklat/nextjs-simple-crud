import NewListButton from "@/components/_home/NewListButton";
import prisma from "../../lib/prisma";
import { ListViewType } from "@/lib/type";
import ListView from "@/components/_home/ListView";

type Props = {};

const page = async (props: Props) => {
  const myList: ListViewType[] = await prisma.todo.findMany({
    select: { id: true, title: true, desc: true },
  });

  return (
    <div className="flex flex-col w-full items-center justify-center p-4 gap-4 space-y-4">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold">My Todo List</h1>
        <NewListButton />
      </div>
      <div className="flex-col w-full space-y-10 justify-center items-center">
        {myList.length > 0 ? (
          myList.map((task) => <ListView key={task.id} params={task} />)
        ) : (
          <p className="text-gray-500">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default page;
