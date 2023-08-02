//Algoritimo

// [OK] 1. Pegar os valores
// [OK] 1.1 Valida os dados dos Inputs
// [OK]  2. Calcular a Idade
// [OK]        a. Com base no ano
// [OK]        b. Com mês (EXTRA)
// [OK]        c. Com dia (EXTRA)

// [OK]  3. Gerar a faixa etária
//     Resultado            Faixa
//     0 à 12                Criança
//     13 à 17                Adolescente
//     18 à 65               Adulto
//     Acima de 65         Idoso
   
// [OK]  4. Organizar o objeto pessoa para salvar na lista
// [OK]  5. Cadastrar a pessoa na lista
// [OK] 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
// [OK] 7. Renderizar o conteúdo da tabela com as pessoas cadastradas
// [OK] 8. Botão para limpar os registros;

function calcular(event){
    //Previni o recarregar da página
    event.preventDefault();
    console.log(receberValores())
    let usuario = receberValores();

    //Verificar se contem erros nos INPUTS
    if(verificarErro(usuario) == false){
        return
    }
    //Calcula a idade com dia mes e ano
    let idadeCalculada = calcularIdade(usuario.dia, usuario.mes, usuario.ano);
    //recebe a classificação 
    let classificacaoIdade = classificarIdade(idadeCalculada);
    console.log(classificacaoIdade)
    //Atualiza os dados do Objeto Usuario
    usuario = organizarDados(usuario, idadeCalculada, classificacaoIdade)
    //Cadastra o usuario na Storage
    cadastrarUsuario(usuario);
    //Recarrega a página no final
    window.location.reload();
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

function verificarErro(dadosUsuario_){

    //variável data Recebe a data de Hoje
    let data = new Date();
    //Se os campos forem nulos ou igual/menor que 0
    if ((dadosUsuario_.dia <= 0 || dadosUsuario_.mes <= 0 || dadosUsuario_.ano <= 0) || (dadosUsuario_.dia == "" || dadosUsuario_.mes == "" || dadosUsuario_.ano == "" || dadosUsuario_.nome == "" )){
        console.log('os Campos [Nome] [Dia]/[Mês]/[Ano] não pode ser menor que 0 ou em branco')
        return false
    } else{
        //Se o dia for maior que 31 -> mes maior que 13 e ano maior que o ano atual
        if(dadosUsuario_.dia > 31){
            alert('O dia de nascimento não pode ser maior que 31')
            return false
        }else if(dadosUsuario_.mes> 12){
            alert('O mês de nascimento não pode ser maior que 12')
            return false
        }else if(dadosUsuario_.ano> data.getFullYear()){
            alert('O ano de nascimento não pode ser maior que o ano atual')
            return false
        //Se o ano de nascimento É IGUAL a este ano E (o mes de niver MAIOR que este mes OU (mes de niver IGUAL a este mês E dia Nascimento MAIOR que dia de HOJE))   
        }else if( dadosUsuario_.ano == data.getFullYear() && ((dadosUsuario_.mes> data.getMonth()+1) || ( (dadosUsuario_.mes == data.getMonth()+1 && dadosUsuario_.dia > data.getDate()) )) ){
            alert('A data de nascimento não pode ser maior que hoje')
            return false
        }
    }
    return true;
}

//Passo 2
function calcularIdade(diaNascimento_, mesNascimento_, anoNascimento_){
    // let anoAtual = new Date().getFullYear();
    let dataCompletaAtual = new Date();
    let dataAtual = {
        dia: dataCompletaAtual.getDate(),
        mes: dataCompletaAtual.getMonth() + 1,
        ano: dataCompletaAtual.getFullYear()
    }

    // Idade = [Ano atual] - [Ano Nascimento] 
    let idade = dataAtual.ano - anoNascimento_;

    //se o mês atual for igual/menor que o de aniversário e o dia < que o de aniversario => Ano -1
    if((dataAtual.mes <= mesNascimento_)&&(dataAtual.dia < diaNascimento_)){
        idade --;
    }
    console.log(idade)
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
function organizarDados(dadosUsuario_, valorIdade_, classificacaoIdade_){
    //Organizando o objeto para salvar
    let dadosUsuarioAtualizado = {
        ...dadosUsuario_,
        idade: valorIdade_,
        faixa: classificacaoIdade_
    }

    return dadosUsuarioAtualizado;
}

// Passo 5
function cadastrarUsuario(dadosUsuario_){
    let listaUsuarios = [];
    // localStorage.setItem("User", "Cleber")

    //Se tem usuário cadastrado
    if(localStorage.getItem("usuariosCadastrados") != null){
        //Guarda as informações na Array e converte string para Objeto
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }
    //Se não houver usuário cadastrar o atual
    listaUsuarios.push(dadosUsuario_);
    //Salva a lista de usuarios e converte de Objeto para String
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios));
}

//Passo 6
function carregarUsuarios(){
    let listaCarregada = [];
    if(localStorage.getItem("usuariosCadastrados") != null){
        //Guarda as informações na Array e converte string para Objeto
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    if(listaCarregada.length == 0){
        //se a lista estiver vazia mostre uma msg
        let tabela = document.getElementById("corpo-tabela");

        tabela.innerHTML = `<tr class="linha-mensagem">
            <td colspan="6">Nenhum usuário cadastrado 😢</td>
        </tr>`
    } else{
        //Mostrar conteúdo da tabela
        montarTabela(listaCarregada);
    }

    console.log (listaCarregada);
}
window.addEventListener("DOMContentLoaded", () => carregarUsuarios());

function montarTabela(listaUsuarios_){
    let tabela = document.getElementById("corpo-tabela");

    let template = "";

    listaUsuarios_.forEach(usuario => {
        template += `<tr>
            <td data-cell="nome">${usuario.nome}</td>
            <td data-cell="data de nascimento">${usuario.dia}/${usuario.mes}/${usuario.ano}</td>
            <td data-cell="idade">${usuario.idade} anos</td>
             <td data-cell="faixa etária">${usuario.faixa}</td>
        </tr>`
        
    });
    tabela.innerHTML = template;
}


function deletarRegistros(){
    localStorage.removeItem("usuariosCadastrados");
    window.location.reload();
}