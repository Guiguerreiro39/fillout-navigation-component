import { Item } from "@/store";

type Props = {
  item?: Item;
};

export const PageContent = ({ item }: Props) => {
  return (
    <div className="p-8 flex justify-center items-center border-2 border-[#C0C0C0] rounded-lg flex-1 bg-[#E6E6FA]">
      {item ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <p className="text-muted-foreground">Content for {item.name}</p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold">No item selected</h1>
        </div>
      )}
    </div>
  );
};
