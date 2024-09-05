const getState = ({ getStore, getActions, setStore }) => {
    const host = 'https://playground.4geeks.com/contact';
    const slug = 'mariana';

    return {
        store: {
            contacts: [],
            currentContact: {},
        },
        actions: {
            setCurrentContact: () => {

            },
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
            addContact: async () => {
                const store = getStore();
                const uri = `${host}/agendas/${slug}/contacts`;
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        full_name: store.user.full_name,
                        email: store.user.email,
                        agenda_slug: store.user.agenda_slug,
                        address: store.user.address,
                        phone: store.user.phone
                    })
                };

                try {
                    const response = await fetch(uri, options);

                    if (!response.ok) {
                        console.log(`Error: ${response.status} ${response.statusText}`);
                        return;
                    }

                    const data = await response.json();
                    console.log('Contact added successfully', data);

                    // Actualiza la lista de contactos
                    await getActions().getContact();

                } catch (error) {
                    console.error('Fetch error:', error);
                }
            }
        }
    };
};

export default getState;
