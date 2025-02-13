import Link from "next/link";
import GithubIcon from "../../public/icons/github.svg";
import TwitterIcon from "../../public/icons/twitter.svg";

const Social = () => {
  const socialLinks = [
    {
      href: "https://github.com/edgarbarrantes",
      Icon: GithubIcon,
      label: "GitHub"
    },
    {
      href: "https://twitter.com/edgarbarrantes",
      Icon: TwitterIcon,
      label: "Twitter"
    }
  ];

  return (
    <div className="flex justify-center space-x-6">
      {socialLinks.map(({ href, Icon, label }) => (
        <Link
          key={href}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="p-4 rounded-full transition-all hover:scale-110 hover:bg-slate-100/10 dark:hover:bg-white/10"
        >
          <Icon className="w-8 h-8 text-slate-800 dark:text-white" />
        </Link>
      ))}
    </div>
  );
};

export default Social;
