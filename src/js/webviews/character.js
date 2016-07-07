import { webview } from 'miox';

export default class character extends webview {
    constructor(node){
        super(node);
    }

    data(){
        return function(){
            return {

            }
        }
    }
    render(){
        return require('../../templates/character.html')
    }
}
