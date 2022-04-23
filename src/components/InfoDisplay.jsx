import './InfoDisplay.css';

const InfoDisplay = (props) => {
  const { data, selectedPlace } = props;
  const currentPlace = data.find(place => place.name === selectedPlace);

  if (!currentPlace) {
    return (
      <div className="InfoDisplay-container">
        <h2>No place selected</h2>
      </div>
    );
  }

  const {
    biomes,
    description,
    location,
    name,
    raidCount,
    rating,
    type
  } = currentPlace;

  // Biomes
  const biomeList = [];
  if (biomes) {
    for (const biome of biomes) {
      biomeList.push(
        <li key={biome}>{biome}</li>
      );
    }
  }

  // Rating
  const ratingStars = [];
  if (rating) {
    if (rating === -1) ratingStars.push(<span>Abandoned</span>);
    else if (rating === 0) ratingStars.push(<span>Unsettled</span>);
    else {
      for (let i = 0; i < rating; i++) {
        ratingStars.push(<span key={i}>★</span>);
      }
    }
  }

  // Description
  const descriptionList = [];
  if (description) {
    for (const line of description) {
      descriptionList.push(
        <p key={line}>{line}</p>
      );
    }
  }

  // Location
  const locationString = location ? `${location.x}, ${location.y}, ${location.z}` : "";

  return (
    <div className="InfoDisplay-container">
      <header>
        <h1>{name}</h1>
      </header>
      <main>
        <section className="InfoDisplay-summary">
          <table className="InfoDisplay-infobox">
            <tbody>
              <tr>
                <th>Type</th>
                <td>{type}</td>
              </tr>
              <tr>
                <th>Biome</th>
                <td>
                  <ul>
                    {biomeList}
                  </ul>
                </td>
              </tr>
              <tr>
                <th>Rating</th>
                <td>{ratingStars}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{locationString}</td>
              </tr>
              <tr>
                <th>Raids</th>
                <td>{raidCount === -1 ? "N/A" : raidCount}</td>
              </tr>
              <tr>
                <th>Connections</th>
                <td>
                  <ul>
                    <li>Foo 🥾</li>
                    <li>Bar 🚊</li>
                    <li>Baz ⛵</li>
                    <li>Qux 🔥</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="InfoDisplay-description">
          {descriptionList}
        </section>
      </main>
    </div>
  )
}

export default InfoDisplay;