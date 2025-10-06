import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './MetronomeCore.types';

type MetronomeCoreModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class MetronomeCoreModule extends NativeModule<MetronomeCoreModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(MetronomeCoreModule, 'MetronomeCoreModule');
