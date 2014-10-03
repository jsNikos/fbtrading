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
			var test = scope.controller.prices.toJSON();
			debugger; //TODO
		};
		
		function initStockChart(){
			//TODO
			 var data = google.visualization.arrayToDataTable([
			                                                    ['Year', 'Sales'],
			                                                    ['2004',  1000],
			                                                    ['2005',  1170],
			                                                    ['2006',  660],
			                                                    ['2007',  1030]
			                                                  ]);

			    var options = {
			      legend:'none'
			    };
			    var chart = new google.visualization.LineChart($stockChart.get(0));
			    chart.draw(data, options);
			    //TODO
		}		
		
		init();
	}
});