# Introduction

简历为仿写，原简历页面地址: [张秋怡 - 个人简历](https://joyeecheung.github.io/resume/) 【原主人已删除】

简历基于Gulp+Scss+Jade。  
访问地址：[Lxxyx的简历](https://lxxyx.github.io)

### 要求

**Node 7.10及以上**

### 特点

自动生成PDF版简历
在 generate_pdf 与 info.json 中，替换 LxxyxResume.pdf 为你自己想要的名字

### 运行方式：
替换info.json的内容，运行`gulp`即可。  
生成内容可在dist文件夹查看。

需要自动部署的，运行`gulp deploy`即可，需要在gulpfile中更改为你的地址（！会抹去你github pages内容，慎用！）

### 自定义域名
修改CNAME文件，替换为你的域名即可