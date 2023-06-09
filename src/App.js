/* eslint-disable jsx-a11y/alt-text */
import AppBar from "./components/AppBar/AppBar";
import BoardBar from "./components/BoardBar/BoardBar";
import BoardContent from "./components/BoardContent/BoardContent";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="trello-master">
      <AppBar />
      <BoardBar />
      <BoardContent />
    </div>
  );
}

export default App;