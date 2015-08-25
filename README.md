# handlebars-cuustom-delimiters
  Supports customizing global Handlebars environment as well as created environments from Handlebars.create()


> Custom delimiters, for Handlebars templates.

## Install
#### Install with [npm](npmjs.org)

```bash
npm i handlebars-custom-delimiters --save
```

## Run tests

```bash
npm test
```

## Usage

```js
var Handlebars = require('handlebars');
require('handlebars-custom-delimiters')(Handlebars);

var a = Handlebars.compile('{{ name }}<%= name %>')({name: 'Jon'});
console.log(a);
//=> 'Jon<%= name %>'


// define custom delimiters
Handlebars.setDelimiter('<%=', '%>');
var b = Handlebars.compile('{{ name }}<%= name %>')({name: 'Jon'});
console.log(b);
//=> '{{ name }}Jon'
```

## Author
**Eliot Dahood**

## License
Copyright (c) 2015 Eliot Dahood, contributors.
Released under the MIT license

***