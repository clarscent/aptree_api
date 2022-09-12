if (!("util" in window)) {
	window.util = {};
}

$(document).ready(() => {
	$.datepicker.setDefaults({
		dateFormat: 'yy-mm-dd',
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		yearSuffix: '년'
	});

	_.templateSettings.interpolate = /\{\{([\s\S]+?)\}}/g;
	_.templateSettings.evaluate = /\<\@([\s\S]+?)\@\>/g;
	_.templateSettings.escape = /\<\@-([\s\S]+?)\@\>/g;

	let $els = $("select[data-type='code']");
	_.each($els, item => {
		let $item = $(item);
		let grpCd = $item.data("grp-cd");

		if (grpCd === "YN") {
			$(item).setSelectList([
				{"CD": "Y", "CD_NM": "Y"},
				{"CD": "N", "CD_NM": "N"}
			]);
		} else {
			util.getComCode(grpCd, result => {
			$(item).setSelectList(result, "선택", "");
		});
		}
	})

	let $prdc = $("select[data-field='PRDC_NO']");
	$prdc.change(function(evt) {
		let $moldItem = $("select[data-field='MOLD_NO']");
		if ($moldItem.length > 0) {
			util.getMold("MOLD", $(this).getVal(), result => {
				$moldItem.setSelectList(result, "선택", "");
			});
		}
	});
})

util.getService = function(url, callbackFunc, async) {
	if (!_.isBoolean(async)) {
		async = true;
	}

	util.showLoading();

	$.ajax({
		type: "get",
		url: url,
		dataType: "json",
		async: async,
		success: function(data) {
			util.hideLoading();
			callbackFunc(data);
		},
		error: function(xhr, stat, err) {
			// 오류 메시지 표시 후 종료
			// showErrorMsg (overlay 사용);
			util.hideLoading();
			console.error(xhr, stat, err);
		}
	});
};

util.postService = function(url, data, callbackFunc, async, parse) {
	if (!_.isBoolean(async) && async) {
		async = true;
	}

	let param;

	if (_.isBoolean(parse) && parse) {
		param = data;
	} else {
		param = JSON.stringify(data);
	}

	util.showLoading();

	$.ajax({
		type: "post",
		url: url,
		timeout: 1000 * 60 * 30,
		contentType: "application/json",
		data: param,
		async: async,
		success: function(data) {
			util.hideLoading();

			callbackFunc(data);
		},
		error: function(xhr, stat, err) {
			util.hideLoading();
			// 오류 메시지 표시 후 종료
			// showErrorMsg (overlay 사용);
			console.error(xhr, stat, err);
		}
	});
};

util.putService = function(url, data, callbackFunc, async) {
	if (!_.isBoolean(async)) {
		async = true;
	}

	$.ajax({
		type: "put",
		url: url,
		contentType: "application/json",
		data: JSON.stringify(data),
		async: async,
		success: function(data) {
			var result = data;
			callbackFunc(data);
		},
		error: function(xhr, stat, err) {
			// 오류 메시지 표시 후 종료
			// showErrorMsg (overlay 사용);
			console.error(xhr, stat, err);
		}
	});
};

util.deleteService = function(url, callbackFunc, async) {
	if (!_.isBoolean(async)) {
		async = true;
	}

	$.ajax({
		type: "delete",
		url: url,
		dataType: "json",
		async: async,
		success: function(data) {
			var result = data;
			callbackFunc(data);
		},
		error: function(xhr, stat, err) {
			// 오류 메시지 표시 후 종료
			// showErrorMsg (overlay 사용);
			console.error(xhr, stat, err);
		}
	});
};

util.postFileService = function(url, formData, callbackFunc, async) {
	if (!_.isBoolean(async)) {
		async = true;
	}

	util.showLoading();

	$.ajax({
		type: "post",
		url: url,
		timeout: 1000 * 60 * 30,
		contentType: false,
		processData: false,
		enctype: 'multipart/form-data',
		data: formData,
		async: async,
		success: function(data) {
			util.hideLoading();

			var result = data;
			callbackFunc(data);
		},
		error: function(xhr, stat, err) {
			util.hideLoading();
			// 오류 메시지 표시 후 종료
			// showErrorMsg (overlay 사용);
			console.error(xhr, stat, err);
		}
	});
};

util.getComCode = function(grpCd, callbackFunc) {
	let url = "/comCode";
	url += "?grpCd=" + grpCd;

	let async = true;

	$.ajax({
		type: "get",
		url: url,
		dataType: "json",
		async: async,
		success: function(data) {
			util.hideLoading();
			callbackFunc(data);
		},
		error: function(xhr, stat, err) {
			// 오류 메시지 표시 후 종료
			// showErrorMsg (overlay 사용);
			util.hideLoading();
			console.error(xhr, stat, err);
		}
	});
}

