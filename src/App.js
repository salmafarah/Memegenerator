import React, {useState, useEffect} from 'react';
import {Meme} from "./Components/meme"; 
import './App.css';

const objectToQueryParam = (obj) => {
 const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`)
  return '?' + params.join('&')
}; 

function App() {
  const [templates, setTemplates] = useState([]); 
  const [template, setTemplate] = useState(null); 
  const [topText, setTopText] = useState(''); 
  const [bottomText, setBottomText] = useState(''); 
  const [meme, setMeme] = useState(null); 

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes').then(img => 
    img.json().then(imgresponse => setTemplates(imgresponse.data.memes))
    )
  }, []); 

  if (meme){
    return (
    <div style={{textAlign:"center"}}>>
      <img src={meme} alt="users meme"/>
    </div>
    )}


return (
  <>
  <header>
   Tumblr Meme Generator 
  </header>
  <br/>
  <h1> Pick a Meme</h1>

  <div style={{textAlign:"center"}}>
    {template && (
      <form onSubmit={async evt => {
        evt.preventDefault()
        // add logic for mem api
        const params = {
          template_id: template.id, 
          text0: topText,
          text1: bottomText,
          username: 'Salma1',
          password: 'tEeAbSMr-B6RAqw',
 
        }
        const imgresponse = await fetch(`https://api.imgflip.com/caption_image${objectToQueryParam(params)}`)
        const json = await imgresponse.json();
        console.log(imgresponse); 
        setMeme(json.data.url); 
      }}>
      <Meme template={template}/>
      <input 
      placeholder="top text" 
      value={topText} 
      onChange={evt => setTopText(evt.target.value)}/> 
      <input 
      placeholder="bottom text"
      value={bottomText} 
      onChange={evt => setBottomText(evt.target.value)}
       /> 
      <button type="submit"> Make your meme</button>
      </form>
      )}

    {!template && templates.map(template => {
      return (
        <Meme 
        template={template}
        onClick={() => {
          setTemplate(template)

        }}
        /> 
      )
    })
  }</div>
  <fotter> made by salma </fotter>
  </>

)}

export default App;
