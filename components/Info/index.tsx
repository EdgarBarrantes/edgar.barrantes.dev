import Image from "next/image";

const links = [
  { href: "mailto:edgar@barrantes.dev", text: "edgar@barrantes.dev" },
  { href: "https://github.com/edgarbarrantes", text: "GitHub" },
  { href: "https://www.linkedin.com/in/edgar-barrantes/", text: "LinkedIn" },
];

export function Info() {
  return (
    <section className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
      <Image
        src="/profile.jpg"
        alt="Edgar Barrantes Brais"
        width={192}
        height={192}
        className="h-36 w-36 flex-shrink-0 rounded-lg object-cover md:h-40 md:w-40"
        priority
      />

      <div className="max-w-xl space-y-6">
        <div className="space-y-4">
          <h1 className="text-[2.75rem] font-semibold leading-none tracking-tight">
            Edgar Barrantes Brais
          </h1>
          <p className="font-serif text-2xl leading-snug">
            Senior Full-Stack Engineer (TypeScript, Node.js, React). Developer tooling
            and AI workflows. ZK background.
          </p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-moss" aria-hidden="true" />
            Open to remote roles in Europe.
          </p>
        </div>

        <div className="copy space-y-4 text-foreground/85">
          <p>
            I&apos;m a software engineer with about ten years of experience,
            mostly on remote teams. My core is TypeScript across the stack (Node.js/Nest,
            React/Next.js, PostgreSQL), and I tend to end up on the parts other developers
            depend on: developer tooling, API infrastructure, integrations and CI.
          </p>
          <p>
            I spent four years at Nethermind on zero-knowledge ecosystems (Starknet and
            Aztec, Cairo and Noir). Before that I worked at WalletConnect, First Factory
            and Accenture.
          </p>
          <p>
            These days I build with AI in the loop and self-host most of what I use. I am
            open to new roles.
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map(({ href, text }) => (
            <li key={href}>
              <a
                href={href}
                className="link"
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
