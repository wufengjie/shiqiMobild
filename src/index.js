import './resource'; // 加载资源文件

// load miox and miox-components
import * as miox from 'miox';
import mioxs from 'miox-components';

// import webviews.
import ViewIndex from './js/webviews/index';
import ViewPlan from './js/webviews/plan';
import ViewContact from './js/webviews/contact';
import ViewCharacter from './js/webviews/character';
import ViewSkill from './js/webviews/skill';
import ViewHobby from './js/webviews/hobby';

import http from 'vue-resource';

import sweetalert from 'sweetalert';

import { side } from "./js/api";

import sidebarInit  from "./js/sidebar";

// install native components on miox.
mioxs(miox);

// when dom ready
// start to build app
miox.ready(SideBar);

function SideBar(){
    const wraper = document.createElement('div');
    wraper.classList.add('main-container');
    document.body.appendChild(wraper);
    const sidebar = new miox.vue(sidebarInit(wraper,boot));
}

function boot(el, sidebar){
    const main = miox.bootstrap(el, {
        backgroundColor: '#f7f7f7',
        debug: true,
        animate:'fade'     //  slide|fade|scale|drown
    });

    main.on('ready', function(){
        sidebar.app = this;
        this.$sidebar = sidebar;

        this.$modal = sweetalert;


    });

    main.on('route:start', function(){
        this.$sidebar.current = this.$server.pathname;
    })


    main.define('/', ViewIndex);
    main.define('/plan', ViewPlan);
    main.define('/contact', ViewContact);
    main.define('/character', ViewCharacter);
    main.define('/skill', ViewSkill);
    main.define('/hobby', ViewHobby);
    main.listen();
}
