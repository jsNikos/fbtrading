define([ './MarketContentView', '../BaseContentController', 'coalan-async'],
function(MarketContentView, BaseContentController, async) {
	return function(args){
		MarketContentController.prototype = new BaseContentController(args);
		MarketContentController.prototype.constructor = MarketContentController;
		return new MarketContentController(args);
	};
	// events

	function MarketContentController(args) {
		var scope = this;
		
		// model-declarations
		var Stock = Backbone.Model.extend({
			url : Backbone.URL_PREFIX + '/stock'
		});
		var Stocks = Backbone.Collection.extend({
			model: Stock,
			url: Backbone.URL_PREFIX + '/stocks.php'
		});
		
		// model-instances
		this.stocks = new Stocks();		
		
		this.init = function() {	
			async.series([
			       fetchStocksTask(),
			       scope.initPageViewTask(MarketContentView),
			       scope.asTask(scope.fireReady),
			       scope.asTask(initStockListeners)
			], function(err){
				err && fbtrading.handleError(err);
			});					
		};
		
		/**
		 * Registers listeners on stock-model.
		 */
		function initStockListeners(){			
			scope.stocks.on('change:current_price', function(stock){
				scope.view.updateRow(stock);
			});	
			
			//TODO test
			setTimeout(function(){
				scope.stocks.at(2).set({current_price : 210}); 
				
				setTimeout(function(){
					scope.stocks.at(2).set({current_price : -200}); 
				}, 300);
				setTimeout(function(){
					scope.stocks.at(2).set({current_price : 200}); 
				}, 200);
			}, 1000);
			
			
		}		
		
		/**
		 * Handles click on symbol-link in stock's table.
		 * Emits event in order to be catched by page-controller which is supposed
		 * to trigger page-transition.
		 * @param stockid - integer
		 */
		this.handleSymbolClicked = function(stockid){
			scope.fire(BaseContentController.SYMBOL_CLICKED, {id: stockid});
		};
		
		/**
		 * Fetches stocks from server with given paging restrictions.
		 * Omitting restrictions results in fetching all.
		 * @return Q.promise
		 */
		function fetchStocksTask(page, size){
			return function(callback){
				//TODO use given page and size ?page=1&size=100			
				scope.stocks.url = scope.stocks.url;
				scope.stocks.fetch({
					error : function(coll, err) {
						fbtrading.handleError(err);
						callback(err);
					},
					success : function(stocks) {
						callback(null, stocks);
					}});
			};
		}
	
	}
	;
});