// Manage Spinner function
const manageSpinner = (status) => {
    const spinner = document.getElementById('spinner-container');
    const wordContainer = document.getElementById('word-container');

    if(status){
        spinner.classList.remove("hidden");
        wordContainer.classList.add("hidden");
    } 
    else{
        spinner.classList.add("hidden");
        wordContainer.classList.remove("hidden");
    }
};

// Lessons Data load function
const loadLessonData = async () => {
    const urls = 'https://openapi.programming-hero.com/api/levels/all';

    // response
    const res = await fetch(urls);
    const data = await res.json();
    displayLesson(data.data);
    
}

// Active remove arrow function
const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    // console.log(lessonButtons);
    lessonButtons.forEach(btn => {
        btn.classList.remove('active');
    });
}

// for lesson btn click
const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Remove Active class
            removeActive()
            // Display words
            displayLevelWord(data.data);
            // Dynamic get btn id
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            // active class added
            clickBtn.classList.add("active")
            manageSpinner(false);
           
        })
}

// load word details
// my_modal_5.showModal()
const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)
}


// load word details
// my_modal_5.showModal()
const displayWordDetails = (word) => {
    console.log(word)
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
        <div>
            <h2 class="text-2xl font-bold">
                ${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})
            </h2>
        </div>
        <div>
            <h2 class="font-bold">
                Meaning
            </h2>
            <p>${word.meaning}</p>
        </div>
        <div>
            <h2 class="font-bold">
                Example
            </h2>
        <p>${word.sentence}</p>
        </div>
        <div>
            <h2 class="font-bold">
                সমার্থক শব্দ গুলো
            </h2>
            ${word.synonyms.map(item => `
                <span class="btn btn-md mr-1 mb-1">
                    ${item}
                </span>
            `).join('')}
        </div>
    `;
    document.getElementById('my_modal_5').showModal();
}


// after btn click disply data
const displayLevelWord = (words) => {
    // console.log(words.data)
    // 1. get the word container
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    // WordCard Data if 0
    if(words.length == 0){
        // const wordCard = document.createElement('div');
        wordContainer.innerHTML = `
            <div class="col-span-full flex flex-col justify-center text-center space-y-5 w-full py-10">

                <img 
                    src="./assets/alert-error.png"
                    class="mx-auto w-[120px] md:w-[200px] opacity-70"
                >

                <p class="font-bangla text-[#79716B] text-lg">
                    এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
                </p>

                <h2 class="font-bangla text-[#292524] text-3xl font-bold">
                    নেক্সট Lesson এ যান
                </h2>

            </div>
        `;
        // append
        return;
    }
    else{
        // For show 6 data at the times
        // const limitedData = words.slice(0, );

        words.forEach(words => {
            const wordCard = document.createElement('div');
            wordCard.innerHTML = `
                <div class="p-6 md:p-10 lg:p-12 bg-white rounded-xl w-full text-center space-y-4 md:space-y-6 shadow-md border border-gray-100 transition-all hover:shadow-lg">
        
                    <h3 class="text-2xl md:text-3xl lg:text-3xl font-extrabold text-[#1a1a1a]">
                        ${words.word ? words.word : "শব্দ পাওয়া যায়নি"}
                    </h3>
                    
                    <p class="text-lg md:text-xl text-gray-600">
                        ${words.meaning ? words.meaning : "অর্থ  পাওয়া যায়নি"}
                    </p>
                    
                    <h3 class="font-bangla text-2xl md:text-3xl font-bold text-[#18181B]">
                        ${words.pronunciation ? words.pronunciation : "Pronunciation পাওয়া যায়নি"}
                    </h3>
                    
                    <div class="flex justify-between gap-6 mt-4">
                        <button onclick="loadWordDetails(${words.id})" class="btn btn-ghost bg-[#e8f4ff] hover:bg-[#d0e9ff] p-3 min-h-0 h-auto rounded-md transition-colors" title="Information">
                            <i class="fa-solid fa-circle-info text-xl"></i>
                        </button>
                        
                        <button class="btn btn-ghost bg-[#e8f4ff] hover:bg-[#d0e9ff] p-3 min-h-0 h-auto rounded-md transition-colors" title="Listen">
                            <i class="fa-solid fa-volume-high text-xl"></i>
                        </button>
                    </div>
                </div>
            `;

         // append
            wordContainer.appendChild(wordCard)
        });
        
    }
       
}

const displayLesson = (lesson) => {
    // 1. get the content & Empty 
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    // 2. get into every lesson
    lesson.forEach((lesson) => {
        // 3. create element 
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
            <button 
            id="lesson-btn-${lesson.level_no}" 
            onclick="loadLevelWord(${lesson.level_no})" 
            class="btn btn-outline btn-primary lesson-btn">
                <i  class="fa-solid fa-book-open"></i>
                 Lesson - ${lesson.level_no}
            </button>
        `
        // 4. append into container 
        levelContainer.appendChild(btnDiv)
    });
        
        
    
}

loadLessonData()

