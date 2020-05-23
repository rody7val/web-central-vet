module.exports = {
	database: process.env.MONGO_DB || 'mongodb://localhost/web-central-vet',
	client_id: "8942313801155865",
	client_secret: "eiPDPiTOxXCBI0WUf9C77Geh5oSPMxla",
	public_key: "TEST-f4624fb1-fed7-4456-81fb-96d22ab0c74a",
	access_token: "TEST-8942313801155865-051003-15b9d8416f08c748be54ed1c6d04db63-200036843",
	port: process.env.PORT || 8000,
	heads: {
      sidebar: {
        title: "CentralVet",
        auth: "M.V. Guillermina Puente",
        home: "Veterinaria",
        shop: "Tienda",
        contact: "Contacto"
      }
    },
    services: [
      { img: "https://placekitten.com/1300/1200", title: "Clínica" },
      { img: "https://placekitten.com/1400/1290", title: "Cirugía" },
      { img: "https://placekitten.com/1100/2000", title: "Vacunación" },
    ]
}
