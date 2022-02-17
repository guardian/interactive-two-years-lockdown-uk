import data from 'assets/json/data.json'

let slots = document.querySelectorAll('#interactive-slot-1')

slots.forEach((s,i) => {

	let html = 

	`<div class="section-header" id='header-${i}'> 
		<div class="section-copy"> 
			<h3>${data[i].header}</h3> 
			<h4>${data[i].subheader}</h4> 
		</div> 
		<div class="section-image-wrapper"> 
			<img class="section-image" src="<%= path %>/${data[i].image}" alt=""> 
		</div> 
	</div>`

	s.innerHTML = html;

})
