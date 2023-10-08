// ------------- PRODUCTION -------------
import * as bluetoothPlugin from '@commoners/bluetooth'
import * as serialPlugin from '@commoners/serial'
// import { defineConfig } from 'commoners' // NOTE: COMMONERS dependencies are missing in local development...

// // ------------- DEVELOPMENT -------------
// import * as bluetoothPlugin from '../commoners/packages/plugins/devices/ble/index.js'
// import * as serialPlugin from '../commoners/packages/plugins/devices/serial/index.js'
// // import { defineConfig } from '../commoners/packages/core/index' // NOTE: COMMONERS dependencies are missing in local development...

// // ----------- Package.json Dependencies -----------
// // "@commoners/autoupdate": "file:../commoners/packages/plugins/autoupdate",
// // "@commoners/bluetooth": "file:../commoners/packages/plugins/devices/ble",
// // "@commoners/serial": "file:../commoners/packages/plugins/devices/serial",
// // "commoners":  "file:../commoners"


const defineConfig = (o) => o 

export default defineConfig({
    
    icon: './src/assets/commoners.png', 


    plugins: [
        // autoUpdatePlugin,
        bluetoothPlugin,
        serialPlugin,

        {
            name: 'selective-builds',
            isSupported: {
                desktop: {
                    render: true,
                    preload: true
                },
                mobile: {
                    preload: true,
                    render: false
                },
                web: {
                    preload: false,
                    render: true
                }
            },
            main: () => {
                console.log(`desktop build (main)`)
            },
            preload: () => {
                console.log(COMMONERS.TARGET + ' build (preload)')
            },
            render: () => console.log(COMMONERS.TARGET + ' build (render)'),

        }
    ],

    services: {

        // Example Node server (using pkg)
        node: {
            src: './src/services/node/index.js',
            publish: 'https://node-production-aa81.up.railway.app/'
        },

        // Example Python server (using pyinstaller)
        python: {
            src: './src/services/python/main.py',
            port: 3768,
            publish: {
                build: 'python -m PyInstaller --name solidarity --onedir --clean ./src/services/python/main.py --distpath ./dist/services/python',
                remote: 'https://python-production-4f11.up.railway.app',
                local: './dist/services/python/solidarity/solidarity'
            }
        },
        remote: 'https://jsonplaceholder.typicode.com',
        dynamic: {
            src: 'http://localhost:3768', // Call the python server in development
            publish: 'https://jsonplaceholder.typicode.com'
        }
    }
})