/*
 * jquery.datepicker.js v0.1.0
 * MIT License
 * author info pls visit: http://luopq.com
 * for more info pls visit: https://github.com/LuoPQ/jquery.datepicker.js
 */
; (function ($, window, document, undefined) {
    //#region Date扩展

    //添加指定单位的时间
    Date.prototype.dateAdd = function (interval, number) {
        var d = new Date(this);
        var k = { 'y': 'FullYear', 'q': 'Month', 'm': 'Month', 'w': 'Date', 'd': 'Date', 'h': 'Hours', 'n': 'Minutes', 's': 'Seconds', 'ms': 'MilliSeconds' };
        var n = { 'q': 3, 'w': 7 };
        eval('d.set' + k[interval] + '(d.get' + k[interval] + '()+' + ((n[interval] || 1) * number) + ')');
        return d;
    }

    //计算当前日期与指定日期相差的天数
    Date.prototype.dateDiff = function (otherDate) {
        if (otherDate instanceof Date) {
            return (this.getTime() - otherDate.getTime()) / 1000 / 60 / 60 / 24;
        }
        throw new Error("it is not a date!");
    };
    Date.prototype.format = function () {
        var month = this.getMonth() + 1;
        var date = this.getDate();
        month < 10 && (month = "0" + month);
        date < 10 && (date = "0" + date);

        return [this.getFullYear(), month, date].join("-");
    };
    Date.prototype.parse = function (s) {
        if ((s || '') == '')
            return null;

        if (typeof (s) == "object")
            return s;

        if (typeof (s) == 'string') {
            if (/\/Date\(.*\)\//gi.test(s)) {
                return eval(s.replace(/\/Date\((.*?)\)\//gi, "new Date($1)"));
            }
            else if (/(\d{8})/.test(s)) {
                return eval(s.replace(/(\d{4})(\d{2})(\d{2})/, "new Date($1,parseInt($2)-1,$3)"));
            }
            else if (/(\d{4})[-/](\d{1,2})[-/](\d{1,2})[T\s](\d{1,2})\:(\d{1,2})(?:\:(\d{1,2}))?/.test(s)) {
                return eval(s.replace(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})[T\s](\d{1,2})\:(\d{1,2})(?:\:(\d{1,2}))?[\w\W]*/, "new Date($1,parseInt($2)-1,parseInt($3),parseInt($4),parseInt($5),parseInt($6)||0)"));
            }
            else if (/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/.test(s)) {
                return eval(s.replace(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/, "new Date($1,parseInt($2)-1,$3)"));
            }
            try {
                return new Date(s);
            } catch (e) {
                return null;
            }
        }

        return null;
    };

    //#endregion

    //#region 节假日数据

    //pickerType
    var pickerTypes = {
        year: {},
        month: {},
        day: {}
    };


    //星期几名称
    var weekdayNames = ["日", "一", "二", "三", "四", "五", "六"];

    //节假日名字
    var dayName = {
        "today": "今天",
        "yuandan": "元旦",
        "chuxi": "除夕",
        "chunjie": "春节",
        "yuanxiao": "元宵",
        "qingming": "清明",
        "wuyi": "5.1",
        "duanwu": "端午",
        "zhongqiu": "中秋",
        "guoqing": "国庆",
        "qixi": "七夕",
        "shengdan": "圣诞"
    };
    //2012——2020年节假日数据
    var holidays = {
        today: [new Date().format()],
        yuandan: ["2012-01-01", "2013-01-01", "2014-01-01", "2015-01-01", "2016-01-01", "2017-01-01", "2018-01-01", "2019-01-01", "2020-01-01"],
        chuxi: ["2012-01-22", "2013-02-09", "2014-01-30", "2015-02-18", "2016-02-07", "2017-01-27", "2018-02-15", "2019-02-04", "2020-01-24"],
        chunjie: ["2012-01-23", "2013-02-10", "2014-01-31", "2015-02-19", "2016-02-08", "2017-01-28", "2018-02-16", "2019-02-05", "2020-01-25"],
        yuanxiao: ["2012-02-06", "2013-02-24", "2014-2-14", "2015-03-05", "2016-02-22", "2017-02-11", "2018-03-02", "2019-02-19", "2020-02-8"],
        qingming: ["2012-04-04", "2013-04-04", "2014-04-05", "2015-04-05", "2016-04-04", "2017-04-04", "2018-04-05", "2019-04-05", "2020-04-04"],
        wuyi: ["2012-05-01", "2013-05-01", "2014-05-01", "2015-05-01", "2016-05-01", "2017-05-01", "2018-05-01", "2019-05-01", "2020-05-01"],
        duanwu: ["2012-06-23", "2013-06-12", "2014-06-02", "2015-06-20", "2016-06-09", "2017-05-30", "2018-06-18", "2019-06-07", "2020-06-25"],
        zhongqiu: ["2012-09-30", "2013-09-19", "2014-09-08", "2015-09-27", "2016-09-15", "2017-10-04", "2018-09-24", "2019-09-13", "2020-10-01"],
        guoqing: ["2012-10-01", "2013-10-01", "2014-10-01", "2015-10-01", "2016-10-01", "2017-10-01", "2018-10-01", "2019-10-01", "2020-10-01"],
        qixi: ["2012-08-23", "2013-08-13", "2014-08-02", "2015-08-20", "2016-08-09", "2017-08-28", "2018-08-17", "2019-08-07", "2020-08-25"],
        shengdan: ["2012-12-25", "2013-12-25", "2014-12-25", "2015-12-25", "2016-12-25", "2017-12-25", "2018-12-25", "2019-12-25", "2020-12-25"]

    };
    //#endregion 


    function DatePicker($ele, options) {
        this.$ele = $ele;
        this.options = options;
        this.$container = null;
        this.currentYear = null;
        this.currentMonth = null;
        this.currentDate = Date.prototype.parse(options.currentDate) || new Date();
        this.pickerType = pickerTypes.day;
        this.init();
    }


    DatePicker.prototype = {
        constructor: DatePicker,

        init: function () {
            this.options.currentDate && this.$ele.val(Date.prototype.parse(this.options.currentDate).format());
            this.options.minDate = new Date().parse(this.options.minDate);
            this.options.maxDate = new Date().parse(this.options.maxDate);

            this.renderHtml();
            this.bindEvent();
        },
        renderHtml: function () {

            var $container = $('<dl class="datepicker" style="display:none"></dl>');

            $(document.body).append($container);
            this.$container = $container;

            this.refresh();

        },
        refresh: function () {
            this.$ele.attr("readonly", "readonly");

            this.currentYear = this.currentYear || this.currentDate.getFullYear();
            this.currentMonth = this.currentMonth || this.currentDate.getMonth();

            var currentDate = new Date(this.currentYear, this.currentMonth, 1);
            this.currentYear = currentDate.getFullYear();
            this.currentMonth = currentDate.getMonth();

            switch (this.pickerType) {
                case pickerTypes.year:
                    var yearTitleHtml = this.createTitleHtml(this.currentYear, this.currentMonth, pickerTypes.year);
                    var yearListHtml = this.createYearListHtml(this.currentYear);
                    this.$container.html("").append(yearTitleHtml).append(yearListHtml);
                    break;
                case pickerTypes.month:
                    var monthTitleHtml = this.createTitleHtml(this.currentYear, this.currentMonth, pickerTypes.month);
                    var monthListHtml = this.createMonthListHtml(this.currentYear);
                    this.$container.html("").append(monthTitleHtml).append(monthListHtml);
                    break;
                case pickerTypes.day:
                default:
                    var dayTitleHtml = this.createTitleHtml(this.currentYear, this.currentMonth, pickerTypes.day);
                    var dayListHtml = this.createDateListHtml(this.currentYear, this.currentMonth);
                    this.$container.html("").append(dayTitleHtml).append(dayListHtml);
                    break;
            }

            var inputVal = this.$ele.val();
            if (inputVal) {
                this.$container.find("dd .select").removeClass("select");
                var selectedDate = new Date().parse(inputVal);

                this.$container.find("dd>[year=" + selectedDate.getFullYear() + "]").addClass("select");
                this.$container.find("dd>[month=" + selectedDate.getMonth() + "]").addClass("select");
                this.$container.find("dd>[date=" + inputVal + "]").addClass("select");
            }
            this.$container.find(".date-unit").hide().fadeIn();

        },
        createTitleHtml: function (currentYear, currentMonth, pickerType) {

            var title = "";
            switch (pickerType) {
                case pickerTypes.year:
                    var yearRange = this.getYearRange(currentYear);
                    title = yearRange.minYear + "-" + yearRange.maxYear;
                    break;
                case pickerTypes.month:
                    title = currentYear + '年';
                    break;
                case pickerTypes.day:
                default:
                    title = currentYear + '年' + (currentMonth + 1) + '月';
                    break;
            }

            var titleHtmls =
                ['<dt class="date-action">',
                    '<a href="javascript:;" class="prev"></a>',
                    '<span>' + title + '</span>',
                    '<a href="javascript:;" class="next"></a>',
                "</dt>"];


            if (pickerType == pickerTypes.day) {
                $.each(weekdayNames, function (index, value) {
                    titleHtmls.push('<dt class="week">' + value + '</dt>');
                })
            }

            return titleHtmls.join("");
        },
        createYearListHtml: function (currentYear) {
            var yearHtml = [];

            yearHtml.push('<dd class="clearfix date-unit year">');

            var yearList = this.getYearList(currentYear);
            for (var i = 0; i < yearList.length; i++) {
                var year = yearList[i];

                var className = "";
                year.disabled && (className += " disabled");
                yearHtml.push('<a year="' + year.year + '" href="javascript:;" class="' + className + '">' + year.year + '</a>');
            }

            yearHtml.push('</dd>');

            return yearHtml.join("");
        },
        createMonthListHtml: function (currentYear) {
            var monthHtml = [];

            monthHtml.push('<dd class="clearfix date-unit month">');

            var monthList = this.getMonthList();
            for (var i = 0; i < monthList.length; i++) {
                var month = monthList[i];
                var className = "";
                monthHtml.push('<a month="' + month.month + '" href="javascript:;" class="' + className + '">' + month.monthText + '</a>');
            }

            monthHtml.push('</dd>');

            return monthHtml.join("");
        },
        createDateListHtml: function (currentYear, currentMonth) {
            var dateHtml = [];

            dateHtml.push('<dd class="clearfix date-unit day">');

            var dateList = this.getDateList(currentYear, currentMonth);
            for (var i = 0; i < dateList.length; i++) {
                var date = dateList[i];

                var className = "";
                date.disabled && (className += " disabled");
                date.isHoliday && (className += " holiday");
                dateHtml.push('<a date="' + date.format() + '" href="javascript:;" class="' + className + '">' + date.dateText + '</a>');
            }

            dateHtml.push('</dd>');

            return dateHtml.join("");
        },
        getYearList: function (currentYear) {
            var yearRange = this.getYearRange(currentYear);

            var list = [];
            for (var startYear = yearRange.minYear - 1, endYear = yearRange.maxYear + 1; startYear <= endYear; startYear++) {
                list.push(this.createYear(startYear, startYear < yearRange.minYear || startYear > yearRange.maxYear));
            }

            return list;
        },
        getMonthList: function () {

            var list = [];
            for (var i = 0; i < 12; i++) {
                list.push(this.createMonth(i));
            }
            return list;
        },
        getDateList: function (currentYear, currentMonth) {

            var firstDay = new Date(currentYear, currentMonth, 1);
            var lastDay = new Date(currentYear, currentMonth + 1, 0);
            var list = [];

            for (var i = 0, length = firstDay.getDay() ; i < length ; i++) {
                list.push(this.createDate(firstDay.dateAdd("d", i - length), currentMonth));
            }
            for (var i = 1; i <= lastDay.getDate() ; i++) {
                list.push(this.createDate(new Date(currentYear, currentMonth, i), currentMonth));
            }
            for (var i = 0; i < 6 - lastDay.getDay() ; i++) {
                list.push(this.createDate(new Date(currentYear, currentMonth + 1, i + 1), currentMonth));
            }

            return list;
        },
        createYear: function (year, disabled) {
            return {
                year: year,
                disabled: disabled
            }
        },
        createMonth: function (month) {
            return {
                month: month,
                monthText: (month + 1) + "月"
            }
        },
        createDate: function (date, month) {
            if (this.options.minDate) {
                date.disabled = Math.ceil(date.dateDiff(Date.prototype.parse(this.options.minDate))) < 0 || month != date.getMonth();
            }
            else {
                date.disabled = false;
            }
            //date.isSelected = this.$ele.val() == date.format();

            if (this.options.maxDate && !date.disabled) {
                date.disabled = Math.ceil(date.dateDiff(Date.prototype.parse(this.options.maxDate))) > 0;
            }

            var dateInfo = this.getDayInfo(date);

            date.isHoliday = dateInfo.isHoliday;
            date.dateText = dateInfo.dateText;

            return date;
        },
        getDayInfo: function (date) {
            var formattedDate = date.format();

            var dateInfo = {
                isHoliday: false,
                dateText: date.getDate()
            };

            for (var key in holidays) {
                if (holidays[key].join("").indexOf(formattedDate) > -1) {
                    dateInfo.dateText = dayName[key];
                    dateInfo.isHoliday = true;
                    break;
                }
            }
            return dateInfo;
        },
        getYearRange: function (currentYear) {
            var minYear = parseInt(currentYear / 10) * 10;
            var maxYear = minYear + 9;
            return {
                minYear: minYear,
                maxYear: maxYear
            };
        },
        bindEvent: function () {
            var that = this;

            that.$container
                .on("click", ".date-action", function () {
                    switch (that.pickerType) {
                        case pickerTypes.year:
                            break;
                        case pickerTypes.month:
                            that.pickerType = pickerTypes.year;
                            that.refresh();
                            break;
                        case pickerTypes.day:
                        default:
                            that.pickerType = pickerTypes.month;
                            that.refresh();
                            break;
                    }
                })
                .on("click", "dd>a", function () {
                    var $this = $(this);
                    if (!$this.hasClass("disabled")) {
                        switch (that.pickerType) {
                            case pickerTypes.year:
                                that.currentYear = parseInt($this.attr("year"));
                                that.pickerType = pickerTypes.month;
                                that.refresh();
                                break;
                            case pickerTypes.month:
                                that.currentMonth = parseInt($this.attr("month"));
                                that.pickerType = pickerTypes.day;
                                that.refresh();
                                break;
                            case pickerTypes.day:
                            default:
                                var date = $this.attr("date");
                                that.selectDate(date);
                                that.$container.find("dd .select").removeClass("select");
                                that.$container.find("dd>[date=" + date + "]").addClass("select");
                                break;
                        }
                    }
                })
                .on("click", "dt .prev", function (event) {
                    that.prev();
                    that.stopBubble(event);
                })
                .on("click", "dt .next", function (event) {
                    that.next();
                    that.stopBubble(event);
                })
                .on({
                    "click": function (event) {
                        that.stopBubble(event);
                    },
                    "mousedown": function (event) {
                        that.stopBubble(event);
                    }
                });

            that.$ele.on({
                "click": function (event) {
                },
                "focus": function () {
                    that.show();
                    if (that.pickerType != pickerTypes.day) {
                        that.pickerType = pickerTypes.day;
                        that.refresh();
                    }
                }
            });

            $(document).on("mousedown", function (event) {
                event = event || window.event;
                var target = event.target || event.srcElement;
                if (that.$ele[0] != target && that.$ele[0] != target.parentNode) {
                    that.hide();
                }
            });
        },
        prev: function () {
            switch (this.pickerType) {
                case pickerTypes.year:
                    this.currentYear = this.currentYear - 10;
                    this.refresh();
                    break;
                case pickerTypes.month:
                    this.currentYear--;
                    this.refresh();
                    break;
                case pickerTypes.day:
                default:
                    this.currentMonth--;
                    this.refresh();
                    break;
            }
            this.show();
        },
        next: function () {

            switch (this.pickerType) {
                case pickerTypes.year:
                    this.currentYear = this.currentYear + 10;
                    this.refresh();
                    break;
                case pickerTypes.month:
                    this.currentYear++;
                    this.refresh();
                    break;
                case pickerTypes.day:
                default:
                    this.currentMonth++;
                    this.refresh();
                    break;
            }
            this.show();
        },
        selectDate: function (date) {
            this.$ele.val(date);
            this.options.onDateSelected && this.options.onDateSelected(date);
            this.hide();
            this.currentDate = Date.prototype.parse(date);
            this.currentYear = this.currentDate.getFullYear();
            this.currentMonth = this.currentDate.getMonth();
            this.refresh();
        },
        focus: function () {
            this.$ele.focus();
        },
        hide: function () {
            this.$container.hide();
        },
        show: function () {
            var offset = this.$ele.offset();

            var left = offset.left;
            if (this.options.showCenter) {
                left = left - (this.$ele.outerWidth() / 2);
            }

            this.$container.css({
                "top": offset.top + this.$ele.outerHeight(),
                "left": left,
                "position": "absolute",
                "z-Index": 9999,
                "display": "none"
            });
            this.$container.show();
        },
        setMinDate: function (minDate) {
            this.options.minDate = new Date().parse(minDate);
            this.refresh();
        },
        setMaxDate: function (maxDate) {
            this.options.maxDate = new Date().parse(maxDate);
            this.refresh();
        },
        remove: function () {
            this.$container.remove();
        },
        stopBubble: function (event) {
            event = event || window.event;
            event.stopPropagation();
        }
    };

    $.fn.datePicker = function (options) {
        var defaults = {
            minDate: null,
            maxDate: null,
            currentDate: null,
            onDateSelected: null,
            showCenter: false
        };
        options = $.extend(defaults, options || {});
        return new DatePicker($(this), options);
    }

})(jQuery, window, document);