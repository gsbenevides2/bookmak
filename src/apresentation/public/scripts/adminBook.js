var itemId;
var itemType;
var dispatchAction;
function openConfirmationModal(id, type, action) {
    itemId = id;
    itemType = type;
    dispatchAction = action;
    const modalElement = document.getElementById("modal");
    const modalBody = modalElement.querySelector('.modal-body p');
    const modalTitle = modalElement.querySelector('.modal-title');
    const modalPrimaryButton = modalElement.querySelector('.btn-primary');
    console.log({ modalBody, modalTitle, modalPrimaryButton })
    if (action === 'disable' && type === 'book') {
        modalTitle.innerHTML = 'Inativar Livro';
        modalBody.innerHTML = "Deseja realmente inativar o livro? Isso vai inativar todos os SKUs tambem!";
        modalPrimaryButton.innerHTML = 'Inativar';
    } else if (action === 'activate' && type === 'book') {
        modalTitle.innerHTML = 'Ativar Livro';
        modalBody.innerHTML = "Deseja realmente ativar o livro? Isso vai ativar todos os SKUs tambem!";
        modalPrimaryButton.innerHTML = 'Ativar';
    } else if (action === 'disable' && type === 'sku') {
        modalTitle.innerHTML = 'Inativar SKU';
        modalBody.innerHTML = "Deseja realmente inativar o SKU?";
        modalPrimaryButton.innerHTML = 'Inativar';
    } else if (action === 'activate' && type === 'sku') {
        modalTitle.innerHTML = 'Ativar SKU';
        modalBody.innerHTML = "Deseja realmente ativar o SKU?"
        modalPrimaryButton.innerHTML = 'Ativar';
    }
    const modal = new bootstrap.Modal(modalElement, { keyboard: false });
    modal.show();
}

function dispatch() {
    fetch(`/admin/products/${itemType}/${itemId}/${dispatchAction}`, { method: 'POST' })
        .then(response => {
            if (response.status === 200) {
                window.location.reload();
            } else {
                alert('Erro ao fazer ação!');
            }
        }).catch(error => {
            console.log(error);
            alert('Erro ao fazer ação!');
        });
}


