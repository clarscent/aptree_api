var popup = {
	alert : {
		show : function() {
			top.popup.alert.show.apply(top.popup.alert, arguments);
		},
		hide : function() {
			top.popup.alert.hide.apply(top.popup.alert, arguments);
		},
	},

	confirm : {
		show : function() {
			top.popup.confirm.show.apply(top.popup.confirm, arguments);
		},
		hide : function() {
			top.popup.confirm.hide.apply(top.popup.confirm, arguments);
		},
	},

	loading : {
		cnt : 0,
		show : function() {
			top.popup.loading.show.apply(top.popup.loading, arguments);
		},
		hide : function() {
			top.popup.loading.hide.apply(top.popup.loading, arguments);
		},
	},

	help : {
		show : function() {
			top.popup.help.show.apply(top.popup.help, arguments);
		},
		hide : function() {
			top.popup.help.hide.apply(top.popup.help, arguments);
		},
	},
	
	promotion : {
		show : function() {
			top.popup.promotion.show.apply(top.popup.promotion, arguments);
		},
		hide : function() {
			top.popup.promotion.hide.apply(top.popup.promotion, arguments);
		},
	},
	
	vin : {
		show : function() {
			top.popup.vin.show.apply(top.popup.vin, arguments);
		},
		hide : function() {
			top.popup.vin.hide.apply(top.popup.vin, arguments);
		},
	} 
};

var customPopup = {
	show : function() {
		top.customPopup.show.apply(top.customPopup, arguments);
	},
	hide : function() {
		top.customPopup.hide.apply(top.customPopup, arguments);
	},
};

$.fn.nextFocus = function() {
	var $el = this;
	
	if ($el.prop("tagName") == "BUTTON" && $el.data("select-id")) {
		$el = $("#" + $el.data("select-id"));
	}
	
	var $next = $el.nextAll().filter("input:enabled:not([readonly]):not([type=hidden]), select:enabled:not([readonly])");
	
	//console.log("$next1", $next);
	
	if ($next.length == 0) {
		$next = $el.nextAll().find("input:enabled:not([readonly]), select:enabled:not([readonly])");
		//console.log("next2", $next);
	}
	
	if ($next.length == 0) {
		$next = $el.parent().nextAll().find("input:enabled:not([readonly]), select:enabled:not([readonly])");
		//console.log("next3", $next);
	}
	
	if ($next.length == 0) {
		if (checkEmpty($el.parents("form").attr("id"), "").indexOf("search") > -1) {
			listener.button.search.click();
		}
	}
	
	$next = $next.first();
	$next.focus();
};

$.fn.setData = function(data) {
	var $el = $(this);
	
	$el.editMode("edit");
	
	if ($el.prop("tagName") == "FORM") {

		for (var field in data) {
			if (field.indexOf("$") > -1) {
				continue;
			}

			let $target = $el.find("[data-field=" + field + "]");
			//console.log(field, $target, $target.prop("tagName"), $target.prop("type"), data[field]);
			
			if (($target.prop("tagName") == "INPUT" || $target.prop("tagName") == "SELECT") && $target.prop("type") != "radio" && $target.prop("type") != "checkbox") {
				$target.setVal(data[field]);
			} else if ($target.prop("tagName") == "INPUT" && ($target.prop("type") == "radio" || $target.prop("type") == "checkbox")) {
				$target.each(function(idx, obj) {
					if (obj.value == data[field]) {
						obj.checked = true;
					}
				});
			}
		}
	}
};

