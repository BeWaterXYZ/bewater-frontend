import Image from 'next/image';

export default function PoorMansStorybook() {
  return (
    <div className="mt-20 container">
      <h1 className="heading-1"> {"Poor man's storybook"}</h1>
      <div className="flex flex-wrap">
        <div className="bg-night  p-2">
          <div className="py-2">
            <button className="btn btn-primary">Test button</button>
          </div>
          <div className="py-2">
            <button className="btn btn-primary-invert">Test button</button>
          </div>
          <div className="py-2">
            <button className="btn btn-secondary">Test button</button>
          </div>
          <div className="py-2">
            <button className="btn btn-secondary-invert">Test button</button>
          </div>
          <div className="py-2">
            <button className="btn btn-danger">Test button</button>
          </div>
        </div>

        <div>
          <Image src="/icons/check.svg" alt="" height={48} width={48} />
          <Image src="/icons/warning.svg" alt="" height={48} width={48} />
          <Image src="/icons/error.svg" alt="" height={48} width={48} />
          {/* add more here */}
        </div>
      </div>

      <div className="bg-night  p-2">
        <p className="body-1">heading</p>
        <div className="py-2">
          <h1 className="heading-1">
            The quick brown fox jumps over the lazy dog
          </h1>
        </div>
        <div className="py-2">
          <h2 className="heading-2">
            The quick brown fox jumps over the lazy dog
          </h2>
        </div>
        <div className="py-2">
          <h3 className="heading-3">
            The quick brown fox jumps over the lazy dog
          </h3>
        </div>
        <div className="py-2">
          <h4 className="heading-4">
            The quick brown fox jumps over the lazy dog
          </h4>
        </div>
        <div className="py-2">
          <h5 className="heading-5">
            The quick brown fox jumps over the lazy dog
          </h5>
        </div>
        <div className="py-2">
          <h6 className="heading-6">
            The quick brown fox jumps over the lazy dog
          </h6>
        </div>
        <hr />
        <p className="body-1">text</p>

        <div className="py-2">
          <p className="body-1">The quick brown fox jumps over the lazy dog</p>
        </div>
        <div className="py-2">
          <p className="body-2">The quick brown fox jumps over the lazy dog</p>
        </div>
        <div className="py-2">
          <p className="body-3">The quick brown fox jumps over the lazy dog</p>
        </div>
        <div className="py-2">
          <p className="body-4">The quick brown fox jumps over the lazy dog</p>
        </div>

        <div className="py-2">
          <p className="body-5">The quick brown fox jumps over the lazy dog</p>
        </div>
        <hr />

        <p className="body-1">mono</p>
        <div className="py-2">
          <p className="mono-1">The quick brown fox jumps over the lazy dog</p>
        </div>
        <div className="py-2">
          <p className="mono-2">The quick brown fox jumps over the lazy dog</p>
        </div>
        <div className="py-2">
          <p className="mono-3">The quick brown fox jumps over the lazy dog</p>
        </div>
        <div className="py-2">
          <p className="mono-4">The quick brown fox jumps over the lazy dog</p>
        </div>
        <div className="py-2">
          <p className="mono-5">The quick brown fox jumps over the lazy dog</p>
        </div>
      </div>
    </div>
  );
}
