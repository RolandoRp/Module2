const [boton] = $('#boton');
const [search] = $('#search');
const [deleteA] = $('#delete');
const url = 'http://localhost:5000/amigos';


const listaAmigos = (response) => {
    const [lista] = $('#lista');
    lista.innerText = '';

    response.forEach((friend) => {
        const newLi = document.createElement('li');
        newLi.innerText = friend.name;
        lista.appendChild(newLi);
    });
}

const mostrarAmigos = () => {
    $('#lista').empty();
    $.get(url, listaAmigos)
}

const buscarAmigo = () => {
    const [input] = $('input');
    const id = input.value;
    input.value = '';

    $.get(`${url}/${id}`, (response) => {
        const [amigo] = $('#amigo');
        amigo.innerText = response.name;
    })
}

const borrarAmigo = () => {
    const [inputDelete] = $('#inputDelete')
    const id = inputDelete.value;
    inputDelete.value = '';

    $.ajax({
        type: 'DELETE',
        url: `${url}/${id}`,
        success: (response) => {
          listaAmigos(response)

            const [success] = $('#success');
            success.innerText = `Tu amigo de id: ${id}  ha sido borrado con exito`
        }
    })

}

boton.addEventListener('click', mostrarAmigos);
search.addEventListener('click', buscarAmigo);
deleteA.addEventListener('click', borrarAmigo);