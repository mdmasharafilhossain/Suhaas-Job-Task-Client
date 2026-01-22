import Navbar from "./Navbar";
import Footer from "./Footer";
import type { IProps } from "../../types";






export default function CommonLayout({ children }: IProps) {
  return (
    <div className=" min-h-screen flex flex-col">
      <Navbar />
      <div className="grow min-h-screen">{children}</div>
       <Footer/>
    </div>
  );
}