var buildFolder = 'build/'; // Folder name followed by slash. If empty use './'.
var destFolder = 'dist/'; // Same as above.

var useBower = true,
    useUnCSS = false;
module.exports = function(grunt) {

    // Load the plugins
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Watch //
        watch: {
            js: {
                files: [buildFolder + 'js/**.js'],
                tasks: ['js'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
            styles: {
                files: [buildFolder + 'scss/*.css', buildFolder + 'scss/*.scss'],
                tasks: ['styles'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
            img: {
                files: [buildFolder + 'img/**'],
                tasks: ['images'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
            html: {
                files: [buildFolder + '**/*.html', '!' + destFolder + '**'],
                tasks: ['html'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
            gruntTasks: {
                files: ['Gruntfile.js'],
                tasks: ['default'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            }
        },

        // Bower //
        bower_concat: {
            all: {
                dest: destFolder + 'js/_bower.js',
                cssDest: destFolder + 'css/_bower.css',
                mainFiles: {
                    'skrollr-menu': 'dist/skrollr.menu.min.js',
                    'photoswipe': ['dist/photoswipe.css', 'dist/photoswipe.js', 'dist/photoswipe-ui-default.js']
                },
                include: [
                    'modernizr',
                    'skrollr',
                    'skrollr-menu',
                    'photoswipe'
                ]
            },


        },

        // JS //
        uglify: {
            build: {
                src: [buildFolder + 'js/script.js'],
                dest: destFolder + 'js/main.min.js'
            },
            bower_js: {
                src: [destFolder + '/js/_bower.js'],
                dest: destFolder + '/js/_bower.js'
            }
        },

        // CSS //
        sass: {
            dist: {
                files: {
                    'tmp/main.css': buildFolder + 'scss/main.scss'
                }
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'tmp/',
                    src: ['*.css'],
                    dest: destFolder + 'css/',
                    ext: '.min.css'
                }]
            },
            bower_css: {
                files: [{
                    expand: true,
                    cwd: destFolder + 'css/',
                    src: ['_bower.css'],
                    dest: destFolder + 'css/',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            autoprefix: {
                expand: true,
                flatten: true,
                src: destFolder + 'css/main.css',
                dest: destFolder + 'css/',
            },
        },
        uncss: {
            dist: {
                files: {
                    src: [destFolder + '**.html'],
                    dest: destFolder + 'css/main.css'
                }
            }
        },

        // Images //
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: buildFolder + 'img',
                    src: ['**'],
                    dest: destFolder + 'img'
                }]
            }
        },
        // imageoptim: {
        //     myTask: {
        //         options: {
        //             jpegMini: false,
        //             imageAlpha: false,
        //             quitAfter: true
        //         },
        //         src: [destFolder + 'img']
        //     }
        // },
        image: {
            compress: {
                files: [{
                    expand: true,
                    cwd: destFolder + 'img/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'dist/'
                }]
            }
        },


        // HTML //
        htmlmin: {
            main: {
                options: { // Target options
                    removeComments: false,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: [{
                    expand: true, // Enable dynamic expansion.
                    cwd: buildFolder, // Src matches are relative to this path.
                    src: ['**/*.html'], // Actual pattern(s) to match.
                    dest: destFolder, // Destination path prefix.
                    ext: '.html', // Dest filepaths will have this extension.
                }]
            }
        },


        // Clean //
        clean: ['tmp'],

        // Host //
        browserSync: {
            dev: {
                bsFiles: {
                    src: [destFolder + '**']
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: destFolder
                    },
                    ghostMode: false
                }
            },
            host: {
                bsFiles: {
                    src: [destFolder + '**']
                },
                options: {
                    watchTask: false,
                    notify: false,
                    server: {
                        baseDir: destFolder
                    },
                    ghostMode: false
                }
            }
        },

        //////////////////////
        //                  //
        //   Custom Tasks   //
        //                  //
        //////////////////////

        // Build HTML from MMD
        shell: {
            index: {
                // command: "multimarkdown x-ray-project.md > build/index.html"
                command: ""
            }
        }








    });

    // // Load the plugins
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // // JS
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // // Styles
    // grunt.loadNpmTasks('grunt-contrib-sass');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-autoprefixer');
    // grunt.loadNpmTasks('grunt-uncss');
    // // HTML
    // grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // // Images
    // grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-image');
    // // Utilities
    // grunt.loadNpmTasks('grunt-browser-sync');
    // grunt.loadNpmTasks('grunt-newer');
    // grunt.loadNpmTasks('grunt-bower-concat');
    // grunt.loadNpmTasks('grunt-contrib-clean');


    // Tasks
    if (useBower) {
        grunt.registerTask('default', ['bower', 'shell', 'html', 'js', 'styles', 'images']);
    } else {
        grunt.registerTask('default', ['shell', 'html', 'js', 'styles', 'images']);
    }

    grunt.registerTask('bower', ['bower_concat']);

    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('html', ['htmlmin']);
    if (useUnCSS) {
        grunt.registerTask('styles', ['sass', 'cssmin', 'newer:uncss:dist', 'autoprefixer']);
    } else {
        grunt.registerTask('styles', ['sass', 'cssmin', 'autoprefixer']);
    }
    grunt.registerTask('images', ['newer:copy:main', 'newer:image:compress']);

    grunt.registerTask('serve', ['default', 'browserSync:dev', 'watch']);
    grunt.registerTask('host', 'browserSync:host');


};
