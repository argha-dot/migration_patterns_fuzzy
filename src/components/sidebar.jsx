const Sidebar = ({lang, lat, zoom}) => {
  return (
    <div className="sidebar">
      Longitude: {lang} | Latitude: {lat} | Zoom: {zoom}
    </div>
  )
}

export default Sidebar;
