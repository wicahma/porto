import React from "react";

interface IListLimiterProps<T> {
  items: T[];
  showMoreComponent?: (items: T[], remainingItems: T[]) => React.ReactNode;
  children: (item: T, index: number) => React.ReactNode;
  className?: string;
  limit?: number;
}

const ListLimiter = <T,>({
  items,
  limit,
  showMoreComponent,
  children,
  className,
}: IListLimiterProps<T>) => {
  const visibleItems = limit ? items.slice(0, limit) : items;
  return (
    <div className={className}>
      {visibleItems.map((item, index) => (
        <div key={index}>{children(item, index)}</div>
      ))}
      {showMoreComponent && items.length > (limit || 0) && (
        <div>{showMoreComponent(items.slice(limit), items.slice(limit))}</div>
      )}
    </div>
  );
};

export default ListLimiter;
