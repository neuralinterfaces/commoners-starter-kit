
import { 
    start, 
} from "@commoners/solidarity";

start('commoners.config.ts', {
    target: 'desktop',
    frontend: true,
    services: ['node', 'python'],
    // publish: PublishOptions['publish'],
    // outDir: './_site_'
})