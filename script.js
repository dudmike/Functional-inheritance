"use sctrict"
      //Класс родитель
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

      //Класс кофеварка
      function CoffeeMachine(power, waterAmount) {
        Machine.call(this);//Наследование
        var WATER_HEAT_CAPACITY = 4200;// Удельная теплоемкость воды
        var timerId;
        
        //Переопределение метода родителя
        var parentDisable = this.disable;
        this.disable = function() {
          parentDisable.call(this);
          clearTimeout(timerId);
        }

        //Вывести сообщение о результате
        function ready() {
          counter++;
          var elem = document.querySelectorAll('.coffee');
          if(this._enabled == false) {           
            elem[counter].innerHTML ='<h3>CoffeeMachine is off</h3>';
          } else {
            elem[counter].innerHTML ='<h3>Your coffee is ready!</h3>';
          }
             
        }

        //Расчет времени для кипячения
        function getBoilTime() {
          return waterAmount * WATER_HEAT_CAPACITY * 80 /power;
        }
        //Запустить кофеварку
        this.run = function() {
          var div=document.createElement('div');
          div.setAttribute('class', 'coffee');
          div.innerHTML = '<h3>Your coffee is prepairing. Please wait...</h3>';
          document.body.appendChild(div);
          timerId = setTimeout(ready.bind(this), getBoilTime() );
         
        }
      }

      //Класс холодильник
      function Fridge(power) {
        Machine.call(this);//Наследование

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

        //Посмотреть что в холодильнике
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

        //Отфильтровать еду в холодильнике
        this.filterFood = function(func) {
          var result = [];
          for(var i=0; i<food.length; i++) {
            if(func(food[i])) {
              result.push(food[i]);
            }
          }
          return result;
        }
        //Вывести результат фильтрации
        this.getFiltered = function(arr) {
          var h3 = document.createElement('h3');
          var str = '';
          for(var i=0; i<arr.length; i++) {        
            str += i==arr.length-1? arr[i] : arr[i] + ', ';          
          }
          h3.innerHTML = str;
          document.body.appendChild(h3);
        }

        //Удалить еду из холодильника
        this.removeFood = function(item) {
          for(var i = 0; i<food.length; i++) {
            if(food[i] == item) {
              food.splice(i, 1);
            }
          }
        }

        //Переопределение метода родителя
        var newDisable = this.disable;
        this.disable = function() {
          newDisable.call(this);
          if(this._enabled == false) {
            var h3 = document.createElement('h3');
            h3.innerHTML = 'Fridge is closed!';
            document.body.appendChild(h3);
          }
        }
        //Переопределение метода родителя
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

      var counter = -1;
      var coffeeMachine = new CoffeeMachine(10000, 200);
      coffeeMachine.enable();
      coffeeMachine.run();
      var coffeeMachine2 = new CoffeeMachine(8000, 200);
      coffeeMachine2.enable();
      coffeeMachine2.run();