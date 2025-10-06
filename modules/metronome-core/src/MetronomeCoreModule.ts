import { NativeModule, requireNativeModule } from 'expo';

import { MetronomeCoreModuleEvents } from './MetronomeCore.types';

declare class MetronomeCoreModule extends NativeModule<MetronomeCoreModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<MetronomeCoreModule>('MetronomeCore');
