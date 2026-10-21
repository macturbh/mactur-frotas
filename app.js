const SUPABASE_URL = 'https://lniuhtujzobhfpvsbzic.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_3tZVUy-tjD0crDOyBp2p7A_JYFml0Bw';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Carregar os veículos do banco para dentro do <select>
async function carregarVeiculos() {
    const { data, error } = await supabase.from('veiculos').select('id, prefixo, placa').order('prefixo', { ascending: true });
    
    const select = document.getElementById('veiculo_id');
    if (error) {
        select.innerHTML = '<option value="">Erro ao carregar veículos</option>';
        console.error(error);
        return;
    }

    select.innerHTML = '<option value="">Selecione o Veículo</option>';
    data.forEach(v => {
        select.innerHTML += `<option value="${v.id}">Prefixo ${v.prefixo} - Placa ${v.placa}</option>`;
    });
}

// Enviar dados preenchidos para a tabela "abastecimentos"
document.getElementById('formAbastecimento').addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        veiculo_id: parseInt(document.getElementById('veiculo_id').value),
        km_atual: parseFloat(document.getElementById('km_atual').value),
        litros: parseFloat(document.getElementById('litros').value),
        status: 'concluido'
    };

    const { error } = await supabase.from('abastecimentos').insert([dados]);

    if (error) {
        alert('Erro ao salvar no banco: ' + error.message);
    } else {
        alert('Abastecimento salvo com sucesso!');
        document.getElementById('formAbastecimento').reset();
        carregarVeiculos();
    }
});

carregarVeiculos();
