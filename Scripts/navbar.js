if (typeof jQuery === 'undefined') {
	throw new Error('navbar.js requires jQuery');
}

+function ($) {
	'use strict';

	function getTargetFromTrigger($trigger) {
		var href;
		var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7

		return $(target);
	}

	// COLLAPSE DATA-API
	// =================

	$(document).on('mouseover', '[data-toggle="hide"]', function (e) {
		var $this = $(this);

		if (!$this.attr('data-target')) e.preventDefault();

		var $target = getTargetFromTrigger($this);
		var delegate = function (context) {
			return function () { MouseOut.apply(context, arguments); };
		};

		$this.addClass('open');
		$target.removeClass('d-none');
		$target.on('mouseout', delegate(this));
	});

	function MouseOut(e) {
		var $this = $(this);

		if (!$this.attr('data-target')) e.preventDefault();

		var $target = getTargetFromTrigger($this);

		if (!$target.is(e.relatedTarget) && $target.find(e.relatedTarget).length === 0) {
			$this.removeClass('open');
			$target.addClass('d-none');
			$target.off('mouseout');
		}
	}

	$(document).on('mouseout', '[data-toggle="hide"]', function (e) {
		MouseOut.apply(this, arguments);
	});
}(jQuery);