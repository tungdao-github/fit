import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { BsEye } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import { apiGetNewsList } from "@/services/news";
import { type NewsItem } from "@/types/news"
import { NewsListResponse } from "@/types/api/news";
const safeImg = (raw: string): string => {
  try {
    const index = raw.lastIndexOf("/");
    return raw.slice(0, index + 1) + encodeURIComponent(raw.slice(index + 1));
  } catch {
    return raw;
  }
};

type Props = {
  currentSlug: string;
};

const RelatedArticles: React.FC<Props> = async ({ currentSlug }) => {
  const response = await apiGetNewsList<NewsListResponse>({
    current: 1,
    pageSize: 8,
    categoryId: 575,
  });

  const relatedArticles = response.succeeded
    ? response.data.filter((article: NewsItem) => article.url !== currentSlug)
    : [];

  return (
    <div className="space-y-4">
      {relatedArticles.map((article: NewsItem) => (
        <Link
          key={article.id}
          href={`/news/${article.url}`}
          className="group flex items-start gap-4 p-3 rounded-lg bg-[#f8f9fa] hover:bg-[#b71c4c]/5 transition-all duration-300"
        >
          <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-lg">
            <img
              src={safeImg(article.thumbnail)}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[#1a1a2e] line-clamp-2 group-hover:text-[#b71c4c] transition-colors duration-200 leading-snug">
              {article.title}
            </h3>

            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <BiCalendar className="text-[#b71c4c]" size={12} />
                {dayjs(article.createdDate).format("DD/MM/YYYY")}
              </span>
              <span className="flex items-center gap-1">
                <BsEye className="text-[#b71c4c]" size={12} />
                {article.view.toLocaleString("vi-VN")}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RelatedArticles;
