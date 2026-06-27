const form = document.getElementById('taskForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const task = {
        judul: document.getElementById('judul').value,
        mata_kuliah: document.getElementById('mata_kuliah').value,
        deadline: document.getElementById('deadline').value
    };

    await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });

    alert('Tugas berhasil ditambahkan');

    if (Notification.permission === 'granted') {
        new Notification('Task Baru Ditambahkan', {
        body: task.judul
        });
    }
    
    form.reset();

    getTasks();
});

async function getTasks() {

    const response = await fetch(
        'http://localhost:3000/api/tasks'
    );

    const data = await response.json();

    const taskList =
        document.getElementById('taskList');

    taskList.innerHTML = '';

    data.forEach(task => {

        taskList.innerHTML += `
            <div class="task-card">
                <h3>${task.judul}</h3>

                <p>
                    <strong>Mata Kuliah:</strong>
                    ${task.mata_kuliah}
                </p>

                <p>
                    <strong>Deadline:</strong>
                    ${task.deadline}
                </p>

                <p>
                <strong>Status:</strong>
                <span class="status ${
                    task.status === 'Selesai'
                    ? 'selesai'
                    : 'belum'
                }">
                ${task.status}
                </span>
                </p>

                ${
                    task.status === 'Belum Selesai'
                    ? `<button class="btn-selesai"
                        onclick="selesaikanTugas(${task.id})">
                        Tandai Selesai
                       </button>`
                    : '<p>✔ Sudah Selesai</p>'
                }

                <button class="btn-edit"
                    onclick="editTugas(
                        ${task.id},
                        '${task.judul}',
                        '${task.mata_kuliah}',
                        '${task.deadline}'
                    )">
                    ✏️ Edit
                </button>

                <button class="btn-hapus"
                    onclick="hapusTugas(${task.id})">
                    🗑️ Hapus
                </button>

            </div>
        `;
    });
}

async function selesaikanTugas(id) {

    await fetch(
        `http://localhost:3000/api/tasks/${id}`,
        {
            method: 'PUT'
        }
    );

    alert('Tugas telah diselesaikan');

    getTasks();
}

async function editTugas(
    id,
    judulLama,
    mkLama,
    deadlineLama
) {

    const judul = prompt(
        'Judul Baru',
        judulLama
    );

    const mata_kuliah = prompt(
        'Mata Kuliah Baru',
        mkLama
    );

    const deadline = prompt(
        'Deadline Baru (YYYY-MM-DD)',
        deadlineLama
    );

    await fetch(
        `http://localhost:3000/api/tasks/edit/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                judul,
                mata_kuliah,
                deadline
            })
        }
    );

    alert('Data berhasil diubah');

    getTasks();
}

async function hapusTugas(id) {

    const konfirmasi = confirm(
        'Yakin ingin menghapus tugas ini?'
    );

    if (!konfirmasi) return;

    await fetch(
        `http://localhost:3000/api/tasks/${id}`,
        {
            method: 'DELETE'
        }
    );

    alert('Tugas berhasil dihapus');

    getTasks();
}

getTasks();

if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('sw.js')
        .then(() => console.log('Service Worker berhasil didaftarkan'))
        .catch(err => console.log(err));
}

// Meminta izin notifikasi
if ('Notification' in window) {
    Notification.requestPermission();
}