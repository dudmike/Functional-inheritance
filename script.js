"use sctrict"
      function Machine(power) {
        this._power = power;
        this._enabled = false;

        var self = this;

        self.enable = function() {
          self._enabled = true;
        }

        self.disable = function() {
          self._enabled = false;
        }
      }

      function CoffeeMachine(power, waterAmount) {
        Machine.call(this);
        var WATER_HEAT_CAPACITY = 4200;
        var timerId;

        var parentDisable = this.disable;
        this.disable = function() {
          parentDisable.call(this);
          clearTimeout(timerId);
        }

        function ready() {
          if(this._enabled == false) {
            alert('Error: CoffeeMachine is off');
          } else alert('Coffee is ready!');
        }

        function getBoilTime() {
          return waterAmount * WATER_HEAT_CAPACITY * 80 /power;
        }

        this.run = function() {
          timerId = setTimeout(ready.bind(this), getBoilTime() );  
        }
      }


      function Fridge(power) {
        Machine.call(this);

        var food = [];

        this.addFood = function(item) {
          var h3 = document.createElement('h3');
          if(this._enabled == false) {
            h3.innerHTML = 'Fridge is closed!';
          } else if(power/100 < arguments.length || power/100 - food.length < arguments.length) {
             h3.innerHTML = 'Fridge is full!';
          } else {
            for(var i = 0; i< arguments.length; i++) {
              food.push(arguments[i]);
            }
          };
           document.body.appendChild(h3);

        }

        this.getFood = function() {
          var resultArr = food.concat();
          var str='';
          for(var i=0;i<resultArr.length;i++) {
            str += i==resultArr.length-1? resultArr[i] : resultArr[i] + ', ';
          }
          var h3 = document.createElement('h3');
          h3.innerHTML = 'Food in your fridge: ' + str;
          document.body.appendChild(h3);
        }

        this.filterFood = function(func) {
          var result = [];
          for(var i=0; i<food.length; i++) {
            if(func(food[i])) {
              result.push(food[i]);
            }
          }
          return result;
        }

        this.getFiltered = function(arr) {
          var h3 = document.createElement('h3');
          var str = '';
          for(var i=0; i<arr.length; i++) {        
            str += i==arr.length-1? arr[i] : arr[i] + ', ';          
          }
          h3.innerHTML = str;
          document.body.appendChild(h3);
        }

        this.removeFood = function(item) {
          for(var i = 0; i<food.length; i++) {
            if(food[i] == item) {
              food.splice(i, 1);
            }
          }
        }

        var newDisable = this.disable;
        this.disable = function() {
          newDisable.call(this);
          if(this._enabled == false) {
            var h3 = document.createElement('h3');
            h3.innerHTML = 'Fridge is closed!';
            document.body.appendChild(h3);
          }
        }
        var newEnable = this.enable;
        this.enable = function() {
          newEnable.call(this);
          if(this._enabled == true) {
            var h3 = document.createElement('h3');
            h3.innerHTML = 'Fridge is opened!';
            document.body.appendChild(h3);
          }
        }

      }
      var fridge = new Fridge(500);
      fridge.enable();
      fridge.addFood('Salat', 'Sausage', 'Tomato');
      fridge.addFood('Bacon');
      fridge.getFood();

      var filtered = fridge.filterFood(function (string) {
        return string.substring(0, 2) == 'Sa';
      });
      fridge.getFiltered(filtered);

      fridge.removeFood('Salat');
      fridge.getFood();
      fridge.addFood('Pepperoni');
      fridge.addFood('Ketchup', 'Cheese');
      fridge.disable();
      fridge.addFood('Pepper');
      fridge.enable();


      var coffeeMachine = new CoffeeMachine(10000, 200);
      coffeeMachine.enable();
      coffeeMachine.run();