util.getMold = function(grpCd, prdcNo, callbackFunc) {
	let url = "/mold";
	url += "?grpCd=" + grpCd;
	url += "&prdcNo=" + prdcNo;

	let async = true;

	$.ajax({
		type: "get",
		url: url,
		dataType: "json",
		async: async,
		success: function(data) {
			util.hideLoading();
			callbackFunc(data);
		},
		error: function(xhr, stat, err) {
			// 오류 메시지 표시 후 종료
			// showErrorMsg (overlay 사용);
			util.hideLoading();
			console.error(xhr, stat, err);
		}
	});
}

util.createHtmlTemplate = function(templateId, data) {
	var fn_template = _.template($("#" + templateId).html());
	return fn_template(data);
}

util.showLoading = function() {
	try {
		top.popup.loading.show();
	} catch(e) {

	}
}

util.hideLoading = function() {
	try {
		top.popup.loading.hide();
	} catch (e) {

	}
}

$.fn.getVal = function() {
	var $el = $(this);
	var rValue = "";

	var tagName = $el.prop("tagName");
	var name = $el.prop("name");

	if (tagName === "INPUT" && ($el.data("format") === "date" || $el.data("format") === "yyyy-mm-dd" || $el.data("format") === "date-month" || $el.data("format") === "yyyy-mm")) {
		rValue = getDateValue(checkNull($el.val()));
	} else if (tagName === "INPUT" && $el.data("format") === "number") {
		rValue = getNumber($el.val())
	} else if ($el.prop("type") === "radio" || $el.prop("type") === "checkbox") {
		rValue = $("input[name='" + name + "']:checked").val();
	} else if (tagName === "DIV" || tagName === "SPAN") {
		rValue = $el.html();
	} else {
		rValue = checkNull($el.val(), "");
	}

	return rValue;
};

