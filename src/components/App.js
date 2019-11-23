import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'
import { timingSafeEqual } from 'crypto'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  

  onFindPetsClick = () => {
    let api = '/api/pets'
    if(this.state.filters.type !== 'all'){
      api += `?type=${this.state.filters.type}`
    }

    fetch(api)
    .then(r=>r.json())
    .then(pets=> {
      console.log(pets)
      this.setState({ 
        pets: pets
      })
    })

  }
  onChangeType = ({ target: { value } }) => {
    this.setState({ filters: { ...this.state.filters, type: value } });
  };


  onAdoptPet = petId => {
    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets: pets });
  };

  

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType}
              onFindPetsClick ={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser  
              onAdoptPet={this.onAdoptPet}
              pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
