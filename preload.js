
const request = require('request');
const ip = require('ip');
const { shell } = require('electron');

var ipip_url = "";
window.exports = {
    "ip_query":{
      mode: 'list',
      args: {
         enter: (action, callbackSetList) => {
            callbackSetList([
                {
                    title: 'ip',
                    description: '最专业的ip地址库',
                    icon:"/ipip_logo.png",
                }
            ])
         },
         search: (action, searchWord, callbackSetList) => {
            if(!ip.isV4Format(searchWord)){
               return
            }
            var title = "";
            var desc = `${searchWord} 来自 ipip.net`;
            var url = `https://freeapi.ipip.net/${searchWord}`;
            ipip_url = `https://www.ipip.net/ip/${searchWord}.html`
            request({
               url: url,
               method: "GET",
               json: true,
               headers: {
                  "user-agent": "utools_ip 0.1 auther zhangyuan",
                  "content-type": "application/json",
               },
            }, function (error, response, body) {
               if (!error && response.statusCode == 200) {
                  body.forEach(element => {
                     title += element+" "
                  });
               }
               callbackSetList([
                  {
                     title: title,
                     description: desc,
                     icon:"/ipip_logo.png",
                  }
               ])
            })
         },
         select: (action, itemData) => {
            window.utools.hideMainWindow()
            shell.openExternal(ipip_url).then(() => {
              window.utools.outPlugin()
            })
         },
      },
   }
}