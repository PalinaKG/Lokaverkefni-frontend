import React, { Component }from 'react';
import axios from 'axios';
import * as settings from '../settings';
import { API_SERVER } from '../settings';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useHistory } from "react-router-dom"; 



class Questionnaire extends Component{
  constructor(){
    super();
    this.state = {
      title: "Questionnaire",
      showing: true,

      //subject
      subjectID: '',
      gender: "1",
      height: '',
      handedness: '1',
      birthyear: '',

      //geninfo
      foodTime: '',
      weight: '',
      caffeine: '0',
      nicotine: '0',
      healthyScale: '',
      groups: '0',
      noExercise: '',
      alcohol: '',
      msdrugs: '0',
      motionsickness: '',
      comments: '',

      //nausea
      cars: '',
      busses: '',
      airplanes: '',
      smallboats: '',
      ships: '',
      roundabout: '',
      swings: '',
      funfair: '',
      trains: '',

      //msgolden pre
      gendis_b: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  
  myal(){
    alert("Submitted!")
  }

  handleChange(event, field) {
    this.setState({
      [field]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      subjectID: this.state.subjectID,
      gender: this.state.gender,
      height: this.state.height,
      handedness: this.state.handedness,
      birthyear: this.state.birthyear,

      //geninfo
      foodTime: this.state.foodTime,
      weight: this.state.weight,
      caffeine: this.state.caffeine,
      nicotine: this.state.nicotine,
      healthyScale: this.state.healthyScale,
      groups: this.state.groups,
      noExercise: this.state.noExercise,
      alcohol: this.state.alcohol,
      msdrugs: this.state.msdrugs,
      motionsickness: this.state.motionsickness,
      comments: this.state.comments,

      //nausea
      cars: this.state.cars,
      busses: this.state.busses,
      airplanes: this.state.airplanes,
      smallboats: this.state.smallboats,
      ships: this.state.ships,
      roundabout: this.state.roundabout,
      swings: this.state.swings,
      funfair: this.state.funfair,
      trains: this.state.trains,

      //msgolden pre
      gendis_b: this.state.gendis_b
    };
    

    fetch(API_SERVER + "/api/questionnaire/", {
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .catch((error) => {
        console.log("ERROR", error)
        })
      .then((res) => {
        console.log(res)
        console.log(data)})
        

    this.myal()

    this.setState({
      //subject
      subjectID: '',
      gender: '',
      height: '',
      handedness: '',
      birthyear: '',

      //geninfo
      foodTime: '',
      weight: '',
      caffeine: '',
      nicotine: '',
      healthyScale: '',
      groups: '',
      noExercise: '',
      alcohol: '',
      msdrugs: '',
      motionsickness: '',
      comments: '',

      //nausea
      cars: '',
      busses: '',
      airplanes: '',
      smallboats: '',
      ships: '',
      roundabout: '',
      swings: '',
      funfair: '',
      trains: '',

      //msgolden pre
      gendis_b: ''





    });
    
  }

  componentDidMount(){
    console.log("yes hello it did mount")
  }


  render(){
    const { showing } = this.state;
    let title = this.state.title;
    return(
      <div className="Questionnaire">
        <h1>{title}</h1> 
        <form onSubmit={this.handleSubmit}>
        <h2>SUBJECT</h2> 

          <div>
                <button onClick={() => this.setState({ showing: !showing })}>Toggle</button>
                <div style={{ display: (showing ? 'block' : 'none') }}>
                <br />
                  <label>
                    SubjectID:
                    <input type="text" required value={this.state.subjectID} onChange={(event)=>this.handleChange(event, "subjectID")} />
                  </label>
                  <br/>
                  <br/>
                  <label> Group: 
                    <select required value={this.state.groups} onChange={(event)=>this.handleChange(event, "groups")}>
                      <option value="1">Concussion</option>
                      <option value="0">Healthy</option>
                      <option value="2">Sailors</option>
                    </select>
                  </label>
                </div>
          </div>
          <br />
          <br />
          <label> Gender: 
            <select required value={this.state.gender} onChange={(event)=>this.handleChange(event, "gender")}>
              <option value="1">Male</option>
              <option value="0">Female</option>
              <option value="2">Other</option>
            </select>
          </label>
          <br />
          <br/>
          <label>
            Height:
            <input type="number" required value={this.state.height} onChange={(event)=>this.handleChange(event, "height")} />
          </label>
          <br/>
          <br/>
          <label> Handedness: 
            <select required value={this.state.handedness} onChange={(event)=>this.handleChange(event, "handedness")}>
              <option value="1">Right-handed</option>
              <option value="0">Left-handed</option>
            </select>
          </label>
          <br/>
          <br/>
          <label>
            Birthyear:
            <input type="number" required value={this.state.birthyear} onChange={(event)=>this.handleChange(event, "birthyear")}/>
          </label>

          <br />
          <br />
          <h2>GENERAL INFORMATION</h2> 
          <label>
            Weight:
            <input type="number" required value={this.state.weight} onChange={(event)=>this.handleChange(event, "weight")} />
          </label>

          <br />
          <br />

          <label>
            How long has it been since you last ate?
              <div className="radio">
              <label>
                <input type="radio" value="0" checked={this.state.foodTime === "0"} onChange={(event)=>this.handleChange(event, "foodTime")} />
                Less than an hour
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="1" checked={this.state.foodTime === "1"} onChange={(event)=>this.handleChange(event, "foodTime")}/>
                Between one and two hours
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="2" checked={this.state.foodTime  === "2"} onChange={(event)=>this.handleChange(event, "foodTime")}/>
                Between two and three hours
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="3" checked={this.state.foodTime === "3"} onChange={(event)=>this.handleChange(event, "foodTime")}/>
                More than three hours
              </label>
            </div>
          </label>
          <br/>
          <label>
            How healthy do you consider yourself?
              <div className="radio">
              <label>
                <input type="radio" value="5" checked={this.state.healthyScale === "5"} onChange={(event)=>this.handleChange(event, "healthyScale")} />
                Very healthy
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="4" checked={this.state.healthyScale === "4"} onChange={(event)=>this.handleChange(event, "healthyScale")}/>
                Healthy
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="3" checked={this.state.healthyScale  === "3"} onChange={(event)=>this.handleChange(event, "healthyScale")}/>
                Neutral
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="2" checked={this.state.healthyScale === "2"} onChange={(event)=>this.handleChange(event, "healthyScale")}/>
                Unhealthy
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="1" checked={this.state.healthyScale === "1"} onChange={(event)=>this.handleChange(event, "healthyScale")}/>
                Very unhealthy
              </label>
            </div>
          </label>

          <br/>

          <label>
            How often a week do you practice any kind of physical activity?
              <div className="radio">
              <label>
                <input type="radio" value="0" checked={this.state.noExercise === "0"} onChange={(event)=>this.handleChange(event, "noExercise")} />
                Never
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="1" checked={this.state.noExercise === "1"} onChange={(event)=>this.handleChange(event, "noExercise")}/>
                Once or twice a week
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="2" checked={this.state.noExercise  === "2"} onChange={(event)=>this.handleChange(event, "noExercise")}/>
                Three to four times a week
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="3" checked={this.state.noExercise === "3"} onChange={(event)=>this.handleChange(event, "noExercise")}/>
                Five to six times a week
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="4" checked={this.state.noExercise === "4"} onChange={(event)=>this.handleChange(event, "noExercise")}/>
                Everyday
              </label>
            </div>
          </label>

          <br/>

          <label> Do you use any source of nicotine on a daily basis?
            <select required value={this.state.nicotine} onChange={(event)=>this.handleChange(event, "nicotine")}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>

          <br/>
          <br/>

          <label> Have you indulged caffeine today?
            <select required value={this.state.caffeine} onChange={(event)=>this.handleChange(event, "caffeine")}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>

          <br/>
          <br/>

          <label>
            How recently have you indulged alcohol?
              <div className="radio">
              <label>
                <input type="radio" value="0" checked={this.state.alcohol === "0"} onChange={(event)=>this.handleChange(event, "alcohol")} />
                Today
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="1" checked={this.state.alcohol === "1"} onChange={(event)=>this.handleChange(event, "alcohol")}/>
                Yesterday
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="2" checked={this.state.alcohol  === "2"} onChange={(event)=>this.handleChange(event, "alcohol")}/>
                More than two days ago
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="3" checked={this.state.alcohol === "3"} onChange={(event)=>this.handleChange(event, "alcohol")}/>
                I don't drink alcohol
              </label>
            </div>
          </label>

          <br/>

          <label>
            Do you experience motion sickness?
              <div className="radio">
              <label>
                <input type="radio" value="0" checked={this.state.motionsickness === "0"} onChange={(event)=>this.handleChange(event, "motionsickness")} />
                No, never
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="1" checked={this.state.motionsickness === "1"} onChange={(event)=>this.handleChange(event, "motionsickness")}/>
                Yes, but rarely
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="2" checked={this.state.motionsickness  === "2"} onChange={(event)=>this.handleChange(event, "motionsickness")}/>
                Yes, a few times
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="3" checked={this.state.motionsickness === "3"} onChange={(event)=>this.handleChange(event, "motionsickness")}/>
                Yes, often
              </label>
            </div>
          </label>

          <br />


          <label> Have you ever taken any drugs to minimise your motion sickness?
            <select required value={this.state.msdrugs} onChange={(event)=>this.handleChange(event, "msdrugs")}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>

          <br/>
          <br/>
          <label>
            Any comments?
            <input type="text" required value={this.state.comments} onChange={(event)=>this.handleChange(event, "comments")} />
          </label>

          <br />
          <br />

          <h2>NAUSEA</h2> 

          <div>
            <label>
            For each of the following types of transport or entertainment, please indicate how often you have felt sick or nauseated.
            </label>
            <br />
            <p> Cars </p>
              <div className="radio" style={{display: 'flex', flexDirection: 'row'}}>
                <label>
                  <input type="radio" value="0" checked={this.state.cars === "0"} onChange={(event)=>this.handleChange(event, "cars")} />
                  Not applicable / Never travelled
                </label>
                <label>
                  <input type="radio" value="1" checked={this.state.cars === "1"} onChange={(event)=>this.handleChange(event, "cars")}/>
                  Never felt sick
                </label>
                <label>
                  <input type="radio" value="2" checked={this.state.cars  === "2"} onChange={(event)=>this.handleChange(event, "cars")}/>
                  Rarely felt sick
                </label>
                <label>
                  <input type="radio" value="3" checked={this.state.cars === "3"} onChange={(event)=>this.handleChange(event, "cars")}/>
                  Sometimes felt sick
                </label>
                <label>
                  <input type="radio" value="4" checked={this.state.cars === "4"} onChange={(event)=>this.handleChange(event, "cars")}/>
                  Frequently felt sick
                </label>
              </div>
              <br />
            <p> Busses </p>
              <div className="radio" style={{display: 'flex', flexDirection: 'row'}}>
                <label>
                  <input type="radio" value="0" checked={this.state.busses === "0"} onChange={(event)=>this.handleChange(event, "busses")} />
                  Not applicable / Never travelled
                </label>
                <label>
                  <input type="radio" value="1" checked={this.state.busses === "1"} onChange={(event)=>this.handleChange(event, "busses")}/>
                  Never felt sick
                </label>
                <label>
                  <input type="radio" value="2" checked={this.state.busses  === "2"} onChange={(event)=>this.handleChange(event, "busses")}/>
                  Rarely felt sick
                </label>
                <label>
                  <input type="radio" value="3" checked={this.state.busses === "3"} onChange={(event)=>this.handleChange(event, "busses")}/>
                  Sometimes felt sick
                </label>
                <label>
                  <input type="radio" value="4" checked={this.state.busses === "4"} onChange={(event)=>this.handleChange(event, "busses")}/>
                  Frequently felt sick
                </label>
              </div>
              <br />
            <p> Ships </p>
              <div className="radio" style={{display: 'flex', flexDirection: 'row'}}>
                <label>
                  <input type="radio" value="0" checked={this.state.ships === "0"} onChange={(event)=>this.handleChange(event, "ships")} />
                  Not applicable / Never travelled
                </label>
                <label>
                  <input type="radio" value="1" checked={this.state.ships === "1"} onChange={(event)=>this.handleChange(event, "ships")}/>
                  Never felt sick
                </label>
                <label>
                  <input type="radio" value="2" checked={this.state.ships  === "2"} onChange={(event)=>this.handleChange(event, "ships")}/>
                  Rarely felt sick
                </label>
                <label>
                  <input type="radio" value="3" checked={this.state.ships === "3"} onChange={(event)=>this.handleChange(event, "ships")}/>
                  Sometimes felt sick
                </label>
                <label>
                  <input type="radio" value="4" checked={this.state.ships === "4"} onChange={(event)=>this.handleChange(event, "ships")}/>
                  Frequently felt sick
                </label>
              </div>
              <br />
            <p> Small boats </p>
              <div className="radio" style={{display: 'flex', flexDirection: 'row'}}>
                <label>
                  <input type="radio" value="0" checked={this.state.smallboats === "0"} onChange={(event)=>this.handleChange(event, "smallboats")} />
                  Not applicable / Never travelled
                </label>
                <label>
                  <input type="radio" value="1" checked={this.state.smallboats === "1"} onChange={(event)=>this.handleChange(event, "smallboats")}/>
                  Never felt sick
                </label>
                <label>
                  <input type="radio" value="2" checked={this.state.smallboats  === "2"} onChange={(event)=>this.handleChange(event, "smallboats")}/>
                  Rarely felt sick
                </label>
                <label>
                  <input type="radio" value="3" checked={this.state.smallboats === "3"} onChange={(event)=>this.handleChange(event, "smallboats")}/>
                  Sometimes felt sick
                </label>
                <label>
                  <input type="radio" value="4" checked={this.state.smallboats === "4"} onChange={(event)=>this.handleChange(event, "smallboats")}/>
                  Frequently felt sick
                </label>
              </div>
              <br />
            <p> Airplanes </p>
              <div className="radio" style={{display: 'flex', flexDirection: 'row'}}>
                <label>
                  <input type="radio" value="0" checked={this.state.airplanes === "0"} onChange={(event)=>this.handleChange(event, "airplanes")} />
                  Not applicable / Never travelled
                </label>
                <label>
                  <input type="radio" value="1" checked={this.state.airplanes === "1"} onChange={(event)=>this.handleChange(event, "airplanes")}/>
                  Never felt sick
                </label>
                <label>
                  <input type="radio" value="2" checked={this.state.airplanes  === "2"} onChange={(event)=>this.handleChange(event, "airplanes")}/>
                  Rarely felt sick
                </label>
                <label>
                  <input type="radio" value="3" checked={this.state.airplanes === "3"} onChange={(event)=>this.handleChange(event, "airplanes")}/>
                  Sometimes felt sick
                </label>
                <label>
                  <input type="radio" value="4" checked={this.state.airplanes === "4"} onChange={(event)=>this.handleChange(event, "airplanes")}/>
                  Frequently felt sick
                </label>
              </div>
              <br />
            <p> Roundabouts </p>
              <div className="radio" style={{display: 'flex', flexDirection: 'row'}}>
                <label>
                  <input type="radio" value="0" checked={this.state.roundabout === "0"} onChange={(event)=>this.handleChange(event, "roundabout")} />
                  Not applicable / Never travelled
                </label>
                <label>
                  <input type="radio" value="1" checked={this.state.roundabout === "1"} onChange={(event)=>this.handleChange(event, "roundabout")}/>
                  Never felt sick
                </label>
                <label>
                  <input type="radio" value="2" checked={this.state.roundabout  === "2"} onChange={(event)=>this.handleChange(event, "roundabout")}/>
                  Rarely felt sick
                </label>
                <label>
                  <input type="radio" value="3" checked={this.state.roundabout === "3"} onChange={(event)=>this.handleChange(event, "roundabout")}/>
                  Sometimes felt sick
                </label>
                <label>
                  <input type="radio" value="4" checked={this.state.roundabout === "4"} onChange={(event)=>this.handleChange(event, "roundabout")}/>
                  Frequently felt sick
                </label>
              </div>
              <br />
            <p> Swings </p>
              <div className="radio" style={{display: 'flex', flexDirection: 'row'}}>
                <label>
                  <input type="radio" value="0" checked={this.state.swings === "0"} onChange={(event)=>this.handleChange(event, "swings")} />
                  Not applicable / Never travelled
                </label>
                <label>
                  <input type="radio" value="1" checked={this.state.swings === "1"} onChange={(event)=>this.handleChange(event, "swings")}/>
                  Never felt sick
                </label>
                <label>
                  <input type="radio" value="2" checked={this.state.swings  === "2"} onChange={(event)=>this.handleChange(event, "swings")}/>
                  Rarely felt sick
                </label>
                <label>
                  <input type="radio" value="3" checked={this.state.swings === "3"} onChange={(event)=>this.handleChange(event, "swings")}/>
                  Sometimes felt sick
                </label>
                <label>
                  <input type="radio" value="4" checked={this.state.swings === "4"} onChange={(event)=>this.handleChange(event, "swings")}/>
                  Frequently felt sick
                </label>
              </div>
              <br />
            <p> Funfair </p>
              <div className="radio" style={{display: 'flex', flexDirection: 'row'}}>
                <label>
                  <input type="radio" value="0" checked={this.state.funfair === "0"} onChange={(event)=>this.handleChange(event, "funfair")} />
                  Not applicable / Never travelled
                </label>
                <label>
                  <input type="radio" value="1" checked={this.state.funfair === "1"} onChange={(event)=>this.handleChange(event, "funfair")}/>
                  Never felt sick
                </label>
                <label>
                  <input type="radio" value="2" checked={this.state.funfair  === "2"} onChange={(event)=>this.handleChange(event, "funfair")}/>
                  Rarely felt sick
                </label>
                <label>
                  <input type="radio" value="3" checked={this.state.funfair === "3"} onChange={(event)=>this.handleChange(event, "funfair")}/>
                  Sometimes felt sick
                </label>
                <label>
                  <input type="radio" value="4" checked={this.state.funfair === "4"} onChange={(event)=>this.handleChange(event, "funfair")}/>
                  Frequently felt sick
                </label>
              </div>
              <br />
            <p> Trains </p>
              <div className="radio" style={{display: 'flex', flexDirection: 'row'}}>
                <label>
                  <input type="radio" value="0" checked={this.state.trains === "0"} onChange={(event)=>this.handleChange(event, "trains")} />
                  Not applicable / Never travelled
                </label>
                <label>
                  <input type="radio" value="1" checked={this.state.trains === "1"} onChange={(event)=>this.handleChange(event, "trains")}/>
                  Never felt sick
                </label>
                <label>
                  <input type="radio" value="2" checked={this.state.trains  === "2"} onChange={(event)=>this.handleChange(event, "trains")}/>
                  Rarely felt sick
                </label>
                <label>
                  <input type="radio" value="3" checked={this.state.trains === "3"} onChange={(event)=>this.handleChange(event, "trains")}/>
                  Sometimes felt sick
                </label>
                <label>
                  <input type="radio" value="4" checked={this.state.trains === "4"} onChange={(event)=>this.handleChange(event, "trains")}/>
                  Frequently felt sick
                </label>
              </div>
          </div>

          <br />
          <br />
          <h2>MS GOLDEN</h2> 
          <br/>
          <div>
            <label>Before the virtual reality experience please indicate how you are feeling right now. </label>
            <p> General discomfort </p>
                <div className="radio" style={{display: 'flex', flexDirection: 'row'}}>
                  <label>
                    <input type="radio" value="0" checked={this.state.gendis_b === "0"} onChange={(event)=>this.handleChange(event, "gendis_b")} />
                    None
                  </label>
                  <label>
                    <input type="radio" value="1" checked={this.state.gendis_b === "1"} onChange={(event)=>this.handleChange(event, "gendis_b")}/>
                    Slight
                  </label>
                  <label>
                    <input type="radio" value="2" checked={this.state.gendis_b  === "2"} onChange={(event)=>this.handleChange(event, "gendis_b")}/>
                    Moderate
                  </label>
                  <label>
                    <input type="radio" value="3" checked={this.state.gendis_b === "3"} onChange={(event)=>this.handleChange(event, "gendis_b")}/>
                    Severe
                  </label>
                </div>
          </div>
          <br />
          <br />


          <input type="submit" value="Submit"/>

          <br />
          <br />

        </form>
      </div>
    )
  }

}
export default Questionnaire;


