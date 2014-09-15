define(['../BaseContentView', 'text!./index.html', 'css!./index.css'], function(BaseContentView, html){
	return function(args){
		MarketContentView.prototype = new BaseContentView(args);
		return new MarketContentView;
	};
	
	function MarketContentView(){
		
		this.show = function(){
			var test = this.controller.stocks;
			debugger;
			//TODO
		};
	}
});