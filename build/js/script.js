var s = skrollr.init({
	easing: {
        //This easing will sure drive you crazy
        ten: function(p) {
            return Math.pow(p, 10);
        },
        sixinv: function(p) {
            return Math.pow(p, 1/6);
        },
    },
    smoothScrolling: false
});
function scrollTo (distance_percent) {
	document.body.scrollTop = distance_percent / 100 * window.innerHeight;
}
