# work-flow-case
Take an example to demonstration that how to manage your projects

## 背景介绍
该工程主要是为了演示我对PMS系统在分支管理上的一些思考，目的是更好地服务于现有PMS系统的对外业务输出，保证云端版本与各落地版本的协调推进和发展

## 方案分析

### 方案一
#### 一、设计思路如下:

![Image text](https://raw.githubusercontent.com/happiaZhang/work-flow-case/main/docs/assets/solution1.png)

#### 二、设计灵感
最初想法来源于后端代码的管理模式，即Trunk + Branches模式。Trunk分支为主干分支，具有唯一性，主要用于主产品需求的开发；Branches分支为支干分支存在多条，由Trunk上稳定的release节点派生而来，主要用于落地用户定制化需求的开发。

#### 三、流程说明
+a. Product分支为主干分支，在该分支上的稳定发版都会生成一个Product-x.x.x的支干分支
+b. 各支干分支之间是并行开发模式，即Product-1.x.x和Product-2.x.x可同时推进开发，两者之间不存在依赖关系
+c. 单个支干分支依据业务的拓展再一次派生出不同的项目主干分支

#### 四、存在好处
+a. 各项目分支都是独立的、互不干扰的，在编码时不用考虑运行时的环境状态（项目A或是项目B……），只需关注开发的分支
+b. 由于a的缘故，所有最终打包构建出来的代码相对会比较轻量，不包含其他项目的代码片段

#### 五、存在弊端
+a. 当Product主干分支上有系统级BUG时，我们需要将BUG补丁合并到各支干分支和对应的项目主干分支，工作量会比较巨大而且合并过程中极易产生文件冲突
+b. 除了BUG之外，Product分支上的某个功能需要同步到某个项目分支，或者某个项目分支上的功能需要应用到Product分支，都是无法通过分支间Merge合并来实现，不利于业务间的快速迭代和同步

### 方案二
#### 一、设计思路如下:

![Image text](https://raw.githubusercontent.com/happiaZhang/work-flow-case/main/docs/assets/solution2.png)

#### 二、设计灵感
参考了GitFlow工作流设计规范，并结合了JCI持续化构建体系，设计出这样的代码管理模式；相对于方案一，将各落地项目的管理由分支体系进行维护，切换成在代码层面通过注入一个全局变量PROJECT_ENV进行维护。

#### 三、流程说明
+a. master分支为主生产分支，该分支上的每个节点都是稳定的可直接对外输出
+b. develop分支为主开发分支，最开始是由master分支派生出来（checkout），后续所有的业务开发都基于该分支进行展开
+c. hotfix分支为补丁分支，生产环境上难免会有一些突发的BUG，为了快速响应并修复，需要这样的临时分支进行应急使用，hotfix分支同develop分支都是由master分支派生出来，BUG修复完之后需要同时合并到master和develop分支
+d. feature分支为特征分支，不推荐使用，主要应对的特殊场景是业务开发量过于庞大且各业务模块间相对独立时可考虑介入，feature分支是基于develop分支派生出来的，最终会再次合并回develop分支
+e. feature分支和hotfix分支都是临时分支，合并会develop或master分支之后要及时删除处理

#### 四、存在好处
+a. 分支结构简洁清晰，便于长时间推进与发展
+b. 由于产品与项目都是基于同一个分支进行开发，所以产品功能同步到项目或项目功能应用到产品，只需要改变对应的IF判断条件即可
+c. 产品与项目各模块间可高度复用，同时通过构建工具的tree-shaking功能也可规避产品与项目以及项目之间代码的交叉感染，即编译出来的代码也不会包含其他项目的代码片段

#### 五、存在弊端
+a. 由于不同项目的区分是通过代码的形式进行处理，所以在代码判断上会存在更多的IF语句

## 项目介绍
本项目是基于方案二的实现，这也得益于目前前端工程化社区的繁荣，有了webpack打包抽离工具，有了vue等组件化视图开发语言，以及ES6对模块化的支持

## 项目依赖
Vue-Cli + Webpack + Vue + Vue-Router

## 项目简介
一、路由规则
| 路由 | 对应页面 | 路由归属 |
| --- | ---| --- |
| / | 首页 | JT2、A、B |
| /intro | 介绍页 | JT2、A、B |
| /product | 产品页 | JT2 |
| /project-a | 项目-A页 | A |
| /project-b | 项目-B页 | B |

二、环境变量设置（PROJECT_ENV）
| PROJECT_ENV | 对应应用 | 应用启动方式 |
| --- | ---| --- |
| JT2 | 云端产品 | npm run serve |
| A | 落地项目A | npm run serve:A |
| B | 落地项目B | npm run serve:B |

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
