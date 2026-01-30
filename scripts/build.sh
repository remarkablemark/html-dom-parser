#!/usr/bin/env bash

if [[ $1 == '--cjs' ]]; then
  tsc --project tsconfig.build.json
  find lib -type f \( -name '*.mjs*' -or -name '*.mts*' \) -delete

elif [[ $1 == '--esm' ]]; then
  find src -type f -name '*.ts' -exec bash -c 'mv "$1" "${1%.ts}.mts"' _ {} \;
  jscodeshift -t scripts/add-mjs-extension.ts src --extensions=mts
  rollup --config --failAfterWarnings --environment ESM:true
  rm -rf esm/client/{client,server,index.*,types.*}
  git restore src
  git clean -f src

elif [[ $1 == '--umd' ]]; then
  rollup --config --failAfterWarnings --environment UMD:true
  rm -rf dist/{client,server,*.mts*,*.ts*}
fi
