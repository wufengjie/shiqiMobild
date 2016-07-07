import { webview } from 'miox';

export default class index extends webview {
    constructor(node){
        super(node);
    }

    render(){
        return require('../../templates/index.html')
    }
}
