import Image from "next/image";
import { Card, CardContent } from "../ui/Card";
import { Text } from "../ui/base";
import { Button } from "../ui/Button";
import { MailIcon, GithubIcon, TwitterIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Logo = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-primary"
  >
    {/* Elegant background */}
    <rect
      width="40"
      height="40"
      rx="8"
      fill="currentColor"
      fillOpacity="0.05"
    />
    
    {/* EB Monogram */}
    <path
      d="M15 12h12M15 20h10M15 28h12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M25 8v24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M15 8v24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const socialLinks = [
  {
    href: "mailto:edgar@barrantes.dev",
    Icon: MailIcon,
    label: "Email",
    text: "Let's Connect"
  },
  {
    href: "https://github.com/edgarbarrantes",
    Icon: GithubIcon,
    label: "GitHub",
    text: "Explore Code"
  },
  {
    href: "https://twitter.com/edgarbarrantes",
    Icon: TwitterIcon,
    label: "Twitter",
    text: "Join the Conversation"
  }
];

export function Info() {
  return (
    <div className="relative">
      {/* Background gradient */}
      <div
        className="absolute rounded inset-0 -z-10 h-full w-full bg-white/70 dark:bg-black/70"
        style={{
          backgroundImage: `radial-gradient(
            circle at center,
            var(--primary-light) 0%,
            transparent 70%
          )`,
        }}
        aria-hidden="true"
      />

      <Card className="overflow-hidden border-none bg-background/50">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Profile Image */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-light rounded-full blur-md opacity-50" />
              <Image
                src="/profile.jpg"
                alt="Edgar Barrantes"
                className="relative rounded-full object-cover ring-2 ring-background"
                fill
                sizes="(max-width: 640px) 160px, 192px"
                priority
                quality={90}
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight">
                  Edgar Barrantes
                </h1>
                <Text variant="subtle" className="text-lg md:text-xl">
                  Transforming complex technical challenges into elegant prompts
                  and architectures. Modern software creation is teaching
                  machines to seamlessly understand human intent. I&apos;m into
                  descentralised systems and classical texts. Currently
                  exploring the boundaries of AI capabilities. Wishes are now
                  commands.
                </Text>
                <Text variant="subtle" className="text-base md:text-lg">
                  {""}
                </Text>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                {socialLinks.map(({ href, Icon, label, text }) => (
                  <Button
                    key={href}
                    variant="outline"
                    size="sm"
                    asChild
                    className={twMerge(
                      "transition-all duration-75",
                      "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                      "group"
                    )}
                  >
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                      aria-label={label}
                    >
                      <Icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-105 duration-75" />
                      {text}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
