/**
* @file layout.js
* @author fuqiangqiang@baidu.com
*/

import san from 'san';
import {classCreator} from '../core/util';
import './style/index';

const generator = function ({suffixCls, tagName}) {
    const prefixCls = classCreator(suffixCls)();
    const template = `
        <${tagName} class="{{classes}}"><slot /></${tagName}>
    `;
    const baseComponent = san.defineComponent({
        computed: {
            classes() {
                const hasSider = this.data.get('hasSider');
                let classArr = [prefixCls];
                let siderRes = typeof hasSider === 'boolean' ? hasSider : this.data.get('siders').length > 0;
                siderRes && classArr.push(`${prefixCls}-has-sider`);
                return classArr;
            }
        },
        messages: {
            santd_layout_addSider(payload) {
                this.data.push('siders', payload.value);
            },
            santd_layout_removeSider(payload) {
                const siders = this.data.get('siders');
                this.data.set('siders', siders.filter(sider => sider !== payload.value));
            }
        },
        template: template
    });
    baseComponent.prototype.initData = function () {
        return {
            siders: []
        };
    };
    return baseComponent;
};


const Layout = generator({
    suffixCls: 'layout',
    tagName: 'section'
});

const Header = generator({
    suffixCls: 'layout-header',
    tagName: 'header'
});

const Footer = generator({
    suffixCls: 'layout-footer',
    tagName: 'footer'
});

const Content = generator({
    suffixCls: 'layout-content',
    tagName: 'main'
});

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;
