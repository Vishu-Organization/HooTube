import { Children, ElementType, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button, buttonStyles } from "../Button";
import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import { playlists, subscriptions } from "../../data/sidebar";
import { useSidebarContext } from "../../context/SidebarContext";
import { PageHeaderIconSection } from "./PageHeader";

const SideBar = () => {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto overflow-hidden  pb-4 flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}>
        <SmallSidebarItem IconOrImageUrl={Home} title="Home" url="/" />
        <SmallSidebarItem
          IconOrImageUrl={Repeat}
          title="Shorts"
          url="/shorts"
        />
        <SmallSidebarItem
          IconOrImageUrl={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem
          IconOrImageUrl={Library}
          title="Library"
          url="/library"
        />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto overflow-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}>
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderIconSection />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem
            isActive
            IconOrImageUrl={Home}
            title="Home"
            url="/home"
          />
          <LargeSidebarItem
            IconOrImageUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleCount={5}>
          <LargeSidebarItem
            IconOrImageUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconOrImageUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImageUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImageUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => {
            return (
              <LargeSidebarItem
                key={playlist.id}
                IconOrImageUrl={ListVideo}
                title={playlist.name}
                url={`/playlist?list=${playlist.id}`}
              />
            );
          })}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              IconOrImageUrl={subscription.imgUrl}
              key={subscription.id}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            IconOrImageUrl={Flame}
            title="Treanding"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImageUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImageUrl={Music} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImageUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem IconOrImageUrl={Radio} title="Radio" url="/radio" />
          <LargeSidebarItem
            IconOrImageUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem
            IconOrImageUrl={Newspaper}
            title="News"
            url="/news"
          />
          <LargeSidebarItem
            IconOrImageUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            IconOrImageUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            IconOrImageUrl={Shirt}
            title="Fashion and Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItem
            IconOrImageUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
};

type SmallSidebarItemProps = {
  IconOrImageUrl: ElementType | string;
  title: string;
  url: string;
};

const SmallSidebarItem = ({
  IconOrImageUrl,
  title,
  url,
}: SmallSidebarItemProps) => {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-[6px]"
      )}>
      <IconOrImageUrl className="w-4 h-4" />
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
  visibleCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleCount);
  const showExpandButton = childrenArray.length > visibleCount;
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1 font-bold">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          variant="ghost"
          className="w-full p-3 flex items-center rounded-lg gap-4"
          onClick={() => setIsExpanded((expand) => !expand)}>
          <ButtonIcon className="w-4 h-4" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
};

const LargeSidebarItem = ({
  IconOrImageUrl,
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
      {typeof IconOrImageUrl === "string" ? (
        <img src={IconOrImageUrl} className="rounded-full w-4 h-4" />
      ) : (
        <IconOrImageUrl className="w-4 h-4" />
      )}
      <div className="text-ellipsis whitespace-nowrap overflow-hidden">
        {title}
      </div>
    </a>
  );
};

export default SideBar;
