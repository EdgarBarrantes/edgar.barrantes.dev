const Newsletter = () => {
  return (
    <div className="">
      <div className="max-w-sm pb-8">
        <h1 className="text-4xl font-bold mb-4">Newsletter</h1>
        <p className="italic">
          Everyweek I&apos;ll be writting a story that I find, some golden of
          wisdom that I find here and there and that I think it&apos;s worthy to
          share, subscribe if you are so inclined.
        </p>
      </div>
      <iframe
        className="w-fit sm:w-96 mx-auto"
        src="https://edgarbarrantes.substack.com/embed"
        width="480"
        loading="lazy"
        height="320"
        style={{ border: "1px solid #EEE", background: "white" }}
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default Newsletter;
