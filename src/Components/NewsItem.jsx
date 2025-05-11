import image from '../assets/news.jpg'


const NewsItem = ({ title, description, src, url }) => {
  return (
    <div 
      className="card bg-dark text-light mb-3  d-inline-block my-3 mx-3 px-2 py-2" 
      style={{ width: "300px", height: "450px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

<img 
  src={src && src.trim() !== "" ? src : image}
  onError={(e) => { e.target.onerror = null; e.target.src = image; }}
  className="card-img-top" 
  alt="news"
  style={{ height: "180px", width: "100%", objectFit: "cover" }}
/>

      <div className="card-body d-flex flex-column" style={{ flex: "1" }}>
        <h5 className="card-title">{title ? title.slice(0, 50) : "No Title Available"}</h5>
        <p className="card-text" style={{ flex: "1", fontSize: "14px", overflow: "hidden", textOverflow: "ellipsis" }}>
          {description ? description.slice(0, 90) : "News is being fetched from API, please wait and come back later."}</p>
        <a href={url} className="btn btn-primary mt-auto" >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
