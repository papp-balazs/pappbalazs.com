let contactForm;
let contactSubmitButton;

let heroBio;
let heroDetailsButton;
let heroContactButton;
let heroJob;
let heroBackground;

let portfolioItems;

let filmsArray = [
	"Blade Runner",
	"Dune",
	"Tantrum",
	"Legjobb tudomásom szerint",
	"Rengeteg – mindenhol látlak",
	"Dýrið",
	"Űrpiknik",
	"ドライブ・マイ・カー",
	"Titane",
	"Külön falka",
	"Természetes fény",
	"Malcolm & Marie",
	"Soul",
	"I'm thinking of ending things",
	"Last and First Men",
	"Promising Young Woman",
	"Climax",
	"Árnyék a havon",
	"La La Land",
	"A torinói Ló",
	"A londoni férfi",
	"Werckmeister harmóniák",
	"Utazás az Alföldön",
	"Sátántangó",
	"Kárhozat",
	"Őszi almanach",
	"Sound of Metal",
	"Le Mans '66",
	"Guest of Honor",
	"Midsommar",
	"Once upon a Time in... Holywood",
	"The Lighthouse",
	"Entrópia",
	"Lidérc úr",
	"Apró mesék",
	"Rossz versek",
	"Volt egyszer egy Corvin téka",
	"Λεωφόρος Πατησίων",
	"Ruben Brandt, a gyüjtő",
	"Mandy",
	"Blade Runner 2049",
	"Loving Vincent",
	"Juipter Holdja",
	"Testről és lélekről",
	"Get Out",
	"A martfűi rém",
	"Arrival",
	"A fekete múmia átka",
	"Saul fia",
	"The VVitch",
	"Liza a rókatündér",
	"Theory of Everything",
	"Whiplash",
	"Nymphomaniac",
	"The Master",
	"Final Cut",
	"Drive",
	"Womb",
	"Bibliothèque Pascal",
	"Fantastic Mr. Fox",
	"Enter the Void",
	"Moon",
	"Tejút",
	"Man from Earth",
	"Joyeux Noel",
	"Before Sunrise",
	"Punch Drunk Love",
	"千と千尋の神隠し",
	"Requiem for a Dream",
	"American Psycho",
	"パーフェクトブルー",
	"ユメノ銀河",
	"A Tanu",
	"Halloween",
	"Szegénylegények",
	"Apa",
	"La Planète sauvage",
	"ハウス’",
	"Vampyr",
	"Stranger Than Paradise",
	"天邊一朵雲",
	"Je, Tu, Il, Elle",
	"Itt vagyok",
	"Miracle Mile",
	"Post Tenebras Lux",
	"La notte",
	"Dekalog",
	"薔薇の葬列",
	"Swiss Army Man",
	"Seul contre tous",
	"Irréversible",
	"Love",
	"Vortex",
	"Raw",
	"Shelley",
	"The Green Knight",
	"A Ghost Story",
	"Connection",
	"他人の顔",
	"Blue Velvet",
	"악마를 보았다",
	"Ida",
	"La Haine",
	"8½",
	"Frances Ha",
	"君の名は。",
	"Conte d'été",
	"Evolúció",
	"見鬼",
	"Valami Amerika",
	"Argo",
	"Зеркало",
	"Андрей Рублёв",
	"Иваново детство",
	"Солярис",
	"Сталкер",
	"Offret",
	"Rosemary's Baby",
	"Quo Vadis, Aida?",
	"Cidade de Deus",
	"mid90s",
	"切腹",
	"Jane Eyre",
	"Casablanca",
	"Cannibal Holocaust",
	"Иди и смотри",
	"Eraserhead",
	"墮落天使",
	"Hiroshima Mon Amour",
	"Videdrome",
	"The Fly",
	"Aus dem Nichts",
	"The Northman",
	"The Tree of Life",
	"A hidden life",
	"Metropolis",
	"Nosferatu",
	"The Shining",
	"Full Metal Jacket",
	"2001: A Space Odyssey",
	"Salò o le 120 giornate di Sodoma’",
	"Roma",
	"The Pianist",
	"Disconnect",
	"Vivre sa vie",
	"Szerelem",
	"Antichrist",
	"Eyes Wide Shut",
	"Lawrence of Arabia",
	"기생충",
	"Le Voyage dans la Lune",
	"The Great Dictator",
	"七人の侍",
	"Vertigo",
	"Popiól i diament",
	"Psycho",
	"Jesus of Nazareth",
	"올드보이",
	"Rocky",
	"Forrest Gump",
	"Schindler’s List",
	"American Beauty",
	"Titanic",
	"Crash",
	"A tizedes meg a többiek",
	"Körhinta",
	"Dögkeselyű"
];

const shuffleArray = array => {
	let currentIndex = array.length;
	let randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
};

/* FUNCTION TO SET AN ELEMENT'S SCROLL POSITION VIA TRANSFORM */
const setScrollPositionY = (element, position, speed = 1) => {
	element.style.transform = `translateY(${-(position * speed)}px)`;
}

const setScrollPositionX = (element, position, speed = 1) => {
	element.style.transform = `translateX(${-(position * speed)}px)`;
};

