import React from 'react';

const config = {
  title: 'CSS/Typography',
  argTypes: {},
};

export default config;

export const Example = () => (
  <div className="bg-night">
    <p className="body-1">heading</p>
    <div className="py-2">
      <h1 className="heading-1">The quick brown fox jumps over the lazy dog</h1>
    </div>
    <div className="py-2">
      <h2 className="heading-2">The quick brown fox jumps over the lazy dog</h2>
    </div>
    <div className="py-2">
      <h3 className="heading-3">The quick brown fox jumps over the lazy dog</h3>
    </div>
    <div className="py-2">
      <h4 className="heading-4">The quick brown fox jumps over the lazy dog</h4>
    </div>
    <div className="py-2">
      <h5 className="heading-5">The quick brown fox jumps over the lazy dog</h5>
    </div>
    <div className="py-2">
      <h6 className="heading-6">The quick brown fox jumps over the lazy dog</h6>
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
);
