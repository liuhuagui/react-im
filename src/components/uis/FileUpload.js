import React from 'react';
import '../../css/file-upload.css';

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
       const {url,action,accept,sendMessage} = this.props;
       var form = new FormData();
       var file = this.hiddenFileRef.current.files[0];
       form.append('file',file);
       fetch(`${url+action}`,{
           method:'post',
           body:form
       }).then(response=>{
          this.formRef.current.reset();
          if(response.ok)
            return response.json();
          throw new  Error(`Request is failed, status is ${response.status}`);
       }).then(({result,msg})=>{
          if(result === 1){
            if(accept){
                sendMessage(`<I:${url+'/'+msg}>`);
                return;
            }
            sendMessage(`<F:${url+'/'+msg}:${msg}:${file.size}>`);
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