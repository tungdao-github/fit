import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumb from "@/components/common/breadcrumb";
import NewsList from "./components/NewsList";
import NewsSidebar from "./components/NewsSidebar";
import {
  NewsListSkeleton,
  NewsSidebarSkeleton,
} from "./components/NewsSkeletons";

type PageProps = {
  searchParams?: Promise<{
    page?: string;
    query?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params?.query?.trim() ?? "";

  return {
    title: query ? `Tìm kiếm "${query}" | Tin tức` : "Tin tức",
    description: query
      ? `Danh sách bài viết với từ khóa ${query}`
      : "Danh sách tin tức mới nhất",
  };
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = Math.max(Number(params?.page) || 1, 1);
  const query = params?.query?.trim() ?? "";

  return (
    <main className="bg-[#f1f1f1] min-h-screen">
      <Breadcrumb
        title="Tin tức"
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức", href: "/news" },
        ]}
      />

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          <div className="flex-1 min-w-0">
            <Suspense fallback={<NewsListSkeleton />}>
              <NewsList currentPage={currentPage} query={query} />
            </Suspense>
          </div>

          <Suspense fallback={<NewsSidebarSkeleton />}>
            <NewsSidebar />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default Page;