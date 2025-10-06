import { requireNativeView } from 'expo';
import * as React from 'react';

import { MetronomeCoreViewProps } from './MetronomeCore.types';

const NativeView: React.ComponentType<MetronomeCoreViewProps> =
  requireNativeView('MetronomeCore');

export default function MetronomeCoreView(props: MetronomeCoreViewProps) {
  return <NativeView {...props} />;
}
