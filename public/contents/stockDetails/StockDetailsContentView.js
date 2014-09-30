define(['../BaseContentView',
        'text!./stockDetails.html',
        'css!./stockDetails.css'],
function(BaseContentView, html){
	return function(args){
		StockDetailsContentView.prototype = new BaseContentView(args);
		return new StockDetailsContentView;
	};
		
	function StockDetailsContentView(args){
		var scope = this;
		
		// el's
		var $stocksChart = undefined;		
						
		function init(){
			scope.$el = jQuery(html);
//			$stocksTable = jQuery('table.stocks', scope.$el);
//			initStockTable();
		}				
		
		init();
	}
});