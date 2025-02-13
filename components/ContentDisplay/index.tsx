import Link from "next/link";
import { ReactNode, useTransition, useEffect, useState } from "react";
import { Content } from "../../utils/interfaces";
import LoadingState from '../LoadingState'

interface ContentDisplayProps {
  title: string;
  description: ReactNode;
  content: Content[];
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const ContentDisplay = ({
  title,
  description,
  content,
  isLoading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}: ContentDisplayProps) => {
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePageChange = (page: number) => {
    startTransition(() => {
      onPageChange?.(page)
    })
  }

  if (isLoading || !mounted) {
    return <LoadingState />
  }

  return (
    <div className={isPending ? 'opacity-70' : ''}>
      <h1 className="text-4xl font-bold inline-block mb-4 border-b-4 border-indigo-100 dark:border-indigo-900">
        {title}
      </h1>
      <p className="text-xl italic pb-8">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {content.map(({ data: article, slug, type }) => (
          <div key={`${type}/${article.title}`} className="group">
            <Link 
              href={`/${type}/${slug}`}
              className="block p-6 transition-all duration-300 bg-indigo-50 dark:bg-indigo-900 rounded-md 
                group-hover:scale-105 group-hover:shadow-md"
            >
              <h2 className="font-bold mb-2">{article.title}</h2>
              {article.date && (
                <p className="italic text-left mb-2">{article.date}</p>
              )}
              <p className="mb-6">{article.description}</p>
              <div className="flex flex-wrap gap-2">
                {article.tag && article.tag.map((t: string) => (
                  <span key={t} className="inline-block" onClick={(e) => e.stopPropagation()}>
                    <Link 
                      href={`/tags/${t}`}
                      className="inline-block p-2 rounded transition-all border-2 border-indigo-900 dark:border-transparent 
                        hover:border-indigo-500 dark:hover:border-indigo-200 dark:bg-indigo-800 
                        hover:opacity-80 hover:shadow-lg dark:hover:shadow-none dark:shadow-indigo-600"
                    >
                      {t}
                    </Link>
                  </span>
                ))}
              </div>
            </Link>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1 || isLoading}
            className="px-4 py-2 rounded bg-indigo-100 dark:bg-indigo-800 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${
                page === currentPage
                  ? 'bg-indigo-900 text-white'
                  : 'bg-indigo-100 dark:bg-indigo-800'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || isLoading}
            className="px-4 py-2 rounded bg-indigo-100 dark:bg-indigo-800 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;
