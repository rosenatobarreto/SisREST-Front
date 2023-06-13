// import React, { useRef } from "react";
// import { Button } from 'reactstrap';
// import './FileUpload.css';
// import img1 from '../../assets/images/import.svg';

// function FileUpload(props) {
//     // valor inicial nulo - quardamos o input aqui.
//     const inputRef = useRef(null);

//     const sendAttribute = e => {
//         props.toSendAttribute(e);
//     }

//     return (
//         <div className="File-upload">
//             {/* uso de onClick e onChange para permitir que um mesmo arquivo seja enviado após este ter sido cancelado */}
//             <input type="file" accept={props.accept} ref={inputRef} onClick={(e) => e.target.value = ""}
//                 onChange={e => {
//                     if(e.target.files[0] != null){
//                         sendAttribute(e.target.files[0])
//                     }
//                 }}
//             />
//             <Button color="primary" size="lg" className="Button-up"
//                onClick={() => inputRef.current.click()}>
//                 <img className="Button-icon" border="0" src={img1} width="50" height="50" />
//                 IMPORTAR
//             </Button>
    
//         </div>
//     );

// }
// export default FileUpload;