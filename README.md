# jquery.datepicker.js
基于jQuery的日期选择插件

1、支持选择年、月、日

2、支持日期的可选范围限制

3、提供相关api，支持用户设置选中日期，显示或隐藏插件，切换年份、月份


### 基本使用
#### html
```
<input id="dateInput" type="text" placeholder="yyyy-MM-dd" />
```

#### css
```
<link href="css/datepicker.css" rel="stylesheet" />
```

#### script
```
$("#dateInput").datePicker();
```

### Demo
1、<a href="http://luopq.com/demo/datepicker/examples/index.html" target="_blank">Demo</a>

### Options
|参数名|类型|默认值|描述|
|-----|----|------|---|
|minDate|Date/String|null|可选日期范围的最小日期|
|maxDate|Date/String|null|可选日期范围的最大日期|
|currentDate|Date/String|null|当前选中日期|
|onDateSelected|function|null|选中日期后的回调函数，包含参数：当前选中日期|


### Methods
#### selectDate(date)
设置当前选中的日期。

date:Date/String，当前选中的日期
```
var datePicker = $("#dateInput").datePicker();
datePicker.selectDate("2010-01-01");
```

#### focus()
让日期控件具有焦点。

```
var datePicker = $("#dateInput").datePicker();
datePicker.focus();
```

#### show()
显示日期控件。

```
var datePicker = $("#dateInput").datePicker();
datePicker.show();
```

#### hide()
隐藏日期控件。

```
var datePicker = $("#dateInput").datePicker();
datePicker.hide();
```

#### prev()
当前展示的日期页面向前切换：
1、如果是选择日期状态，则向前切换一个月
2、如果是选择月份状态，则不变
3、如果是选择年份状态，则向前切换一个十年

```
var datePicker = $("#dateInput").datePicker();
datePicker.prev();
```


#### next()
当前展示的日期页面向后切换：
1、如果是选择日期状态，则向后切换一个月
2、如果是选择月份状态，则不变
3、如果是选择年份状态，则向后切换一个十年

```
var datePicker = $("#dateInput").datePicker();
datePicker.next();
```


#### setMinDate(date)
设置可选范围的最小日期。

date:Date/String，最小日期
```
var datePicker = $("#dateInput").datePicker();
datePicker.setMinDate("2016-01-01");
```

#### setMaxDate(date)
设置可选范围的最小日期。

date:Date/String，最小日期
```
var datePicker = $("#dateInput").datePicker();
datePicker.setMaxDate("2016-01-20");
```