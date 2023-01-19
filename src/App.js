import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [ data, setData ] = useState(null);

  const [ filteredData,setFilteredData ] = useState(data);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = data.filter((data) => {
      // console.log(typeof(inputData.name.common))
      return data.name.official.toLowerCase().search(value) !== -1;
    });
    console.log(result);
    setFilteredData(result);
  }

  useEffect( () => {
    async function getData() {
      try {
        let response = await axios.get(`https://restcountries.com/v3.1/all`);
        let initialData = response.data;
        let sortedData = initialData.sort((a, b) => (a.name.official < b.name.official) ? -1 : (a.name.official > b.name.official) ? 1 : 0);
        setData(sortedData);
        setFilteredData(sortedData);
        console.log(response.data[1]);
      }
      catch(err) {
        console.log(err)
      }
    }
    getData();
  }, [])


  return (
    <div className="App">
      <h1>List of Countries</h1>
      <label>Filter: </label>
      <input type="text" onChange={(event) =>handleSearch(event)} />
      <ul>
        { filteredData && filteredData.map(({ name }) => { 
          return(<li>{name.official}</li>)
        })}
      </ul>
    </div>
  );
}

export default App;
