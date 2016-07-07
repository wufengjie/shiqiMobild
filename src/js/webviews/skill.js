import { webview } from 'miox';

export default class skill extends webview {
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
        return require('../../templates/skill.html')
    }
}
