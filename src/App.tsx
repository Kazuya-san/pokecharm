import usePokemonService from "./pokemonservice/usePokemonService";

const App = () => {
  const { pokemon, loading } = usePokemonService();

  const { name, image, type, weakness, description, moves, hp } = pokemon;

  return (
    <div className="mainContainer">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="pokemonCard">
          <h1>{name}</h1>

          <div className="main">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <img
                src={image}
                alt={name}
                style={{ width: "200px", height: "200px" }}
              />

              <div className="weaknessContainer">
                <h4>Double Damage From:</h4>
                <div className="weaknessWrapper">
                  {weakness.double.map((weakness) => (
                    <div className="tag">{weakness}</div>
                  ))}
                </div>

                <h4>Half Damage From:</h4>

                <div className="weaknessWrapper">
                  {weakness.half.map((weakness) => (
                    <div className="tag">{weakness}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="leftSide">
              <h3>Type: {type}</h3>
              <h3>HP: {hp}</h3>
              <div>
                <h3>Moves: </h3>
                <div className="movesWrapper">
                  {moves.splice(0, 10).map((move) => (
                    <div className="tag">{move}</div>
                  ))}
                </div>
              </div>
              <h3>Description: {description}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
