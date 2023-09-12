// import * as autoUpdatePlugin from '../commoners/packages/plugins/autoupdate/index.js'

import * as bluetoothPlugin from '../commoners/packages/plugins/devices/ble/index.js'
import * as serialPlugin from '../commoners/packages/plugins/devices/serial/index.js'

// import * as autoUpdatePlugin from '@commoners/autoupdate'
// import * as bluetoothPlugin from '@commoners/bluetooth'
// import * as serialPlugin from '@commoners/serial'

// import { defineConfig } from 'commoners' // NOTE: COMMONERS dependencies are missing in local development...
const defineConfig = (o) => o // NOTE: Trying to type this...

export default defineConfig({
    
    icon: {
        dark: './src/assets/commoners_dark.png',
        light: './src/assets/commoners_light.png'
    }, 


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
                    src: './dist/pyinstaller/commoners', // The location of the executable file when executed
                    extraResources: [ 
                        {
                            "from": "./dist/pyinstaller/commoners", // Output Folder
                            "to": "dist/pyinstaller" // Ensure the same structure as src is followed
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
})