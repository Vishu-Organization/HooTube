import { Menu } from "lucide-react";
import logo from "../../assets/hootube-high-resolution-logo.svg";
import { Button } from "../Button";

export const PageHeader = () => {
  return (
    <nav className="flex gap-10 lg:gap-20 justify-between">
      <div className="flex items-center gap-4 flex-shrink-0">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
        <a href="/">
          <img src={logo} className="w-20 h-16 scale-[1.4]" />
        </a>
      </div>
      <div>2</div>
      <div>3</div>
    </nav>
  );
};
