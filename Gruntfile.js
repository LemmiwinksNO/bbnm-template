// Grunt ration updated to latest Grunt.  That means your minimum
// version necessary to run these tasks is Grunt 0.4.
module.exports = function(grunt) {

  grunt.initConfig({

    // Empty and remove 'dist/' directory
    clean: ["dist/"],

    // Runs the application JavaScript through JSHint with the defaults.
    jshint: {
      files: ["app/*.js", "app/modules/**/*.js"]
    },

    // This task uses James Burke's excellent r.js AMD builder to take all
    // modules and concatenate them into a single file.
    requirejs: {
      release: {
        options: {
          // Include the main ration file.
          mainConfigFile: "app/config.js",

          // Root application module.
          name: "config",

          // Include the main application.
          insertRequire: ["main"],

          // This includes main.js in the output file.
          include: ["main"],

          // This finds all of main's dependencies and so on and adds them.
          findNestedDependencies: true,

          // Wrap everything in an IIFE.
          wrap: true,

          // We minify it later.
          optimize: "none",

          // I turn this off because supposedly it messes up source maps
          preserveLicenseComments: false,

          // Output file.
          out: "dist/source.js"
        }
      }
    },

    // Combine the Almond AMD loader and precompiled templates with the
    // application source code.
    concat: {
      dist: {
        src: [
          "vendor/bower/almond/almond.js",
          "app/templates/templates.js",
          "dist/source.js"
        ],

        dest: "dist/source.js",

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
          "dist/index.css": [
            "app/styles/index.css"
          ]
        }
      }
    },

    // Minify the application built source and generate source maps back to
    // the original debug build.
    uglify: {
      options: {
        sourceMap: "dist/source.js.map",
        sourceMapRoot: "",
        sourceMapPrefix: 1,
        preserveComments: "some"
      },

      release: {
        files: {
          "dist/source.min.js": ["dist/source.js"]
        }
      }
    },

    // Move vendor and app logic during a build.
    copy: {
      release: {
        files: [
          { src: ["app/**"], dest: "dist/" },
          { src: "vendor/**", dest: "dist/" },
          { src: "views/**", dest: "dist/"}
          // { src: "<%= dist.debug %>source.js", dest: "dist/debug/source.js" },
        ]
      }
    },

    // Copy over index.html to dist/release and change it for production
    processhtml: {
      release: {
        files: {
          "dist/index.html": ["index.html"]
        }
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

    sass: {
      dev: {
        files: {
          'app/styles/index.css': 'app/styles/scss/index.scss'
        }
      }
    },

    // Could watch templates, and compile them. Then we ALWAYS have the JST
    // object to get them from. This is the only way I can get jade on
    // client side.
    watch: {
      options: {  // This should add live reloading to ALL watch targets.
        livereload: true
      },
      templates: {
        files: ["app/**/*.jade"],
        tasks: ["jade2js:dev"]
      },
      scripts: {
        files: ["<%= jshint.files %>"],
        tasks: ["jshint", "shell:mocha-phantomjs"]
      },
      sass: {
        files: ["app/styles/scss/*.scss"],
        tasks: ["sass:dev"]
      }
    },

    // Turn jade templates into javascript functions.
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
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Third-party tasks
  grunt.loadNpmTasks('grunt-jade-plugin');
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-processhtml");
  // grunt.loadNpmTasks("grunt-karma");

  // Do everything it takes to build production version
  grunt.registerTask("release", [
    "clean", "jshint", "processhtml", "requirejs", "concat", "copy", "uglify", "cssmin"
  ]);

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
