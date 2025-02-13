import Link from "next/link";
import { useState } from "react";

import NewsletterIcon from "../../public/newsletter.svg";

const NewsletterLink = () => {
  // const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  // const openNewsletterModal = (event: React.MouseEvent<HTMLAnchorElement>) => {
  //   setIsNewsletterModalOpen(!isNewsletterModalOpen);
  // };

  return (
    <Link 
      href="/newsletter"
      className="hover:scale-105 transition cursor-pointer w-auto p-8"
    >
      <NewsletterIcon width="48" height="48" viewBox="0 0 120 120" />
    </Link>
  );
};

export default NewsletterLink;
