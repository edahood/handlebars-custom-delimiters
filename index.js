/**
 * handlebars-custom-delimiters
 * Adds a setDelimiter function to all HandlebarsEnvironment instances (prototype)
 * Copyright (c) 2015 Eliot Dahood, contributors.
 * Licensed under the MIT License
 *
 *
 * Based on
 * handlebars-delimiters <https://github.com/jonschlinkert/handlebars-delimiters>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 *
 */
'use strict';
(function() {
    var isWeb = typeof window !== 'undefined' ? true : false;

    function HandlebarsCustomDelimiters(Handlebars) {
        var escapeDelims = function (str, delims) {
            var defaults = /\{{([\s\S]+?)}}/ig;
            var match;

            while (match = defaults.exec(str)) {
                str = str.replace(match[0], '\\{{' + match[1] + '}}');
            }
            return str;
        };

        function setDelimiter(start, end){
            var delims = [start, end];
            var self = this;
            if (start === '{{' && end === '}}'){
                if (self._compile){
                    self.compile = self._compile;
                }
                return self;
            }

            if (delims[0].indexOf('=') === -1) {
                delims[0] = delims[0] + '[^=]';
            }

            var re = new RegExp(delims[0] + '([\\s\\S]+?)' + delims[1], 'g');


            if (!self._compile) {
                self._compile = self.compile;
            }

            self.compile = function () {
                var args = [].slice.call(arguments);

                if (typeof args[0] !== 'string') {
                    throw new Error('The first argument must be a string.');
                }

                if(delims[0] !== '{{' && delims[1] !== '}}') {
                    args[0] = escapeDelims(args[0], delims);
                }

                var match;
                while (match = re.exec(args[0])) {
                    args[0] = args[0].replace(re, '{{' + match[1] + '}}');
                }
                return self._compile.apply(null, args);
            };

            return self;
        }
        Handlebars.HandlebarsEnvironment.prototype.setDelimiter = setDelimiter;
        return Handlebars;
    }

    if (!isWeb) {
        module.exports = HandlebarsCustomDelimiters;
    }
    else {
        HandlebarsCustomDelimiters(window.Handlebars);
    }
})()

