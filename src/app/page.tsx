import FeaturedProducts from "../components/FeaturedProducts";
import { Suspense } from "react";
import Loading from "../loading/Loading";
import AllSubCategories from "../components/AllSubCategories";

export default function Home() {
  return (
    <>
      <div className="lg:flex hidden overflow-visible">
        <div className="main-slider w-full">
          <AllSubCategories></AllSubCategories>
        </div>
      </div>
      <Suspense fallback={<Loading></Loading>}>
        <FeaturedProducts></FeaturedProducts>
      </Suspense>
    </>
  );
}
