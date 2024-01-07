// used to append a Bootstrap alert to the DOM
export const addAlert = (message, type, div) => {
	const wrapper = document.createElement('div');
	wrapper.innerHTML = [
		`<div class="alert alert-${type} alert-dismissible" role="alert">`,
		`   <div>${message}</div>`,
		'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
		'</div>',
	].join('');

	div.append(wrapper);
};

