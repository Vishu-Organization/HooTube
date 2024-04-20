import { Menu, Video, Bell, User2, Mic, Search, ArrowLeft } from "lucide-react";
import logo from "../../assets/FullLogo_NoBuffer.png";
import { Button } from "../Button";
import { useState } from "react";

export const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  console.log(showFullWidthSearch);

  return (
    <nav className="flex gap-10 lg:gap-20 justify-between pt-2 mx-4 mb-6">
      <section
        className={`items-center gap-4 flex-shrink-0 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
        <a href="/">
          <img src={logo} className="w-[4.5rem] h-[1.5rem]" />
        </a>
      </section>
      <form
        className={`gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}>
        {showFullWidthSearch && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
            onClick={() => setShowFullWidthSearch(false)}>
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full outline-none focus:border-blue-500"
          />
          <Button className="border border-secondary-border rounded-r-full py-2 px-5 border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button type="button" size="icon" className="flex-shrink-0">
          <Mic />
        </Button>
      </form>
      <section
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}>
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          size="icon"
          variant="ghost"
          className="md:hidden">
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>
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
