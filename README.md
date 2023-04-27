# Difference Finder

[![Maintainability](https://api.codeclimate.com/v1/badges/d15b73daf14789279449/maintainability)](https://codeclimate.com/github/zil130/frontend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/d15b73daf14789279449/test_coverage)](https://codeclimate.com/github/zil130/frontend-project-lvl2/test_coverage) [![Actions Status](https://github.com/zil130/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/zil130/frontend-project-lvl2/actions) [![tests and lint check](https://github.com/zil130/frontend-project-lvl2/actions/workflows/tests-lint.yml/badge.svg)](https://github.com/zil130/frontend-project-lvl2/actions/workflows/tests-lint.yml)

Difference Finder is a program that determines the difference between two data structures. This is a common task for which there are numerous online services, for example, http://www.jsondiff.com/. This mechanism is used when outputting tests or tracking changes in configuration files.

Utility Features:
* Support for different input formats: YAML, JSON
* Output in plain text, stylish, and JSON format

Usage example:
```
# plain format
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# stylish format
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```

---

## Install
1. Install [Node.js](https://nodejs.org)
2. Clone this repository: https://github.com/zil130/gendiff
4. Go to folder `gendiff`
5. Run `npm install`
6. Run `npm link`

---

## Get help
```
gendiff -h
```

---

## Examples
1. stylish (default)
[![asciicast](https://asciinema.org/a/MMMMxS16lcKuHqEhsNP6BRVEy.svg)](https://asciinema.org/a/MMMMxS16lcKuHqEhsNP6BRVEy)
2. plain
[![asciicast](https://asciinema.org/a/eMadEteR69u3ybVHCzYkLEV0t.svg)](https://asciinema.org/a/eMadEteR69u3ybVHCzYkLEV0t)
3. json
[![asciicast](https://asciinema.org/a/gc9CXBGtGfP3Rhxo2y2NNB6ag.svg)](https://asciinema.org/a/gc9CXBGtGfP3Rhxo2y2NNB6ag)
