function createItemTitle(path, config, item) {

	var node = document.createElement('div'),
		img = document.createElement('img'),
		imgPath = path + '/' + config.resourcesPath + '/' + item.img;

	node.setAttribute('class', 'box-title');
	img.setAttribute('src', imgPath);
	node.appendChild(img);

	return node;
}

function createItemContent(item) {

	var node = document.createElement('div'),
		h2 = document.createElement('h2'),
		h2Content = document.createTextNode(item.title || '');
		p = document.createElement('p'),
		pContent = document.createTextNode(item.description || '');

	node.setAttribute('class', 'box-content');

	h2.appendChild(h2Content);
	node.appendChild(h2);

	p.appendChild(pContent);
	node.appendChild(p);

	return node;
}

function getItemHref(config, item) {

	var href;

	if (item.subdomain) {
		href = config.protocol + '://' + item.subdomain + '.' + config.domain;
	} else {
		href = item.href;
	}

	return href;
}

function createItemBox(path, config, item) {

	var boxNode = document.createElement('a'),
		titleNode = createItemTitle(path, config, item),
		contentNode = createItemContent(item);

	boxNode.setAttribute('class', 'box');
	boxNode.setAttribute('href', getItemHref(config, item));

	boxNode.appendChild(titleNode);
	boxNode.appendChild(contentNode);

	return boxNode;
}

function createTitle(config) {

	var parentNode = document.getElementById('title'),
		titleNode = document.createElement('h1'),
		titleText = config.title || '',
		contentNode = document.createTextNode(titleText);

	document.title = titleText;
	titleNode.appendChild(contentNode);
	parentNode.appendChild(titleNode);
}

function createContent(path, config) {

	createTitle(config);

	var items = config.items,
		boxContainerNode = document.getElementById('boxContainer');

	for (var i = 0; i < items.length; i++) {
		var item = items[i],
			itemBox = createItemBox(path, config, item);

		boxContainerNode.appendChild(itemBox);
	}
}
