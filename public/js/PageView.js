define([ 'css!main' ], function() {
	return PageView;

	function PageView(args) {
		var controller = args.controller;
		
		// el's
		var $el = jQuery('body');	
		var $content = jQuery('.container.content', $el);

		function init() {
			initMenueItems();
		}

		function initMenueItems() {
			$el.on('click', '.navbar-collapse a', function(event) {
				jQuery('li.active', $el).removeClass('active');
				jQuery(event.target).closest('li').addClass('active');
				event.preventDefault();
			});
		}
		
		/**
		 * Shows content based on the given content-controller.
		 * @param baseContentController : BaseContentController 
		 */
		this.showContent = function(contentController){
			contentController.show($content);			
		};

		init();
	}
});