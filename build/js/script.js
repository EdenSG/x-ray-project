var s = skrollr.init({
    easing: {
        //This easing will sure drive you crazy
        ten: function(p) {
            return Math.pow(p, 10);
        },
        six: function(p) {
            return Math.pow(p, 6);
        },
        sixinv: function(p) {
            return Math.pow(p, 1 / 6);
        },
        teninv: function(p) {
            return Math.pow(p, 0.1);
        },
    },
    smoothScrolling: false
});

// skrollr.menu.init(s);


function scrollTo(distance_percent) {
    document.body.scrollTop = distance_percent / 100 * window.innerHeight;
    console.log('done');
}
