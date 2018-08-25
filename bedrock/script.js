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
	
	each(".card", function(value){
		value.appendChild(create("div", "card-decoration card-top"));
		value.appendChild(create("div", "card-decoration card-left"));
		value.appendChild(create("div", "card-decoration card-bottom"));
		value.appendChild(create("div", "card-decoration card-right"));
		value.appendChild(create("div", "card-decoration card-top-left"));
		value.appendChild(create("div", "card-decoration card-bottom-left"));
		value.appendChild(create("div", "card-decoration card-bottom-right"));
		value.appendChild(create("div", "card-decoration card-top-right"));
	});
	
});

function create(type, classes, html) {
	var ret = document.createElement(type);
	if(classes != undefined) ret.classList = classes;
	if(html != undefined) ret.innerHTML = html;
	return ret;
}

function each(selector, fun) {
	var s = document.querySelectorAll(selector);
	for(var i=0; i<s.length; i++) {
		fun(s[i]);
	}
}