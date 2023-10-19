
import { 
    build, 
} from "@commoners/solidarity";

build('commoners.config.ts', {
    target: 'windows',
    // frontend: true,
    // services: ['node'],
    // publish: PublishOptions['publish'],
    // outDir: './_site_'
})