import '@fortawesome/fontawesome-free/js/all';
import './css/bootstrap.css';
import { Modal, Collapse } from 'bootstrap';
import CalorieTracker from './Tracker';
import { Meal, Workout } from './Item';



  class App {
    constructor() {
      this._tracker = new CalorieTracker();
      console.log(this);
      this._addEventListner();
      this._tracker.loadItem();
    }
  
    _addEventListner(){
      document.getElementById("meal-form").addEventListener("submit", this._newItem.bind(this, 'meal'));
      document.getElementById("workout-form").addEventListener("submit", this._newItem.bind(this, 'workout'));
      document.getElementById("meal-items").addEventListener("click", this._removeItem.bind(this, 'meal'));
      document.getElementById("workout-items").addEventListener('click', this._removeItem.bind(this, 'workout'));
      document.getElementById("filter-meals").addEventListener("keyup", this._filterItems.bind(this, 'meal'));
      document.getElementById("filter-workouts").addEventListener("keyup", this._filterItems.bind(this, 'workout'));
      document.getElementById("reset").addEventListener('click', this._reset.bind(this));
      document.getElementById("limit-form").addEventListener("submit", this._setDailyLimit.bind(this));
    }
  
    _newItem(type, e) {
      e.preventDefault();
      const name = document.getElementById(`${type}-name`);
      const calories = document.getElementById(`${type}-calories`);
  
      if (name.value === "" || calories.value === "") {
        alert("All fields are required!");
        //why do we return statement over here?
        /* The return statement in this code is used to stop the execution of the function if the user does not enter a value for the name or calories field. This prevents the function from continuing to execute and potentially causing an error.
          By returning from the function early, the code can avoid performing unnecessary operations and ensure that the user is prompted to enter a value for both fields. This helps to ensure that the data entered by the user is valid and complete. */
        return;
      }
  
      if(type === 'meal'){
          const meal = new Meal(name.value, +calories.value);
          this._tracker.addMeals(meal);
      } else {
          const workout = new Workout(name.value, +calories.value);
          this._tracker.addWorkout(workout);
      }
      
      name.value = "";
      calories.value = "";
      
      const collapseItem = document.getElementById(`collapse-${type}`);
      const bsCollapse = new Collapse(collapseItem, {
          toggle: true
        });
    }
  
    _removeItem(type, e){
      if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')){
       if( confirm('Are you sure you want to delete it?')){
        //console.log(e.target.closest('.card').getAttribute('data-id'));
        const id = e.target.closest('.card').getAttribute('data-id');
        type === 'meal' ? this._tracker.removeMeal(id) : this._tracker.removeWorkout(id)
        e.target.closest('.card').remove();
       }
      }
    }
  
    _filterItems(type, e){
      const value = e.target.value.toLowerCase();
      console.log(value);
      document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
        console.log(item.firstElementChild.firstElementChild.firstElementChild.textContent);
        const name = item.firstElementChild.firstElementChild.firstElementChild.textContent;
        if(name.toLowerCase().indexOf(value) !== -1){
          item.style.display = 'block';
         } else {
          item.style.display = 'none';
         } 
      })
    }
  
    _reset(){
      document.getElementById("meal-items").innerHTML = "";
      document.getElementById("workout-items").innerHTML = "";
      document.getElementById("filter-meals").value = "";
      document.getElementById("filter-workouts").value = "";
      this._tracker.resetTrackcolorie();
    }
  
    _setDailyLimit(e){
      e.preventDefault();
      const limit = document.getElementById('limit');
      if(limit.value === "") {
        alert('Please add daliy calories limit number');
        return;
      }
      this._tracker.displayDailyLimitSet(+limit.value);
      limit.value = "";
  
      const modelEl = document.getElementById("limit-modal");
      const model = Modal.getInstance(modelEl);
      model.hide();
    }
  
  }
  
  const app = new App(); //will run the consturctor of App
  
  //console.log(app, 'app')
  
