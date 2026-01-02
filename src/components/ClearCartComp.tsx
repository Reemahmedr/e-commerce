import Image from "next/image";
import img from "@/public/empty.png";

export default function ClearCartComp() {
  return (
    <>
      <div className="img flex justify-center bg-center bg-cover">
      <Image src={img} alt="empty cart"/>
      </div>
    </>
  );
}
