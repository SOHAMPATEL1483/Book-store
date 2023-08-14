import React, { useContext, useEffect } from "react";
import { AuthContext } from "../App";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";

const About = () => {
  const [user, SetUser] = useContext(AuthContext);

  return (
    <>
      <h1>About page</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {/* <Button onClick={() => toast.error("hello")}>click me</Button> */}
    </>
  );
};

export default About;
