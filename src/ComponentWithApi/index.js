import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useDebounce from './useDebounce';

const Index = () => {
  const [searchText, setSearchText] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const addressSuggestions = addressList.data
  console.log(searchText)
  console.log(addressList)

  const debouncedSearchValue = useDebounce(searchText, 300)

  useEffect(() => {
    debouncedSearchValue && getAddresses(debouncedSearchValue)
  }, [debouncedSearchValue])

  const getAddresses = async (searchText) => {
    const data = await axios.get(`http://localhost:3500/suggest?q=${searchText}`)
    setAddressList(data)
  }

  return (
    <div>
      <input type="text" 
      placeholder="enter text to search address"
      onChange={(e) => 
      setSearchText(e.target.value)}/>
      {
        addressSuggestions &&
        addressSuggestions.map((address) => {
          return (
            <div key={address.id}>


              <div>
                <p>
                  {address.address}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  )
}

export default Index