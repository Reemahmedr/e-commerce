"use client";
import { useQuery } from "@tanstack/react-query";
import { GetSubCategory } from "../apis/categories/GetSubCategory";
import Loading from "../loading/Loading";
import { SubCategory } from "../interfaces/subCategory.interface";
import noItem from "@/public/no item.jpg";
import Image from "next/image";

interface subcategoryid {
  category: string;
}

export default function SubCategoryForCategory({ category }: subcategoryid) {
  const { data, isLoading } = useQuery<SubCategory>({
    queryKey: ["showsubcategory", category],
    queryFn: () => GetSubCategory({ category }),
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {data?.data && data.data.length > 0 ? (
        data?.data.map((sub) => (
          <>
            <div className="bg-neutral-primary-soft w-1/3 max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium rounded-2xl">
              <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
                {sub.name}
              </h5>
              <p className="text-body">{sub.slug}</p>
            </div>
          </>
        ))
      ) : (
        <Image
          src={noItem}
          alt="no item found image"
          width={200}
          height={200}
        ></Image>
      )}
    </div>
  );
}
