import { Children, ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../Button";
import { Clapperboard, Home, Library, Repeat } from "lucide-react";

const SideBar = () => {
  return (
    <>
      <aside className="sticky top-0 overflow-y-auto overflow-hidden  pb-4 flex flex-col ml-1 lg:hidden">
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>
      <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto overflow-hidden pb-4 flex flex-col gap-2 px-2">
        <LargeSidebarSection title="Hello">
          <LargeSidebarItem isActive Icon={Home} title="Home" url="/" />
          <LargeSidebarItem Icon={Home} title="Home" url="/" />
          <LargeSidebarItem Icon={Home} title="Home" url="/" />
        </LargeSidebarSection>
      </aside>
    </>
  );
};

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

const SmallSidebarItem = ({ Icon, title, url }: SmallSidebarItemProps) => {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-[6px]"
      )}>
      <Icon className="w-4 h-4" />
      <div className="text-[0.6rem]">{title}</div>
    </a>
  );
};

type LargeSidebarItemProps = SmallSidebarItemProps & {
  isActive?: boolean;
};

type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleCount?: number;
};

const LargeSidebarSection = ({
  children,
  title,
  visibleCount,
}: LargeSidebarSectionProps) => {
  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = childrenArray.slice(0, visibleCount);
  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1 font-bold">{title}</div>}
      {visibleChildren}
    </div>
  );
};

const LargeSidebarItem = ({
  Icon,
  title,
  url,
  isActive,
}: LargeSidebarItemProps) => {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full p-3 flex items-center rounded-lg gap-4 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}>
      <Icon className="w-4 h-4" />
      <div className="text-ellipsis whitespace-nowrap overflow-hidden">
        {title}
      </div>
    </a>
  );
};

export default SideBar;
