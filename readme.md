# Introduction

简历为仿写，原简历页面地址: [张秋怡 - 个人简历](https://joyeecheung.github.io/resume/) 【原主人已删除】

* 简历基于 Gulp+Scss+Jade。  
* 访问地址：[Lxxyx 的简历](https://resume.lxxyx.cn)

**要求：Node 8.9.0 及以上**

## 安装

1. 使用 `npm install` 安装
2. 全局安装gulp `npm install -g gulp`

ps:  由于安装puppeteer的缘故，此步骤可能涉及代理设置访问

```
# 代理设置
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'
# 取消代理
git config --global --unset https.proxy 'socks5://127.0.0.1:1080'
git config --global --unset http.proxy 'socks5://127.0.0.1:1080'
```

#### 推荐使用淘宝chromium源安装

简单方便还快速
```
npm config set puppeteer_download_host=https://npm.taobao.org/mirrors
npm i puppeteer
```

### 特点

自动生成 PDF 版简历

在 generate_pdf 与 info.json 中，替换 LxxyxResume.pdf 为你自己想要的名字, 在 src 源中生成新的pdf


```bash
gulp pdf
```


在部署网页文件档 dist 中生成 PDF 的命令：

```bash
npm run pdf
```

也可使用chrome浏览器自带的打印机制作PDF，同时也解决了生成简历打印没有字体图标的问题

## 启动

替换 info.json 的内容，运行`gulp`即可，生成内容可在 dist 文件夹查看。如需本地部署：

1. `npm install gulp --save-dev`
2. `npm install gulp-webserver --save-dev`
3. `gulp webserver`

即可以本地离线形式访问简历



需要自动部署的，运行`gulp deploy`即可，需要在 gulpfile 中更改为你的地址（！会抹去你 github pages 内容，慎用！）

### 自定义域名

修改 CNAME 文件，替换为你的域名即可