$.fn.setVal = function(value) {
	var $el = $(this);

	var tagName = $el.prop("tagName");
	var name = $el.prop("name");

	if (tagName === "INPUT" && ($el.data("format") === "date" || $el.data("format") === "yyyy-mm-dd" || $el.data("format") === "date-month" || $el.data("format") === "yyyy-mm")) {
		if (($el.data("format") === "date" || $el.data("format") === "yyyy-mm-dd") && value && value.length === 8) {
			value = value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
		} else if (($el.data("format") === "date-month" || $el.data("format") === "yyyy-mm") && value.length === 6) {
			value = value.replace(/(\d{4})(\d{2})/, '$1-$2');
		} else {
			value = "";
		}

		$el.datepicker().datepicker('setDate', value);
	} else if (tagName === "INPUT" && $el.data("format") === "number") {
		value = numberFormat(value);
		$el.val(value);
	} else if ((tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") && $el.prop("type") !== "radio" && $el.prop("type") !== "checkbox") {
		if ($el.data("format") === "date") {
			$el.val(numberFormat(value));
		} else {
			$el.val(value);
		}
	} else if (tagName === "INPUT" && ($el.prop("type") === "radio" || $el.prop("type") === "checkbox")) {
		$("input:radio[name=" + name + "]:input[value='" + value + "']").prop("checked", true);
	} else if (tagName === "DIV" || tagName === "SPAN") {
		$el.html(value);
	}

	if (tagName === "SELECT") {
		$el.trigger("change");
	}

	return $el;
};

$.fn.getData = function() {
	var $el = $(this);
	var result = {};

	if ($el.prop("tagName") !== "FORM") {
		return result;
	}

	var $targets = $el.find("[data-field]");

	$targets.each(function(idx, obj) {
		var $target = $(obj);
		var field = $target.data("field");
		result[field] = $target.getVal();
	});

	return result;
};

$.fn.setData = function(data, opts) {
	var $el = $(this);

	if ($el.prop("tagName") !== "FORM") {
		return;
	}

	var $targets = $el.find("[data-field]");

	$targets.each(function(idx, obj) {
		$target = $(obj);

		var field = $target.data("field");

		if (isNull(field)) {
			return;
		} else {
			let $moldNo = $el.find("select[data-field='MOLD_NO']");
			$moldNo.setSelectList([]);
			$target.setVal(checkNull(data[field]), "");

			if (field === "PRDC_NO") {
				if ($moldNo.length > 0) {
					let checkMoldValue = function() {
						let len = $moldNo[0].length;

						if (data["MOLD_NO"] !== $moldNo.getVal()) {
							$moldNo.setVal(data["MOLD_NO"]);
							setTimeout(checkMoldValue, 10);
						}
					}

					checkMoldValue();
				}
			}
		}
	});
};

$.fn.clearForm = function() {
	this.each(function(el) {
		let type = this.type;
		let tag = this.tagName.toLowerCase();

		 if (tag === 'form') {
	      return $(':input', this).clearForm();
	    }

		if (type === 'text' || type === 'password' || type === 'hidden' || tag === 'textarea' ) {
			this.value = '';
		} else if (type === 'checkbox' || type === 'radio') {
			this.checked = false;
		} else if (tag === 'select') {
			this.selectedIndex = -1;
		}
	});
};

$.fn.setSelectList = function(list, totalText, totalVal) {
	//console.log("setSelectList", list);

	var $el = $(this);

	$el.empty();

	if (isEmpty(totalVal)) {
		totalVal = "";
	}

	if (totalText) {
		var total = new Option(totalText, totalVal);
		$el.append($(total));
	}

	_.each(list, function(item) {
		var opt = new Option(item["CD_NM"], item["CD"]);
		$el.append($(opt));
	})
};

$.fn.reset = function() {
	var $el = $(this);

	if ($el.prop("tagName") === "FORM") {
		$el.each(function(idx, obj) {
			obj.reset();
		});
	}
};

$.fn.checkRequired = function() {
	var $el = $(this);

	if ($el.prop("tagName") !== "FORM") {
		return true;
	}

	var $targets = $el.find("[data-field]");
	var isValid = true;

	$targets.each(function(idx, obj) {
		var $target = $(obj);

		if ($target.prop("required") && $target.getVal() === "") {
			isValid = false;
			return false;
		}
	});

	return isValid;
};

$.fn.disable = function() {
	var $el = $(this);

	if ($el.prop("tagName") !== "FORM") {
		return;
	}

	var $targets = $el.find("[data-field]");

	$targets.each(function(idx, obj) {
		var $target = $(obj).attr("disabled", "disabled");
	});
};

$.fn.enable = function() {
	var $el = $(this);

	if ($el.prop("tagName") !== "FORM") {
		return;
	}

	var $targets = $el.find("[data-field]");

	$targets.each(function(idx, obj) {
		var $target = $(obj).removeAttr("disabled");
	});
};


(function () {
	var attachEvent = document.attachEvent;
	var isIE = navigator.userAgent.match(/Trident/);
	var requestFrame = (function () {
		var raf = window.requestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| window.webkitRequestAnimationFrame || function (fn) {
				return window.setTimeout(fn, 20);
			};
		return function (fn) {
			return raf(fn);
		};
	})();

	var cancelFrame = (function () {
		var cancel = window.cancelAnimationFrame
			|| window.mozCancelAnimationFrame
			|| window.webkitCancelAnimationFrame || window.clearTimeout;
		return function (id) {
			return cancel(id);
		};
	})();

	function resizeListener(e) {
		var win = e.target || e.srcElement;
		if (win.__resizeRAF__)
			cancelFrame(win.__resizeRAF__);
		win.__resizeRAF__ = requestFrame(function () {
			var trigger = win.__resizeTrigger__;
			trigger.__resizeListeners__.forEach(function (fn) {
				fn.call(trigger, e);
			});
		});
	}

	function objectLoad(e) {
		this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
		this.contentDocument.defaultView.addEventListener('resize',
			resizeListener);
	}

	window.addResizeListener = function (element, fn) {
		if (!element.__resizeListeners__) {
			element.__resizeListeners__ = [];
			if (attachEvent) {
				element.__resizeTrigger__ = element;
				element.attachEvent('onresize', resizeListener);
			} else {
				if (getComputedStyle(element).position == 'static')
					element.style.position = 'relative';
				var obj = element.__resizeTrigger__ = document.createElement('object');
				obj.setAttribute('style','display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
				obj.__resizeElement__ = element;
				obj.onload = objectLoad;
				obj.type = 'text/html';
				if (isIE)
					element.appendChild(obj);
				obj.data = 'about:blank';
				if (!isIE)
					element.appendChild(obj);
			}
		}
		element.__resizeListeners__.push(fn);
	};

	window.removeResizeListener = function (element, fn) {
		element.__resizeListeners__.splice(element.__resizeListeners__
			.indexOf(fn), 1);
		if (!element.__resizeListeners__.length) {
			if (attachEvent)
				element.detachEvent('onresize', resizeListener);
			else {
				element.__resizeTrigger__.contentDocument.defaultView
					.removeEventListener('resize', resizeListener);
				element.__resizeTrigger__ = !element
					.removeChild(element.__resizeTrigger__);
			}
		}
	}
})();

function getDateValue(val) {
	var result = val;

	if (result != null) {
		result = result.replace(/-/g, "");
	}

	return result;
}

function setDateFormat(value) {
	var res;
	var resStr = "";

	try {
		res = dateRegExp.exec(value);

		if (!isNull(res) && res.length === 4) {
			resStr = res[1] + '-' + res[2] + '-' + res[3];
		}

		return resStr;
	} catch (e) {
		console.error("setDateFormat:", value, res, e.message);
	}
}