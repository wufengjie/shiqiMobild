import { side  } from './api';

export default function sidebarInit(wraper,boot){
    return {
        el: wraper,
        data: {
            sideBarOpen:false,
            current:''
        },

        template: require('../templates/construct.html'),
        replace: false,
        methods: {
            redirect(url){
                if(this.app.$server.pathname != url)
                this.app.$forward(url);
                this.menuToggle();
                this.current = url
            },
            menuToggle(){
                this.sideBarOpen = !this.sideBarOpen;
            }
        },
        ready(){
            boot(this.$els.main, this);
        }
    }
}