$.fn.getData = function() {
	//console.log("GetData", this);
	var $el = $(this);
	
	var result = new Object();
	
	if ($el.prop("tagName") == "FORM") {
		var $targets = $el.find("[data-field]");
		
		$targets.each(function(idx, obj) {
			$target = $(obj);
			
			var field = $target.data("field");
			
			if (($target.prop("tagName") == "INPUT" || $target.prop("tagName") == "TEXTAREA" || $target.prop("tagName") == "SELECT") && $target.prop("type") != "radio" && $target.prop("type") != "checkbox") {
				result[field] = $target.val();
			} else if ($target.prop("tagName") == "INPUT" && $target.prop("type") == "radio") {
				$target.each(function(idx, obj) {
					if (obj.checked) {
						result[field] = $target.val();
					}
				});
			} else if ($target.prop("tagName") == "INPUT" && $target.prop("type") == "checkbox") {
				if ($target.prop("checked")) {
					result[field] = $target.val();
				}
			}

			if (isNull(result[field])) {
				result[field] = "";
			}
		});
	}
	
	result["EDIT_MODE"] = $el.editMode()
	
	return result;
};

$.fn.reset = function() {
	var $el = $(this);
	
	$el.editMode("reset");
	
	var $target = $el.find("input, select");
	
	$target.each(function(idx, obj) {
		$obj = $(obj);
		
		if (obj.tagName == "INPUT" && obj.type != "radio" && obj.type != "checkbox") {
			$obj.val(checkNull($obj.data("default"), ""));
		} else if (obj.tagName == "INPUT" && (obj.type == "radio" || obj.type == "checkbox")) {
			if ($obj.val() == $obj.data("default")) {
				obj.checked = true;
			} else {
				obj.checked = false;
			}
		} else if (obj.tagName == "SELECT") {
			$(obj).get(0).value = "";
		}
	});
}

$.fn.checkValidation = function() {
	var $el = $(this);
	
	if ($el.prop("tagName") != "FORM") {
		return false;
	}
	
	var $target = $el.find("input:enabled:not([readonly]), select:enabled:not([readonly]), textarea");
	
	var isPass = true;
	var errorField = "";
	var $errorObj = null;
	
	$target.each(function(idx, obj) {
		var $obj = $(obj);
		var required = checkNull($obj.data("required"), false);
		
		$errorObj = $obj;
		
		//console.log($obj, required);

		var title = $("label[for=" + $obj.attr("id") + "]").html();
		if (required) {
			if ($obj.prop("tagName") == "INPUT" || $obj.prop("tagName") == "TEXTAREA" || $obj.prop("tagName") == "SELECT") {
				var $nameObj = $("input[data-code-obj=" + $obj.attr("id") + "]");
				
				if ($obj.val() == "") {
					errorField = title;
					isPass = false;
					return false;
				} else if ($nameObj.length > 0 && $nameObj.val() == "") {
					errorField = title;
					isPass = false;
					return false;
				}
			}
		}
		
		if ($obj.data("format") == "date-year") {
			if ($obj.val().length != 4) {
				errorField = title;
				isPass = false;
				return false;
			}
		} else if ($obj.data("format") == "date-month") {
			if ($obj.val().length != 7) {
				errorField = title;
				isPass = false;
				return false;
			}
		}
	});
	
	if (!isPass) {
		popup.alert.show(hanp.translatePostpositions(errorField + "을(를) 확인하세요."), function() {
			if ($errorObj.prop("tagName") == "INPUT" || $errorObj.prop("tagName") == "SELECT") {
				$errorObj.focus();
			}
		});
	}
	
	return isPass;
};

$.fn.formDisable = function() {
	var $el = $(this);
	
	if ($el.prop("tagName") != "FORM") {
		return false;
	}
	
	var $target = $el.find("input:enabled:not([readonly]), select:enabled:not([readonly]), textarea:enabled:not([readonly]), button");
	
	for (var i = 0; i < $target.length; i++) {
		$obj = $($target.get(i));
		
		$obj.data("form-disabled", true);
		$obj.prop("disabled", true);
	}
};

$.fn.formEnable = function() {
	var $el = $(this);
	
	if ($el.prop("tagName") != "FORM") {
		return false;
	}
	
	var $target = $el.find("input:not([readonly]), select:not([readonly]), textarea:not([readonly]), button");
	
	for (var i = 0; i < $target.length; i++) {
		$obj = $($target.get(i));
		
		if ($obj.data("form-disabled")) {
			$obj.data("form-disabled", false);
			$obj.prop("disabled", false);
		}
	}
};

