import React, {useEffect, useState} from "react";
import "./shareCreate-style.css";
// import { AiOutlineMail } from "https://esm.sh/react-icons/ai";
import { useNavigate } from "react-router-dom";
// import TextField from '@material-ui/core/TextField';
import { api } from "../../api";


export default function Share() {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/'; 
    navigate(path);
  };

  // const [inputTitle, setInputTitle] = useState('')
  // const [inputContent, setInputContent] = useState('')

  const [post, setPost] = useState({
    title: '',
    content: '',
    // photo: '',
    // status: ['draft'],
  })

  function setTitle(input) {
    setPost({
        ...post,
        title: input
    });
  }
  
  function setContent(input) {
      setPost({
          ...post,
          content: input
      });
  }

  // function setPhoto(input) {
  //   setPost({
  //       ...post,
  //       photo: input
  //   });
  // }

  // function setStatus(input) {
  //   setPost({
  //       ...post,
  //       status: input
  //   });
  // }

  function onSubmit() {
    console.log(post);

    api.createPost(post)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  return (
    <div className="container">
      <div className="content">
        <div className="title-box">
          <div className="text-xl text-neutral-500">標題</div>
          <div>
            <input className="input-box"
              value={post.title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="標題是什麼咧～" />
          </div>
        </div>
        <div className="text-box">
          <div className="text-xl leading-7 text-neutral-500">
            文字說明
          </div>
          <div>
            <textarea 
              className="input-box"
              value={post.content}
              onChange={(event) => setContent(event.target.value)}
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
        <button className="publish-button" onClick={() => onSubmit()}>發布貼文</button>
      </div>
    </div>
  );
}
