import React, { Component } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import nutrition from './nutrition.json';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: nutrition,
      habitsOptions: [
        'Drink 1 Cup of Water',
        '1 Hour of Coding',
        '10 Pushups',
        'Eat Something Healthy',
        '1 Hour of Reading',
        '10 Minutes of Meditation'
      ]
    }
  };

  render() {
    return (
      <div className="App">
        <h1> Healthy Things </h1>
        <div className='health-habits'>
          <h2> Healthy Habits </h2>
          <div className='habits-list'>
          </div>
          <div className='add-habits'>
            <DropDownList
              data={this.state.habitsOptions}
            />
            <NumericTextBox />
            <Button> Add Habit </Button>
          </div>
        </div>
        <div className='nutrition-grid'>
          <h2> 🥥 Healthy Fruits &amp; Veggies 🥦 </h2>
          <Grid
            data={this.state.data}>
            <Column field='Description' title='Food' />
            <Column field='Measure' title='Amount' />
            <Column field='Protein(g)Per Measure' title='Protein' />
            <Column field='Carbohydrate, by difference(g)Per Measure' title='Carbs' />
            <Column field='Sugars, total(g)Per Measure' title='Sugars' />
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
