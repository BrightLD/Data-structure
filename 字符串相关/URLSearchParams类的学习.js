let url = "name=wgh&age=23&sex=man&learn=web&learn='women";
// URLSearchParam 接口定义了一系列的方法了来处理URL的查询字符串
let params = new URLSearchParams(url);
params.append("fav",'women')
params.delete("name")
console.log(params.set("learn",'box'));
console.log(params.keys());
console.log(params.values());
console.log(params.get("learn"));
console.log(params.getAll("learn"));

// URLSearchParams 构造函数不会解析完整 URL，但是如果字符串起始位置有 ? 的话会被去除


