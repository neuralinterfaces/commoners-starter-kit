
import * as bluetoothPlugin from '@commoners/bluetooth'
import * as serialPlugin from '@commoners/serial'
// import { defineConfig } from 'commoners' // NOTE: COMMONERS dependencies are missing in local development...

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
            publish: {
                build: 'npm run build:node',
                local: {
                    src: './dist/services/node/index'
                }
            }
        },

        // Example Python server (using pyinstaller)
        python: {
            src: './src/services/python/main.py',
            port: 3768,
            publish: {
                remote: 'http://commoners.dev/python',
                build: 'python -m PyInstaller --name commoners --onedir --clean ./src/services/python/main.py --distpath ./dist/services/python',
                local: {
                    src: './dist/services/python/commoners/commoners'
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