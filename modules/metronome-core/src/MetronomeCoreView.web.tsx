import * as React from 'react';

import { MetronomeCoreViewProps } from './MetronomeCore.types';

export default function MetronomeCoreView(props: MetronomeCoreViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
