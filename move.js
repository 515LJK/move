var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

const move = {
	css: function(obj, attr, val) {
		if(this.transformAttr.indexOf(attr) > -1) {
			return this.transformCss(obj, attr, val);
		};

		if ( val === undefined ) {
			var value = obj.currentStyle ? obj.currentStyle(attr) : getComputedStyle(obj, false)[attr];
			if (attr === 'opacity') {
				value *= 100;
			};
			return parseInt(value) || 0;
		} else {
			if ( attr === 'opacity' ) {
				obj.style.opacity = val / 100;
				obj.style.filter = 'alpha(opacity=' + val + ')';
				return;
			};
			obj.style[attr] = val + 'px';
		}
	},
	transformCss: function(obj, attr, val) {
		if( !obj.transform ){
			obj.transform = {};
		};

		if ( val === undefined ) {
			if( obj.transform[attr] === undefined ) {
				switch(attr) {
					case 'scale':
					case 'scaleX':
					case 'scaleY':
					case 'scaleZ':
						obj.transform[attr] = 100;
						break;
					default:
						obj.transform[attr] = 0;
				};
			};
			return obj.transform[attr];
		} else {
			obj.transform[attr] = val;
			var transformVal = '';
			for(var s in obj.transform) {
				switch(s) {
					case 'scale':
					case 'scaleX':
					case 'scaleZ':
					case 'scaleY':
						transformVal += ' ' + s + '(' + (obj.transform[s] / 100) + ')';
						break;
					case 'rotateX':
					case 'rotateY':
					case 'rotateZ':
					case 'rotate':
					case 'skewX':
					case 'skewY':
						transformVal += ' ' + s + '(' + obj.transform[s] + 'deg)';
						break;
					default:
						transformVal += ' ' + s + '(' + obj.transform[s] + 'px)';
				};
			};
			obj.style.wekitTransform = obj.style.transform = transformVal;
		}
	},
    startMove(obj, json, time, type, cb) {
		cancelAnimationFrame(this.timer);
		var a = 0;
		var b = {};
		var c = {};
		var d = time / 20;
		var that = this;
		
		for (var s in json) {
			b[s] = that.css(obj, s);
			c[s] = json[s] - b[s];
		};

		function run() {
			a++;
			if(a <= d) {
				for(var s in json) {
					var current = Tween[type] && Number((Tween[type](a,b[s],c[s],d)).toFixed(2)) || 0;
					that.css(obj, s, current);
				};
				requestAnimationFrame(run);
			}else {
				cb&&cb();
			}
		}

		this.timer = requestAnimationFrame(run);
	},
	transformAttr: ['scale', 'scaleX', 'scaleY', 'scaleZ', 'translateX', 'translateY', 'translateZ', 'rotateX', 'rotateY', 'rotateZ', 'rotate', 'skewX', 'skewY']

};

export default move;