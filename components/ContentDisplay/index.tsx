import Link from "next/link";
import { ReactNode } from "react";
import { Content } from "../../utils/interfaces";

interface ContentDisplayProps {
  title: string;
  description: ReactNode;
  content: Content[];
}

const ContentDisplay = ({
  title,
  description,
  content,
}: ContentDisplayProps) => {
  return (
    <div>
      <h1 className="text-4xl font-bold inline-block mb-4 border-b-4 border-indigo-100 dark:border-indigo-900">
        {title}
      </h1>
      <p className="text-xl italic pb-8">{description}</p>
      <div className="flex flex-wrap">
        {content.map(({ data: article, slug, type }) => {
          return (
            <Link key={`${type}/${article.title}`} href={`/${type}/${slug}`}>
              <a className="basis-full sm:basis-1/2 my-3 sm:odd:pr-3 sm:even:pl-3 flex">
                <div className="p-6 transition hover:scale-105 hover:shadow-md bg-indigo-50 dark:bg-indigo-900 rounded-md basis-full">
                  <h1 className="pb-2 font-bold text-clip">{article.title}</h1>
                  <p className="pb-2 italic text-left">{article.date}</p>
                  <p className="pb-6 text-ellipsis">{article.description}</p>
                  <div className="-ml-2 mb-2">
                    {article.tag.map((t: string) => {
                      return (
                        <Link key={t} href={`/tags/${t}`}>
                          <a className="p-2 m-2 rounded z-10 transition border-2 border-indigo-900 dark:border-transparent hover:border-indigo-500 dark:hover:border-indigo-200 dark:bg-indigo-800 hover:opacity-80 hover:shadow-lg dark:hover:shadow-none dark:shadow-indigo-600">
                            {t}
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ContentDisplay;
