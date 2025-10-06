// Reexport the native module. On web, it will be resolved to MetronomeCoreModule.web.ts
// and on native platforms to MetronomeCoreModule.ts
export { default } from './src/MetronomeCoreModule';
export { default as MetronomeCoreView } from './src/MetronomeCoreView';
export * from  './src/MetronomeCore.types';
