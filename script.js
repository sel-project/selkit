window.addEventListener("load", function(){
	
	each("input[type=checkbox]", function(value){
		var checkbox = create("div", "checkbox", "<div class='slider'></div>");
		checkbox.onclick = () => value.click();
		value.parentNode.insertBefore(checkbox, value.nextSibling);
	});
	
	each("input[type=radio]", function(value){
		var radio = create("div", "radio");
		radio.onclick = () => value.click();
		value.parentNode.insertBefore(radio, value.nextSibling);
	});
	
});

function create(type, classes, html) {
	var ret = document.createElement(type);
	if(classes != undefined) ret.classList.add(classes);
	if(html != undefined) ret.innerHTML = html;
	return ret;
}

function each(selector, fun) {
	var s = document.querySelectorAll(selector);
	for(var i=0; i<s.length; i++) {
		fun(s[i]);
	}
}
