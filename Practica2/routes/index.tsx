import { Head } from "$fresh/runtime.ts";

const Index = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles/index.css" />
      </Head>
      <div class="container">
        <h1>Buscador de Personajes</h1>
        <form action="/personaje" method="get" class="search-form">
          <input
            type="text"
            name="name"
            placeholder="Escribe un nombre"
            class="search-input"
          />
          <button type="submit" class="search-button">Buscar</button>
        </form>
      </div>
    </>
  );
};

export default Index;
