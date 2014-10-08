define([ 'css!main', 'css!animate', 'animojs'], function() {
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
				var $target = jQuery(event.target);
				$target.closest('li').addClass('active');
				controller.handleMenuItemClicked($target.attr('href').match(/.*=(.*)/)[1]);				
				event.preventDefault();
			});
		}
		
		/**
		 * Shows content based on the given content-controller.
		 * @param baseContentController : BaseContentController 
		 */
		this.createShowContentTask = function(contentController){
			return function(callback){				
				contentController.show($content);
				contentController.view.$el.animo({				
					animation: 'fadeInDown', 
					duration: 0.3				
				}, function(){					
					callback && callback();
				});			
				
			};
		};
		
		/**
		 * Triggers to hide the content of the given contentController.
		 * @param contentController : BaseContentController
		 */
		this.createHideContentTask = function(contentController){
			return function(callback){
				callback = callback || function(){};
				if(!contentController){
					callback();
					return;
				}
				var $target = contentController.view.$el;			
				contentController.view.$el.animo({				
					animation: 'fadeOut', 
					duration: 0.3				
				}, function(){
					$target.remove();
					callback();
				});			
			};
		};

		init();
	}
});