import React from 'react';

import Icon from './icon';

export default function createIcon(path, displayName) {
  const Component = React.memo(
    React.forwardRef((props, ref) => (
      <Icon data-icon-test={`${displayName}`} ref={ref} {...props}>
        {path}
      </Icon>
    )),
  );

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = `${displayName}`;
  }

  return Component;
}
