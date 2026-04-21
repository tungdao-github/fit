import NewsCategories from "./NewsCategories";
import NewsSearchBox from "./NewsSearchBox";

const NewsSidebar: React.FC = () => {
  return (
    <aside className="w-full lg:w-[350px] lg:flex-shrink-0 flex flex-col gap-6">
      <NewsSearchBox />
      <NewsCategories />
    </aside>
  );
}

export default NewsSidebar;
