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
          <p className="text-lg text-muted-foreground leading-relaxed">
            Software engineer in Costa Rica, working in zero-knowledge. I spent
            four years at Nethermind writing Cairo and Noir across Starknet,
            Aztec and other proving stacks. On several of those projects I
            designed and deployed the infrastructure as well, and ran it in
            production.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Before that, seven years of full-stack TypeScript at WalletConnect,
            Accenture, First Factory and as a freelancer.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I am open to new roles.
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
