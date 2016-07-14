import { webview } from 'miox';

export default class skill extends webview {
    constructor(node){
        super(node);
    }

    data(){
        return function(){
            return {
                userList:[],
                skill:0,
                scrollPoint:[],
                scrollPointHeight:[]

            }
        }
    }
    methods(methods){
        methods.scrollHandle = function(e){
            const at = this.$els.container.scrollTop+document.body.clientHeight - 100;
            let length = this.scrollPointHeight.length;
            while(length--){
                if(at > this.scrollPointHeight[length]){
                    let to=this.scrollPoint[length].getAttribute('aria-valuefinal')
                    this.scrollPoint[length].setAttribute("aria-valuenow",to)
                    return
                }
            }
        }
        return methods
    }
    ready(){
        // let list = document.querySelectorAll(".scroll-point");
        // let i = list.length;
        // while(i--){
        //     console.log(list[i]);
        // }

        setTimeout(() =>{
            // this.$vm.skill=65;
            let list = document.querySelectorAll(".scroll-point");
            let i = list.length;
            while(i--){
                this.$vm.scrollPoint[i]=list[i];
                this.$vm.scrollPointHeight[i]=list[i].offsetTop;
            }
        },400)
    }
    render(){
        return require('../../templates/skill.html')
    }
}