$.fn.editMode = function(val) {
	var $el = $(this);
	
	if (!isNull(val)) {
		$el.data("editMode", val);
	}
	
	if (isNull($el.data("editMode"))) {
		$el.data("editMode", "reset");
	}
	
	return $el.data("editMode");
};

/* Korean initialisation for the jQuery calendar extension. */
/* Written by DaeKwon Kang (ncrash.dk@gmail.com), Edited by Genie. */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "../datepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.datepicker );
	}
}(function( datepicker ) {

datepicker.regional['ko'] = {
	closeText: '닫기',
	prevText: '이전달',
	nextText: '다음달',
	currentText: '오늘',
	monthNames: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
	monthNamesShort: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
	dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
	dayNamesShort: ['일','월','화','수','목','금','토'],
	dayNamesMin: ['일','월','화','수','목','금','토'],
	weekHeader: '주',
	dateFormat: 'yy-mm-dd',
	firstDay: 0,
	isRTL: false,
	showMonthAfterYear: true,
	yearSuffix: '년'};
datepicker.setDefaults(datepicker.regional['ko']);

return datepicker.regional['ko'];

}));

(function($) {
	// Number Onry
	$.fn.allowOnlyNumeric = function() {

		/**
		 * The interval code is commented as every 250 ms onchange of the textbox
		 * gets fired.
		 */

		// var createDelegate = function(context, method) {
		// return function() { method.apply(context, arguments); };
		// };
		/**
		 * Checks whether the key is only numeric.
		 */
		var isValid = function(key) {
			var validChars = "0123456789.-";
			var validChar = validChars.indexOf(key) != -1;
			return validChar;
		};

		/**
		 * Fires the key down event to prevent the control and alt keys
		 */
		var keydown = function(evt) {
			if (evt.ctrlKey || evt.altKey) {
				evt.preventDefault();
			}
		};

		/**
		 * Fires the key press of the text box
		 */
		var keypress = function(evt) {
			if ($(this).prop('readOnly')) return;
			var scanCode;
			// scanCode = evt.which;
			if (evt.charCode) { // For ff
				scanCode = evt.charCode;
			} else { // For ie
				scanCode = evt.which;
			}

			if (scanCode && scanCode >= 0x20 /* space */) {
				var c = String.fromCharCode(scanCode);
				if (!isValid(c)) {
					evt.preventDefault();
				}
			}
		};

		/**
		 * Fires the lost focus event of the textbox
		 */
		var onchange = function() {
			var result = [];
			var enteredText = $(this).val();
			for (var i = 0; i < enteredText.length; i++) {
				var ch = enteredText.substring(i, i + 1);
				if (isValid(ch)) {
					result.push(ch);
				}
			}
			var resultString = result.join('');
			if (enteredText != resultString) {
				$(this).val(resultString);
			}

		};

		// var _filterInterval = 250;
		// var _intervalID = null;

		// var _intervalHandler = null;

		/**
		 * Dispose of the textbox to unbind the events.
		 */
		this.dispose = function() {
			$(this).die('change', onchange);
			$(this).die('keypress', keypress);
			$(this).die('keydown', keydown);
			// window.clearInterval(_intervalHandler);
		};

		$(this).on('change', '', onchange);
		$(this).on('keypress', '', keypress);
		$(this).on('keydown', '', keydown);
		// _intervalHandler = createDelegate(this, onchange);
		// _intervalID = window.setInterval(_intervalHandler, _filterInterval);
		return this;
	}

	$(window).on('load', function() {
		$('[data-format=number]').each(function() {
			var $spy = $(this)
			$spy.allowOnlyNumeric()
		})
	});
})(jQuery);


