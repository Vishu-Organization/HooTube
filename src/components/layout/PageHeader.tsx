import { Menu, Video, Bell, User2, Mic, Search } from "lucide-react";
import logo from "../../assets/FullLogo_NoBuffer.png";
import { Button } from "../Button";

export const PageHeader = () => {
  return (
    <nav className="flex gap-10 lg:gap-20 justify-between pt-2 mx-4 mb-6">
      <section className="flex items-center gap-4 flex-shrink-0">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
        <a href="/">
          <img src={logo} className="w-[4.5rem] h-[1.5rem]" />
        </a>
      </section>
      <form className="flex gap-4 flex-grow justify-center">
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full outline-none focus:border-blue-500"
          />
          <Button>
            <Search />
          </Button>
        </div>
        <Button type="button" size="icon" className="flex-shrink-0">
          <Mic />
        </Button>
      </form>
      <section className="flex flex-shrink-0 md:gap-2">
        <Button size="icon" variant="ghost">
          <Video />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User2 />
        </Button>
      </section>
    </nav>
  );
};
