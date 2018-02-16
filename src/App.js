import React, { Component } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { filterBy } from '@progress/kendo-data-query';
import { Chart } from '@progress/kendo-charts-react-wrapper';
import '@progress/kendo-theme-default/dist/all.css';
import '@progress/kendo-ui';
import nutrition from './nutrition.json';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    const initialFilter = {
      logic: 'and',
      filters: [{
        field: 'Description',
        operator: 'contains',
        value: 'Apple'
      }]
    };

    this.state = {
      data: this.getNutrition(initialFilter),
      filter: initialFilter,
      habitId: 0,
      habitName: '',
      habitIteration: 0,
      habits: [],
      habitsOptions: [
        'Drink 1 Cup of Water',
        '1 Hour of Coding',
        '10 Pushups',
        'Eat Something Healthy',
        '1 Hour of Reading',
        '10 Minutes of Meditation'
      ],
      series: [{data: [1, 1, 1]}],
      seriesDefaults: {type: 'pie'},
      graphProtein: 1,
      graphCarb: 1,
      graphSugar: 1
    };
  }

  handleNameChange = (event) => {
    this.setState({ habitName: event.target.value });
  }

  handleIterationChange = (event) => {
    this.setState({ habitIteration: event.target.value });
  }

  handleAddHabit = (event) => {
    this.setState({
      habits: this.state.habits.concat([{
        key: this.state.habitId,
        name: this.state.habitName,
        iterations: this.state.habitIteration
      }]),
      habitId: this.state.habitId +1
    });
  }
 
  handleFilterChange = (event) => {
    this.setState({
      data: this.getNutrition(event.filter),
      filter: event.filter
    });
  }

  getNutrition = (filter) => filterBy(nutrition, filter);

  handleProteinChange = (event) => {
    this.setState({ graphProtein: event.target.value });
    this.handleGraphChange();
  }

  handleCarbChange = (event) => {
    this.setState({ graphCarb: event.target.value });
    this.handleGraphChange();
  }

  handleSugarChange = (event) => {
    this.setState({ graphSugar: event.target.value });
    this.handleGraphChange();
  }

  handleGraphChange = () => {
    this.setState({
      series: [{
        data: [
          this.state.graphProtein, this.state.graphCarb, this.state.graphSugar
        ]
      }]
    });
  }

  render() {
    return (
      <div className="App">
        <h1> Healthy Things </h1>
        <div className='health-habits'>
          <h2> Healthy Habits </h2>
          <div className='habits-list'>
            <ul key='all-habits'>
              {this.state.habits.map((habit) => [
                <li key={habit.habitId}>
                  <h3>{habit.name}</h3>
                  <div className='iterations-area'>
                    {[...Array(habit.iterations)].map((iteration, index) => {
                      return <input key={index} type='radio' />
                    })}
                  </div>
                </li>
              ])}
            </ul>
          </div>
          <div className='add-habits'>
            <DropDownList
              data={this.state.habitsOptions}
              value={this.state.habitName}
              onChange={this.handleNameChange}
            />
            <NumericTextBox
              format='0'
              min={0}
              max={22}
              value={this.state.habitIteration}
              onChange={this.handleIterationChange}
            />
            <Button primary={true} onClick={this.handleAddHabit}>
              Add Habit
            </Button>
          </div>
        </div>
        <div className='nutrition-grid'>
          <h2> Healthy Fruits &amp; Veggies </h2>
          <Grid
            data={this.state.data}
            style={{maxHeight: '500px'}}
            filterable={true}
            filter={this.state.filter}
            filterChange={this.handleFilterChange}>
            <Column field='Description' title='Food' />
            <Column field='Measure' title='Amount' />
            <Column field='Protein(g)Per Measure' title='Protein' />
            <Column field='Carbohydrate, by difference(g)Per Measure' title='Carbs' />
            <Column field='Sugars, total(g)Per Measure' title='Sugars' />
          </Grid>
        </div>
        <div className='food-graph-input'>
          <p>Protein Amount:
          <input
            type='text'
            onChange={this.handleProteinChange} /></p>
          <p>Carb Amount:
          <input
            type='text'
            onChange={this.handleCarbChange} /></p>
          <p>Sugar Amount:
          <input
            type='text'
            onChange={this.handleSugarChange} /></p>
        </div>
        <div className='food-graph'>
          <Chart
            seriesDefaults={this.state.seriesDefaults}
            series={this.state.series} />
        </div>
      </div>
    );
  }
}

export default App;
