$(document).ready(function(){

	"use strict";
	
	/* =================================
	LOADER 
	=================================== */
	$(".loader").delay(400).fadeOut();
	$(".animationload").delay(400).fadeOut("fast");

	var bgi = $("[data-background]");
	bgi.length > 0 && bgi.each(function() {
		var e = $(this),
		t = e.attr('data-background');
		e.css({'background-image': 'url(' + t + ')'});
	});

	var progressBar = $('.progress-bar');
	progressBar.length > 0 && progressBar.each(function() {
		var e = $(this),
		t = e.attr('aria-valuenow');
		e.css({'width': t + '%'});
	});

	/* =================================
	SCROLL SUAVE UNIFICADO (Navbar + Footer)
	=================================== */
	$('a[href^="#"]').on('click', function(event) {
		var href = $(this).attr('href');
		if (!href || href === '#' || href === '#0') return;

		var target = $(href);
		if (target.length) {
			event.preventDefault();
			var headerOffset = $('.navbar-main').outerHeight() || 75;
			$('html, body').stop().animate({
				scrollTop: target.offset().top - headerOffset
			}, 800);

			// Cerrar menú móvil si está abierto
			if ($('.navbar-collapse').hasClass('show')) {
				$('.navbar-collapse').collapse('hide');
			}
		}
	});

	/* =================================
	NAVBAR STICKY (Blanco con división al bajar)
	=================================== */
	var batas = 80;
	var navbar = $('.navbar-main');
	var navbarnav = $('.navbar-nav');
	var header = $('.header');
	var navbarCollapse = $(".navbar-collapse");

	function checkStickyNavbar() {
		var top = $(document).scrollTop();
		if (top > batas) {
			navbar.addClass('stiky is-sticky');
			navbarnav.addClass('ml-auto');
		} else {
			navbar.removeClass('stiky is-sticky');
			if (header.hasClass('header-1')) {
				navbarnav.removeClass('ml-auto');
			}
		}
	}

	checkStickyNavbar();
	$(window).on('scroll', checkStickyNavbar);

	navbarCollapse.on("click", "a", null, function () {
		navbarCollapse.collapse('hide');
	});
	
	/* =================================
	BANNER ROTATOR IMAGE 
	=================================== */
	var slides = $("#oc-fullslider"),
		b = slides.find('.owl-slide');
	b.each(function(){
		var e = $(this),
		ocImg = e.find('img').attr('src');
		e.css({'background-image': 'url(' + ocImg + ')'});
	});

	slides.owlCarousel({
		items: 1,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		loop: true,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		pagination: false,
		nav: true,
		navText: ["<span class='fa fa-chevron-left'></span>", "<span class='fa fa-chevron-right'></span>"],
		dots: true
	}); 

	/* =================================
	BACK TO TOP 
	=================================== */
	var offset = 300,
		offset_opacity = 1200,
		scroll_top_duration = 700,
		$back_to_top = $('.cd-top');

	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').stop().animate({
			scrollTop: 0
		}, scroll_top_duration);
	});

	/* =================================
	OWL CAROUSEL (Testimonios)
	=================================== */
	var caro2 = $("#caro-2");
	caro2.owlCarousel({
		autoplay: true,
		margin: 30,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		items: 3,
		dots: true,
		loop: true,
		responsive: {
			0: { items: 1 },
			768: { items: 2 },
			1000: { items: 3 }
		}
	});

	/* =================================
	MAGNIFIC POPUP
	=================================== */
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	/* =================================
	FORMULARIO DE CITAS WHATSAPP (9 dígitos)
	=================================== */
	var $phoneInput = $('#p_number');
	$phoneInput.on('input', function () {
		this.value = this.value.replace(/\D/g, '').slice(0, 9);
	});

	$('#dentalWhatsappForm').on('submit', function (e) {
		e.preventDefault();

		var nombre = $('#p_name').val().trim();
		var telefono = $phoneInput.val().trim();
		var especialidad = $('#p_service').val();
		var fecha = $('#p_date').val().trim();
		var nota = $('#p_message').val().trim();

		if (telefono.length < 9) {
			alert('Por favor, ingresa un número de celular válido de 9 dígitos.');
			$phoneInput.focus();
			return;
		}

		var mensaje = "Hola *Clínica Dental Sonrisa Viva*, deseo reservar una cita:\n\n" +
					  "• *Paciente:* " + nombre + "\n" +
					  "• *Especialidad:* " + especialidad + "\n" +
					  "• *Fecha:* " + fecha + "\n" +
					  "• *Celular:* " + telefono;

		if (nota) {
			mensaje += "\n• *Motivo:* " + nota;
		}

		var url = "https://wa.me/51928028542?text=" + encodeURIComponent(mensaje);
		window.open(url, '_blank');
	});

});