(function($) {
// Upper Case Only
	$.fn.allowOnlyUpperCase = function() {

		var keypress = function(evt) {
			if (evt.which == 0) return;
			
			if ($(this).prop('readOnly')) return;

			if (evt.target.value.length >= evt.target.maxLength && evt.target.maxLength != -1) {
				if (evt.target.selectionStart == evt.target.selectionEnd) {
					evt.preventDefault();
					return;
				}
			}

			var stNum = evt.target.selectionStart;
			var endNum = evt.target.selectionEnd;

			var curValue = evt.target.value;

			var leftValue = curValue.substring(0, stNum);
			var rightValue = curValue.substring(endNum);

			var keyChar = String.fromCharCode(evt.which);

			if (keyChar >= 'a' && keyChar <= 'y') {
				evt.target.value = leftValue + String.fromCharCode(Number(evt.which) - 32) + rightValue;
				evt.preventDefault();
			} else if (keyChar >= 'A' && keyChar <= 'Z') {
				evt.target.value = leftValue + String.fromCharCode(evt.which) + rightValue;
				evt.preventDefault();
			} else if (keyChar >= '0' && keyChar <= '9') {
				evt.target.value = leftValue + String.fromCharCode(evt.which) + rightValue;
				evt.preventDefault();
			} else if (keyChar == '*') {
				evt.target.value = leftValue + '*' + rightValue;
				evt.preventDefault();
			}

			evt.target.selectionStart = stNum + 1;
			evt.target.selectionEnd = stNum + 1;
		};

		this.dispose = function() {
			$(this).off('keypress', keypress);
		};

		$(this).on('keypress', keypress);

		//$(this).css('text-transform', 'uppercase');
		return this;
	}

	$(window).on('load', function() {
		$('[data-format=upper]').each(function() {
			var $spy = $(this)
			$spy.allowOnlyUpperCase()
		})
	});
})(jQuery);

