/**
 * Created by LakeHm on 2016/11/21.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['public/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            files: ['Gruntfile.js', 'public/js/*.js', 'test/**/*.js'],
            options: {
                //这里是覆盖JSHint默认配置的选项
                reporterOutput: "",
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        // 通过connect任务，创建一个静态服务器
        connect: {
            options: {
                // 服务器端口号
                port: 8080,
                // 服务器地址(可以使用主机名localhost，也能使用IP)
                hostname: '114.212.118.115',
                // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
                base: 'public/'
            },
            server: {
                options: {
                }
            }
        },
        // 通过watch任务，来监听文件是否有更改
        watch: {
            client: {
                // 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
                options: {
                },
                // '**' 表示包含所有的子目录
                // '*' 表示包含所有的文件
                files: ['*.html', 'public/js/*.js']
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: './public/js/lib',
                    layout: 'byComponent',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('test', ['connect','watch']);

};
