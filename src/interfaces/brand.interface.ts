export interface BrandInterface {
  results: number;
  metadata: Metadata;
  data: oneBrandInfo[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface oneBrandInfo {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
