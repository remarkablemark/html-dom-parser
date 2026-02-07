export const isBrowser = () => typeof window === 'object' && !isNode();

export const isNode = () => typeof process === 'object';
