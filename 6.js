function validar() {
    if(document.getElementById("nome").value == "") {
        alert("Você não informou seu nome!");
        return false;
    }
    
    if(document.getElementById("email").value == "") {
        alert("Você não informou seu email!");
        return false;
    }

    if(document.getElementById("titulo").value == "") {
        alert("Você não informou o título da sua mensagem!");
        return false;
    }
    
    if(document.getElementById("mensagem").value == "") {
        alert("Você não informou sua mensagem!");
        return false;
    }

    return true;
}

function enviar() {
    if(validar()) {
        var post = new XMLHttpRequest();  
        post.open("POST", "https://spakimail.azurewebsites.net/api/Mail", true);
        post.setRequestHeader("Content-Type", "application/json");
        post.send(
            JSON.stringify(
                {
                    "name": document.getElementById("nome").value,
                    "email": document.getElementById("email").value,
                    "phone": document.getElementById("telefone").value,
                    "title": document.getElementById("titulo").value,
                    "body": document.getElementById("mensagem").value,
                    "notify": document.getElementById("notificacoes").checked
                }
            )
        );

        alert("Mensagem enviada com sucesso");
    }
}

function listarUltimosContatos() {
    var requisicao = new XMLHttpRequest();
    requisicao.overrideMimeType("application/json");
    requisicao.open("GET", "https://spakimail.azurewebsites.net/api/Mail", true);

    requisicao.onload  = function() {
        var contatos = JSON.parse(requisicao.responseText);
        var novoHtml = "";

        console.log(contatos);

        for(var index in contatos) {
            var contato = contatos[index];
            novoHtml += "Nome: " + contato.name + "<br>";
            novoHtml += "E-mail: " + contato.email + "<br>";
            novoHtml += "Telefone: " + contato.phone + "<br>";
            novoHtml += "Título: " + contato.title + "<br>";
            novoHtml += "Mensagem: " + contato.body + "<br>";
            novoHtml += "Notificar: " + contato.notify + "<hr>";
        }

        document.getElementById("ultimosContatos").innerHTML = novoHtml; 
    };
    
    requisicao.send();
}