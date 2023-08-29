// import * as autoUpdatePlugin from '../commoners/packages/plugins/autoupdate/index.js'
import * as bluetoothPlugin from '../commoners/packages/plugins/devices/ble/index.js'
import * as serialPlugin from '../commoners/packages/plugins/devices/serial/index.js'

// import * as autoUpdatePlugin from '@commoners/autoupdate'
// import * as bluetoothPlugin from '@commoners/bluetooth'
// import * as serialPlugin from '@commoners/serial'


export default {
    
    icon: {
        dark: './src/assets/commoners_dark.png',
        light: './src/assets/commoners_light.png'
    }, 


    plugins: [
        // autoUpdatePlugin,
        bluetoothPlugin,
        serialPlugin,

        // NOTE: These are not present on non-Electron builds because functions cannot be reliably parsed
        {
            name: 'render-only',
            render: () => console.log('RENDERED')
        },
        {
            name: 'preload-only',
            preload: () => console.log('PRELOADED')
        },
        {
            name: 'main-only',
            main: () => console.log('RUNNING ON MAIN')
        },
        {
            name: 'all-builds',
            electronOnly: false,
            main: () => console.log('ELECTRON BUILD (main)'),
            preload: () => console.log('ALL BUILDS (preload)'),
            render: () => console.log('ALL BUILDS (render)')

        }
    ],

    services: {
        node: {
            src: './src/services/node/index.js',
            publish: {
                remote: 'http://commoners.dev/node'
            }
        },
        python: {
            src: './src/services/python/main.py',
            port: 3768,
            publish: {
                build: {
                    mac: 'python -m PyInstaller --name commoners --onedir --clean ./src/services/python/main.py --distpath ./dist/pyinstaller',
                },
                local: {
                    src: './pyinstaller/commoners', // --onedir
                    extraResources: [ 
                        {
                            "from": "./dist/pyinstaller/commoners",
                            "to": "pyinstaller"
                        }
                    ]
                }
            }
        },
        remote: 'https://jsonplaceholder.typicode.com',
        remoteConfig: {
            url: 'http://localhost:3768', // Call the python server in development
            publish: {
                url: 'https://jsonplaceholder.typicode.com'
            }
        }
    }
}