import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

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

  onChangeType = (filterType) => {
    this.setState({
      filters: {
        type: filterType
      }
    })
  }

  onFindPetsClick = () => {
    let filter = this.state.filters.type === 'all' ? 'pets' : `pets?type=${this.state.filters.type}`
    
    fetch(`/api/${filter}`)
    .then(response => response.json())
    .then(petsArr => {
      this.setState({
        pets: petsArr
      })
    })
  }

  onAdoptPet = (id) => {
    this.setState({
      pets: this.updateAdoptions(id)  
    })  
  }

  updateAdoptions(id) {
    return this.state.pets.map(pet => {
      if (pet.id === id) {
        pet.isAdopted = true
        return pet
        // alternative => return { ...pet, isAdopted: true }
      } else {
        return pet
      }
    })
  }
  

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
