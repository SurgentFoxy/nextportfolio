import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FoxScene from "@/components/Fox3D";
export default function Home() {
  return (
    <div>    
      {/* <Navbar /> */}
      {/* <HeroSection /> */}
      <div className="h-screen">
        <FoxScene />
      </div>
    </div>
  );
}
