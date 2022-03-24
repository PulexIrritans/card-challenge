const cardsContainer = document.querySelector("[data-js=cards]");
const form = document.querySelector("[data-js=form]");
const filterForm = document.querySelector("[data-js=filter-form]")

let currentFilter = 'all';
let cards = [
  {
    question: "What is git?",
    answer: "Git is a tool to work with code.",
    isBookmarked: true,
    tags: ['git', 'shell']
  },
  {
    question: "What is html?",
    answer: "HTML is Hypertext Markup Language. Google it.",
    isBookmarked: false,
    tags: ['html', 'basic', 'web']
  },
  {
    question: "What is css?",
    answer: "Cascading style sheets. Google it.",
    isBookmarked: false,
    tags: ['css', 'basic', 'web']
  },
];

filterForm.addEventListener('change', () => {
    currentFilter = filterForm.elements['tag-filter'].value;
    renderCards();
  })

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const questionElement = form.elements.question;
  const answerElement = form.elements.answer;
  const tagsElement = form.elements.tags;

  const newCard = {
    question: questionElement.value,
    answer: answerElement.value,
    tags: tagsElement.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length),
  };

  cards = [newCard, ...cards];
  renderCards();

  form.reset();
  questionElement.focus();
});

function renderCards() {
  cardsContainer.innerHTML = "";

  cards
  .filter(card => card.tags.includes(currentFilter) || currentFilter === 'all')
  .forEach((card) => {
    const cardElement = document.createElement("li");
    cardElement.className = "card";
    cardElement.innerHTML = `
      <p>${card.question}</p>
      <button 
        class="card__bookmark${card.isBookmarked ? ' card__bookmark--active' : ''}" 
        data-js="bookmark">
      </button>
      <button data-js="card-button">Toggle answer</button>

      <p data-js="answer" hidden>${card.answer}</p>
      <ul role="list" class="card__tag-list">
        ${card.tags.map((tag) => `<li class="card__tag">${tag}</li>`).join("")}
      </ul>
    `;
    cardsContainer.append(cardElement);

    const answerButton = cardElement.querySelector("[data-js=card-button]");
    const answerElement = cardElement.querySelector("[data-js=answer]");
    const bookmarkElement = cardElement.querySelector("[data-js=bookmark]");
    
    answerButton.addEventListener("click", () => {
      answerElement.toggleAttribute("hidden");
    })
    bookmarkElement.addEventListener('click', () => {
        card.isBookmarked = !card.isBookmarked;
        bookmarkElement.classList.toggle('card__bookmark--active');
    });
})
}
