define([ './StockDetailsContentView', '../BaseContentController', 'q'],
function(StockDetailsContentView, BaseContentController, Q) {
	return function(args){
		StockDetailsContentController.prototype = new BaseContentController(args);
		return new StockDetailsContentController(args);
	};
	// events

	function StockDetailsContentController(args) {
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
		
		function init() {		
			fetchStocks().then(initPageView)			
						 .then(fireReady)	
						 .then(initStockListeners)
						 .fail(fbtrading.handleError)
						 .done();			
		}
		
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
		
		//TODO move to parent
		function fireReady(){			
			scope.fire(BaseContentController.READY);			
		}
		
		//TODO move to parent and use global View -variable
		function initPageView(){
			var deferred = Q.defer();
			try{
				scope.view = new StockDetailsContentView({controller: scope});
				deferred.resolve();
			}catch(e){				
				fbtrading.handleError(e);
				deferred.reject(e);
			}
			return deferred.promise;
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
		function fetchStocks(page, size){
			//TODO use given page and size ?page=1&size=100
			var deferred = Q.defer();
			scope.stocks.url = scope.stocks.url;
			scope.stocks.fetch({
			error : function(coll, err) {
				fbtrading.handleError(err);
				deferred.reject(new Error('Data could not be fetched!'));
			},
			success : function(stocks) {
				deferred.resolve(stocks);
			}});
			return deferred.promise;
		}

		init();
	}
	;
});