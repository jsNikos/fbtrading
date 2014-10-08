define([ './ProfileContentView', '../BaseContentController', 'coalan-async'],
function(ProfileContentView, BaseContentController, async) {
	return function(args){
		ProfileContentController.prototype = new BaseContentController(args);
		ProfileContentController.prototype.constructor = ProfileContentController;
		return new ProfileContentController(args);
	};
	// events

	function ProfileContentController(args) {
		var scope = this;
		
		// model-declarations
		var Page = Backbone.Model.extend({
			defaults:{
			url : Backbone.URL_PREFIX + '/page',
			id: undefined,
			name : '',
			registered: undefined, //boolean
			picture: '',
			likes: 0 //number
		    }
		});
		var Pages = Backbone.Collection.extend({
			model: Page,
			url: Backbone.URL_PREFIX + '/pages.php'
		});
		
		// model-instances
		this.pages = new Pages();		
		
		this.init = function() {	
			async.series([
			       fetchPagesTask(),
			       scope.initPageViewTask(ProfileContentView),
			       scope.asTask(scope.fireReady)
			], function(err){
				err && fbtrading.handleError(err);
			});			
		};		
		
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
		 * Creates task to fetch pages-data from server.
		 * @return async-task
		 */
		function fetchPagesTask(args){
			return function(callback){
				jQuery.ajax({
					url: scope.pages.url+'?'+jQuery.param(args || {}),
					type: 'GET',
					success: function(resp){
						_.each(resp.data.data, addPage);
						callback();
					},
					error: function(err){
						callback(err);
					}
				});				
			};

			function addPage(pageHolder){
				scope.pages.add(pageHolder, {silent: true} );				
			}		
		}
		
	}	
});