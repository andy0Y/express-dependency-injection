import { Inject } from "./decorators/inject.decorator";
import { Service } from "./decorators/service.decorator";
import { register } from "./container/register";

register({
    statics: [{
        key: 'lol',
        value: 'je suis la valeuuuuuuuur !'
    },{
        key: 'loul',
        value: new Object('je suis la 2e valeur !')
    }]
});

@Service()
export class Injected {
    
    constructor(@Inject('loul') public inception :string, public test: string = 'je me suis fait injecter !') {
        
    }
    log() {
        console.log('injected class working');
    }
}


@Service()
export class Test {
    
    @Inject('lol') public loul: string;
    
    constructor(
    @Inject(Injected) public first?: Injected,
    @Inject('lol') public second?: string,
    public already: string = 'test') {
        
    }
    
    @Inject('lol')
    test() {
        
        return 'not the good one !';
    }
    
    @Inject('lol')
    get lel() {
        
        return 'getted !';
    }
}

const lol = new Test();
console.log(lol.loul);
console.log(lol.test());
console.log(lol.lel);
lol.first.log();
console.log(lol.first.test);
console.log(lol.first.inception);
console.log(lol.second);
console.log(lol.already);