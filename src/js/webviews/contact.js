import { webview } from 'miox';

export default class contact extends webview {
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
        return require('../../templates/contact.html')
    }
}
