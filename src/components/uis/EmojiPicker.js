import React from 'react';
import 'emoji-mart/css/emoji-mart.css'
import '../../css/emoji-mart.css'
import { Picker} from 'emoji-mart'


export default ({selectFuntion,id})=>(<div id={id}>
    <Picker skin='1' sheetSize='16' set='messenger' title='颜色自选' emoji='+1' 
     perLine='6'
     include={['people']} 
     i18n={{ categories: { people:'' }}} showPreview={false} showSkinTones={false}
     onSelect={selectFuntion}
    />
</div>);

