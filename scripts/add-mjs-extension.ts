import * as path from 'node:path';

import type { API, FileInfo } from 'jscodeshift';

/**
 * Codemod to add .mjs extension to all imports in TypeScript files
 *
 * This codemod transforms:
 * import { something } from './module';
 * To:
 * import { something } from './module.mjs';
 *
 * It handles:
 * - Named imports
 * - Default imports
 * - Namespace imports
 * - Dynamic imports
 * - Re-exports
 */

export default function transformer(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Helper to check if a module path is relative
  function isRelativeModulePath(modulePath: string): boolean {
    return modulePath.startsWith('./') || modulePath.startsWith('../');
  }

  // Helper to check if module already has an extension
  function hasExtension(modulePath: string): boolean {
    return path.extname(modulePath) !== '';
  }

  // Helper to add .mjs extension
  function addMjsExtension(modulePath: string): string {
    return modulePath + '.mjs';
  }

  // Transform import declarations
  root.find(j.ImportDeclaration).forEach((path) => {
    const source = path.node.source.value as string;

    if (isRelativeModulePath(source) && !hasExtension(source)) {
      path.node.source.value = addMjsExtension(source);
    }
  });

  // Transform export from declarations
  root
    .find(j.ExportNamedDeclaration, { source: { type: 'StringLiteral' } })
    .forEach((path) => {
      const source = path.node.source?.value as string;

      if (
        path.node.source &&
        isRelativeModulePath(source) &&
        !hasExtension(source)
      ) {
        path.node.source.value = addMjsExtension(source);
      }
    });

  // Transform export all declarations
  root
    .find(j.ExportAllDeclaration, { source: { type: 'StringLiteral' } })
    .forEach((path) => {
      const source = path.node.source.value as string;

      if (isRelativeModulePath(source) && !hasExtension(source)) {
        path.node.source.value = addMjsExtension(source);
      }
    });

  // Transform dynamic import() calls
  root
    .find(j.CallExpression, {
      callee: { type: 'Import' },
    })
    .forEach((path) => {
      const argument = path.node.arguments[0];

      if (j.StringLiteral.check(argument)) {
        const source = argument.value;

        if (isRelativeModulePath(source) && !hasExtension(source)) {
          argument.value = addMjsExtension(source);
        }
      }
    });

  // Transform require() calls (for completeness, though less common in ESM)
  root
    .find(j.CallExpression, {
      callee: { name: 'require' },
    })
    .forEach((path) => {
      const argument = path.node.arguments[0];

      if (j.StringLiteral.check(argument)) {
        const source = argument.value;

        if (isRelativeModulePath(source) && !hasExtension(source)) {
          argument.value = addMjsExtension(source);
        }
      }
    });

  return root.toSource({
    quote: 'single',
    trailingComma: true,
    lineTerminator: '\n',
  });
}

export const parser = 'ts';
