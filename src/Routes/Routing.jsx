import { Route, Routes as RouterRoutes } from 'react-router-dom'
import CreateSurveyContainer from '../containers/CreateSurveyContainer'
import HomePageContainer from '../containers/HomePageContainer'
import SurveyReportContainer from '../containers/SurveyReportContainer'
import SurveyFormContainer from '../containers/SurveyFormContainer'
import React, { useReducer, useRef, useState, useEffect, useMemo} from 'react'
import { getFirestore ,addDoc, collection, getDocs} from "@firebase/firestore";
import { db } from '../data/data';

function Routing() {
  const [data, setData] = useState([]);
    const surveyRef = collection(db, "surveys");
    useEffect(() => {
        const getSurvey = async () => {
        const dt = await getDocs(surveyRef);
      setData(dt.docs.map((doc) => ({...doc.data(),id: doc.id })));
    };
        getSurvey();
    },[]);
    console.log(data);
  return (
    <RouterRoutes>
      <Route path="/" element={<HomePageContainer data={data}/>} />
      <Route path="/CreateSurvey" element={<CreateSurveyContainer />}/>
      <Route path="/SurveyReport/:id" element={<SurveyReportContainer data={data}/>} />
      <Route path="/SurveyForm/:id" element={<SurveyFormContainer data={data}/>}/>
    </RouterRoutes>
  )
}

export default Routing