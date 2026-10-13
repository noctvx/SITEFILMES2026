const catalog = {
	trending: [
		{ title: "Duna: Parte Dois", meta: "Filme · 2024", poster: "1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg" },
		{ title: "Oppenheimer", meta: "Filme · 2023", poster: "ptpr0kGAckfQkJeJIt8st5dglvd.jpg" },
		{ title: "Godzilla e Kong: O Novo Império", meta: "Filme · 2024", poster: "z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg" },
		{ title: "Homem-Aranha: Através do Aranhaverso", meta: "Filme · 2023", poster: "8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" },
		{ title: "Batman", meta: "Filme · 2022", poster: "74xTEgt7R36Fpooo50r9T25onhq.jpg" },
		{ title: "Divertida Mente 2", meta: "Filme · 2024", poster: "vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg" },
		{ title: "Deadpool & Wolverine", meta: "Filme · 2024", poster: "8cdWjvZQUExUUTzyp4t6EDMubfO.jpg" },
		{ title: "Barbie", meta: "Filme · 2023", poster: "iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg" },
		{ title: "Kung Fu Panda 4", meta: "Filme · 2024", poster: "kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg" }
	],
	releases: [
		{ title: "Godzilla e Kong: O Novo Império", meta: "Filme · 2024", poster: "z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg" },
		{ title: "Top Gun: Maverick", meta: "Filme · 2022", poster: "62HCnUTziyWcpDaBO2i1DX17ljH.jpg" },
		{ title: "O Gato de Botas 2", meta: "Filme · 2022", poster: "kuf6dutpsT0vSVehic3EZIqkOBt.jpg" },
		{ title: "Duna: Parte Dois", meta: "Filme · 2024", poster: "1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg" },
		{ title: "Homem-Aranha: Através do Aranhaverso", meta: "Filme · 2023", poster: "8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" },
		{ title: "Oppenheimer", meta: "Filme · 2023", poster: "ptpr0kGAckfQkJeJIt8st5dglvd.jpg" },
		{ title: "Deadpool & Wolverine", meta: "Filme · 2024", poster: "8cdWjvZQUExUUTzyp4t6EDMubfO.jpg" },
		{ title: "Barbie", meta: "Filme · 2023", poster: "iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg" },
		{ title: "Kung Fu Panda 4", meta: "Filme · 2024", poster: "kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg" }
	],
	series: [
		{ title: "The Last of Us", meta: "Série · 2023", poster: "uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg" },
		{ title: "Stranger Things", meta: "Série · 2016", poster: "49WJfeN0moxb9IPfGn8AIqMGskD.jpg" },
		{ title: "Wandinha", meta: "Série · 2022", poster: "9PFonBhy4cQy7Jz20NpMygczOkv.jpg" },
		{ title: "The Last of Us", meta: "Série · 2023", poster: "uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg" },
		{ title: "The Witcher", meta: "Série · 2019", poster: "cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg" },
		{ title: "Breaking Bad", meta: "Série · 2008", poster: "ggFHVNu6YYI5L9pCfOacjizRGt.jpg" },
		{ title: "The Mandalorian", meta: "Série · 2019", poster: "sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg" },
		{ title: "A Casa do Dragão", meta: "Série · 2022", poster: "z2yahl2uefxDCl0nogcRBstwruJ.jpg" },
		{ title: "Arcane", meta: "Série · 2021", poster: "fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg" }
	]
};

function makeCards(id) {
	const container = document.getElementById(id);
	container.innerHTML = catalog[id].map(({ title, meta, poster }) => `
		<article class="card">
			<img class="poster" src="https://image.tmdb.org/t/p/w500/${poster}" alt="Pôster de ${title}" loading="lazy">
			<div class="card-title">${title}</div>
			<div class="card-meta">${meta}</div>
		</article>
	`).join("") + '<p class="empty-state" hidden>Nenhum título encontrado.</p>';
}

Object.keys(catalog).forEach(makeCards);

const searchForm = document.querySelector(".search");
const searchInput = document.getElementById("catalog-search");

function filterCatalog() {
	const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");

	Object.keys(catalog).forEach((id) => {
		const container = document.getElementById(id);
		const cards = container.querySelectorAll(".card");
		let visibleCards = 0;

		cards.forEach((card) => {
			const matches = card.textContent.toLocaleLowerCase("pt-BR").includes(query);
			card.hidden = !matches;
			visibleCards += Number(matches);
		});

		container.querySelector(".empty-state").hidden = visibleCards > 0;
	});
}

searchInput.addEventListener("input", filterCatalog);
searchForm.addEventListener("submit", (event) => {
	event.preventDefault();
	searchInput.focus();
});

const profileButton = document.querySelector(".avatar");
const profileMenu = document.getElementById("profile-menu");

function setProfileMenuOpen(isOpen) {
	profileButton.setAttribute("aria-expanded", String(isOpen));
	profileMenu.hidden = !isOpen;
}

profileButton.addEventListener("click", () => {
	setProfileMenuOpen(profileMenu.hidden);
});

document.addEventListener("click", (event) => {
	if (!profileButton.contains(event.target) && !profileMenu.contains(event.target)) {
		setProfileMenuOpen(false);
	}
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		setProfileMenuOpen(false);
	}
});

