import Image from "next/image";
import { Button } from "../ui/Button";
import { MailIcon, GithubIcon, LinkedinIcon } from "lucide-react";

const links = [
  { href: "mailto:edgar@barrantes.dev", Icon: MailIcon, text: "Email" },
  { href: "https://github.com/edgarbarrantes", Icon: GithubIcon, text: "GitHub" },
  { href: "https://www.linkedin.com/in/edgar-barrantes/", Icon: LinkedinIcon, text: "LinkedIn" },
];

export function Info() {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
      <Image
        src="/profile.jpg"
        alt="Edgar Barrantes Brais"
        width={192}
        height={192}
        className="h-40 w-40 md:h-48 md:w-48 flex-shrink-0 rounded-full object-cover ring-1 ring-border"
        priority
      />

      <div className="flex-1 text-center md:text-left space-y-5">
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            Edgar Barrantes Brais
          </h1>
          <p className="text-lg font-medium">
            Senior Full-Stack Engineer (TypeScript, Node.js, React). Developer
            tooling and AI workflows. ZK background.
          </p>
          <p className="text-sm text-muted-foreground">
            Bulgaria. Remote, European time zone. Open to remote roles in Europe.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I&apos;m a software engineer in Bulgaria with about ten years of
            experience, mostly on remote teams. My core is TypeScript across the
            stack (Node.js/Nest, React/Next.js, PostgreSQL), and I tend to end up
            on the parts other developers depend on: developer tooling, API
            infrastructure, integrations and CI.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I spent four years at Nethermind on zero-knowledge ecosystems
            (Starknet and Aztec, Cairo and Noir). Before that I worked at
            WalletConnect, First Factory and Accenture.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            These days I build with AI in the loop and self-host most of what I
            use. I am open to new roles.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          {links.map(({ href, Icon, text }) => (
            <Button key={href} variant="outline" size="sm" asChild>
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              >
                <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
                {text}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
