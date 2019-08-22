(function () {
	//Login/Signup modal window - by CodyHouse.co
	function ModalSignin(element) {
		this.element = element;
		// this.blocks = this.element.getElementsByClassName('js-signin-modal-block');
		// this.switchers = this.element.getElementsByClassName('js-signin-modal-switcher')[0].getElementsByTagName('a'); 
		// this.triggers = document.getElementsByClassName('js-signin-modal-trigger');
		this.hidePassword = this.element.getElementsByClassName('js-hide-password');
		this.init();
	};

	ModalSignin.prototype.init = function () {
		var self = this;
		// open modal/switch form
		// for(var i =0; i < this.triggers.length; i++) {
		// 	(function(i){
		// 		self.triggers[i].addEventListener('click', function(event){
		// 			if( event.target.hasAttribute('data-signin') ) {
		// 				event.preventDefault();
		// 				self.showSigninForm(event.target.getAttribute('data-signin'));
		// 			}
		// 		});
		// 	})(i);
		// }

		//close modal
		// this.element.addEventListener('click', function(event){
		// 	if( hasClass(event.target, 'js-signin-modal') || hasClass(event.target, 'js-close') ) {
		// 		event.preventDefault();
		// 		removeClass(self.element, 'cd-signin-modal--is-visible');
		// 	}
		// });
		//close modal when clicking the esc keyboard button
		// document.addEventListener('keydown', function(event){
		// 	(event.which=='27') && removeClass(self.element, 'cd-signin-modal--is-visible');
		// });

		//hide/show password
		for (var i = 0; i < this.hidePassword.length; i++) {
			(function (i) {
				self.hidePassword[i].addEventListener('click', function (event) {
					self.togglePassword(self.hidePassword[i]);
				});
			})(i);
		}
	};

	ModalSignin.prototype.togglePassword = function (target) {
		var password = target.previousElementSibling;
		('password' == password.getAttribute('type')) ? password.setAttribute('type', 'text'): password.setAttribute('type', 'password');
		target.textContent = ('Hide' == target.textContent) ? 'Show' : 'Hide';
		putCursorAtEnd(password);
	}

	var mainNav = document.getElementsByClassName('js-main-nav')[0];
	if (mainNav) {
		mainNav.addEventListener('click', function (event) {
			if (hasClass(event.target, 'js-main-nav')) {
				var navList = mainNav.getElementsByTagName('ul')[0];
				toggleClass(navList, 'cd-main-nav__list--is-visible', !hasClass(navList, 'cd-main-nav__list--is-visible'));
			}
		});
	}

	function hasClass(el, className) {
		if (el.classList) return el.classList.contains(className);
		else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}

	function addClass(el, className) {
		var classList = className.split(' ');
		if (el.classList) el.classList.add(classList[0]);
		else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
		if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
	}

	function removeClass(el, className) {
		var classList = className.split(' ');
		if (el.classList) el.classList.remove(classList[0]);
		else if (hasClass(el, classList[0])) {
			var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
			el.className = el.className.replace(reg, ' ');
		}
		if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
	}

	function toggleClass(el, className, bool) {
		if (bool) addClass(el, className);
		else removeClass(el, className);
	}
})();