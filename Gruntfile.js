module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    cafemocha: {
      test: {
        src: 'test/**/*.js',
        options: {
          ui: 'tdd',
          growl: true,
          reporter: 'Landing Strip',
        },
        require: [
          'should'
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        globals: {
          module: true
        },
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },

      lib: {
        options: {
          jshintrc: './lib/.jshintrc'
        },
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'cafemocha']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'cafemocha']
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-cafe-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Test task.
  grunt.registerTask('test', ['jshint', 'cafemocha']);
  // Default task.
  grunt.registerTask('default', ['jshint', 'cafemocha', 'concat', 'uglify']);

};
