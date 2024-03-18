class Storage {
    static getCaloryLimit(defaultCalorieLimit = 2500) {
        let calaryLimit;
        if(localStorage.getItem('calaryLimit') === null){
          calaryLimit = +defaultCalorieLimit;
        } else {
          calaryLimit = JSON.parse(+localStorage.getItem('calaryLimit'))
        }
        return calaryLimit;
    }
  
    static setCaloriesLimit(defaultCalory){
      localStorage.setItem('calaryLimit', defaultCalory);
    }
  
    static getTotalCalory(defaultTotalCalorie = 0){
      let calaryTotal;
      if(localStorage.getItem('calaryTotal') === null){
        calaryTotal = +defaultTotalCalorie;
      } else {
        calaryTotal = JSON.parse(+localStorage.getItem('calaryTotal'))
      }
      return calaryTotal;
    }
  
    static updateTotalCalories(calorie){
      localStorage.setItem('calaryTotal', calorie)
    }
  
    static getMeal(){
      let meals;
      if(localStorage.getItem('meals') === null){
        meals = [];
      } else {
        meals = JSON.parse(localStorage.getItem('meals'))
      }
      return meals
    }
  
    static setMeal(meal){
      console.log(meal);
      let getMeals = this.getMeal();
      getMeals.push(meal);
      localStorage.setItem('meals', JSON.stringify(getMeals))
    }
  
    static removeMeal(id){
      let getMealList = this.getMeal();
      getMealList.forEach((item, index) => {
        if(item.id === id){
          getMealList.splice(index, 1)
        }
      })
      localStorage.setItem("meals", JSON.stringify(getMealList));
    }
  
    static getWorkout(){
      let workout;
      if(localStorage.getItem('workout') === null){
        workout = [];
      } else {
        workout = JSON.parse(localStorage.getItem('workout'));
      }
      return workout;
    }
  
    static setWorkout(workout){
      const getWorkouts = this.getWorkout();
      getWorkouts.push(workout);
      localStorage.setItem('workout', JSON.stringify(getWorkouts));
    }
  
    static removeWorkout(id){
      let getWorkoutList = this.getWorkout();
      getWorkoutList.forEach((item, index) => {
        if(item.id === id){
          getWorkoutList.splice(index, 1);
        }
      });
      localStorage.setItem('workout', JSON.stringify(getWorkoutList));
    }
  
    static clearItem(){
      localStorage.clear();
  
      /* localStorage.removeItem('meals');
      localStorage.removeItem('workout');
      localStorage.removeItem('calaryTotal'); */
    }
  
  }

  export default Storage;