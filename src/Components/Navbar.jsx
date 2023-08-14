import { Link, Outlet } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useContext } from "react";
import { AuthContext } from "../App";

const Navbar = () => {
  const [user, SetUser] = useContext(AuthContext);
  return (
    <>
      <div className="w-full font-poppins">
        <div className="h-3 bg-red-400" />

        <div className="flex justify-between max-w-6xl mx-auto py-4 align-middle">
          <div className="font-bold text-2xl">
            <Link to="/"> Books </Link>
          </div>
          <div className="flex gap-4">
            {user.email ? (
              <>
                <Link to="/books"> Books </Link>
                <Link to="/category"> Category </Link>
                <Link to="/about"> About </Link>
              </>
            ) : (
              <>
                <Link to="/register"> Register </Link>
                <Link to="/login"> Login </Link>
                <Link to="/about"> About </Link>
              </>
            )}
          </div>
        </div>
        <div className="w-full text-center flex gap-2 justify-center bg-gray-100 py-5 align-middle">
          <Input
            className="max-w-md bg-transparent border-gray-400"
            placeholder="what are you looking for.."
          />
          <Button size="lg">Search</Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
