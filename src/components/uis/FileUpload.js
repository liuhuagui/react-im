import React from 'react';
import '../../css/file-upload.css';
import {fileUpload} from '../../utils/GlobalConfig';

/**
 *  url:域名+端口
 *  action：上传文件的方法名
 *  id：用来控制布局样式
 *  accept：用来控制上传文件 MIME_Type
 *  
 */
export default class FileUpload extends React.Component{
   constructor(props){
       super(props);
      
       this.hiddenFileRef = React.createRef();
       this.formRef = React.createRef();
       
       this.click = this.click.bind(this);
       this.upload = this.upload.bind(this);
   }

   click(){
       this.hiddenFileRef.current.click();
   }

   upload(){
       const {accept,sendMessage,toId} = this.props;
       if(!toId){
           alert('未指定聊天对象');
           return;
       }
       const {domain,action:{upload}} = fileUpload;

       var form = new FormData();
       var file = this.hiddenFileRef.current.files[0];
       form.append('file',file);
       
       fetch(`${domain+upload}`,{
           method:'post',
           body:form
       }).then(response=>{
          //解决input[type=file]选择同名文件不能触发change事件——reset表单
          this.formRef.current.reset();
          
          if(response.ok)
            return response.json();
          throw new  Error(`Request is failed, status is ${response.status}`);
       }).then(({result,msg})=>{
          if(result === 1){
            if(accept){
                sendMessage(`<I:${domain+'/'+msg}>`,toId);
                return;
            }
            sendMessage(`<F:${domain+'/'+msg}:${msg}:${file.size}>`,toId);
            return;
          }
          console.error('文件发送失败');
       },error=>{
          console.error(error);
          alert('文件发送失败：文件大小不能超出1MB');
       });
   }
   
   render(){
       const {children,id,accept} = this.props;
       return <div id={id} onClick={this.click}><form ref={this.formRef}>
              <input type="file" ref={this.hiddenFileRef} hidden accept={accept} onChange={this.upload}></input>
              {children}
           </form>
       </div>;
   }

}