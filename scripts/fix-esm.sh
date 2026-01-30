#!/usr/bin/env bash

# replace `.d.ts` -> `.d.mts`
find esm -type f -exec perl -i -pe 's/\.d\.ts/\.d\.mts/g' {} +

# rename `.d.ts` -> `.d.mts`
find esm -name '*.d.ts' -exec bash -c 'mv "$1" "${1%.d.ts}.d.mts"' _ {} \;

# rename `.d.ts.map` -> `.d.mts.map`
find esm -name '*.d.ts.map' -exec bash -c 'mv "$1" "${1%.d.ts.map}.d.mts.map"' _ {} \;

# delete extraneous files
rm -rf esm/client/{client,server,index.*,types.*}
