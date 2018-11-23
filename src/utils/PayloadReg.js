import React from 'react';
import { Emoji } from 'emoji-mart'

const regEmoji = /<E:([^>]*)>/;
const regImg = /<I:([^>]*)>/;
const regFile = /<F:([^>]*):([^:>]*):([^:>]*)>/;

/**
 * 在图片完全加载后重新适配图片高度
 * @param {Function} scrollEnd 消息渲染之后，将滚动条滚动到底
 */
function imgAdapter(e,scrollEnd) {
  const img = e.target;

  console.log(img.naturalHeight, img.naturalWidth, 328);

  //根据图像的实际宽高和指定DOM元素的宽高，重定义图像大小
  if (img.naturalHeight >= img.naturalWidth) {
    let tempHeight = 328 * 0.6;
    //如果原始高度很小，则保持原始高度
    if (img.naturalHeight < tempHeight)
      return;
    img.height = tempHeight;
    scrollEnd();
    return;
  }
  let tempWidth = 520 * 0.4;
  //如果原始宽度很小，则保持原始宽度
  if (img.naturalWidth < tempWidth)
    return;
  img.width = tempWidth;
  scrollEnd();
}

/**
 * 正则负载，根据负载格式，选择渲染方式
 * @param {String} payload 负载内容
 * @param {Function} scrollEnd 消息渲染之后，将滚动条滚动到底
 */
export const regPayload = (payload,scrollEnd) => {
  //是否是表情
  var regInfo = payload.match(regEmoji);
  if (regInfo)
    return <Emoji emoji={regInfo[1]} size={64} set='messenger' />;
  //是否是图片
  regInfo = payload.match(regImg);
  if (regInfo)
    return <img src={regInfo[1]} onLoad={(e)=>imgAdapter(e,scrollEnd)} onClick={() => window.open(regInfo[1],'','location=no')} />;
  //是否是其他文件
  regInfo = payload.match(regFile);
  if (regInfo)
    return <div>{`${regInfo[2]}(${regInfo[3]/1000}KB)`}<br/><a href={regInfo[1]} download>下载</a></div>;
  return payload;
}
