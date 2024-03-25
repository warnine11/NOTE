let notesData = [
  {
    id: 'notes-jT-jjsyz61J8XKiI',
    title: 'Welcome to Notes, Dimas!',
    body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
    createdAt: '2022-07-28T10:03:12.594Z',
    archived: false,
  },
  {
    id: 'notes-aB-cdefg12345',
    title: 'Meeting Agenda',
    body: 'Discuss project updates and assign tasks for the upcoming week.',
    createdAt: '2022-08-05T15:30:00.000Z',
    archived: false,
  },
  {
    id: 'notes-XyZ-789012345',
    title: 'Shopping List',
    body: 'Milk, eggs, bread, fruits, and vegetables.',
    createdAt: '2022-08-10T08:45:23.120Z',
    archived: false,
  },
  {
    id: 'notes-1a-2b3c4d5e6f',
    title: 'Personal Goals',
    body: 'Read two books per month, exercise three times a week, learn a new language.',
    createdAt: '2022-08-15T18:12:55.789Z',
    archived: false,
  },
  {
    id: 'notes-LMN-456789',
    title: 'Recipe: Spaghetti Bolognese',
    body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
    createdAt: '2022-08-20T12:30:40.200Z',
    archived: false,
  },
  {
    id: 'notes-QwErTyUiOp',
    title: 'Workout Routine',
    body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
    createdAt: '2022-08-25T09:15:17.890Z',
    archived: false,
  },
  {
    id: 'notes-abcdef-987654',
    title: 'Book Recommendations',
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: '2022-09-01T14:20:05.321Z',
    archived: false,
  },
  {
    id: 'notes-zyxwv-54321',
    title: 'Daily Reflections',
    body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
    createdAt: '2022-09-07T20:40:30.150Z',
    archived: false,
  },
  {
    id: 'notes-poiuyt-987654',
    title: 'Travel Bucket List',
    body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
    createdAt: '2022-09-15T11:55:44.678Z',
    archived: false,
  },
  {
    id: 'notes-asdfgh-123456',
    title: 'Coding Projects',
    body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
    createdAt: '2022-09-20T17:10:12.987Z',
    archived: false,
  },
  {
    id: 'notes-5678-abcd-efgh',
    title: 'Project Deadline',
    body: 'Complete project tasks by the deadline on October 1st.',
    createdAt: '2022-09-28T14:00:00.000Z',
    archived: false,
  },
  {
    id: 'notes-9876-wxyz-1234',
    title: 'Health Checkup',
    body: 'Schedule a routine health checkup with the doctor.',
    createdAt: '2022-10-05T09:30:45.600Z',
    archived: false,
  },
  {
    id: 'notes-qwerty-8765-4321',
    title: 'Financial Goals',
    body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
    createdAt: '2022-10-12T12:15:30.890Z',
    archived: false,
  },
  {
    id: 'notes-98765-54321-12345',
    title: 'Holiday Plans',
    body: 'Research and plan for the upcoming holiday destination.',
    createdAt: '2022-10-20T16:45:00.000Z',
    archived: false,
  },
  {
    id: 'notes-1234-abcd-5678',
    title: 'Language Learning',
    body: 'Practice Spanish vocabulary for 30 minutes every day.',
    createdAt: '2022-10-28T08:00:20.120Z',
    archived: false,
  },
];

console.log(notesData);

