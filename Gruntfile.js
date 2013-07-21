// Grunt ration updated to latest Grunt.  That means your minimum
// version necessary to run these tasks is Grunt 0.4.
module.exports = function(grunt) {

  grunt.initConfig({
    // Easier location to change the default debug and release folders.
    dist: {
      debug: "dist/debug/",
      release: "dist/release/"
    },

    // Runs the application JavaScript through JSHint with the defaults.
    jshint: {
      files: ["app/*.js", "app/modules/**/*.js"]
    },

    // The jst task compiles all application templates into JavaScript
    // functions with the Lo-Dash template function.
    jst: {
      debug: {
        files: {
          "<%= dist.debug %>templates.js": ["app/templates/**/*.*"]
        }
      }
    },

    // This task simplifies working with CSS inside Backbone Boilerplate
    // projects.  Instead of manually specifying your stylesheets inside the
    // ration, you can use `@imports` and this task will concatenate
    // only those paths.
    styles: {
      // Out the concatenated contents of the following styles into the below
      // development file path.
      "<%= dist.debug %>app/styles/index.css": {
        // Point this to where your `index.css` file is location.
        src: "app/styles/index.css",

        // The relative path to use for the @imports.
        paths: ["app/styles"],

        // Point to where styles live.
        prefix: "app/styles/",

        // Additional production-only stylesheets here.
        additional: []
      }
    },

    // This task uses James Burke's excellent r.js AMD builder to take all
    // modules and concatenate them into a single file.
    requirejs: {
      debug: {
        // Merge the Jam ration options into the output build.
        options: {
          // Include the main ration file.
          mainConfigFile: "app/config.js",

          // Output file.
          out: "<%= dist.debug %>source.js",

          // Root application module.
          name: "config",

          // Include the main application.
          insertRequire: ["main"],

          // This will ensure the application runs after being built.
          include: ["app", "main", "router"],

          // Wrap everything in an IIFE.
          wrap: true
        }
      }
    },

    // Combine the Almond AMD loader and precompiled templates with the
    // application source code.
    concat: {
      dist: {
        src: [
          "vendor/bower/almond/almond.js",
          "<%= dist.debug %>templates.js",
          "<%= dist.debug %>source.js"
        ],

        dest: "<%= dist.debug %>source.js",

        separator: ";"
      }
    },

    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named index.css.  It
    // also minifies all the CSS as well.  This is named index.css, because we
    // only want to load one stylesheet in index.html.
    cssmin: {
      release: {
        files: {
          "<%= dist.release %>app/styles/index.css": [
            "<%= dist.debug %>app/styles/index.css"
          ]
        }
      }
    },

    // Minify the application built source and generate source maps back to
    // the original debug build.
    uglify: {
      options: {
        sourceMap: "<%= dist.release %>source.js.map",
        sourceMapRoot: "",
        sourceMapPrefix: 1,
        preserveComments: "some"
      },

      release: {
        files: {
          "<%= dist.release %>source.js": ["<%= dist.debug %>source.js"]
        }
      }
    },

    // The clean task ensures all files are removed from the dist/ directory so
    // that no files linger from previous builds.
    clean: ["dist/"],

    // Move vendor and app logic during a build.
    copy: {
      debug: {
        files: [
          { src: ["app/**"], dest: "<%= dist.debug %>" },
          { src: "vendor/**", dest: "<%= dist.debug %>" },
          { src: "index.html", dest: "<%= dist.debug %>index.html" },
          { src: "views/**", dest: "<%= dist.debug %>"}
        ]
      },

      release: {
        files: [
          { src: ["app/**"], dest: "<%= dist.release %>" },
          { src: "vendor/**", dest: "<%= dist.release %>" },
          { src: "index.html", dest: "<%= dist.release %>index.html" },
          { src: "views/**", dest: "<%= dist.release %>"},
          { src: "<%= dist.debug %>source.js", dest: "<%= dist.release %>debug/source.js" }
        ]
      }
    },

    shell: {
      'mocha-phantomjs': {
        command: 'mocha-phantomjs http://localhost:3000/test/mocha-front/index.html',
        options: {
          stdout: true,
          stderr: true
        }
      }
    },

    // Could watch templates, and compile them. Then we ALWAYS have the JST
    // object to get them from. This is the only way I can get jade on
    // client side.
    watch: {
      // options: {  // This should add live reloading to ALL watch targets.
      //   livereload: true
      // },
      // livereload: {  // This should work too.
      //   files: ['*.jade', '*.js'],
      //   options: {
      //     livereload: true
      //   }
      // },
      templates: {
        files: ["app/**/*.jade"],
        tasks: ["jade2js:dev"],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: ["<%= jshint.files %>"],
        tasks: ["jshint", "shell:mocha-phantomjs"],
        options: {
          livereload: true  // maybe we should set this to another port number. Maybe that is why it doesn't work.
        }
      }
    },

    jade2js: {
      dev: {
        options: {
          namespace: 'JST',
          processName: function(filename){
            return filename;
          },
          includeRuntime: true
        },
        files: {
          'app/templates/templates.js': 'app/templates/**/*.jade'
        }
      },
      debug: {
        options: {
          namespace: 'JST',
          processName: function(filename){
            return filename;
          },
          includeRuntime: true
        },
        files: {
          "<%= dist.debug %>templates.js": 'app/templates/**/*.jade'
        }
      }
    }

  });

  // Grunt contribution tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-jst");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-jade-plugin');

  // Third-party tasks.
  // grunt.loadNpmTasks("grunt-karma");

  // Grunt BBB tasks.
  grunt.loadNpmTasks("grunt-bbb-server");
  grunt.loadNpmTasks("grunt-bbb-requirejs");
  grunt.loadNpmTasks("grunt-bbb-styles");

  // This will reset the build, be the precursor to the production
  // optimizations, and serve as a good intermediary for debugging.
  grunt.registerTask("debug", [
    "clean", "jshint", "jade2js:debug", "requirejs", "concat", "copy", "styles"
  ]);

  // The release task will first run the debug tasks.  Following that, minify
  // the built JavaScript and then minify the built CSS.
  grunt.registerTask("release", ["debug", "uglify", "cssmin"]);

  // When running the default Grunt command, just lint the code.
  grunt.registerTask("default", ["jshint"]);

  // The test task take care of starting test server and running tests.
  // grunt.registerTask("test", ["jshint", "server:test", "karma"]);

  // Start node.js server and run front-end tests.
  grunt.registerTask("test", "Start web server and test.", function(){
    grunt.task.run(['jshint']);
    grunt.log.writeln("Starting web server");
    require("./server.js");
    grunt.task.run(['shell:mocha-phantomjs']);
  });

};
