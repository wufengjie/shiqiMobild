import { webview } from 'miox';

export default class plan extends webview {
    constructor(node){
        super(node);
    }

    data(){
        return function(){
            return {
                userList:[]
            }
        }
    }
    ready(){

    }
    render(){
        return require('../../templates/plan.html')
    }
}
