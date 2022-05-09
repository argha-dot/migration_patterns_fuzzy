const Infobox = ({info}) => {
  return (
    <div className='infobox'>
      <h3>Infobox</h3>
      { 
        info.length > 0 ? <p>{ info[0]?.properties?.interaction }</p>
        :
        <p>Hover over a point</p>
      }
    </div>
  )
}

export default Infobox;
