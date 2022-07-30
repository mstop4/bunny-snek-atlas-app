import './Gallery.css';
import settings from '../data/settings.json';

export const Gallery = (props) => {
  const { photos } = props;
  const { photosBaseUrl, thumbnailsBaseUrl } = settings;

  const photoElems = [];
  for (const photo of photos) {
    photoElems.push(
      <a href={`${photosBaseUrl}${photo}`}>
        <img
          className="Gallery-photo"
          src={`${thumbnailsBaseUrl}${photo}`}
          alt={photo}
          key={photo}
        />
      </a>
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
