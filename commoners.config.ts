
// import { defineConfig } from '@commoners/solidarity/config';
const defineConfig = (o) => o

export default defineConfig({
    
    icon: './icon.png', 

    electron: {
        window: { width: 1000 }
    },

    services: {
        service: {
            src:'./src/service/index.ts',
            publish: {
                remote: 'https://node-production-aa81.up.railway.app/'
            }
        }
    }
})