const getState = ({ getStore, getActions, setStore }) => {
    const host = 'https://playground.4geeks.com/contact';
    const slug = 'mariana';

    return {
        store: {
            contacts: []
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
            addContact: async () => {
                const uri = `${host}/agendas/${slug}`;
                const options = {
                    method: 'POST'
                };
            }
        }
    };
};

export default getState;
