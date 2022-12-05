import React from 'react';

export default {
  title: 'CSS/Button',
  argTypes: {},
};

export const Example = () => (
  <>
    <div className="py-2">
      <button className="btn btn-primary">Test button</button>
    </div>
    <div className="py-2">
      <button className="btn btn-secondary">Test button</button>
    </div>
    <div className="py-2">
      <button className="btn btn-danger">Test button</button>
    </div>
  </>
);
