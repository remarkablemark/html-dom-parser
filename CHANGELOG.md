# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com)
and this project adheres to [Semantic Versioning](http://semver.org).

## [0.1.1](https://github.com/remarkablemark/html-dom-parser/compare/v0.1.0...v0.1.1) - 2017-06-26
### Added
- CHANGELOG with previous releases backfilled

### Fixed
- Fix client parser on IE by specifying required parameter for `createHTMLDocument` (#4)

## [0.0.2](https://github.com/remarkablemark/html-dom-parser/compare/v0.0.1...v0.0.2) - 2016-10-10
### Added
- Create npm scripts for prepublish

### Changed
- Change webpack to build to UMD target
- Update README installation and usage instructions

## [0.0.1](https://github.com/remarkablemark/html-dom-parser/tree/v0.0.1) - 2016-10-10
### Added
- Server parser
  - Wrapper for `htmlparser2.parseDOM`
- Client parser
  - Uses DOM API to mimic server parser output
  - Build client library with webpack
- Add README, tests, and other necessary files
