var selkit = {};

selkit.reloadButton = () => {
	
	each("Button", "button.bedrock, .bedrock-btn", function(value){
		var outer = create("div", "bedrock-btn-outer");
		var inner = create("div", "bedrock-btn-inner");
		inner.innerHTML = value.innerHTML;
		value.innerHTML = "";
		outer.appendChild(inner);
		value.appendChild(outer);
	});
	
};

selkit.reloadCheckbox = () => {
	
	each("Checkbox", "input[type=checkbox].bedrock", function(value){
		var checkbox = create("div", "checkbox", "<div class='slider'></div>");
		checkbox.onclick = () => value.click();
		value.parentNode.insertBefore(checkbox, value.nextSibling);
	});
	
}

selkit.reloadRadio = () => {
	
	each("Radio", "input[type=radio].bedrock", function(value){
		var radio = create("div", "radio");
		radio.onclick = () => value.click();
		value.parentNode.insertBefore(radio, value.nextSibling);
	});
	
}

selkit.reloadRange = () => {
	
	each("Range", "input[type=range].bedrock", function(value){
		var darker = create("div", "darker-part");
		function updateWidth() {
			var max = value.max ? value.max : 100;
			var diff = max - (value.min ? value.min : 0);
			var width = (diff - value.value) / diff * (value.offsetWidth - diff * 2);
			darker.style.width = (value.value == max ? 0 : width - 2) + "px";
			darker.style.marginLeft = value.offsetWidth - width + "px";
		}
		value.oninput = updateWidth;
		value.parentNode.insertBefore(darker, value.nextSibling);
		updateWidth();
	});
	
}

selkit.reloadDropdown = () => {
	
	each("Dropdown", ".dropdown > .dropdown-toggle", function(value){
		var menu = document.getElementById(value.dataset.toggle);
		function close() {
			menu.style.display = "";
			window.removeEventListener("click", close);
		}
		value.onclick = () => {
			menu.style.display = "block";
			menu.style.zIndex = "999";
			menu.style.width = Math.max(value.offsetWidth - 22, menu.offsetWidth) + "px";
			setTimeout(() => window.addEventListener("click", close), 1);
		};
	});
	
};

selkit.reloadSelect = function(){
	
	function set(toggle, value, radio, option) {
		radio.onclick = () => {
			toggle.firstChild.firstChild.innerText = option.text;
			value.value = option.value;
		};
	}
	
	each("Select", "select.bedrock", function(value){
		var id = "dropdown-" + Math.round(Math.random() * 1000000);
		var dropdown = create("div", "bedrock dropdown");
		var toggle = create("div", "bedrock-btn dropdown-toggle");
		toggle.dataset.toggle = id;
		var menu = create("div", "dropdown-menu");
		menu.id = id;
		for(var i=0; i<value.options.length; i++) {
			var option = value.options[i];
			if(option.selected) toggle.innerText = option.text;
			if(!option.hidden) {
				var div = create("div");
				var radio = create("input", "bedrock");
				radio.type = "radio";
				radio.name = id;
				radio.id = id + "-" + i;
				if(option.disabled) radio.disabled = true;
				set(toggle, value, radio, option);
				if(option.selected) radio.checked = true;
				var label = create("label", null, value.options[i].text);
				label.htmlFor = id + "-" + i;
				div.appendChild(radio);
				div.appendChild(label);
				menu.appendChild(div);
			}
		}
		dropdown.appendChild(toggle);
		dropdown.appendChild(menu);
		value.parentNode.insertBefore(dropdown, value.nextSibling);
	});
	
	selkit.reloadButton();
	selkit.reloadDropdown();
	selkit.reloadRadio();
	
};

selkit.reloadCard = () => {
	
	each("Card", ".card", function(value){
		value.appendChild(create("div", "card-decoration card-top"));
		value.appendChild(create("div", "card-decoration card-left"));
		value.appendChild(create("div", "card-decoration card-bottom"));
		value.appendChild(create("div", "card-decoration card-right"));
		value.appendChild(create("div", "card-decoration card-top-left"));
		value.appendChild(create("div", "card-decoration card-bottom-left"));
		value.appendChild(create("div", "card-decoration card-bottom-right"));
		value.appendChild(create("div", "card-decoration card-top-right"));
	});
	
	each("Tabs", ".card > ul.tabs > li", function(value){
		value.appendChild(create("div", "card-decoration card-top"));
		value.appendChild(create("div", "card-decoration card-left"));
		value.appendChild(create("div", "card-decoration card-right"));
		value.appendChild(create("div", "card-decoration card-top-left"));
		value.appendChild(create("div", "card-decoration card-top-right"));
	});
	
};

selkit.reload = () => {
	
	selkit.reloadButton();
	selkit.reloadCheckbox();
	selkit.reloadRadio();
	selkit.reloadRange();
	selkit.reloadDropdown();
	selkit.reloadSelect();
	selkit.reloadCard();
	
};

function create(type, classes, html) {
	var ret = document.createElement(type);
	if(classes != undefined) ret.classList = classes;
	if(html != undefined) ret.innerHTML = html;
	return ret;
}

function each(type, selector, fun) {
	type = "selkit" + type;
	var s = document.querySelectorAll(selector);
	for(var i=0; i<s.length; i++) {
		if(!s[i].dataset[type]) {
			s[i].dataset[type] = true;
			fun(s[i]);
		}
	}
}

window.addEventListener("load", selkit.reload);
