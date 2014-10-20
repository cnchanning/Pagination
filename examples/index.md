# Demo

---

````javascript
seajs.use(['pagination','jquery'], function(Pagination,$) {
    var pagination = new Pagination({
        element:"#pagingdemo",
        total_items:1100,
        num_display:5,
        num_edge:1,
        callback:function(index){
            $("#content").html("这是第"+index+"页");
        }
    });
});
````

````html
<dic id="content">
</div>
<div id="pagingdemo">
</div>

````
````css

.ui-pagination {
  padding-right: 95px;
  margin-top: 15px;
}
.ui-pagination a {
  text-decoration: none;
  border: solid 1px #AAE;
  color: #15B;
}
.ui-pagination-item {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  padding: 0.3em 0.5em;
  margin-right: 5px;
  margin-bottom: 5px;
}
.ui-pagination-currend {
  background: #26B;
  color: #fff;
  border: solid 1px #AAE;
}
.ui-pagination-next,
.ui-pagination-prev {
  color: #999;
  border-color: #999;
  background: #fff;
}

````