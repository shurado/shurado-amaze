'use strict';

var feeds = [{
  caption: '\u5927\u5B78\u56DB\u5E74\u5B78\u5230\u7684\u4E8B\u3011\n\u5728\u5BF6\u8CB4\u7684\u5927\u5B78\u6642\u5149\u4E2D\u5B78\u5230\u4E86\u4E00\u4E9B\u5F85\u4EBA\u8655\u4E8B\u7684\u9053\u7406\n1. \u8A8D\u8B58\u81EA\u6211\uFF1A\n\u4E16\u754C\u4E0A\u6709\u8A31\u591A\u60B2\u5287\u90FD\u662F\u6E90\u81EA\u65BC\u4EBA\u5011\u4E0D\u77E5\u9053\u81EA\u5DF1\u662F\u8AB0\u3002\n\u4F8B\u5982\uFF1A\n\u8EAB\u70BA\u8001\u5E2B\uFF0C\u537B\u60F3\u8981\u5F37\u59E6\u5B78\u751F\uFF1B\n\u8EAB\u70BA\u7236\u6BCD\uFF0C\u537B\u60F3\u8981\u63D2\u624B\u5B69\u5B50\u5011\u7684\u672A\u4F86\uFF1B\n\u8EAB\u70BA\u52DE\u5DE5\uFF0C\u537B\u4E0D\u77E5\u9053\u52DE\u57FA\u6CD5\u662F\u4EC0\u9EBC\uFF1B\n\u8EAB\u70BA\u5B78\u751F\uFF0C\u537B\u6C92\u6709\u505A\u597D\u7372\u53D6\u77E5\u8B58\u7684\u672C\u8CEA\uFF1B\n\u8EAB\u70BA\u75C5\u4EBA\uFF0C\u537B\u5C0D\u91AB\u751F\u7684\u5C08\u696D\u9824\u6307\u6C23\u4F7F\uFF1B\n\u8EAB\u70BA\u5BA2\u6236\uFF0C\u537B\u4E0D\u5C0A\u91CD\u8A2D\u8A08\u5E2B\u7684\u5C08\u696D\u7B49\u7B49\u3002\n\u7576\u7136\uFF0C\u9019\u4E26\u4E0D\u662F\u8AAA\u5C0D\u4EFB\u4F55\u7684\u8B70\u984C\u90FD\u9ED8\u4E0D\u4F5C\u8072\u3002\n\u4F46\u4E86\u89E3\u81EA\u6211\uFF0C\n\u4E26\u4E14\u77E5\u9053\u81EA\u5DF1\u7684\u672C\u5206\u5728\u54EA\u88E1\u662F\u76F8\u7576\u91CD\u8981\u7684\u4E00\u4EF6\u4E8B\u3002\n\u4E0D\u7136\u5C31\u6703\u767C\u751F\u8A31\u591A\u60B2\u5287\u3002',
  image_url: {
    hd: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/18739677_1291533790954288_5762717351225923107_n.jpg?oh=629d6eb7814ee8effda4c1b16874e1fa&oe=59FE3FBB'
  }
}, {
  caption: 'just a test {English}',
  image_url: {
    hd: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/20525441_10155708581786392_7167211745243623045_n.png?oh=ea1c3e18ddc22b62d15cea9031425516&oe=59EE4DC3'
  }
}, {
  caption: '\u300C\u6CE8\u610F\uFF01\u81EA\u767A\u6027\u8131\u6C34\u300D\n\n\u6700\u8FD1\u5929\u6C23\u708E\u71B1\uFF0C\u5927\u5BB6\u6D41\u5F88\u591A\u6C57\u53E3\u6E34\u7684\u6642\u5019\u3001\u53EF\u4E0D\u80FD\u53EA\u662F\u300C\u559D\u5F88\u591A\u6C34\u300D\u5594\uFF01\n\n\u65E5\u672C\u300C\u5927\u585A\u88FD\u85AC\u300D\u88FD\u4F5C\u4E86\u5716\u8868\u3001\u63D0\u9192\u5927\u5BB6\u6CE8\u610F\u300C\u81EA\u767C\u6027\u812B\u6C34\u300D\uFF5E\n    ',
  image_url: {}
}, {
  caption: '\u3010Coca-Cola\u66A2\u73A9VR\uFF0C\u760B\u72C2\u4E00\u590F\u3011 \n\u5230\u5E95\u770B\u5230\u4E86\u4EC0\u9EBC\uFF0C\u8B93\u4ED6\u5011\u9A5A\u547C\u9023\u9023\uFF1F \n\u4ECA\u5E74\u590F\u5929\u6700\u5E36\u52C1\u3001\u6700\u523A\u6FC0\u7684VR\u9AD4\u9A57\uFF01 \n\u514D\u8CBB\u7B49\u4F60\u4F86\u63A5\u62DB>>\n\u6D3B\u52D5\u5834\u6B21\uFF1A \n8/05(\u516D)-8/06(\u65E5) \u53F0\u5317\u83EF\u5C71\u6587\u5275\u5712\u5340 11:00-19:00 \n8/12(\u516D)-8/13(\u65E5) \u53F0\u5317\u83EF\u5C71\u6587\u5275\u5712\u5340 11:00-19:00 \n8/19(\u516D)-8/20(\u65E5) \u53F0\u4E2D\u8349\u609F\u5EE3\u5834 13:00-19:00 \n*\u5982\u6D3B\u52D5\u56E0\u6C23\u5019\u56E0\u7D20\u53D6\u6D88\uFF0C\u4E3B\u8FA6\u55AE\u4F4D\u5C07\u53E6\u884C\u516C\u544A\u6D3B\u52D5\u6642\u9593\u3002 \n#\u53EF\u53E3\u53EF\u6A02 \n#BestSummerCoke \n#\u89BA\u5F97\u5F88\u53EF\u4EE5\n\n\u66AB\u505C  \n-0:16\n\u5176\u4ED6\u8996\u89BA\u8A2D\u5B9A\u9032\u5165\u89C0\u770B\u6372\u52D5\u6A21\u5F0F\u9032\u5165\u5168\u87A2\u5E55\u6A21\u5F0F \u53D6\u6D88\u975C\u97F3',
  image_url: 'https://scontent.ftpe4-2.fna.fbcdn.net/v/t1.0-1/p480x480/20228652_1345547928886207_9028270778313514546_n.jpg?oh=474aab31da9775c25485fcc9ded1ae5c&oe=59ED52C9'
}, {
  caption: 'おはようごザイます。　いわゆる行間ですね。'
}, {
  caption: '\uFF13\u65E5\u3001\u6771\u4EAC\u30FB\u7BC9\u5730\u306E\u5834\u5916\u5E02\u5834\u304B\u3089\u706B\u304C\u51FA\u3066\u5408\u308F\u305B\u3066\uFF17\u68DF\u304C\u71C3\u3048\u305F\u706B\u4E8B\u3067\u3001\u706B\u5143\u3068\u898B\u3089\u308C\u308B\u5EFA\u7269\u3067\u306F\u6D88\u9632\u306B\u901A\u5831\u304C\u3042\u3063\u305F\uFF11\u6642\u9593\u534A\u307B\u3069\u524D\u306B\u7126\u3052\u308B\u3088\u3046\u306A\u81ED\u3044\u304C\u3057\u3066\u3044\u305F\u3053\u3068\u304C\u8B66\u8996\u5E81\u3078\u306E\u53D6\u6750\u3067\u308F\u304B\u308A\u307E\u3057\u305F\u3002\u8B66\u8996\u5E81\u306F\u6D88\u9632\u3068\u5408\u540C\u3067\u73FE\u5834\u691C\u8A3C\u3092\u884C\u3063\u3066\u706B\u4E8B\u306E\u539F\u56E0\u3092\u8ABF\u3079\u3066\u3044\u307E\u3059\u3002'
}, {
  caption: '2025\u5E74\u307E\u3067\u306E10\u5E74\u9593\u3067\u3001\u6771\u4EAC\u99C5\u5468\u8FBA\uFF08\u5927\u624B\u753A\u3001\u4E38\u306E\u5185\u3001\u6709\u697D\u753A\u3001\u4EAC\u6A4B\u3001\u516B\u91CD\u6D32\u3001\u65E5\u672C\u6A4B\uFF09\u306B\u4F9B\u7D66\u3055\u308C\u308B\u30AA\u30D5\u30A3\u30B9\u306E\u8CB8\u5BA4\u9762\u7A4D\u306F\u7D04154\u4E07\u5E73\u65B9\u30E1\u30FC\u30C8\u30EB\u3002\u3053\u308C\u306F\u6771\u4EAC\u30C9\u30FC\u30E0\u7D0430\u500B\u5206\u306E\u5E83\u3055\u306B\u3042\u305F\u308A\u30012015\u5E74\u672B\u306E\u8CB8\u5BA4\u9762\u7A4D\u306E\uFF14\u5272\u76F8\u5F53\u5206\u304C10\u5E74\u3067\u5897\u3048\u308B\u8A08\u7B97\u3060\u3002\n\n\u3000\u6771\u4EAC\u4E94\u8F2A\u30FB\u30D1\u30E9\u30EA\u30F3\u30D4\u30C3\u30AF\u304C\u958B\u50AC\u3055\u308C\u308B2020\u5E74\u306B\u5411\u3051\u3066\u3001\u90FD\u5FC3\u3067\u306F\u518D\u958B\u767A\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u304C\u7D9A\u3005\u3068\u9032\u3080\u3002\u5EFA\u8A2D\u3092\u4FC3\u3057\u305F\u306E\u306F\u3001\u5730\u57DF\u3092\u9650\u5B9A\u3057\u3066\u898F\u5236\u3092\u7DE9\u548C\u3059\u308B\u56FD\u5BB6\u6226\u7565\u7279\u533A\u306E\u7279\u4F8B\u5236\u5EA6\u3060\u3002\u4E94\u8F2A\u958B\u50AC\u3092\u8996\u91CE\u306B\u5165\u308C\u3001\u56FD\u969B\u90FD\u5E02\u306B\u3075\u3055\u308F\u3057\u3044\u30D3\u30B8\u30CD\u30B9\u62E0\u70B9\u306E\u6574\u5099\u3092\u56FD\u304C\u5F8C\u62BC\u3057\u3057\u3066\u3044\u308B\u3002\u90FD\u5FC3\u306E\u6307\u5B9A\u30A8\u30EA\u30A2\u3067\u306F\u5BB9\u7A4D\u7387\u306E\u898F\u5236\u304C\u7DE9\u307E\u308A\u3001\u5EFA\u8A2D\u624B\u7D9A\u304D\u304C\u7C21\u7D20\u5316\u3055\u308C\u305F\u30022012\u5E74\u5EA6\u304B\u3089\u7D9A\u304F\u6CD5\u4EBA\u6E1B\u7A0E\u3082\u8FFD\u3044\u98A8\u306B\u306A\u3063\u305F\u3002',
  image_url: {
    hd: 'https://vdata.nikkei.com/newsgraphics/tokyo-office-buildings/img/p_01.jpg'
  }
}];
//# sourceMappingURL=feeds.js.map