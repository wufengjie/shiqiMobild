import { webview } from 'miox';
import { URL } from '../api';

export default class hobby extends webview {
    constructor(node){
        super(node);
    }

    data(){
        return function(){
            return {
                userList:[],
                scrollPoint:[]
            }
        }
    }
    methods(methods){
        methods.scrollHandle = function(e){
            const at = this.$els.container.scrollTop+document.body.clientHeight - 200;
            let length = this.scrollPoint.length;
            while(length--){
                if(at >= this.scrollPoint[length].offsetTop){

                    this.scrollPoint[length].dom.classList.add("animatein");
                    return
                }
            }
        }
        return methods
    }
    ready(){
        setTimeout(() =>{
            // this.$vm.skill=65;
            let list = document.querySelectorAll(".scroll-point");
            let i = list.length;

            while(i--){
                this.$vm.scrollPoint[i]={
                    dom:list[i],
                    offsetTop:list[i].offsetTop
                };
            }

            console.log(this.$vm.scrollPoint);
        },420)
    }

    render(){
        return require('../../templates/hobby.html')
    }
}
