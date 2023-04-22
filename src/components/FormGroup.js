import React from 'react';

export default class FormGroup extends React.Component {
    
    render() {
        return (
            <div className="">
                <label>{this.props.label}</label>
                {this.props.children}
            </div>
        )
    }
}

// export function FormGroup({label, handleChange, value}){
//     return(
//         <div>
//             <label>{label}</label>
//             <input
//                 value={value}
//                 onChange={e => handleChange(e, handleChange)}
//                 placeholder={value}
//             />
//         </div>
//     )
// }