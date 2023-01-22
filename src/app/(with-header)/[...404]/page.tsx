export default function NotFound() {
  return (
    <div className="flex flex-col h-[calc(100vh-160px)] justify-center items-center">
      <iframe
        src="https://giphy.com/embed/3o7aTskHEUdgCQAXde"
        width="480"
        height="204"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
      <p className="body-1">
        <a href="https://giphy.com/gifs/quentin-tarantino-pulp-fiction-vincent-vega-3o7aTskHEUdgCQAXde">
          Not Found
        </a>
      </p>
    </div>
  );
}
