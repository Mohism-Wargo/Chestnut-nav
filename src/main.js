
const $siteList = $('.siteList');
const $firstLi = $siteList.find("li.first");
const nets = localStorage.getItem('nets');
const netsObject = JSON.parse(nets)
const hashMap = netsObject || [
   {logo:'B',url:'https://www.bootcdn.cn/'},
   {logo:'C',url:'https://codesandbox.io/'},
]
const simplifyUrl =(url)=>{
   return url.replace('https://','')
   .replace('http://','')
   .replace('www.','')
   .replace(/\.(.*)/,'')
}
const  render = ()=>{
   $siteList.find('li:not(.first)').remove()
   hashMap.forEach((node,index)=>{
   const $li = $(`<li>
   <div class="site">
       <div class="logo">${node.logo[0]}</div>
       <div class="link">${simplifyUrl(node.url)}</div>
       <div class="close">
       <svg class="iconpark-icon">
           <use href="#close-one"></use>
       </svg>      
   </div>
   </div>
   </li>`).appendTo($siteList)
   $li.on('click',() =>{
    window.open(node.url)
   })
   $li.on('click','.close',(e) =>{
    e.stopPropagation()
    hashMap.splice(index,1)
    render()
   })
});
}
render()

$('.addButton')
  .on('click',()=>{
    let url= window.prompt('请输入您要收藏的网址:','')
    if(url.indexOf('http')!==0){
      url = 'https://' + url
    }
    hashMap.push({
      logo:simplifyUrl(url)[0].toUpperCase(),
      url:url
   });
    render()
  });

// 《上面用于添加新网址的代码，然后用hashMap取代了》
//   $('.addButton')
//   .on('click',()=>{
//     let url= window.prompt('请输入你要收藏的网址')
//     if(url.indexOf('http')!==0){
//       url = 'https://' + url
//     }
//     console.log(url)
//     const $li = $(`<li>
//        <a href="${url}">
//           <div class="site">
//              <div class="logo">${url[0]}</div>
//              <div class="link">${url}</div>
//           </div>
//        </a>
//     </li>`).appendTo($siteList)
//   })
$('.delButton')
  .on('click',()=>{
    $(".close").attr({"style":"display:block;"});
  });

window.onbeforeunload = ()=>{
   const string = JSON.stringify(hashMap)
   localStorage.setItem('nets',string)
}