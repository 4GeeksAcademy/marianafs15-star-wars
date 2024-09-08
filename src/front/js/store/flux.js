const getState = ({ getStore, getActions, setStore }) => {
    const host = 'https://playground.4geeks.com/contact';
    const slug = 'mariana';

    return {
        store: {
            contacts: [],
            currentContact: {},
            characters : [],
        },
        actions: {
            getContact: async () => {
                const uri = `${host}/agendas/${slug}/contacts`;
                const options = {
                    method: 'GET'
                };

                try {
                    const response = await fetch(uri, options);

                    if (response.status === 404) {
                        console.log(`Error: ${response.status} ${response.statusText}`);
                        console.log("Creating new agenda");
                        await getActions().createAgenda();

                    } else if (response.status === 200) {
                        const data = await response.json();
                        console.log(data.contacts);
                        setStore({ contacts: data.contacts });

                    } else {
                        console.log(`Error: ${response.status} ${response.statusText}`);
                    }
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            },
            createAgenda: async () => {
                const uri = `${host}/agendas/${slug}`;
                const options = {
                    method: 'POST'
                };

                try {
                    const response = await fetch(uri, options);

                    if (!response.ok) {
                        console.log(`Error: ${response.status} ${response.statusText}`);
                        return;
                    }

                    const data = await response.json();
                    console.log("New agenda successfully created, getting contacts");
                    await getActions().getContact();

                } catch (error) {
                    console.error('Fetch error:', error);
                }
            },
            addContact: async (newContact) => {
                const store = getStore();
                const uri = `${host}/agendas/${slug}/contacts`;
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: newContact.name,
                        email: newContact.email,
                        address: newContact.address,
                        phone: newContact.phone
                    })
                };

                try {
                    const response = await fetch(uri, options);

                    if (!response.ok) {
                        console.log(`Error: ${response.status} ${response.statusText}`);
                        return false;
                    }

                    const data = await response.json();
                    console.log('Contact added successfully', data);

                    // Actualiza la lista de contactos
                    getActions().getContact();
                    return true
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            },
            editContact: async (contact) => {
                const store = getStore();
                const uri = `${host}/agendas/${slug}/contacts/${contact.id}`;
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: contact.name,
                        email: contact.email,
                        address: contact.address,
                        phone: contact.phone
                    })
                };

                try {
                    const response = await fetch(uri, options);

                    if (!response.ok) {
                        console.log(`Error: ${response.status} ${response.statusText}`);
                        return false;
                    }

                    const data = await response.json();
                    console.log('Contact edited successfully', data);

                    // Actualiza la lista de contactos
                    getActions().getContact();
                    return true
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            },
            deleteContact:async(id)=>{
                const store = getStore();
                const uri = `${host}/agendas/${slug}/contacts/${id}`;
                const options = {
                    method: 'DELETE',
                };

                try {
                    const response = await fetch(uri, options);

                    if (!response.ok) {
                        console.log(`Error: ${response.status} ${response.statusText}`);
                        return false;
                    }

                    console.log('Contact deleted successfully');

                    // Actualiza la lista de contactos
                    getActions().getContact();
                    return true
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            },
            getCharacters: async () => {
                const response = await fetch('https://www.swapi.tech/api/people')
                if (!response.ok){
                    return
                }
                const data = await response.json();
                setStore({characters: data.results} );
            },
        }
    };
};

export default getState;