document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('note-input');
    const saveBtn = document.getElementById('save-btn');
    const statusEl = document.getElementById('status');

    // Carrega a nota salva quando o popup é aberto
    chrome.storage.local.get(['quickNote'], (result) => {
        if (result.quickNote) {
            noteInput.value = result.quickNote;
        }
    });

    // Salva a nota quando o botão é clicado
    saveBtn.addEventListener('click', () => {
        const note = noteInput.value;
        chrome.storage.local.set({ quickNote: note }, () => {
            statusEl.textContent = 'Nota salva!';
            setTimeout(() => {
                statusEl.textContent = '';
            }, 1500);
        });
    });
});