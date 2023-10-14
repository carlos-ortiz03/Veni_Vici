import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0);
  const [home, setHome] = useState(true);
  const [currData, setCurrData] = useState([]);
  const [bannedData, setBannedData] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", "live_qIOsOxTbsqELcC35ForI4p5qtXbIwdrxML07IWrd3oVAUgNlNDjmUIRCB9EsZt7g");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
      .then(response => response.json())
      .then(result => setCurrData(Object.entries(result[0].breeds[0])))
      .catch(error => console.log('error', error));
  }, [count])

  const handleDiscover = () =>  {
    setCount(count + 1);
    if (home) {
      setHome(false);
    }
  }

  const handleBanButton = (val) => {
    setBannedData([...bannedData, val])
  }
  const propNames = new Set(["height", "name", "breed_group", "life_span"]);
  const banneditems = new Set(bannedData);
  let dataIndex = -1;
  let bannedIndex = -1;
  return (
    <>
      <div className='gray'></div>
      <div className='grid'>
        <div className='history-container'></div>
        <div className={`main-container-home ${home ? "" : "main-container"}`}>
          <h1>Vini Vici</h1>
          <h4>Discover dogs from your wildest dreams</h4>
          {(home) ? null : currData.map((prop) => {
            if (propNames.has(prop[0])){
              let val = (prop[0] === "weight") ? prop[1].imperial : prop[1];
              dataIndex += 1;
              return (<button key={dataIndex} className="potential-ban" value={val} onClick={e => handleBanButton(e.target.value)}>{`${val} ${(prop[0] === "weight") ? "lbs" : ""}`}</button>);
            } else if (prop[0] === "reference_image_id") {
              console.log(prop[1]);
              <image src={prop[1]}/>
            }
          })}
          <button type='button' onClick={handleDiscover}>Discover</button>
        </div>
        <div className='ban-container'>
          <h4 id='ban-list-id'>Ban List</h4>
          {(bannedData.length > 0) ? bannedData.map((bannedItems) => {
            bannedIndex += 1;
            console.log(bannedItems);
            return (<h6 key={bannedIndex}>{bannedItems}</h6>)
          }) : ""}
        </div>
      </div>
    </>
  )
}

export default App
