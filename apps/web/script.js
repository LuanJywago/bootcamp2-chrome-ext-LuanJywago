// Espera o HTML carregar antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- Elementos do DOM ---
    const cepInput = document.getElementById('cep-input');
    const searchButton = document.getElementById('search-btn');
    const resultDiv = document.getElementById('result');
    const apiStatusDiv = document.getElementById('api-status');

    // --- Lógica 1: API Pública (ViaCEP) ---
    searchButton.addEventListener('click', () => {
        const cep = cepInput.value.replace(/\D/g, ''); // Limpa o CEP

        if (cep.length !== 8) {
            resultDiv.innerHTML = '<p style="color: red;">CEP inválido. Digite 8 números.</p>';
            return;
        }

        resultDiv.innerHTML = '<p>Buscando...</p>';
        
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    resultDiv.innerHTML = '<p style="color: red;">CEP não encontrado.</p>';
                } else {
                    resultDiv.innerHTML = `
                        <strong>Endereço:</strong> ${data.logradouro}, ${data.bairro}<br>
                        <strong>Cidade:</strong> ${data.localidade} - ${data.uf}<br>
                        <strong>CEP:</strong> ${data.cep}
                    `;
                }
            })
            .catch(error => {
                resultDiv.innerHTML = '<p style="color: red;">Falha ao buscar CEP. Verifique a conexão.</p>';
                console.error('Erro ViaCEP:', error);
            });
    });

    // --- Lógica 2: API Interna (Backend 'apps/api') ---
    
    // O Docker Compose vai expor nossa API na porta 3000
    const internalApiUrl = 'http://localhost:3000/api/hello'; 

    fetch(internalApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Rede não respondeu OK');
            }
            return response.json();
        })
        .then(data => {
            if (data.ok) {
                // Sucesso!
                apiStatusDiv.innerHTML = `<strong>Status:</strong> ${data.msg}`;
                apiStatusDiv.style.color = 'green';
            } else {
                throw new Error('API respondeu com erro');
            }
        })
        .catch(error => {
            // Falha
            apiStatusDiv.innerHTML = '<strong>Status:</strong> API Interna Offline';
            apiStatusDiv.style.color = 'red';
            console.error('Erro API Interna:', error);
        });

});