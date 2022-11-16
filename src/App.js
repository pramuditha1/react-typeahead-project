import './App.css';
import TypeAheadDropDown from './component1/TypeAheadDropDown';
import cities from "./component1/cities";
import ReactTypeahead from "./component2/App"
import ComponentWithApi from "./ComponentWithApi";
import AsyncPaginationExample from './bootstrap-typeahead';
import LocationSearchInput from './places-autocomplete-google';

function App() {
  return (
    <div className="App">
      {/* <TypeAheadDropDown iteams={cities} /> */}
      {/* <ReactTypeahead/> */}
      {/* <ComponentWithApi/> */}
      {/* <AsyncPaginationExample/> */}
      <LocationSearchInput/>
    </div>
  );
}

export default App;
