const projectName = 'unknown'
const projectPreset = 'laravel'                                       // * 'laravel' | 'self-hosted' | 'static'
const projectPath = './..'                                            // * path to project
const srcFolder = `${projectPath}/resources`                          // * src folder
const buildFolder = `${projectPath}/public`
import browserSync from 'browser-sync'
import phpServer from 'gulp-connect-php'






const fileMap = {
    "src": {
        "folder": srcFolder,
        "pages": `${srcFolder}/pages`,
        "styles": `${srcFolder}/css`,
        "scripts": `${srcFolder}/js`,
        "img": `${srcFolder}/img`,
        "fonts": `${srcFolder}/fonts`,
        "resources": `${srcFolder}/resources`
    },
    "build": {
        "folder": buildFolder,
        "pages": `${buildFolder}/pages`,
        "styles": `${buildFolder}/styles`,
        "scripts": `${buildFolder}/scripts`,
        "img": `${buildFolder}/img`,
        "fonts": `${buildFolder}/fonts`,
        "resources": `${buildFolder}/resources`
    },
    "clean": buildFolder,
    "public": `./../public`
}

const laravelPreset = {
    "fileMap" : fileMap
}

export default
    {
        "fileMap": fileMap,
        "serverType": "live",
        // * https://browsersync.io/docs/options
        "browserSync" :
        {
            "static" : ()=>
            {
                return browserSync.init({
                    notify: false,
                    reloadOnRestart: false,
                    server: {
                        // ? use for debug
                        // directory: true,
                        // ? to serve multiple roots
                        baseDir: [`${fileMap.build.pages}`, `${fileMap.build.folder}`],
                        serveStaticOptions: {
                            extensions: ['html']
                        },
                        //* relative path from gulpfile
                        // routes: {
                        //     // "/bower_components": "bower_components"
                        // }
                    }
                })
            },
            // * https://www.npmjs.com/package/gulp-connect-php
            "live" : () =>
            {
                return phpServer.server({
                    base: `${fileMap.public}`,
                    hostname: '127.0.0.1',
                    port: 10330,
                    open: false,
                    // bin: '',     // ?    path to php folder (if multiple versions)
                    // ini : '',    // ?   path to php ini file
                }, () => {
                    browserSync({
                        proxy: '127.0.0.1:10330',
                        port : 3030,
                        // ui : 3031,
                        // tunnel: `projectName`,
                        // online : true
                    })
                })
            }
        }


    }
export { projectPreset, projectName }
