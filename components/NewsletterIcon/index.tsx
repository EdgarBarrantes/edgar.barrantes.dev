import { useState } from "react";

import NewsletterIcon from "../../public/newsletter.svg";

const NewsletterLink = () => {
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  const openNewsletterModal = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsNewsletterModalOpen(!isNewsletterModalOpen);
  };

  return (
    <a
      href="/"
      className="block dark:invert transition hover:scale-110 cursor-pointer w-auto p-8"
      onClick={openNewsletterModal}
    >
      <NewsletterIcon width="48" height="48" viewBox="0 0 120 120" />
    </a>
  );
};

export default NewsletterLink;
