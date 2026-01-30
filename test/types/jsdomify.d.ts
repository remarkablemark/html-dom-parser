declare module 'jsdomify' {
  interface JsdomifyOptions {
    html?: string;
    url?: string;
  }

  export function create(options?: JsdomifyOptions): void;
  export function destroy(): void;
  export const jsdom: unknown;
}
