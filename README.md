# axios-self
对axios进行进一步封装， 使之拥有一些而外的功能

## 特别之处
与axios原来的拦截器不同，此封装的代码还额外对每个网络请求添加了单独个拦截器。
另外还实现了一个很简陋的loading加载效果，只要配置showLoading选项就可以开启loading