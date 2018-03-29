# Introduction

简历为仿写，原简历页面地址: [张秋怡 - 个人简历](https://joyeecheung.github.io/resume/) 【原主人已删除】

简历基于 Gulp+Scss+Jade。  
访问地址：[Lxxyx 的简历](https://lxxyx.github.io)

### 要求

**Node 8.9.0 及以上**

## 启动

使用 `npm install` 安装

**npm + 国内源** 可能会出现 chrome 安装的问题，推荐使用 `cnpm` 或者 `npm` + 原版源的方式

### 特点

自动生成 PDF 版简历

在 generate_pdf 与 info.json 中，替换 LxxyxResume.pdf 为你自己想要的名字

生成 PDF 的命令：

```bash
npm run pdf
```

### 运行方式：

替换 info.json 的内容，运行`gulp`即可。  
生成内容可在 dist 文件夹查看。

需要自动部署的，运行`gulp deploy`即可，需要在 gulpfile 中更改为你的地址（！会抹去你 github pages 内容，慎用！）

### 自定义域名

修改 CNAME 文件，替换为你的域名即可
