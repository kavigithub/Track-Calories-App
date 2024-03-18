import Storage from './Storage';

class CalorieTracker {
    constructor() {
      ///initial level when page load
      this._calorieLimit = Storage.getCaloryLimit();
      this._totolCalories = Storage.getTotalCalory();
      this._meals = Storage.getMeal();
      this._workouts = Storage.getWorkout();
  
      this._displayCalorieLimit(); //want to show on initial level (by default)and only when user change in form not called in render
      this._displayCaloriesTotal();
      this._displayCalorieConsumed();
      this._displayCalarieBurned();
      this._displayCalariesRemaining();
      this._displayCaloriesProgress();
  
      document.getElementById('limit').value = this._calorieLimit;
    }
  
    //Public Method...Public API which you can use outside of the class
    addMeals(meal) {
      this._totolCalories += meal.calories;
      this._meals.push(meal);
      console.log(this._meals);
      Storage.updateTotalCalories(this._totolCalories)
      Storage.setMeal(meal);
      this._displayNewMeal(meal);
      this._render();
    }
  
    addWorkout(workout) {
      this._totolCalories -= workout.calories;
      this._workouts.push(workout);
      Storage.updateTotalCalories(this._totolCalories);
      Storage.setWorkout(workout);
      this._displayNewWorkout(workout);
      this._render();
    }
  
    removeMeal(id){
       const index = this._meals.findIndex((meal) => meal.id === id);
        if(index !== -1){
          const meal = this._meals[index];
          this._totolCalories -= meal.calories;
          Storage.updateTotalCalories(this._totolCalories);
          this._meals.splice(index, 1)
          Storage.removeMeal(id)
          this._render();
        }
       console.log(this._meals);
    }
  
    removeWorkout(id){
      const index = this._workouts.findIndex((workout) => workout.id === id);
      if(index !== -1){
        const workout = this._workouts[index];
        this._totolCalories += workout.calories;
        //delete
        this._workouts.splice(index, 1);
        this._render();
      }
    }
  
    resetTrackcolorie(){
      this._totolCalories = 0;
      this._meals = [];
      this._workouts = [];
      Storage.clearItem();
      this._render();
    }
  
    displayDailyLimitSet(limit){
      this._calorieLimit = limit;
      Storage.setCaloriesLimit(limit);
      this._displayCalorieLimit();
      this._render();
    }
  
    loadItem(){
      this._meals.forEach((item) => this._displayNewMeal(item));
      this._workouts.forEach((workout) => this._displayNewWorkout(workout));
    }
  
    //Private methods
    _displayCaloriesTotal() {
      const totalCaloryElm = document.getElementById("calories-total");
      totalCaloryElm.innerHTML = this._totolCalories;
    }
  
    _displayCalorieLimit() {
      const colorieLimitElm = document.getElementById("calories-limit");
      colorieLimitElm.innerHTML = this._calorieLimit;
    }
  
    _displayCalorieConsumed() {
      const calaryConsumeElm = document.getElementById("calories-consumed");
  
      let calaryConsumeTotal = this._meals.reduce((previousVal, currentVal) => {
        return previousVal + currentVal.calories;
      }, 0);
      calaryConsumeElm.innerHTML = calaryConsumeTotal;
    }
  
    _displayCalarieBurned() {
      const calaryBurnElm = document.getElementById("calories-burned");
      let calaryBurnTotal = this._workouts.reduce((prevVal, curVal) => {
        return curVal.calories - prevVal;
      }, 0);
      calaryBurnElm.innerHTML = calaryBurnTotal;
    }
  
    _displayCalariesRemaining() {
      const calaryRemainingElm = document.getElementById("calories-remaining");
      let calorieRemainTotal = this._calorieLimit - this._totolCalories;
      const progressElm = document.getElementById("calorie-progress");
  
      calaryRemainingElm.innerHTML = calorieRemainTotal;
  
      if (calorieRemainTotal <= 0) {
        calaryRemainingElm.parentElement.parentElement.classList.remove(
          "bg-light"
        );
        calaryRemainingElm.parentElement.parentElement.classList.add("bg-danger");
        progressElm.classList.add("bg-danger");
        progressElm.classList.remove("bg-success");
      } else {
        calaryRemainingElm.parentElement.parentElement.classList.add("bg-light");
        calaryRemainingElm.parentElement.parentElement.classList.remove(
          "bg-danger"
        );
        progressElm.classList.remove("bg-danger");
        progressElm.classList.add("bg-success");
      }
    }
  
    _displayCaloriesProgress() {
      const progressElm = document.getElementById("calorie-progress");
      const percetage = (this._totolCalories / this._calorieLimit) * 100;
      const width = Math.min(percetage, 100);
      progressElm.style.width = `${width}%`;
    }
  
    _displayNewMeal(meal){
      const mealCard = document.getElementById('meal-items');
      const createMealCard = document.createElement('div');
      createMealCard.classList.add('card', 'my-2');
      createMealCard.setAttribute('data-id', meal.id);
      createMealCard.innerHTML = `<div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${meal.name}</h4>
        <div
          class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
        >
        ${meal.calories}
        </div>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>`;
    mealCard.appendChild(createMealCard);
    }
  
    _displayNewWorkout(workout){
      const workoutCard = document.getElementById('workout-items');
      const createWorkoutCard = document.createElement('div');
      createWorkoutCard.classList.add('card','my-2');
      createWorkoutCard.setAttribute('data-id', workout.id);
      createWorkoutCard.innerHTML = `<div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1"> ${workout.name}</h4>
        <div
          class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
        >
          ${workout.calories}
        </div>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>`;
    workoutCard.appendChild(createWorkoutCard);
    }
  
    _render() {
      //its while change the value after you fill the form and add in dom
      this._displayCaloriesTotal();
      this._displayCalorieConsumed();
      this._displayCalarieBurned();
      this._displayCalariesRemaining();
      this._displayCaloriesProgress();
    }
  }

  export default CalorieTracker;