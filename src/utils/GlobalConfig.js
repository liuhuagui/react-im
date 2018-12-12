/**
 * 简单的全局状态持有对象，通过它可以实现：组件的异步加载、单例加载、验权
 */
export const  globalState = {
    Component:null,
    isLogin:false
}
/**
 * 聊天室
 * @param {String} domain <域名 | IP地址>[端口][根路径]。
 * @param {Object} action 是一个普通对象，其中key是有意义的变量名，value是action地址。
 */
export const chat = {
    domain: 'http://192.168.1.70',
    action: {
        endPoint: '/chat'
    }
};
/**
 * 文件上传
 * @param {String} domain <域名 | IP地址>[端口][根路径]。
 * @param {Object} action 是一个普通对象，其中key是有意义的变量名，value是action地址。
 */
export const fileUpload = {
    domain: 'http://192.168.1.70',
    action: {
        upload: '/upload'
    }
};
/**
 * 快捷回复
 * @param {String} domain <域名 | IP地址>[端口][根路径]。
 * @param {Object} action 是一个普通对象，其中key是有意义的变量名，value是action地址。
 */
export const quickReply = {
    domain: 'http://192.168.1.70:8080/kuaiban-platform/manager',
    action: {
        get: '/get_quick_replies',
        add: '/add_quick_reply',
        del: '/del_quick_reply',
        toLogin: '/to_login'
    }
};
