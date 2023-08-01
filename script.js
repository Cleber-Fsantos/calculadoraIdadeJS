//Algoritimo

// 1. Pegar os valores
// 2. Calcular a Idade
//       a. Com base no ano
//       b. Com mês (EXTRA)
//       c. Com dia (EXTRA)

// 3. Gerar a faixa etária
   
//     Resultado            Faixa
//     0 à 12                Criança
//     13 à 17                Adolescente
//     18 à 65               Adulto
//     Acima de 65         Idoso
   

// 4. Organizar o objeto pessoa para salvar na lista
// 5. Cadastrar a pessoa na lista
// 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
// 7. Renderizar o conteúdo da tabela com as pessoas cadastradas
// 8. Botão para limpar os registros;

function calcular(event){
    //Previni o recarregar da página
    event.preventDefault();
    console.log(receberValores())
    let usuario = receberValores();

    //Verificar se contem erros no INPUTS
    if(verificarErro(usuario.dia, usuario.mes, usuario.ano, usuario.nome) == false){
        return
    }
    
    let idadeCalculada = calcularIdade(usuario.ano);
    let classificacaoIdade = classificarIdade(idadeCalculada);
    
    console.log(classificacaoIdade)
}



//Passo 1
function receberValores(){
    let nomeRecebido = document.getElementById("nome").value.trim();

    let diaNascimento = document.getElementById("dia-nascimento").value;
    let mesNascimento = document.getElementById("mes-nascimento").value;
    let anoNascimento = document.getElementById("ano-nascimento").value;

    
    let dadosUsuario = {
        nome: nomeRecebido,
        dia: diaNascimento,
        mes: mesNascimento,
        ano: anoNascimento
    };

    return dadosUsuario;
}

//Passo 1.1 {VERIFICAR ERROS DE INPUTS}

function verificarErro(dia_, mes_, ano_, nome_){
    if ((dia_ <= 0 || mes_ <= 0 || ano_ <= 0) || (dia_ == "" || mes_ == "" || ano_ == "" || nome_ == "" )){
        console.log('Dia/Mês/Ano não pode ser menor que 0 ou em branco')
        return false
    } else{
        if(dia_ > 31){
            alert('O dia de nascimento não pode ser maior que 31')
            return false
        }else if(mes_ > 12){
            alert('O mês de nascimento não pode ser maior que 12')
            return false
        }else if(ano_ > new Date().getFullYear()){
            alert('O ano de nascimento não pode ser maior que o ano atual')
            return false
        }
    }
    return true;
}

//Passo 2
function calcularIdade(anoNascimento_){
    let anoAtual = new Date().getFullYear();

    // Idade = [Ano atual] - [Ano Nascimento] 
    let idade = anoAtual - anoNascimento_;
    console.log(anoAtual, anoNascimento_, idade)
    return idade;
}

//pASSO 3

function classificarIdade(idade_){
    if (idade_ >= 0 && idade_ <= 12){
        return "Criança";
    } else if(idade_ > 12 && idade_ <= 17){
        return "Adolescente";
    } else if(idade_ > 17 && idade_ < 65){
        return "Adulto";
    }else {
        return "Idoso";
    }
}

// Passo 4



