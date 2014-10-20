var expect = require('expect.js');
var Pagination = require('../pagination.js');
var $= require('jquery');

describe('pagination', function() {

    beforeEach(function () {
        // 测试元素1
        var elem = [];
        elem.push('<div id="content">');
        elem.push('</div>');
        element1 = $(elem.join('')).appendTo(document.body);
        // 测试元素2
        var elem2 = [];
        elem2.push('<div id="paging">');
        elem2.push('</div>');
        element2 = $(elem2.join('')).appendTo(document.body);

        var elem3 = [];
        elem2.push('<div data-role="pagination">');
        elem2.push('</div>');
        element3 = $(elem2.join('')).appendTo(document.body);


    });

    afterEach(function () {
        element1.remove();
        element2.remove();
        element3.remove();
    });
  it('初始化', function() {
    var pg=new Pagination({
        element: '#paging',
        total_items:"100"
    })
    expect(pg instanceof Pagination).to.be(true);
    expect(pg.get('total_page')).to.be(10);
    expect(pg.get('current_page')).to.be(1);
  });
    it('获取总页数', function() {
        var pg=new Pagination({
            element: '#paging',
            total_items:"100"
        });
        expect(pg.getTotalPage()).to.be(10);
    });
    it('获取当前页数', function() {
        var pg=new Pagination({
            element: '#paging',
            total_items:"100"
        });
        expect(pg.getCurrentPage()).to.be(1);
    });

    it('点击下一页', function() {
        var pg=new Pagination({
            element: '#paging',
            total_items:"100"
        });
        expect(pg.getCurrentPage()).to.be(1);
        pg.next();
        expect(pg.getCurrentPage()).to.be(2);
    });

    it('点击上一页', function() {
        var pg=new Pagination({
            element: '#paging',
            total_items:"100"
        });
        expect(pg.getCurrentPage()).to.be(1);
        pg.next();
        expect(pg.getCurrentPage()).to.be(2);
        pg.prev();
        expect(pg.getCurrentPage()).to.be(1);
    });

    it('跳转至某一页', function() {
        var pg=new Pagination({
            element: '#paging',
            total_items:"100"
        })
        expect(pg.getCurrentPage()).to.be(1);
        pg.jumpTo(4);
        expect(pg.getCurrentPage()).to.be(4);
    });

    it('翻页成功', function () {

        var pg=new Pagination({
            element: '#paging',
            total_items:"100",
            callback:function(index){
                $("#content").html(index);
            }
        })

        expect(+$("#content").html()).to.be(1);
        pg.next();
        expect(+$("#content").html()).to.be(2);
        pg.jumpTo(5);
        expect(+$("#content").html()).to.be(5);
        pg.prev();
        expect(+$("#content").html()).to.be(4);
    })

    it('dataApi初始化', function() {
        var pg=new Pagination({
            total_items:"100"
        })
        expect(pg instanceof Pagination).to.be(true);
        expect(pg.get('total_page')).to.be(10);
        expect(pg.get('current_page')).to.be(1);
    });

});
