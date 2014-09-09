define([ 'css!main' ], function() {
	return PageView;

	function PageView(args) {
		var $el = jQuery('[role="navigation"]');
		var controller = args.controller;

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

		init();
	}
});