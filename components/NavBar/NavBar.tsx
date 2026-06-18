import Link from "next/link";
import { Button } from "../ui/button";

export default function NavBar() {
  return (
    <div className="flex flex-col border-r-1 border-r-gray-300">
      <div className="flex flex-col p-5 gap-4 mt-5">
        <span className="text-gray-400 text-sm">MENU</span>
        <div>
          <Button variant={"outline"} size="lg" className="cursor-pointer">
            {" "}
            Dashboard{" "}
          </Button>
        </div>
        <div>
          <Button variant={"outline"} className="cursor-pointer" size="lg">
            {" "}
            Applications{" "}
          </Button>
        </div>
        <div>
          <Button asChild>
            <Link href="/applications/new">+ Add Application </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
