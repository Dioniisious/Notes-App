let n = 0 // <--- Количество имеющихся заметок

const mainEl = document.querySelector(".allnotes");
const adding = document.querySelector(".note-add");

createNote = (title, text) => {
    const noteEl = document.createElement("div");
    noteEl.classList.add("note");
    noteEl.innerHTML = `
        <div class="note-header">
            <div>
                <p class="title-of-note">${title}</p>
                <input id="title-of-note-input" class="hidden">
                <button class="note-edit"><i class="bi bi-pencil-square"></i></button>
                <button class="note-delete"><i class="bi bi-trash3"></i></button>
            </div>
            <div class="text-note">
                <p class="text-of-note">${text}</p>
                <textarea id="text-of-note-textarea" class="hidden"></textarea>
            </div>
        </div>
    `
    const editer = noteEl.querySelector(".note-edit");
    const deleter = noteEl.querySelector(".note-delete");
    const titleEl = noteEl.querySelector(".title-of-note");
    const textEl = noteEl.querySelector(".text-of-note");
    const titleInput = noteEl.querySelector("#title-of-note-input");
    const textInput = noteEl.querySelector("#text-of-note-textarea");

    editer.addEventListener("click", (e) => {
        titleEl.classList.toggle("hidden");
        textEl.classList.toggle("hidden");
        titleInput.classList.toggle("hidden");
        textInput.classList.toggle("hidden");
    })

    deleter.addEventListener("click", (e) => {
        noteEl.remove();
        n--;
        // console.log(n);
    })

    titleInput.addEventListener("input", (e) => {
        titleEl.innerText = e.target.value;
    })

    textInput.addEventListener("input", (e) => {
        textEl.innerText = e.target.value;
    })

    n++;
    // console.log(n);
    return noteEl;
}

const allnotes = document.querySelector(".allnotes");

// Объявление первой заметки по умолчанию и занесение ее сразу в локальное хранилище:
const element = createNote("Моя заметка", "Мой текст");
allnotes.appendChild(element);
first_note = {
    title : "Моя заметка",
    text : "Мой текст"
}
localStorage.setItem(0, JSON.stringify(first_note));
// console.log(localStorage.getItem("0"));

adding.addEventListener("click", (e) => {
    const element = createNote("Моя заметка", "Мой текст");
    allnotes.appendChild(element);
})

const saving = document.querySelector(".note-save");

saving.addEventListener("click", (e) => {
    localStorage.clear();
    let head, body, info_json, info_str;
    let i = 0;
    while (i < n) {
        head = document.getElementsByClassName("title-of-note")[i].textContent;
        body = document.getElementsByClassName("text-of-note")[i].textContent;
        info_json = {
            title: head,
            text: body
        }
        info_str = JSON.stringify(info_json);
        localStorage.setItem(i, info_str);
        console.log(localStorage.getItem(i));
        i++;
    }
})

const loading = document.querySelector(".note-load");

loading.addEventListener("click", (e) => {
    let info, parsed_info, titleRender, textRender;
    let i = 0;
    while (i < n) {
        info = localStorage.getItem(i);
        console.log(info);
        parsed_info = JSON.parse(info);
        console.log(parsed_info);
        titleRender = parsed_info.title;
        console.log(titleRender);
        textRender = parsed_info.text;
        console.log(textRender);
        const element = createNote(titleRender, textRender);
        allnotes.appendChild(element);
        i++;
    }
})