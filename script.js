window.addEventListener("load", function(){
	
	each("input[type='checkbox']", function(value){
		var checkbox = document.createElement("div");
		checkbox.classList.add("checkbox");
		checkbox.innerHTML = "<div class='slider'></div>";
		checkbox.onclick = function(){
			if(!value.disabled) value.checked = !value.checked;
		};
		value.parentNode.insertBefore(checkbox, value.nextSibling);
	});
	
});

function each(selector, fun) {
	var s = document.querySelectorAll(selector);
	console.log(s.length);
	for(var i=0; i<s.length; i++) {
		fun(s[i]);
	}
}
