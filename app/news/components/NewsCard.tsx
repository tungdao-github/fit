import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight, FiClock, FiEye } from "react-icons/fi";

type NewsItem = {
  id: number;
  url: string;
  createdDate: string;
  title: string;
  description: string;
  thumbnail: string;
  view: number;
};

const safeImg = (raw: string): string => {
  try {
    const index = raw.lastIndexOf("/");
    return raw.slice(0, index + 1) + encodeURIComponent(raw.slice(index + 1));
  } catch {
    return raw;
  }
};

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="relative bg-white w-full overflow-hidden group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col min-h-[420px]">
      {/* Image Container */}
      <div className="overflow-hidden flex-shrink-0 h-[220px] relative">
        <img
          src={safeImg(item.thumbnail)}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-[#b71c4c] text-white text-xs font-semibold px-3 py-1 rounded-full">
          Tin tức
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <FiClock size={13} className="text-[#b71c4c]" />
            {dayjs(item.createdDate).format("DD/MM/YYYY")}
          </span>
          <span className="flex items-center gap-1.5">
            <FiEye size={13} className="text-[#b71c4c]" />
            {item.view.toLocaleString("vi-VN")}
          </span>
        </div>

        <Link href={`/news/${item.url}`}>
          <h2 className="mb-3 line-clamp-2 text-lg font-bold text-[#1a1a2e] group-hover:text-[#b71c4c] transition-colors duration-200 leading-snug">
            {item.title}
          </h2>
        </Link>

        <p className="line-clamp-2 flex-1 text-sm text-gray-500 leading-relaxed">
          {item.description}
        </p>

        <div className="mt-5 pt-4 border-t border-gray-100">
          <Link
            href={`/news/${item.url}`}
            className="inline-flex items-center gap-2 text-[#b71c4c] text-sm font-medium hover:text-[#9a1840] transition-colors"
          >
            Đọc tiếp
            <FiChevronRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
          </Link>
        </div>
      </div>

      {/* Corner Decoration */}
      <div
        className="absolute bottom-0 right-0 transition-all duration-500 ease-out group-hover:border-l-[72px] group-hover:border-b-[72px]"
        style={{
          width: 0,
          height: 0,
          borderLeft: "28px solid transparent",
          borderBottom: "28px solid #b71c4c",
        }}
      />
    </article>
  );
}
