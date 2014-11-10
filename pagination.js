/**
 * Pagination 组件
 * @author channing
 * @version 1.0.0
 * @Date 2014/10/20
 */
var Widget = require("arale-widget");
var $ = require("jquery");

var Pagination = Widget.extend({
    attrs: {
        total_items: null,
        items_per_page: 10,
        num_display: 5,
        current_page: 1,
        num_edge: 1,
        prev_text: "上一页",
        next_text: "下一页",
        ellipse_text: "...",
        prev_always: true,
        next_always: true,
        classprefix: "ui-pagination",
        panel: null,
        callback: function () {
            return false;
        }
    },
    setup: function () {
        this.CLASS = generateClass(this.get("classprefix"));
        this._initPanle();
        this.set("total_page", this._getNumPages(this.get("total_items"), this.get("items_per_page")));
        this._drawLinks();
        this.delegateEvents("click ." + this.CLASS.UI_ITEM, this._clickHandle);
        this.delegateEvents("click ." + this.CLASS.UI_PREV, this.prev);
        this.delegateEvents("click ." + this.CLASS.UI_NEXT, this.next);
        this.render();
    },
    /**
     * 初始化panel
     * @returns {number}
     */
    _initPanle: function () {
        var panel = this.$('[data-role = pagination]');
        if (this.element || panel.length) {
            this.element ? this.set("panel", this.element) : this.set("panel", panel);
            this.get("panel").addClass(this.CLASS.UI_PAGINATION);
        }
        else {
            throw new Error("element or data-role=panel must be required!");
        }
    },
    /**
     * 计算出页面数
     * @return{Number}
     */
    _getNumPages: function (total_items, itemsperpage) {
        if (!total_items) throw new Error("total_items must be required!");
        return Math.ceil(total_items / itemsperpage);
    },
    /**
     * 计算出可见的数字范围
     * @param {int} total total_page
     * @return {Array}
     */
    _getNumIntervel: function (total) {
        var half = Math.ceil(this.get("num_display") / 2);
        var limit = total - this.get("num_display");
        var start = this.get("current_page") > half ? Math.max(Math.min(+this.get("current_page") - half, limit), 1) : 1;
        var end = this.get("current_page") > half ? Math.min(+this.get("current_page") + half - 2, total) : Math.min(+this.get("num_display"), total);
        return [start, end];
    },
    /**
     * 生成Dom元素
     */
    _drawLinks: function () {
        var total = +this.get("total_page");
        var interval = this._getNumIntervel(total);
        var current_page = +this.get("current_page");
        var panel = this.get("panel");
        var prev_text = this.get("prev_text");
        var next_text = this.get("next_text");
        var prev_always = this.get("prev_always");
        var next_always = this.get("next_always");
        var num_edge = this.get("num_edge");
        var ellipse_text = this.get("ellipse_text");
        var that = this;
        panel.empty();


        var appendItem = function (page_id, appendopts) {
            var lnk;
            page_id = page_id + 1 < 1 ? 1 : (page_id < total ? page_id : total );

            appendopts = $.extend({text: page_id, classes: ""}, appendopts || {});

            page_id === current_page ? lnk = $("<span class=" + that.CLASS.UI_CURRENT + ">" + (appendopts.text) + "</span>") : lnk = $("<a href='javascript:void(0)'>" + (appendopts.text) + "</a>")
            if (appendopts.classes) {
                lnk.addClass(appendopts.classes);
            }
            panel.append(lnk);
        };
        if (current_page && current_page > 1 || prev_always) {
            appendItem(current_page - 2, {text: prev_text, classes: this.CLASS.UI_PREV});
        }
        if (interval[0] > 1 && num_edge > 0) {
            var end = Math.min(num_edge, interval[0]);
            for (var i = 0; i < end; i++) {
                appendItem(i + 1, {classes: this.CLASS.UI_ITEM});
            }
            if (num_edge < interval[0] && ellipse_text) {
                $("<span>" + ellipse_text + "</span>").appendTo(panel);
            }
        }

        for (var i = interval[0]; i <= interval[1]; i++) {

            appendItem(i, {classes: this.CLASS.UI_ITEM});
        }

        if (interval[1] < total && num_edge > 0) {
            if (total - num_edge > interval[1] && ellipse_text) {
                $("<span>" + ellipse_text + "</span>").appendTo(panel);
            }
            var begin = Math.max(total - num_edge, interval[1]);
            for (var i = begin + 1; i <= total; i++) {
                appendItem(i, {classes: this.CLASS.UI_ITEM});
            }

        }

        if (next_text && (current_page < total - 1 || next_always)) {
            appendItem(current_page + 3, {text: next_text, classes: this.CLASS.UI_NEXT});
        }

        this.get("callback")(current_page, this.get("panel"));
    },

    _clickHandle: function (eve) {
        var target;
        eve.currentTarget.innerText? target=+eve.currentTarget.innerText:target=+eve.currentTarget.innerHTML;
        this.jumpTo(target);
    },
    _onRenderCurrent_page: function () {
        this._drawLinks();
    },
    /**
     *向后一页
     */
    next: function () {
        var index = this.get("current_page") === this.get("total_page") ? this.get("total_page") : +this.get("current_page") + 1
        this.jumpTo(index);
    },
    /**
     *向前一页
     */
    prev: function () {
        var index = this.get("current_page") === 1 ? 1 : +this.get("current_page") - 1
        this.jumpTo(index);
    },
    /**
     * 跳到某一页
     * @param index 跳到的页面
     */
    jumpTo: function (index) {
        console.log(index);
        if (index >= 1 && index <= this.get("total_page")) {
            this.set("current_page", index);
        }
        else {
            throw new Error("index is invalid！");
            return;
        }
    },
    /**
     * 获取总页数
     * @returns {Number}
     */
    getTotalPage: function () {
        return +this.get("total_page");
    },
    /**
     * 获取当前第几页
     * @returns {Number}
     */
    getCurrentPage: function () {
        return +this.get("current_page");
    }
});

//helper
function generateClass(prefix) {
    return {
        UI_PAGINATION: prefix,
        UI_PREV: prefix + "-prev",
        UI_NEXT: prefix + "-next",
        UI_ITEM: prefix + "-item",
        UI_CURRENT: prefix + "-current"
    }
}

module.exports = Pagination;
