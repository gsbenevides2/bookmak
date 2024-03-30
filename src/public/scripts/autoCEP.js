async function fetchCEP(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data;
}

function isBrasilZipCode(value) {
    if(/^[0-9]{8}$/.test(value)) {
        return true;
    }
    if(/^[0-9]{5}-[0-9]{3}$/.test(value)) {
        return true;
    }
    return false;
}

function returnNumbers(value) {
    return value.replace(/\D/g, '');
}

function fillInput(input, value) {
    if(input.value.trim() === '') {
        input.value = value;
    }
}

function parseLogradouroToStreetTypeAndStreet(logradouro) {
    const streetTypes = {
        "Rua": "street",
        "Avenida": "avenue",
    }

    const words = logradouro.split(' ');
    const streetType = words[0];
    const street = words.slice(1).join(' ');
    return {
        streetType: streetTypes[streetType] || 'street',
        street,
    }
}

function fillSelect(select, value) {
    if(select.selectedIndex > 0) {
        return;
    }
    const option = select.querySelector(`option[value="${value}"]`);
    if(option) {
        option.selected = true;
    }
}

function parseStateCodeToName(code) {
    const states = {
        "AC": "Acre",
        "AL": "Alagoas",
        "AP": "Amapá",
        "AM": "Amazonas",
        "BA": "Bahia",
        "CE": "Ceará",
        "DF": "Distrito Federal",
        "ES": "Espírito Santo",
        "GO": "Goiás",
        "MA": "Maranhão",
        "MT": "Mato Grosso",
        "MS": "Mato Grosso do Sul",
        "MG": "Minas Gerais",
        "PA": "Pará",
        "PB": "Paraíba",
        "PR": "Paraná",
        "PE": "Pernambuco",
        "PI": "Piauí",
        "RJ": "Rio de Janeiro",
        "RN": "Rio Grande do Norte",
        "RS": "Rio Grande do Sul",
        "RO": "Rondônia",
        "RR": "Roraima",
        "SC": "Santa Catarina",
        "SP": "São Paulo",
        "SE": "Sergipe",
        "TO": "Tocantins",
    }
    return states[code] || '';
}


document.addEventListener('DOMContentLoaded', function () {
    const zipCodeInput = document.querySelector('input[name="zipCode"]');
    const streetTypeInput = document.querySelector('select[name="streetType"]');
    const streetInput = document.querySelector('input[name="street"]');
    const districtInput = document.querySelector('input[name="district"]');
    const cityInput = document.querySelector('input[name="city"]');
    const stateInput = document.querySelector('input[name="state"]');
    const countryInput = document.querySelector('input[name="country"]');


    zipCodeInput.addEventListener('input', function (e) {
        const zipCode = e.target.value;
        if (!isBrasilZipCode(zipCode)) {
            return;
        }

        const cleanZipCode = returnNumbers(zipCode);
        fetchCEP(cleanZipCode).then(data => {
            if (data.erro) {
                return;
            }

            const { streetType, street } = parseLogradouroToStreetTypeAndStreet(data.logradouro);

            fillSelect(streetTypeInput, streetType);
            fillInput(streetInput, street);
            fillInput(districtInput, data.bairro);
            fillInput(cityInput, data.localidade);
            fillInput(stateInput, parseStateCodeToName(data.uf));
            fillInput(countryInput, 'Brasil');
        });

        
    });
});