var initializeConfig = {
	setCodeNameInput : function() {
		var $inputObj = $("input[data-code]");
		
		$inputObj.each(function(idx, obj) {
			$obj = $(obj);
			$obj.after("<button class='btnCodeHelp' data-target='" + $obj.attr("id") + "' >&nbsp;</button>");
		});
		
		var helpButton = $("button.btnCodeHelp[data-target]");
		
		//console.log("setCodeNameInput", helpButton);
		
		helpButton.click(function() {
			var $el = $(this);
			var $target = $("#" + $el.data("target"));
			var multiple = checkEmpty($target.data("multiple"), false);
			
			//console.log("helpButton click", $el, $target, multiple);
			
			var type = checkEmpty($target.data("type"), "help");
			var code = $target.data("code");
			var param = $target.data("param");
			
			if (type == "promotion") {
				var progrpcd = $target.data("progrpcd");
				
				var $yymmTarget = $("input[data-ref-obj=" + $target.attr("id") + "][data-field=PRO_YYMM]");
				var $nameTarget = $("input[data-code-obj=" + $target.attr("id") + "][data-field=PRO_NM]");
				
				param["PRO_YYMM"] = $yymmTarget.val();
				param["PRO_GRPCD"] = progrpcd;
				
				var callback = function(result) {
					$yymmTarget.val(result["PRO_YYMM"]);
					$nameTarget.val(result["PRO_NM"]);
					$target.val(result["PRO_SEQNO"]);
					
					listener.button.help.callback($target, result);
				}
				
				popup[type].show(code, param, callback);
			} else if (type == "vin") {
				var $nameTarget = $("input[data-code-obj=" + $target.attr("id") + "][data-field=VIN_NM]");
				
				var callback = function(result) {
					$nameTarget.val(result["VIN_NM"]);
					$target.val(result["VIN_NO"]);
					
					listener.button.help.callback($target, result);
				}
				
				popup[type].show(code, param, multiple, callback);
			} else {
				var $nameTarget = $("input[data-code-obj=" + $target.attr("id") + "]");
				
				var callback = function(result) {
					//console.log("helpButton callback", result);
					$nameTarget.val(result["NAME"]);
					$target.val(result["CODE"]);
					
					listener.button.help.callback($target, result);
				}
				
				//console.log("type", type, code, $target.val(), param, callback, multiple);
				popup[type].show(code, $target.val(), param, callback, multiple);
			}
		});
	},
	
	preventFormSubmit : function() {
		$("form").submit(function(){
			return false;
		});
	},

	addGridResizeEvent : function() {
		$(window).resize(function() {
			resizeGrid();
		});
	},
	
	setNextFocus : function(target) {
		$("." + target + "Row>input:enabled:not([readonly]), ." + target + "Row select").on("keydown", function(evt) {
			if (evt.keyCode == KEY_ENTER) {
				$el = $(evt.currentTarget);
				$el.nextFocus();
			}
		});
		
		var $firstObj = $("." + target + "Row>input:enabled:not([readonly]), ." + target + "Row select").first();
		$firstObj.focus();
	},
	
	setCodeName : function(target) {
		var $codeObjs = $("." + target + "Row>input[data-code]");
		
		$codeObjs.on("keydown", function(evt) {
			$this = $(this);
			var codeObjID = $this.attr("id");
			var $nameObj = $("." + target + "Row>input[data-code-obj=" + codeObjID + "]")
			
			//console.log("$nameObj",$nameObj);
			
			if (evt.keyCode != KEY_ENTER) {
				if (isValidKey2(evt)) { 
					$nameObj.val("");
					listener.editor.keydown($this, evt)
				}
				return;
			}
			
			/*
			if ($this.val() == "") {
				if ($this.data("required")) {
					$this.focus();
					alert("필수입니다.");
					return;
				}
			}
			*/
			
			if ($this.data("type") == "help") {
				var param = $this.data("param");
				param["CODE"] = $this.val();
				
				var callback = new Callback(function(result) {
					//console.log(result, isEmpty(result), result.length);
					
					if (isEmpty(result)) {
						$this.focus();
						$this.select();
						alert("코드확인");
						return;
					}
					
					$nameObj.val(result[0]["NAME"]);
				});
				
				callback.async = false;
				
				CodeService.getCodeName("CODE", $this.data("code"), param, callback);
			} else if ($this.data("type") == "promotion") {
				var param = $this.data("param");
				
				var $yymmTarget = $("input[data-ref-obj=" + $this.attr("id") + "][data-field=PRO_YYMM]");
				var $nameTarget = $("input[data-code-obj=" + $this.attr("id") + "][data-field=PRO_NM]");
				
				param["PRO_YYMM"] = $yymmTarget.val();
				param["PRO_SEQNO"] = $this.val();
				
				//console.log("CodeService.getCodeName", param);
				
				var callback = new Callback(function(result) {
					if (isEmpty(result)) {
						$this.focus();
						$this.select();
						return;
					}
					
					$nameObj.val(result[0]["PRO_NM"]);
				});
				
				callback.async = false;
				CodeService.getCodeName("CODE", $this.data("code"), param, callback);
			} else if ($this.data("type") == "vin") {
				var param = $this.data("param");
				
				var $nameTarget = $("input[data-code-obj=" + $this.attr("id") + "][data-field=VIN_NM]");
				
				param["CODE"] = $this.val();
				//console.log("CodeService.getCodeName", param);
				
				var callback = new Callback(function(result) {
					if (isEmpty(result)) {
						$this.focus();
						$this.select();
						return;
					}
					$nameObj.val(result[0]["NAME"]);
				});
				
				callback.async = false;
				CodeService.getCodeName("CODE", $this.data("code"), param, callback);
			}
		});
	},
	
	setButtonListener : function() {
		$("#titleArea .buttonArea button").each(function (idx, obj) {
			$el = $(obj);
			var buttonID = $el.attr("id");
			
			if (buttonID && listener.button[buttonID]) {
				$el.on("click", listener.button[buttonID].click);
			}
		});
		
		$(".rowButtonArea button").each(function (idx, obj) {
			$el = $(obj);
			var buttonID = $el.attr("name");

			if (buttonID && listener.button[buttonID]) {
				$el.on("click", listener.button[buttonID].click);
			}
		});
		
		$(".fileButtonArea button").each(function (idx, obj) {
			$el = $(obj);
			var buttonID = $el.attr("id");
			
			if (buttonID && listener.button[buttonID]) {
				$el.on("click", listener.button[buttonID].click);
			}
		});
	},
	
	setInputKeyHandler : function(target) {
		var $inputObjs = $("." + target + "Row>input:not([data-code])");
		
		$inputObjs.on("keydown", function(evt) {
			$this = $(this);
			
			if (isValidKey2(evt)) {
				listener.editor.keydown($this, evt);
				return;
			}
		});
		
		//$codeObjs.on("keydown", function(evt) {
	},
	
	setRequiredLabel : function() {
		$("input[data-required=true], select[data-required=true], textarea[data-required=true]").each(function(idx, obj) {
			var $obj = $(obj);
			var objId = $(obj).attr("id");
			var $labelObj = $("label[for=" + objId + "]");
			
			if ($labelObj.length > 0) {
				$labelObj.addClass("required");
			}
		});
	},
	
	setDatePicker : function() {
		$("input[data-format=date-year]").each(function(idx, obj) {
			if (isEmpty($(obj).data("default"))) {
				$(obj).data("default", new Date().format("yyyy"));
			}
			
			$(obj).val($(obj).data("default"));
			$(obj).mask("9999",{placeholder:"yyyy"});
		});
		
		$("input[data-format=date-month]").each(function(idx, obj) {
			$(obj).MonthPicker();
			
			if (isEmpty($(obj).data("default"))) {
				$(obj).data("default", new Date().format("yyyy-MM"));
			}
			
			$(obj).val($(obj).data("default"));
			$(obj).mask("9999-99",{placeholder:"yyyy-mm"});
		});
		
		$("input[data-format=date]:not([readonly])").each(function(idx, obj) {
			$(obj).datepicker({
				showOn : "button",
				buttonImageOnly : false,
			});
			
			$(obj).mask("9999-99-99", {placeholder:"yyyy-mm-dd"});
		});

		$("input[data-format=date][readonly]").each(function(idx, obj) {
			$(obj).mask("9999-99-99", {placeholder:"yyyy-mm-dd"});
		});
	},
	
	setFormatter : function() {
		$("input[data-format]").each(function(idx, obj) {
			$obj = $(obj);
			
			if ($obj.data("format") == "number" && $obj.attr("maxlength")) {
				//console.log("mask", $obj.attr("id") , $obj.attr("maxlength"));
				var maskStr = lpad("", $obj.attr("size"), "9");
				
				//$obj.mask(maskStr);
			}
		});
	},
	
	setExcelDownloader : function() {
		$("button[name=excelDown]").on("click", function(evt) {
			var $el = $(evt.currentTarget);
			var gridId = $el.data("target");
			var excelName = $el.data("excel-name");
			
			CommonService.gridToExcel(excelName + ".xls", $$(gridId).getXmlData(), {
				callback: function(url) {
					window.location = url + "?contentDispositionType=inline";
				},
				async: false
			});
		});
	}
}

function resizeGrid() {
	$('.webix_dtable').each(function() {
		var $this = $(this);

		if ($this.parent().is(':visible')) {
			var _dataTable = $$($this.parent().attr("id"));
			_dataTable.adjust();
		}
	});
}

$(document).ready(function() {
	initializeConfig.setDatePicker();
	initializeConfig.setFormatter();
	initializeConfig.setCodeNameInput();
	initializeConfig.preventFormSubmit();
	initializeConfig.addGridResizeEvent();
	initializeConfig.setNextFocus("form");
	initializeConfig.setNextFocus("search");
	initializeConfig.setCodeName("search");
	initializeConfig.setCodeName("form");
	initializeConfig.setInputKeyHandler("search");
	
	initializeConfig.setButtonListener();
	initializeConfig.setRequiredLabel();
	initializeConfig.setExcelDownloader();
	
	$("input[readonly]").on("focus", function() {
		//$(this).blur();
	});
	
	webix.ready(function() {
		setTimeout(initPage, 1);
	});
});

$(function() {
	var w = window;
	if (w.frameElement != null && w.frameElement.nodeName === "IFRAME" && w.parent.jQuery) {
		w.parent.jQuery(w.parent.document).trigger("iframeready", w.frameElement.id);
	}
});