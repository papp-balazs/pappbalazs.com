let portfolioBoxes;

const removeLoadingScreen = () => {
	const loadingScreen = document.getElementById("loading");
	const showcaseText = document.querySelector("#me");

	loadingScreen.classList.add("animate");
	showcaseText.classList.add("animate");

	loadingScreen.addEventListener("animationend", () => {
		loadingScreen.remove();
	});
};

const watchImageLoading = () => {
	Promise.all(Array.from(document.images).map(img => {
		if (img.complete) {
			return Promise.resolve(img.naturalHeight !== 0);
		}

		return new Promise(resolve => {
			img.addEventListener("load", () => resolve(true));
			img.addEventListener("error", () => resolve(false));
		});
	})).then(results => {
		if (results.every(res => res)) {
			removeLoadingScreen();
		} else {
			console.error("There was an eror at loading the site's images!");
		}
	});
};

const setPortfolioBoxDescriptionTopValues = () => {
	portfolioBoxes.forEach(box => {
		const firstImage = box.querySelector(":scope img:first-child");
		const firstImageTop = firstImage.getBoundingClientRect().top;

		box.style.setProperty("--portfolioBoxDescriptionTop", `${firstImageTop}px`);
	});
};

const watchScrolling = () => {
	const scrollPosition = this.scrollY;
	const clientHeight = window.innerHeight;
	const clientWidth = document.body.clientWidth;

	const animateShowcase = () => {
		/*
		if (scrollPosition >= clientHeight) {
			return;
		}
*/
		const me = document.getElementById("me");
		const portrait = document.getElementById("portrait");

		const scrollingRatio = scrollY / clientHeight * 1.25;

		let opacityRatio = 2;

		if (clientWidth <= 850) {
			opacityRatio = 3.75;
		}

		me.style.transform = `translateY(-${scrollPosition}px)`;
		me.style.opacity = Math.max(1 - scrollingRatio * opacityRatio, 0);

		portrait.style.transform = `translateX(${scrollingRatio * portrait.offsetWidth}px)`;
	};

	animateShowcase();
};

const watchResize = () => {
	const setPortfolioBoxDescriptionHeight = () => {
		portfolioBoxes.forEach(box => {
			const portfolioImageHeight = box.querySelector(":scope img:first-child").offsetHeight;
			
			box.style.setProperty("--portfolioBoxDescriptionHeight", `${portfolioImageHeight}px`);
		});
	};

	setPortfolioBoxDescriptionHeight();
};

const init = () => {
	portfolioBoxes = document.querySelectorAll("#portfolio .box");

	watchImageLoading();
	watchResize();

	window.addEventListener("scroll", watchScrolling);
	window.addEventListener("resize", watchResize);
};

window.addEventListener("load", init);
