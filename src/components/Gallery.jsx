import './Gallery.css';
import settings from '../data/settings.json';

export const Gallery = (props) => {
  const { photos } = props;
  const { photosBaseUrl } = settings;

  const photoElems = [];
  for (const photo of photos) {
    photoElems.push(
      <img
        className="Gallery-photo"
        src={`${photosBaseUrl}${photo}`}
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
