import logo from './logo.svg';
import { pivotData } from './pivottable/data';
import PivotTable from './pivottable/PivotTable';

const tableData = [
  {
    athlete: "Michael Phelps",
    age: 23,
    country: "United States",
    year: 2008,
    date: "24/08/2008",
    sport: "Swimming",
    gold: 8,
    silver: 0,
    bronze: 0,
    total: 8,
  },
  {
    athlete: "Michael Phelps",
    age: 19,
    country: "United States",
    year: 2004,
    date: "29/08/2004",
    sport: "Swimming",
    gold: 6,
    silver: 0,
    bronze: 2,
    total: 8,
  },
  {
    athlete: "Michael Phelps",
    age: 27,
    country: "United States",
    year: 2012,
    date: "12/08/2012",
    sport: "Swimming",
    gold: 4,
    silver: 2,
    bronze: 0,
    total: 6,
  },
];


function App() {
  return (
    <div className="App">
      <PivotTable pivotData={pivotData} tableData={tableData}/>
    </div>
  );
}

export default App;