document.addEventListener('DOMContentLoaded', function() {
  const noteForm = document.getElementById('note-form');
  const notesList = document.getElementById('notes-list');
  const searchInput = document.getElementById('search');

  // Function untuk menampilkan pesan kesalahan
  function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerText = message;
  }

  // Function untuk menampilkan pesan kesalahan
  function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
  }

  // Function untuk memeriksa apakah input sudah terisi atau belum
  function checkRequired(inputArr) {
    let isValid = true;
    inputArr.forEach(function(input) {
      if (input.value.trim() === '') {
        showError(input, `${getFieldName(input)} tidak boleh kosong`);
        isValid = false;
      } else {
        showSuccess(input);
      }
    });

    return isValid;
  }

  // Function untuk mendapatkan nama field
  function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

  // Event listener untuk submit form
  noteForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const titleInput = document.getElementById('title');
    const bodyInput = document.getElementById('body');

    // Validasi form sebelum submit
    if (!checkRequired([titleInput, bodyInput])) {
      return;
    }

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    // Tambahkan catatan ke daftar
    const newNote = { id: 'notes-' + Date.now(), title, body, createdAt: new Date().toISOString(), archived: false };
    addNoteToList(newNote);
    notesData.push(newNote); // Menambahkan catatan baru ke dalam data catatan
    titleInput.value = ''; // Clear input fields after adding note
    bodyInput.value = '';
  });

  // Event listener untuk input judul dan isi catatan
  noteForm.addEventListener('input', function(event) {
    const input = event.target;

    // Validasi setiap input saat menginput
    if (input.id === 'title' || input.id === 'body') {
      checkRequired([input]);
    }
  });

  // Function untuk menambahkan catatan ke dalam daftar
  function addNoteToList(note) {
    const noteElement = createNoteElement(note);
    notesList.appendChild(noteElement);
  }

  // Function untuk membuat elemen catatan
  function createNoteElement(note) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');

    const titleElement = document.createElement('h2');
    titleElement.textContent = note.title;

    const createdAtElement = document.createElement('p');
    const createdAtDate = new Date(note.createdAt); // Parse createdAt string menjadi objek Date
    const createdAtDateString = createdAtDate.toLocaleString(); // Format objek Date menjadi string yang bisa dibaca
    createdAtElement.textContent = `Created At: ${createdAtDateString}`; // Tampilkan createdAt dengan format yang sesuai

    const bodyElement = document.createElement('p');
    bodyElement.textContent = note.body;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        noteElement.remove();
        // Hapus catatan dari data catatan
        notesData = notesData.filter(item => item.id !== note.id);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        const newTitle = prompt('Enter new title:', note.title);
        const newBody = prompt('Enter new body:', note.body);

        if (newTitle !== null && newBody !== null) {
            // Perbarui tampilan catatan
            titleElement.textContent = newTitle;
            bodyElement.textContent = newBody;
            // Perbarui data catatan
            const index = notesData.findIndex(item => item.id === note.id);
            if (index !== -1) {
                notesData[index].title = newTitle;
                notesData[index].body = newBody;
            }
        }
    });

    noteElement.appendChild(titleElement);
    noteElement.appendChild(createdAtElement); // Tambahkan elemen createdAt ke dalam catatan
    noteElement.appendChild(bodyElement);
    noteElement.appendChild(deleteButton);
    noteElement.appendChild(editButton);

    return noteElement;
}


  // Display existing notes
  function displayNotes(notes) {
    notesList.innerHTML = ''; // Clear existing notes
    notes.forEach(note => {
      addNoteToList(note);
    });
  }

  function performSearch(searchTerm) {
    const filteredNotes = notesData.filter(note => note.title.toLowerCase().includes(searchTerm) || note.body.toLowerCase().includes(searchTerm));
    displayNotes(filteredNotes);
  }

  // Penyortiran berdasarkan judul
  notesData.sort((a, b) => a.title.localeCompare(b.title));
  displayNotes(notesData);
}); 
class NoteHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <h1>${this.getAttribute('title')}</h1>
    `;
  }
}
customElements.define('note-header', NoteHeader);

class NoteElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <div class="note">
        <h2><slot name="title"></slot></h2>
        <p><slot name="body"></slot></p>
        <slot name="delete-button"></slot>
        <slot name="edit-button"></slot>
      </div>
    `;
  }
}
customElements.define('note-element', NoteElement);

class DeleteButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = 'Delete';
    this.addEventListener('click', () => {
      const noteElement = this.closest('.note');
      if (noteElement) {
        noteElement.remove();
      }
    });
  }
}
customElements.define('delete-button', DeleteButton);

class EditButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = 'Edit';
    this.addEventListener('click', () => {
      const newTitle = prompt('Enter new title:', this.parentElement.querySelector('h2').textContent);
      const newBody = prompt('Enter new body:', this.parentElement.querySelector('p').textContent);

      if (newTitle !== null && newBody !== null) {
        this.parentElement.querySelector('h2').textContent = newTitle;
        this.parentElement.querySelector('p').textContent = newBody;
      }
    });
  }
}
customElements.define('edit-button', EditButton);
