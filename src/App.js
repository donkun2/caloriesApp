import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar ,Button,Badge } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import axios from "axios";
function App() {

  const [morning,setMorning] = useState([])
  const [lunch,setLunch] = useState([])
  const [dinner,setDinner] = useState([])
  const [snak,setSnak] = useState([])
  const [morringMenu,setMorringMenu] = useState("")
  const [lunchMenu,setLunchMenu] = useState("")
  const [dinnerMenu,setDinnerMenu] = useState("")
  const [snakMenu,setSnakMenu] = useState("")
  const [stateNumber,setStateNumber] = useState("") //아점저간 상태값

  const [morningList,setMorningList] = useState([])
  const [lunchList,setLunchList] = useState([])
  const [dinnerList,setDinnerList] = useState([])
  const [snackList,setSnakList] = useState([])

  const [menuList,setMenuList] = useState([])

  const [show, setShow] = useState(false);
  const [calorieInput,setCalorieInput] = useState("")

  const [totalcal,setTotalCal] = useState("")

  console.log("모닝리스트",morningList)
  console.log("점심리스트",lunchList)
  console.log("저녁리스트",dinnerList)
  console.log("간식리스트",snackList)
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const menuChoice = (item,gram) =>{
    const menu = {name:item.name, cal:Number(item.cal) , gram: item.gram , myGram: gram}

    if(stateNumber === "아침"){
    setMorning([...morning,menu])}
    else if(stateNumber === "점심"){
      setLunch([...lunch,menu])
    }else if(stateNumber === "저녁"){
      setDinner([...dinner,menu])
    }else if(stateNumber === "간식"){
      setSnak([...snak,menu])
    }
    
    
  }

  const deleteMenu = (state) => {
    if(state === "아침"){
      setMorning([])
    }
    else if(state === "점심"){
      setLunch([])
    }else if(state === "저녁"){
      setDinner([])
    }else if(state === "간식"){
      setSnak([])
    }
  }

  const totalCaloriesData = () => {
    let totalList = []

    if(morning){
      morning.map((item)=> {
        const totalCal = (item.cal / item.gram) * item.myGram;
        totalList.push(totalCal);
      })
    }

    if(lunch){
      lunch.map((item)=> {
        const totalCal = (item.cal / item.gram) * item.myGram;
        totalList.push(totalCal);
      })
    }

    if(dinner){
      dinner.map((item)=> {
        const totalCal = (item.cal / item.gram) * item.myGram;
        totalList.push(totalCal);
      })
    }

    if(snak){
      snak.map((item)=> {
        const totalCal = (item.cal / item.gram) * item.myGram;
        totalList.push(totalCal);
      })
    }

    const total = totalList.reduce((acc, value) => acc + value, 0);
    const roundedTotal = total.toFixed(1);

    setTotalCal(parseFloat(roundedTotal));

    

  }

  console.log("총처먹은양",totalcal)

  const getFoodData = (state,MenuName) => {
    axios
      .get(
        `http://openapi.foodsafetykorea.go.kr/api/8158e54949f0468e88cf/I2790/json/1/5/DESC_KOR=${MenuName}`
      )
      .then(function (res) {
        console.log(res.data.I2790.MSG);
        console.log(res)
  let menuData = {};

  
  if (res.data.I2790.RESULT.MSG === "해당하는 데이터가 없습니다.") {
    menuData = [{name:" 해당하는 데이터가 없습니다요"}]
    setMenuList(menuData)
  } else {
    menuData = res.data.I2790.row.map((item) => ({
      name: item.DESC_KOR,
      cal: item.NUTR_CONT1,
      gram: item.SERVING_SIZE
    }));
   setMenuList(menuData)
  }

  if(state === "mor"){
    setMorringMenu("")
  }else if(state === "lun"){
    setLunchMenu("")
  }else if(state === "din"){
    setDinnerMenu("")
  }else if(state === "snak"){
    setSnakMenu("")
  }


     
       

      });
  };


  return (
    <Container className="MainContainer">
      <div className="div1">
        <div style={{borderBottom:"solid 1px black", width:"95%",}} className="divMargin">
          <h4 className="title">아침</h4>
        <div className="divDetail">
          
          <input
  type="text"
  value={morringMenu}
  onChange={(e) => setMorringMenu(e.target.value)}
  className="input"
/>

          <Button className="btn" onClick={()=>{handleShow(); setStateNumber("아침"); getFoodData("mor",morringMenu);}}>검색</Button>
          <Button className="btn" variant="danger" onClick={()=>{deleteMenu("아침")}}>삭제</Button>
          
          
        </div>
          <div>
            <h5>아침메뉴리스트</h5>
            <div className="listDiv">
              {morning? morning.map((item)=> {
                return(<h6><Badge className="marginBg">{item.name}</Badge></h6>)
              }):null}
            </div>

            </div>
        </div>




        {/* 경계선~!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

        <div style={{borderBottom:"solid 1px black", width:"95%",}} className="divMargin">
          <h4 className="title">점심</h4>
        <div className="divDetail">
          
          <input
  type="text"
  value={lunchMenu}
  onChange={(e) => setLunchMenu(e.target.value)}
  className="input"
/>

          <Button className="btn" onClick={()=>{handleShow(); setStateNumber("점심"); getFoodData("lun",lunchMenu);}}>검색</Button>
          <Button className="btn" variant="danger" onClick={()=>{deleteMenu("점심")}}>삭제</Button>

          
          
        </div>
          <div>
            <h5>점심메뉴리스트</h5>
            <div className="listDiv">
              {lunch? lunch.map((item)=> {
                return(<h6><Badge className="marginBg">{item.name}</Badge></h6>)
              }):null}
            </div>

            </div>
        </div>


        <div style={{borderBottom:"solid 1px black", width:"95%",}} className="divMargin">
          <h4 className="title">저녁</h4>
        <div className="divDetail">
          
          <input
  type="text"
  value={dinnerMenu}
  onChange={(e) => setDinnerMenu(e.target.value)}
  className="input"
/>

          <Button className="btn" onClick={()=>{handleShow(); setStateNumber("저녁"); getFoodData("din",dinnerMenu);}}>검색</Button>
          <Button className="btn" variant="danger" onClick={()=>{deleteMenu("저녁")}}>삭제</Button>

          
          
        </div>
          <div>
            <h5>저녁메뉴리스트</h5>
            <div className="listDiv">
              {dinner? dinner.map((item)=> {
                return(<h6><Badge className="marginBg">{item.name}</Badge></h6>)
              }):null}
            </div>

            </div>
        </div>


        <div style={{borderBottom:"solid 1px black", width:"95%",}} className="divMargin">
          <h4 className="title">간식</h4>
        <div className="divDetail">
          
          <input
  type="text"
  value={snakMenu}
  onChange={(e) => setSnakMenu(e.target.value)}
  className="input"
/>

          <Button className="btn" onClick={()=>{handleShow(); setStateNumber("간식"); getFoodData("snak",snakMenu);}}>검색</Button>
          <Button className="btn" variant="danger" onClick={()=>{deleteMenu("간식")}} >삭제</Button>

          
          
        </div>
          <div>
            <h5>간식메뉴리스트</h5>
            <div className="listDiv">
              {snak? snak.map((item)=> {
                return(<h6><Badge className="marginBg">{item.name}</Badge></h6>)
              }):null}
            </div>

            </div>
            
        </div>


        <Button onClick={totalCaloriesData} className="calculBtn" variant="success">칼로리계산</Button>

        
       
      </div>

      <div className="div1">
        <div className="ri">
        <h1 className="h1De">Today Total Calories</h1>
        <h2 className="h2De"> <Badge bg="success">{totalcal&& totalcal} Calories</Badge></h2>
        </div>
        
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>메뉴선택</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  {menuList.length > 1 ? (
    menuList.map((item) => (
      <div className="divMenu">
        <p className="pTag">{item.name}</p>
        <input onChange={(e) => setCalorieInput(e.target.value)} className="input2"></input>
        <Button
         style={{fontSize:12,fontWeight:"bold"}}
          className="selb"
          onClick={() => {
            menuChoice(item, calorieInput);
            handleClose();
          }}
        >
          선택
        </Button>
      </div>
    ))
  ) : (
    menuList.map((item) => (
      <div className="divMenu">
        <p>{item.name}</p>
      </div>
    ))
  )}
</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          
        </Modal.Footer>
      </Modal>
    </Container>

  );
}

export default App;
