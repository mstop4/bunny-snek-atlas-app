import './Gallery.css';

export const Gallery = (props) => {
  const { photos } = props;

  const photoElems = [];
  console.log(photos);
  for (const photo of photos) {
    photoElems.push(
      <img
        className="Gallery-photo"
        src={require(`../img/photos/${photo}`)}
        alt={photo}
        key={photo}
      />
    );
  }

  return (
    <>
      {/* <h3 className="Gallery-title">Gallery</h3> */}
      <div className="Gallery-container">
        {photoElems}
      </div>
    </>
  );
}
