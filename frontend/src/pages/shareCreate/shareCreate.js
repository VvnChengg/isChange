import React, {useState} from "react";
import "./shareCreate-style.css";
// import { AiOutlineMail } from "https://esm.sh/react-icons/ai";
import { useNavigate } from "react-router-dom";
import TextField from '@material-ui/core/TextField';



export default function Share() {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/'; 
    navigate(path);
  };

  const [inputTitle, setInputTitle] = useState('')
  const [inputContent, setInputContent] = useState('')

  return (
    <div className="container">
      <div className="content">
        <div className="title-box">
          <div className="text-xl text-neutral-500">標題</div>
          <div>
          {/* <TextField
            label="Multiline"
            multiline
            maxRows={4}
            value={inputTitle}
            onChange={(event) => setInputTitle(event.target.value)}
          /> */}
            <input className="input-box"
              value={inputTitle}
              onChange={(event) => setInputTitle(event.target.value)}
              placeholder="標題是什麼咧～" />
          </div>
        </div>
        <div className="text-box">
          <div className="text-xl leading-7 text-neutral-500">
            文字說明
          </div>
          <div>
            {/* <input className="input-box"
              value={inputContent}
              onChange={(event) => setInputContent(event.target.value)}
              placeholder="說些什麼吧！"
              aria-multiline="true"
               /> */}
            <textarea 
              className="input-box"
              value={inputContent}
              onChange={(event) => setInputContent(event.target.value)}
              placeholder="說些什麼吧！"
              rows={9}
            />
          </div>
          <button className="figure-button" onClick={() => routeChange()}><img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f570a0c69a52557b5a1cd2aabd09f0ea82824f62a802a9b9d432ad5b29bbd66?"
            // className="self-end aspect-square fill-sky-600 mt-[469px] w-[30px] max-md:mt-10"
          /></button>
        </div>
        <button className="publish-button" onClick={() => routeChange()}>發布貼文</button>
      </div>
    </div>
  );
}