const recentFilms = [...new Map(
	catalog.releases.map((film) => [film.title, film])
).values()].sort((first, second) => {
	const firstYear = Number(first.meta.match(/\d{4}/)?.[0] || 0);
	const secondYear = Number(second.meta.match(/\d{4}/)?.[0] || 0);
	return secondYear - firstYear;
});

const heroImage = document.querySelector(".hero-image");
const heroTitle = document.querySelector(".hero h1");
const heroMeta = document.querySelector(".hero .meta");
const heroDescription = document.querySelector(".hero-content > p");
const heroArrowButtons = document.querySelectorAll(".hero-arrows button");
const watchButton = document.querySelector(".hero-buttons .watch");
let currentRecentFilm = -1;

function replayHeroAnimation() {
	[heroImage, ...document.querySelectorAll(".hero-content > *")].forEach((el) => {
		el.style.animation = "none";
		void el.offsetWidth;
		el.style.animation = "";
	});
}

function showRecentFilm(index) {
	currentRecentFilm = (index + recentFilms.length) % recentFilms.length;
	const film = recentFilms[currentRecentFilm];

	heroImage.src = `https://image.tmdb.org/t/p/original/${film.poster}`;
	heroImage.alt = `Destaque: ${film.title}`;
	heroTitle.textContent = film.title;
	heroMeta.textContent = film.meta;
	watchButton.hidden = film.title !== "Vingadores: Ultimato";
	replayHeroAnimation();
	heroDescription.textContent = `${film.title} está entre os filmes recentes do Cineflix. Encontre este título e outros no catálogo.`;
}

heroArrowButtons[0].addEventListener("click", () => {
	showRecentFilm(currentRecentFilm - 1);
});

heroArrowButtons[1].addEventListener("click", () => {
	showRecentFilm(currentRecentFilm + 1);
});

watchButton.addEventListener("click", () => {
	window.location.href = "assistir.html";
});

const ICON_PLUS = "img/plus.png";
const ICON_CHECK = "img/check.png";
const listButton = document.querySelector(".hero-buttons .list");
listButton.setAttribute("aria-pressed", "false");
listButton.addEventListener("click", () => {
	const isAdded = listButton.getAttribute("aria-pressed") !== "true";
	listButton.setAttribute("aria-pressed", String(isAdded));
	listButton.querySelector("span").textContent = isAdded ? "Na Minha Lista" : "Minha Lista";
	listButton.querySelector("img").src = isAdded ? ICON_CHECK : ICON_PLUS;
	listButton.classList.remove("pop");
	void listButton.offsetWidth;
	listButton.classList.add("pop");
});

/* ===== Animações ===== */
const topbar = document.querySelector(".topbar");
const heroContent = document.querySelector(".hero-content");

// Cards e títulos entram quando aparecem na tela
const revealObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) return;
		entry.target.classList.add("in");
		revealObserver.unobserve(entry.target);
	});
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".row").forEach((row) => {
	row.querySelectorAll(".row-title, .card").forEach((el, i) => {
		el.classList.add("reveal");
		el.style.setProperty("--d", `${i * 70}ms`);
		revealObserver.observe(el);
	});

	const track = row.querySelector(".cards");
	const [previousButton, nextButton] = row.querySelectorAll(".carousel-controls button");
	let isMoving = false;

	function moveCards(direction) {
		const visibleCards = Array.from(track.querySelectorAll(".card")).filter((card) => !card.hidden);
		if (visibleCards.length < 2 || isMoving) return;

		isMoving = true;
		const firstVisible = visibleCards[0];
		const lastVisible = visibleCards[visibleCards.length - 1];
		const step = firstVisible.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
		const finishMove = (event) => {
			if (event && event.target !== track) return;
			track.removeEventListener("transitionend", finishMove);
			window.clearTimeout(moveTimeout);
			if (direction > 0) {
				track.append(firstVisible);
				track.style.transition = "none";
				track.style.transform = "translateX(0)";
				void track.offsetWidth;
				track.style.transition = "";
			}
			isMoving = false;
		};
		const moveTimeout = window.setTimeout(() => finishMove(), 450);
		track.addEventListener("transitionend", finishMove);

		if (direction > 0) {
			track.style.transform = `translateX(-${step}px)`;
			return;
		}

		track.prepend(lastVisible);
		track.style.transition = "none";
		track.style.transform = `translateX(-${step}px)`;
		void track.offsetWidth;
		track.style.transition = "";
		track.style.transform = "translateX(0)";
	}

	previousButton.addEventListener("click", () => moveCards(-1));
	nextButton.addEventListener("click", () => moveCards(1));
});

// Barra fixa com blur + parallax suave no hero
let ticking = false;
function onScroll() {
	const y = window.scrollY;
	topbar.classList.toggle("scrolled", y > 24);
	if (y < 900) {
		heroContent.style.transform = `translateY(${y * 0.18}px)`;
		heroContent.style.opacity = String(Math.max(0, 1 - y / 520));
	}
	ticking = false;
}
window.addEventListener("scroll", () => {
	if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
}, { passive: true });
onScroll();