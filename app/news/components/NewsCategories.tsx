import Link from "next/link";
import { FiStar } from "react-icons/fi";

const CATEGORIES = [
  {
    id: 1,
    label: "Tin tức và sự kiện",
    href: "/article",
  },
  {
    id: 2,
    label: "Hoạt động của Chi bộ và Công đoàn",
    href: "/category/579",
  },
  {
    id: 3,
    label: "Hoạt động sinh viên, liên chi đoàn",
    href: "/category/577",
  },
];

const NewsCategories: React.FC = () => {
  return (
    <aside className="bg-white w-full rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 bg-[#b71c4c] rounded-full" />
        <h3 className="m-0 text-[#1a1a2e] text-base font-bold tracking-wide">
          Danh mục tin tức
        </h3>
      </div>

      <ul className="list-none p-0 m-0 space-y-1">
        {CATEGORIES.map((category) => (
          <li key={category.id}>
            <Link
              href={category.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 py-3 px-3 text-sm no-underline transition-all duration-200 text-gray-600 hover:text-[#b71c4c] hover:bg-[#b71c4c]/5 rounded-lg"
            >
              <FiStar
                size={14}
                className="shrink-0 text-gray-300 transition-colors duration-200 group-hover:text-[#b71c4c]"
              />
              <span className="leading-relaxed">{category.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default NewsCategories;
