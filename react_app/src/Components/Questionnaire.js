import React, { Component }from 'react';
import axios from 'axios';
import * as settings from '../settings';
import { API_SERVER } from '../settings';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';




// const useStyles = makeStyles((theme) => ({
//     paper: {
//       marginTop: theme.spacing(8),
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//     },
//     avatar: {
//       margin: theme.spacing(1),
//       backgroundColor: theme.palette.success.main,
//     },
//     form: {
//       width: '100%', // Fix IE 11 issue.
//       marginTop: theme.spacing(1),
//     },
//     submit: {
//       margin: theme.spacing(3, 0, 2),
//     },
//     success: {
//       color: theme.palette.success.main,
//     }
//   }));







// // const Questionnaire = (props) => {
// //     const [data, setData] = useState([])
// //     const [formData, setFormData] = useState('')
  
// //     useEffect (() => {
// //       fetch(API_SERVER + "/api/questionnaire", {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           name: formData, // Use your own property name / key
// //         }),
// //       })
// //         .then((res) => res.json())
// //         .then((result) => setData(result.rows))
// //         .catch((err) => console.log('error'))
// //     }, [props]);
  
// //     return (


// //     )
// //   }

// function Questionnaire(props){

//     const [subject, setSubject] = useState([])

//     const handleFormFieldChange = (event) => {
//         setSuccess(false);
//         switch (event.target.id) {
//           case 'subjectID': setSubjectID(event.target.value); break;
//           case 'height': setHeight(event.target.value); break;
//           default: return null;
//         }
    
//       };
    
//       const handleSubmit = (event) => {
//         e.preventDefault();
//           let headers = { 'Authorization': `Token ${props.token}` };
//           let method = 'post';
//           let url = settings.API_SERVER + '/api/questionnaire/';

//           let subjectFormData = new FormData();
//         //   passwordFormData.append("new_password1", new_password1);
//         //   passwordFormData.append("new_password2", new_password2);
//         //   let config = { headers, method, url, data: passwordFormData};

//           //Axios update_password API call
//           axios(config).then(res => {
//             setSuccess(true);
//           }).catch(
//             error => {
//               alert(error)
//             })
    
//       }
//     //const [loaded, setLoaded] = useState(false);
//     return (
//         <div className="container">
//             <form action="">
//                 {subjectFormData}
//                 <button onClick={handleSubmit}>Submit</button>
//             </form>
//         </div>
//     );
// }
// export default Questionnaire;



const Questionnaire = (props) => {

  return(
    <div className="Questionnaire">
      <h1>Questionnaire</h1>
    </div>
  );

}
export default Questionnaire;


// class Questionnaire extends Component{
//   constructor(){
//     super();
//     this.state = {
//       title: "Questionnaire",
//       subjectID: '',
//       Gender: '',
//       Height: ''
//     }

//   }

//   addSubject(event){
//     event.preventDefault;
//     console.log('in method');
//   }


//   render(){
//     let title = this.state.title;
//     return(
//       <div className="Questionnaire">
//         <h1>{title}</h1>

//       </div>
//     )
//   }

// }
// export default Questionnaire;

//     constructor(props){
//         super(props);

//         this.state = {
//             subjectID: '',
//             Height: '',
//             Gender: '',

//         }
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleChange = this.handleChange.bind(this)

//     }

//     handleChange(event){
//         this.setState({value: event.target.value});
//     }

//     handleSubmit(event){
//         event.preventDefault();
        

//     }
//     // render () {
//     //     let fields = this.state.formFields.map((field) => {
//     //         return (
//     //             <input type="text" value={field.value} onChange={(newValue) => {/* update your  state here with new value */ }} name={field.name}/>
//     //         )
//     //     });
//     //     return (
//     //         <div className="container">
//     //             <form action="">
//     //                 {fields}
//     //                 <button onClick={this.submitForm.bind(this)}>Save</button>
//     //             </form>
//     //         </div>
//     //     )
//     // }
//     // render(){
//     //     return (
//     //         <form class="form form-horizontal" action="{% url '/questionnaire/' %}" method="post">
//     //             {% csrf_token %}
//     //             {{ form }}
//     //             <input type="submit" value="Create" class="btn btn-primary pull-right" style="clear: both; margin: 10px 0" />
//     //         </form>
//         render () {
//             let fields = this.state.formFields.map((field) => {
//                 return (
//                     <input type="text" value={field.value} onChange={(newValue) => {/* update your  state here with new value */ }} subjectID={field.subjectID}/>
//                 )
//             });
//             return (
//                 <div className="container">
//                     <form action="">
//                         {fields}
//                         <button onClick={this.submitForm.bind(this)}>Sumbmit!</button>
//                     </form>
//                 </div>
//             )
//         }
//         );
//     }
// }