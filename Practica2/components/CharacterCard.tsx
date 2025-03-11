import { FunctionComponent } from "preact";

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

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: FunctionComponent<CharacterCardProps> = ({ character }) => {
  // Extraemos el id de la URL (por ejemplo, "https://swapi.dev/api/people/1/" → "1")
  const idMatch = character.url.match(/\/people\/(\d+)\//);
  const id = idMatch ? idMatch[1] : "0";
  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

  return (
    <div class="character-card">
      <div class="character-image">
        <img src={imageUrl} alt={character.name} />
      </div>
      <div class="character-info">
        <h2>{character.name}</h2>
        <p><strong>Birth Year:</strong> {character.birth_year}</p>
        <p><strong>Eye Color:</strong> {character.eye_color}</p>
        <p><strong>Gender:</strong> {character.gender}</p>
        <p><strong>Hair Color:</strong> {character.hair_color}</p>
        <p><strong>Height:</strong> {character.height}</p>
        <p><strong>Mass:</strong> {character.mass}</p>
        <p><strong>Skin Color:</strong> {character.skin_color}</p>
        <p><strong>Species:</strong> {character.species}</p>
        <p><strong>Films:</strong> {character.films.join(", ")}</p>
        <p>
          <strong>Starships:</strong>{" "}
          {character.starships.length ? character.starships.join(", ") : "None"}
        </p>
        <p>
          <strong>Vehicles:</strong>{" "}
          {character.vehicles.length ? character.vehicles.join(", ") : "None"}
        </p>
        <p><strong>Homeworld:</strong> {character.homeworld}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
