import Image from "next/image";

const Info = () => {
  return (
    <div className="flex items-center flex-col sm:flex-row my-8 p-6 text-slate-50 dark:text-indigo-50 bg-slate-900 dark:bg-indigo-900 rounded-md">
      <Image
        src="/profile.jpg"
        alt="Profile picture"
        className="rounded-full"
        width={180}
        height={180}
      />
      <p className="ml-5">
        Hey, I&apos;m <b>Edgar</b>, software developer. I enjoy working on
        decentralised applications, debating ideas and going here and there.
        Feel free to{" "}
        <a
          className="font-bold hover:underline text-white"
          target="_blank"
          rel="noreferrer"
          href="mailto:edgar@barrantes.dev"
        >
          contact me
        </a>
        .
      </p>
    </div>
  );
};

export default Info;
