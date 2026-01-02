"use client";
import { GetOneBrand } from "@/src/apis/brand/GetOneBrand.api";
import { oneBrandInfo } from "@/src/interfaces/brand.interface";
import Loading from "@/src/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { use } from "react";

interface brandProp {
  params: Promise<{ brandId: string }>;
}

export default function page({ params }: brandProp) {
  const { brandId } = use(params);
  const { data, isLoading } = useQuery<oneBrandInfo>({
    queryKey: ["brand", brandId],
    queryFn: () => GetOneBrand({ brandId }),
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="flex justify-center">
      <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs rounded-2xl my-7 w-full">
        {data?.image && (
          <div className="img flex justify-center">
            <Image
              width={100}
              height={100}
              className="rounded-base rounded-2xl"
              src={data.image}
              alt="brand image"
            />
          </div>
        )}

        <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading border-t border-gray-300 pt-4">
          Brand Name: {data?.name}
        </h5>

        <p className="mb-6 text-body">Description: {data?.slug}</p>
      </div>
    </div>
  );
}
