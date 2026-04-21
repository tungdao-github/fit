"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ConfigProvider, Input } from "antd";

const antdTheme = {
  token: {
    colorPrimary: "#b71c4c",
    borderRadius: 0,
    borderRadiusLG: 0,
    borderRadiusSM: 0,
  },
  components: {
    Input: {
      borderRadius: 0,
      activeShadow: "none",
      hoverBorderColor: "#b71c4c",
      activeBorderColor: "#b71c4c",
    },
  },
};
const NewsSearchBox: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(searchParams.get("query") ?? "");
  }, [searchParams]);

  const handleSearch = (value: string) => {
    const nextQuery = value.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (nextQuery) {
      params.set("query", nextQuery);
    } else {
      params.delete("query");
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="news-search-box bg-white mx-auto lg:mx-0 w-full rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 bg-[#b71c4c] rounded-full" />
        <h3 className="m-0 text-[#1a1a2e] text-base font-bold tracking-wide">
          Tìm kiếm
        </h3>
      </div>
      <ConfigProvider theme={antdTheme}>
        <Input.Search
          placeholder="Tìm kiếm bài viết..."
          enterButton
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
          size="large"
          className="w-full"
        />
      </ConfigProvider>
    </div>
  );
}

export default NewsSearchBox;
