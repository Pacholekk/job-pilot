import Item, { type ItemProps } from "./Item/Item";

export interface ItemsListProps {
  items: ItemProps[];
}

export default function ItemsList({ items }: ItemsListProps) {
  return (
    <div className="divide-y rounded-lg border">
      {items.map((item) => (
        <Item key={`${item.companyName}-${item.jobTitle}`} {...item} />
      ))}
    </div>
  );
}
