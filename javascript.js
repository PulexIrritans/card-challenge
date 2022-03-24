// Global constants and variables

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

const filters = [
    'git', 'shell', 'html', 'basic', 'web', 'css'
]


// Event Listener for Filter

filterForm.addEventListener('change', () => {
    currentFilter = filterForm.elements['tag-filter'].value;
    renderCards();
  })

// Event Listener for question form submit (calls function render cards)  

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

  appendFilter(newCard);
});

// Function to append filter

function appendFilter(card) {
    const fieldsetElement = document.querySelector('.fieldset')


    const newfilters = [];
    card.tags.forEach((tag) => {
        if (!filters.includes(tag)) newfilters.push(tag)
    })

    newfilters.forEach((newfilter) => {
    const newLabelElement = document.createElement('label')
    const newInputElement = document.createElement('input')
    
    newLabelElement.classList.add('tag-label')
    newLabelElement.textContent = newfilter

    newInputElement.classList.add('tag-input')
    newInputElement.setAttribute("type", "radio")
    newInputElement.setAttribute("name", "tag-filter")
    newInputElement.setAttribute("value", newfilter)

    fieldsetElement.append(newInputElement)
    fieldsetElement.append(newLabelElement)

    })
}

// Function that creates and adds the new question card to DOM

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