/* SENDING EMAIL VIA CONTACT FORM */
const submitContactForm = e => {
	e.preventDefault();
	
	const nameInput = document.getElementById("contact__name");
	const emailInput = document.getElementById("contact__email");
	const subjectInput = document.getElementById("contact__subject");
	const messageInput = document.getElementById("contact__message");

	// Reset input's status
	nameInput.classList.remove("error");
	emailInput.classList.remove("error")
	subjectInput.classList.remove("error");
	messageInput.classList.remove("error");

	const name = nameInput.value;
	const email = emailInput.value;
	const subject = subjectInput.value || "(no subject)";
	const message = messageInput.value;

	// Check the input values. If any is empty, give an error, and don't submit
	// the form.
	if (!name) {
		nameInput.classList.add("error");
	}

	if (!email) {
		emailInput.classList.add("error");
	}

	if (!message) {
		messageInput.classList.add("error");
	}

	if (!(name && email && message)) {
		const erroredInputs = document.querySelectorAll(".contact__form__item.error");

		// Remove error when changing the inputs' value
		erroredInputs.forEach(input => {
			input.addEventListener("input", () => input.classList.remove("error"));
		});

		return;
	}

	contactSubmitButton.setAttribute("status", "sending");

	fetch("/api/v1/message", {
		method: "POST",
		body: JSON.stringify({
			name,
			email,
			subject,
			message
		})
	})
	.then(response => {
		if (response.status !== 200) {
			response.json().then(response => {	
				const error = response.message;
				console.error(error);

				contactSubmitButton.setAttribute("status", "error");
			});

			return;
		}

		// Clear input values
		contactForm.reset();

		contactSubmitButton.setAttribute("status", "sent");
	})
	.catch(error => {
		console.error(error);

		contactSubmitButton.setAttribute("status", "error");
	});
};

const scrollCallback = e => {
	/* DISABLE PAGE SCROLL IF WE ARE SCROLLING IN THE CONTACT */
	if (this.scrollX === document.body.clientWidth) {
		window.scrollTo({
			top: 0,
			behavior: "instant"
		});
		return;
	}

	const scrollPosition = this.scrollY;
	const windowHeight = window.innerHeight;	

	/* SET SHOWCASE'S ELEMENTS' POSITION */
	if (scrollPosition < (windowHeight * 1.5) + 100) {
		setScrollPositionY(heroBio, scrollPosition, 0.25);
		setScrollPositionY(heroDetailsButton, scrollPosition, 0.35)
		setScrollPositionY(heroContactButton, scrollPosition, 0.1);
		setScrollPositionY(heroJob, scrollPosition);
	}

	/* PORTFOLIO ITEM HEADERS */
	portfolioItems.forEach(portfolioItem => {
		const portfolioItemHeader = portfolioItem.querySelector(":scope .portfolio__item__header");
		const portfolioItemHeaderClientRect = portfolioItemHeader.getBoundingClientRect();
		const portfolioItemHeaderRelativeTop = portfolioItemHeaderClientRect.top;
		const portfolioItemHeaderHeight = portfolioItemHeader.offsetHeight;

		if (portfolioItemHeaderRelativeTop > windowHeight + 100 || portfolioItemHeaderRelativeTop < -portfolioItemHeaderHeight - 100) {
			return;
		}	

		const portfolioItemHeaderContainer = portfolioItemHeader.querySelector(":scope .portfolio__item__header__container");

		setScrollPositionX(portfolioItemHeaderContainer, portfolioItemHeaderRelativeTop + 100, 0.35);
	});
};

const loadCallback = () => {
	/* INIT DOM ELEMENTS */
	contactForm = document.querySelector(".contact__form");
	contactSubmitButton = document.querySelector(".contact__form__item--button");

	heroBio = document.querySelector(".hero__grid__item--bio");
	heroDetailsButton = document.querySelector(".hero__grid__item--details");
	heroContactButton = document.querySelector(".hero__grid__item--contact");
	heroJob = document.querySelector(".hero__job");
	heroBackground = document.querySelector(".hero__background");

	portfolioItems = document.querySelectorAll(".portfolio__item");

	/* PUT FILM LIST TO SHOWCASE BG */
	const shuffledFilmList = shuffleArray(filmsArray);

	shuffledFilmList.forEach(film => {
		const heroBackgroundFilmTitle = document.createElement("span");
		const text = document.createTextNode(film);

		heroBackgroundFilmTitle.classList.add("hero__background__film-title");
		heroBackgroundFilmTitle.appendChild(text);

		heroBackground.appendChild(heroBackgroundFilmTitle);
	});

	/* PUT PORTFOLIO TITLE TO PORTFOLIO HEADERS */
	portfolioItems.forEach(portfolioItem => {
		for (let i = 0; i < 10; i++) {
			const portfolioItemHeaderContainer = portfolioItem.querySelector(":scope .portfolio__item__header__container");

			const portfolioItemHeaderTitle = document.createElement("span");
			const title = document.createTextNode(portfolioItem.getAttribute("data-title"));

			portfolioItemHeaderTitle.classList.add("portfolio__item__header__title");
			portfolioItemHeaderTitle.appendChild(title);

			portfolioItemHeaderContainer.appendChild(portfolioItemHeaderTitle);
		}
	});

	/* WATCH IMAGE LOADING */
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
			document.body.classList.add("loaded");
		} else {
			console.erorr("THERE WAS SOMETHING WRONG");
		}
	});

	/* INIT EVENTS */
	window.addEventListener("scroll", scrollCallback);
	contactForm.addEventListener("submit", submitContactForm);
};

window.addEventListener("load", loadCallback);
