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
 * Copyright (c) 2014 Tom Collins, contributors.
 * Licensed under the MIT License
 *
 */

'use strict';

var assert = require('assert');

var Handlebars = require('handlebars');

require('../index')(Handlebars);

describe('custom handlebars delimiters', function () {
    var str = '{%= name %}{{ name }}{{{ name }}}<%= name %><% name %><<= name >><< name >>';

    it('should use default delimiters', function () {
       // customizer(Handlebars)
            Handlebars.setDelimiter('{{','}}');

        var actual = Handlebars.compile(str)({name: 'Tom Collins'});
        assert.equal(actual, '{%= name %}Tom CollinsTom Collins<%= name %><% name %><<= name >><< name >>');
    });

    it('should use <%=...%>', function () {

       var hbars = Handlebars.create().setDelimiter('<%=', '%>');
        var actual = hbars.compile(str)({name: 'Tom Collins'});
        assert.equal(actual, '{%= name %}{{ name }}{{{ name }}}Tom Collins<% name %><<= name >><< name >>');
    });

    it('should use {%=...%}', function () {
        var hbars = Handlebars.create()
            .setDelimiter('{%=', '%}');
        var actual = hbars.compile(str)({name: 'Tom Collins'});
        assert.equal(actual, 'Tom Collins{{ name }}{{{ name }}}<%= name %><% name %><<= name >><< name >>');
    });

    it('should use <%...%>', function () {
        var hbars = Handlebars.create()
            .setDelimiter('<%', '%>');
        var actual = hbars.compile(str)({name: 'Tom Collins'});
        assert.equal(actual, '{%= name %}{{ name }}{{{ name }}}<%= name %>Tom Collins<<= name >><< name >>');
    });

    it('should use <<...>>', function () {
        var hbars = Handlebars.create()
            .setDelimiter( '<<', '>>');
        var actual = hbars.compile(str)({name: 'Tom Collins'});
        assert.equal(actual, '{%= name %}{{ name }}{{{ name }}}<%= name %><% name %><<= name >>Tom Collins');
    });

    it('should use <<=...>>', function () {
        var hbars = Handlebars.create()
            .setDelimiter('<<=', '>>');
        var actual = hbars.compile(str)({name: 'Tom Collins'});
        assert.equal(actual, '{%= name %}{{ name }}{{{ name }}}<%= name %><% name %>Tom Collins<< name >>');
    });

});