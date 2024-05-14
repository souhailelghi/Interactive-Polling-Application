import React, { useReducer, useRef, useState } from 'react'
import CreateSurvey from '../components/create-survey/CreateSurvey'
import { getFirestore ,addDoc, collection, getDocs} from "@firebase/firestore";
import { db } from '../data/data';


function CreateSurveyContainer() {
    const [questionBox, setQuestionBox] = useState([{id:Date.now(), qs:'',options:[{id : Date.now()*(Math.floor(Math.random()*999)+1),op : "", count : 0},{id : Date.now()*(Math.floor(Math.random()*999)+1),op : "", count : 0}]}]);
    const title = useRef()
    const description = useRef()
    const [image,setImg] = useState("../1.jpg")
    const handleImg= (e)=>{
        setImg(e.target.files[0])
    }
    // to handle question input
    const handleQuestion = (i,event)=>{
        setQuestionBox(prev=>prev.map(e=>{
            if(e.id === i){
                let temp = event.target.value
                return {...e,qs:temp}
            }else return e
        }))
    }
    const handleOption = (qsIndex,i,event)=>{
        setQuestionBox(prev=>prev.map((e,index)=>{
            if (index === qsIndex) {
                return {...e,options :e.options.map((elem, opIndex)=>{
                    if(opIndex === i){
                        return {...elem,op:event.target.value}
                    }else return elem
                })}
            }
            else return e
        }))
    }
    // used to add option in InputBox component
    const addOption = (index)=>{
        setQuestionBox(prev=>prev.map((e,i)=>{
            if (i === index) {
                return {...e,options : [...e.options , {id:Date.now(),op:'',count:0}]}
            }
            else return e
        }))
    }
    // used to add questionBox
    const addQuestionBox=()=>{
        setQuestionBox(prev=>[...prev,{id:Date.now(),qs:'',options:[{id : Date.now()*(Math.floor(Math.random()*999)+1),op : "", count : 0},{id : Date.now()*(Math.floor(Math.random()*999)+1),op : "", count : 0}]}])
    }
    // used to form submission
    const surveyRef = collection(db, "surveys");
    const handleSubmit = (e)=>{
        e.preventDefault()
        const survey = {
            title : title.current.value,
            description: description.current.value,
            img : image,
            questions : questionBox
        }
        console.log(survey)
        const docRef = addDoc(surveyRef, survey);
        console.log("Document written with ID: ", docRef.id);
        alert("Your data was added successfully !")
        e.target.reset();
    }
    return (
        <>
            <CreateSurvey handleImg={handleImg} handleOption={handleOption} addOption={addOption} questionBox={questionBox} handleQuestion={handleQuestion} handleSubmit={handleSubmit} addQuestionBox={addQuestionBox} title={title} description={description} />
        </>
    )
}

export default CreateSurveyContainer