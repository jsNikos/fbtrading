define([ './StockDetailsContentView', '../BaseContentController', 'coalan-async',
         'async!http://maps.google.com/maps/api/js?sensor=false',
         'goog!visualization,1,packages:[corechart]'],
function(StockDetailsContentView, BaseContentController, async) {
	return function(args){
		StockDetailsContentController.prototype = new BaseContentController(args);
		StockDetailsContentController.prototype.constructor = StockDetailsContentController;
		return new StockDetailsContentController(args);
	};
	// events

	/**
	 * @param: args: {id: stockid}
	 */
	function StockDetailsContentController(args) {
		var scope = this;
		
		// model-declarations
		var Price = Backbone.Model.extend({
			date: undefined,  // timestamp
			price: undefined  // number
		});
		var Prices = Backbone.Collection.extend({
			model: Price,
			url: Backbone.URL_PREFIX + '/history.php'
		});
		
		// model-instances
		this.prices = new Prices();		
		
		this.init = function() {
			async.series([
				fetchPricesTask(args),
				scope.initPageViewTask(StockDetailsContentView),
				scope.asTask(scope.fireReady),
				scope.asTask(initPricesListeners)
			], function(err){
				err && fbtrading.handleError(err);
			});					
				
		};		
		
		/**
		 * Registers listeners on prices-model. Triggers to update chart in case price is added to prices.
		 */
		function initPricesListeners(){			
			scope.prices.on('add', function(price){
				scope.view.updateChart(); 
			});	
			
			//TODO test
//			setTimeout(function(){
//				scope.prices.add({date: 1411526810, price: 15.2});				
//				setTimeout(function(){
//					scope.prices.add({date: 1411536810, price: 17.2});
//				}, 300);
//				setTimeout(function(){
//					scope.prices.add({date: 1411546810, price: 20.2}); 
//				}, 200);
//			}, 1000);
			
			
		}		
		
		/**
		 * Creates task to fetch prices for stock from server with given date-range.
		 * @param args : {id - stockid}	
		 */
		function fetchPricesTask(args){
			//TODO apply date restrictions
			return function(callback){
				jQuery.ajax({
					url: scope.prices.url+'?'+jQuery.param(args),
					type: 'GET',
					success: function(resp){
						_.each(resp.history, addPrice);
						callback();
					},
					error: function(err){
						callback(err);
					}
				});				
			};

			function addPrice(priceHolder){
				scope.prices.add(priceHolder, {silent: true} );
			}		
		}	
	}
});