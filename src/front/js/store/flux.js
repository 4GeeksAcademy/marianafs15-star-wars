const getState = ({ getStore, getActions, setStore }) => {
  const host = "https://playground.4geeks.com/contact";
  const slug = "mariana";

  return {
    store: {
      contacts: [],
      currentContact: {},
      characters: [],
      planets: [],
      starships : [],
      currentCharacter: {},
      currentPlanet: {},  
      currentStarShip: {},
      favorites: []
    },
    actions: {
      setCurrentCharacter: (value) => {
        setStore({ currentCharacter: value });
      },
      getStarShipDetails: async (id) => {  
        try {
          const response = await fetch(`https://www.swapi.tech/api/starships/${id}`);
          if (!response.ok) throw new Error("Error fetching starship data");

          const data = await response.json();
          setStore({ currentStarShip: data.result.properties });
        } catch (error) {
          console.error("Error fetching starship details:", error);
        }
      },
      getPlanetDetails: async (id) => {
        try {
          const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
          if (!response.ok) throw new Error("Error fetching planet data");

          const data = await response.json();
          setStore({ currentPlanet: data.result.properties });
        } catch (error) {
          console.error("Error fetching planet details:", error);
        }
      },
      addFavorites: (newFavorite) => {
        const store = getStore();
        if (!store.favorites.find(item => item.name === newFavorite.name)) {
          setStore({ favorites: [...store.favorites, newFavorite] });
        }
      },
      removeFavorites: (noFavorite) => {
        const store = getStore();
        const filteredFavorites = store.favorites.filter(item => item.name !== noFavorite);
        setStore({ favorites: filteredFavorites });
      },
      getContact: async () => {
        const uri = `${host}/agendas/${slug}/contacts`;
        const options = {
          method: "GET",
        };

        try {
          const response = await fetch(uri, options);

          if (response.status === 404) {
            console.log("Agenda not found, creating a new one");
            await getActions().createAgenda();
          } else if (response.status === 200) {
            const data = await response.json();
            setStore({ contacts: data.contacts });
          } else {
            console.log(`Error: ${response.status}`);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      },
      createAgenda: async () => {
        const uri = `${host}/agendas/${slug}`;
        const options = {
          method: "POST",
        };

        try {
          const response = await fetch(uri, options);

          if (response.ok) {
            console.log("Agenda created, fetching contacts...");
            await getActions().getContact();
          } else {
            console.log(`Error: ${response.status}`);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      },
      addContact: async (newContact) => {
        const uri = `${host}/agendas/${slug}/contacts`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContact),
        };

        try {
          const response = await fetch(uri, options);
          if (response.ok) {
            await getActions().getContact();
          } else {
            console.log(`Error: ${response.status}`);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      },
      editContact: async (contact) => {
        const uri = `${host}/agendas/${slug}/contacts/${contact.id}`;
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        };

        try {
          const response = await fetch(uri, options);
          if (response.ok) {
            await getActions().getContact();
          } else {
            console.log(`Error: ${response.status}`);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      },
      deleteContact: async (id) => {
        const uri = `${host}/agendas/${slug}/contacts/${id}`;
        const options = {
          method: "DELETE",
        };

        try {
          const response = await fetch(uri, options);
          if (response.ok) {
            await getActions().getContact();
          } else {
            console.log(`Error: ${response.status}`);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      },
      getCharacters: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/people");
          if (response.ok) {
            const data = await response.json();
            setStore({ characters: data.results });
          }
        } catch (error) {
          console.error("Error fetching characters:", error);
        }
      },
      getCharacterDetails: async (id) => {
        try {
          const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
          if (response.ok) {
            const data = await response.json();
            setStore({ currentCharacter: data.result.properties });
          }
        } catch (error) {
          console.error("Error fetching character details:", error);
        }
      },
      getPlanets: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/planets");
          if (response.ok) {
            const data = await response.json();
            setStore({ planets: data.results });
          }
        } catch (error) {
          console.error("Error fetching planets:", error);
        }
      },
      getStarships: async () => {
        try {
            const response = await fetch("https://www.swapi.tech/api/starships");
            if (response.ok) {
                const data = await response.json();
                setStore({ starships: data.results });
            }
        } catch (error) {
            console.error("Error fetching starships:", error);
        }
    }    
    },
  };
};

export default getState;
