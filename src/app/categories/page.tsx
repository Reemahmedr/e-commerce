"use client";
import { GetAllCategories } from "@/src/apis/categories/AllCategories";
import { BrandInterface } from "@/src/interfaces/brand.interface";
import Loading from "@/src/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  const { data, isLoading } = useQuery<BrandInterface>({
    queryKey: ["allCategory"],
    queryFn: GetAllCategories,
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <div className="flex flex-wrap gap-4 p-4 my-5">
        {data?.data.map((category) => (
          <Link
            href={`/singlecategory/${category._id}`}
            className="bg-neutral-primary-soft block p-6 border border-default rounded-base shadow-xs rounded-2xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
            style={{ width: "calc(25% - 1rem)" }}
          >
            <div className="img flex justify-center">
            <Image
              width={100}
              height={100}
              className="rounded-base rounded-2xl"
              src={category.image}
              alt="brand image"
            />
            </div>

            <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading pt-3 border-t border-gray-300">
              {category.name}
            </h5>

            <p className="mb-6 text-body">{category.slug}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
