define(function(){
	return BaseContentView;
	
	/**
	 * Abstract-layer for all content-views.
	 */
	function BaseContentView(args){		
		this.$el = undefined; // view context
		this.controller = args.controller;
		
		this.show = function(){
			throw new Error('BaseContentView.show is abstract');
		};
	}	
	
});