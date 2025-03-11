import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { Head } from "$fresh/runtime.ts";

interface Character {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string;
  starships: string[];
  url: string;
  vehicles: string[];
}

type Data = {
  name?: string;
  characters?: Character[];
  error?: string;
};

export const handler: Handlers<Data> = {
  async GET(req: Request, ctx: FreshContext<Data>): Promise<Response> {
    try {
      const url = new URL(req.url);
      const name = url.searchParams.get("name") || "";

      if (!name) {
        return ctx.render({ characters: [] });
      }

      const response = await Axios.get(
        `https://swapi.dev/api/people/?search=${encodeURIComponent(name)}&format=json`
      );

      return ctx.render({ name, characters: response.data.results });
    } catch (e) {
      return ctx.render({ error: "No se encontraron personajes." });
    }
  },
};

const PersonajePage = (props: PageProps<Data>) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles/index.css" />
      </Head>
      <div class="container">
        <h1>Resultados de Búsqueda</h1>
        {props.data.error && <p class="error">{props.data.error}</p>}

        <div class="results">
          {props.data.characters?.length ? (
            <ul class="characters-list">
              {props.data.characters.map((character) => (
                <li key={character.url} class="character-card">
                  <h2>{character.name}</h2>
                  <p><strong>Año de nacimiento:</strong> {character.birth_year}</p>
                  <p><strong>Color de ojos:</strong> {character.eye_color}</p>
                  <p><strong>Género:</strong> {character.gender}</p>
                  <p><strong>Color de pelo:</strong> {character.hair_color}</p>
                  <p><strong>Altura:</strong> {character.height}</p>
                  <p><strong>Masa:</strong> {character.mass}</p>
                  <p><strong>Color de piel:</strong> {character.skin_color}</p>
                  <p><strong>Especie:</strong> {character.species}</p>
                  <p><strong>Planeta de origen:</strong> {character.homeworld}</p>
                  <p><strong>Películas:</strong> {character.films.join(", ")}</p>
                  <p>
                    <strong>Naves:</strong>{" "}
                    {character.starships.length
                      ? character.starships.join(", ")
                      : "Ninguna"}
                  </p>
                  <p>
                    <strong>Vehículos:</strong>{" "}
                    {character.vehicles.length
                      ? character.vehicles.join(", ")
                      : "Ninguno"}
                  </p>
                </li>
              ))}
            </ul>
          ) : props.data.name ? (
            <p>No se encontraron personajes con el nombre "{props.data.name}".</p>
          ) : (
            <p>Ingresa un nombre para buscar personajes.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PersonajePage;
