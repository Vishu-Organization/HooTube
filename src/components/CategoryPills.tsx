import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";

type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;

const CategoryPills = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) => {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current === null) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const container = entries[0].target;
      if (container === null) {
        return;
      }
      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  return (
    <div className="overflow-x-hidden relative" ref={containerRef}>
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}>
        {categories.map((category) => (
          <Button
            key={category}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
            variant={category === selectedCategory ? "dark" : "default"}
            onClick={() => onSelect(category)}>
            {category}
          </Button>
        ))}
      </div>

      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24">
          <Button
            variant="ghost"
            size="icon"
            className="h-full w-auto aspect-square p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_AMOUNT;
                return newTranslate <= 0 ? 0 : newTranslate;
              });
            }}>
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-full w-auto aspect-square p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current === null) {
                  return translate;
                }
                const newTranslate = translate + TRANSLATE_AMOUNT;
                const totalWidth = containerRef.current.scrollWidth;
                const viewWidth = containerRef.current.clientWidth;
                return newTranslate + viewWidth >= totalWidth
                  ? totalWidth - viewWidth
                  : newTranslate;
              });
            }}>
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryPills;
