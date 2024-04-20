import { Button } from "./Button";

const CategoryPills = () => {
  return (
    <div className="overflow-x-hidden relative">
      <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]">
        <Button
          className="py-1 px-3 rounded-lg whitespace-nowrap"
          variant="dark">
          All
        </Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">
          JavaScript
        </Button>
      </div>
    </div>
  );
};

export default CategoryPills;
