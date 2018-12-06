/**
 * 将对象构造成FormData —— 最终key被作为name
 * @param {*} o 需要构造的对象。属性一般采用速记写法，保证变量名作为key，特殊的可以明确定义出来。
 */
export function form(o){
    const form = new FormData();
    Object.keys(o).forEach(key => {
        form.append(key,o[key]);
    });
    return form;
}