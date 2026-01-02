"use client";
import { SingleCategory } from "@/src/apis/categories/OneCategory";
import SubCategoryForCategory from "@/src/components/SubCategoryForCategory";
import { Category } from "@/src/interfaces/product.interface";
import Loading from "@/src/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { use } from "react";

interface categoryProp {
  params: Promise<{ categoryId: string }>;
}

export default function page({ params }: categoryProp) {
  const { categoryId } = use(params);
  const { data, isLoading } = useQuery<Category>({
    queryKey: ["category", categoryId],
    queryFn: () => SingleCategory({ categoryId }),
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs rounded-2xl my-7 w-full">
          {data?.image && (
            <div className="img flex justify-center">
              <Image
                width={100}
                height={100}
                className="rounded-base rounded-2xl"
                src={data.image}
                alt="category image"
              />
            </div>
          )}

          <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading border-t border-gray-300 pt-4">
            {data?.name}
          </h5>

          <p className="mb-6 text-body">{data?.slug}</p>
        </div>
      </div>
      <h3 className="py-10 text-3xl text-center">Categories found in {data?.name}:</h3>
      <SubCategoryForCategory category={categoryId}></SubCategoryForCategory>
    </>
  );
}
