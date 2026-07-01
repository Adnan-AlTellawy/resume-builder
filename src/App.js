import './App.css';
import Header from './Header';
import Post from './Post';
import SideMenu from './SideMenu';
function App() {
  return (
    <div className="App">
      <Header/>
      <div style={{display:"flex",justifyContent:"center"}}>
      {/*post & side menu contaainer*/}
      <div style={{display:"flex", width:"60%"}}>
 {/* post contaner */}
      <div style={{width:"70%"}}>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
      </div>
      {/* post contaner */}
      {/* side menu contanier */}
      <div style={{width:"30%"}}>
        <SideMenu/>
      </div>
      {/* side menu contanier */}
      </div>
      {/* post & side menu contaainer */}
      </div>
    </div>
  );
}

export default App;
