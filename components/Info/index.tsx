import Image from "next/image";
import { Card } from "../ui/Card";
import { useAppTheme } from "../ThemeProvider";

const Info = () => {
  const { theme } = useAppTheme();

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0">
          <Image
            src="/profile.jpg"
            alt="Profile picture"
            className="rounded-full object-cover ring-4 ring-purple-100 dark:ring-purple-900"
            fill
            sizes="(max-width: 640px) 160px, 192px"
            priority
            quality={90}
          />
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            Hey, I&apos;m <span className="text-purple-600 dark:text-purple-400">Edgar</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Software engineer passionate about decentralised applications, 
            engaging in thoughtful debates, and exploring new horizons. 
            Feel free to{" "}
            <a
              href="mailto:edgar@barrantes.dev"
              className="font-medium text-purple-600 dark:text-purple-400 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-sm"
            >
              reach out
            </a>
            .
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Info;
