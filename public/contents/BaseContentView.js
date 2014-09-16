define(function(){
	return BaseContentView;
	
	/**
	 * Abstract-layer for all content-views.
	 */
	function BaseContentView(args){		
		this.$el = undefined; // view context
		this.controller = args.controller;
		
		/**
		 * @param $content : the content to add the view's $el
		 */
		this.show = function($content){
			$content.append(this.$el);
		};
	}	
	
});