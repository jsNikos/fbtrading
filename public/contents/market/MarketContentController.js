define([ './MarketContentView' ], function(view) {
	return MarketContentController;

	function MarketContentController() {

		function init() {
			var Stock = Backbone.Model.extend({
				url : '/stock'
			});
			var stock = new Stock({
			});
//			stock.fetch({
//				error : function() {
//					debugger;
//				},
//				success : function() {
//					debugger;
//				}
//			});	
			
			var Stocks = Backbone.Model.extend({
				model: Stock,
				url: '/stocks'
			});
			
			var stocks = new Stocks({
				start: 0,
				size: 100
			});
			stocks.url = 'stocks?start=0';
			stocks.fetch({
			error : function() {
				debugger;
			},
			success : function() {
				debugger;
			}
		});	
			
		}

		init();
	}
	;
});