define(['../BaseContentView',        
        'text!./stockDetails.html',
        'css!./stockDetails.css'],
function(BaseContentView, html){
	return function(args){
		StockDetailsContentView.prototype = new BaseContentView(_.extend({html: html}, args));
		StockDetailsContentView.prototype.constructor = StockDetailsContentView;
		return new StockDetailsContentView;
	};
		
	function StockDetailsContentView(args){
		var scope = this;
		var chart = undefined; // google.visualization.LineChart
		var chartOptions = {
			      legend:'none',
			      width: 720
			    };
		
		// el's
		var $stockChart = undefined;		
						
		function init(){
			$stockChart = jQuery('.stock-chart', scope.$el);
			initStockChart(); 
			scope.updateChart();			
		}	
		
		/**
		 * Triggers to re-render the chart with current controller.prices
		 */
		this.updateChart = function(){
			chart.draw(createDataTable(scope.controller.prices), chartOptions);
		};
		
		
		/**
		 * Transforms given data in google DataTable.
		 * @param prices : Prices
		 * @return google.visualization.DataTable
		 */
		function createDataTable(prices){
			var arr = [['Date', 'Price']];
			prices.each(function(price){
				return arr.push([new Date(price.get('date')), price.get('price')]);
			});
			return google.visualization.arrayToDataTable(arr);			
		}
		
		function initStockChart(){			 
			 chart = new google.visualization.LineChart($stockChart.get(0));
			 chart.draw(createDataTable(scope.controller.prices), chartOptions);
		}		
		
		init();
	}
});