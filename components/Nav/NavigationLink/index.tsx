import Link from "next/link";

interface NavigationLinkProps {
  text: string;
  href: string;
}

const NavigationLink = ({ text, href }: NavigationLinkProps) => {
  return (
    <Link
      href={href}
      className="block p-8 align-middle font-bold transition-transform hover:scale-105"
    >
      {text}
    </Link>
  );
};

export default NavigationLink;
