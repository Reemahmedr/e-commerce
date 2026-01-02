"use client";
import { useQuery } from "@tanstack/react-query";
import { GetAllSubCategories } from "../apis/subcategory/AllSubCategory";
import Loading from "../loading/Loading";
import Link from "next/link";
import { SubCategory } from "../interfaces/subCategory.interface";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AllSubCategories() {
  const { data, isLoading } = useQuery<SubCategory>({
    queryKey: ["allsubcategory"],
    queryFn: GetAllSubCategories,
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  // Check if data exists and has items
  if (!data?.data || data.data.length === 0) {
    return null;
  }

  var settings = {
    dots: true,
    infinite: data.data.length > 6,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: data.data.length > 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: data.data.length > 3,
        },
      },
    ],
  };

  return (
    <div className="w-full py-8 px-16 relative overflow-visible">
      <Slider {...settings}>
        {data.data.map((sub) => (
          <div key={sub._id}>
            <Link
              href={`/categories`}
              className="group block"
            >
              <div className="w-full min-w-[120px] max-w-[140px] mx-auto bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
                {/* Text */}
                <div className="p-3 text-center">
                  <h3 className="text-sm font-semibold text-gray-800  transition-colors line-clamp-2 min-h-10 flex items-center justify-center">
                    {sub.name}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
