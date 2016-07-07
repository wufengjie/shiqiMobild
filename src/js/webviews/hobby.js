import { webview } from 'miox';
import { URL } from '../api';

export default class hobby extends webview {
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

    render(){
        return require('../../templates/hobby.html')
    }
}
