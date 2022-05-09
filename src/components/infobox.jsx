const Infobox = ({info}) => {
  // console.log(info)
  return (
    <div className={ `infobox ${info.length > 0 ? "active" : ""}` }>
      <h3>Infobox</h3>
      { 
        info.length > 0 ? <div className="infobox-info">
          <p>Interaction type: { info[0]?.properties?.interaction }</p>
          <p>Location: { info[0]?.properties?.place_name }</p>
          <p>Temporality: { info[0]?.properties?.temporality }</p>
          <p>Story Name: { info[0]?.properties?.text_title }</p>
          <p>Author: { info[0]?.properties?.author_name }</p>
        </div>
        :
        <p>Hover over a point</p>
      }
    </div>
  )
}

export default Infobox;
