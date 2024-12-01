
// import { defineConfig } from '@commoners/solidarity/config';

import { UserConfig } from '@commoners/solidarity';
const defineConfig = (o: UserConfig) => o

export default defineConfig({
    
    icon: './icon.png', 

    electron: {
        window: { width: 1000 }
    },

    services: {
        tsNode: {
            src:'./src/services/tsNode.ts',
            publish: {

                // NOTE: Replace with hosted URL
                remote: 'https://jsonplaceholder.typicode.com/todos/1' 
                
            }
        }
    }
})