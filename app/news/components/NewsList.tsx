import { apiGetNewsList } from "@/services/news";
import NewsCard from "./NewsCard";
import NewsPagination from "./NewsPagination";
import { NewsEmptyState } from "./NewsStates";
import { NewsItem } from "@/types/news";
import { NewsListResponse } from "@/types/api/news";

const PAGE_SIZE = 4;
const CATEGORY_ID = 575;

type Props = {
  currentPage: number;
  query: string;
};

const NewsList: React.FC<Props> = async ({ currentPage, query }) => {
  let items: NewsItem[] = [];
  let total = 0;
  let errorMessage: string | null = null;

  try {
    const response = await apiGetNewsList<NewsListResponse>({
      current: currentPage,
      pageSize: PAGE_SIZE,
      categoryId: CATEGORY_ID,
      title: query,
    });

    if (response.succeeded) {
      items = response.data;
      total = response.total;
    } else {
      errorMessage = "API trả về lỗi.";
    }
  } catch {
    errorMessage = "Không thể kết nối server.";
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <section className="space-y-6">
      {errorMessage && (
        <div className="bg-[#fff1f4] border border-[#f5c0cb] text-[#b71c4c] px-5 py-4">
          {errorMessage}
        </div>
      )}

      {!errorMessage && total > 0 && (
        <p className="text-sm text-gray-500">
          Tìm thấy <b>{total}</b> bài viết
          {query && <span> cho từ khóa "<b>{query}</b>"</span>}
        </p>
      )}

      {!errorMessage && total === 0 && <NewsEmptyState />}

      {!errorMessage && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {!errorMessage && totalPages > 1 && (
        <NewsPagination
          currentPage={currentPage}
          totalItems={total}
          pageSize={PAGE_SIZE}
        />
      )}
    </section>
  );
};

export default NewsList;
