import Breadcrumb from "@/components/common/breadcrumb";
import { apiGetNewsByUrl, apiGetMetaNews } from "@/services/news";
import type { Metadata } from "next";
import { Suspense } from "react";
import RelatedArticles from "../components/RelatedArticles";
import { RelatedArticlesSkeleton } from "../components/NewsSkeletons";
import dayjs from "dayjs";
import { BiCalendar } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { ArticleDetail, } from "@/types/news";
import { MetaArticleResponse } from "@/types/api/news";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

const safeImg = (raw: string): string => {
  try {
    const index = raw.lastIndexOf("/");
    return raw.slice(0, index + 1) + encodeURIComponent(raw.slice(index + 1));
  } catch {
    return raw;
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const meta = await apiGetMetaNews<MetaArticleResponse>(slug);
    return {
      title: meta?.title ?? "Tin tức",
      description: meta?.description ?? "Chi tiết bài viết",
    };
  } catch {
    return {
      title: "Tin tức",
      description: "Chi tiết bài viết",
    };
  }
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  try {
    const article = await apiGetNewsByUrl<ArticleDetail>(slug);

    if (!article) {
      notFound();
    }

    return (
      <>
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Tin tức", href: "/news" },
          ]}
          title={article.title}
        />
        <main className="bg-[#f8f9fa] min-h-screen">
          <div className="container mx-auto px-4 py-10 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Content */}
              <article className="lg:col-span-8">
                <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
                  {/* Featured Image */}
                  <div className="relative w-full h-[240px] sm:h-[320px] md:h-[380px] lg:h-[420px] overflow-hidden">
                    <img
                      src={safeImg(article.thumbnail)}
                      alt={article.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  
                  {/* Article Content */}
                  <div className="p-6 md:p-8 lg:p-10">
                    <div className="mb-6">
                      <span className="inline-block bg-[#b71c4c] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                        Tin tức
                      </span>
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a2e] leading-tight">
                        {article.title}
                      </h1>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
                      <span className="flex items-center gap-2">
                        <BiCalendar className="text-[#b71c4c]" />
                        {dayjs(article.modifiedDate).format("DD/MM/YYYY HH:mm")}
                      </span>
                      <span className="flex items-center gap-2">
                        <BsEye className="text-[#b71c4c]" />
                        {article.view.toLocaleString("vi-VN")} lượt xem
                      </span>
                    </div>
                    
                    <div
                      dangerouslySetInnerHTML={{ __html: article.content }}
                      className="prose prose-lg max-w-none prose-headings:text-[#1a1a2e] prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-[#b71c4c] prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
                    />
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-28 space-y-6">
                  <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-[#b71c4c] rounded-full" />
                      <h2 className="text-xl font-bold text-[#1a1a2e]">
                        Bài viết liên quan
                      </h2>
                    </div>
                    <Suspense fallback={<RelatedArticlesSkeleton />}>
                      <RelatedArticles currentSlug={slug} />
                    </Suspense>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </>
    );
  } catch (error: any) {
    if (error.status === 404) {
      notFound();
    }
    throw error;
  }
};

export default Page;
