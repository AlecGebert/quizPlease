window.onload = function () {
  
  var questionArea = document.getElementsByClassName('questions')[0],
      answerArea   = document.getElementsByClassName('answers')[0],
      checker      = document.getElementsByClassName('checker')[0],
      current      = 0,
      //count        = 0,

     imagesArea = document.getElementsByClassName('images')[0],

     allImages = { 'zhenshina-picasso.jpg': [], 
                   'fabrica.jpg': [], 
                   'Adele-Bloch-Bauer.png': [],
                   'Papa_Inocencio_X.jpg': [],
                   'ardeco.jpg': [],
                   'blaik.jpg': [],
                   'bosch.jpg': [],
                   'Raffaello.jpg': []

                 };

  var allQuestions = {
        'Кто написал картину «Женщина со скрещенными руками», которая в 2000 году была продана на аукционе за 38 миллионов фунтов стерлингов?' : ['Клод Моне', 'Винсент Ван Гог', 'Пабло Пикассо', 2],
        
        'Какой американский художник XX века работал в разных местах в Нью-Йорке, каждое из которых называлось «Фабрика»?' : ['Энди Уорхол', 'Жан Мишель Баския' , 'Кит Харинг', 0],
        
        'Портрет Адели Блох-Бауэр I» был продан в 2006 году на аукционе за 135 миллионов долларов. Какой австрийский художник написал его в 1907 году?' : ['Анри де Тулуз-Лотрек', 'Густав Климт', 'Сальвадор Дали', 1],

        'Какой испанский художник написал знаменитый «Портрет папы Иннокентия X?' : ['Диего Веласкес', 'Питер Пауль Рубенс', 'Рембрандт', 0],

        'Этот декоративный стиль, использовавшийся в архитектуре и дизайне 1920-х и 1940-х годов, получил свое название от Парижской выставки 1925 года. Как он называется?' : ['Ампир', 'Баухаус', 'Ар-деко', 2],
        
        'Какой английский художник работал над иллюстрациями к «Божественной комедии» Данте, когда тот умер в 1827 году?' : ['Уильям Хогарт', 'Эжен Делакруа', 'Уильям Блейк', 2],
        
        'Назовите художника, известного своими картинами на религиозные темы в стиле ночных кошмаров, такими как «Сад земных наслаждений' : ['Ян Ван Эйк', 'Иероним Босх', 'Питер Брейгель', 1],
                 
        'Какой итальянский художник эпохи Возрождения написал картину «Обручение Девы Марии»?' : ['Тициан', 'Рафаэль', 'Сандро Ботичелли', 1]
      };
      
  function loadQuestion(curr) {
  // Эта функция загружает все вопросы в questionArea
  // Она захватывает текущий (current) вопрос на основе "текущей" ('current') переменной.
  
    var question = Object.keys(allQuestions)[curr];
    
    questionArea.innerHTML = '';
    questionArea.innerHTML = question;    
  }

  function loadImages(curr) {
    // Эта функция загружает все картинки в imageArea
  
     var image = Object.keys(allImages)[curr];
     
       imagesArea.src = image;
     
  }
   
  
  function loadAnswers(curr) {
  // Эта функция загружает все возможне ответы на данный вопрос.
  // Она захватывает необходимый массив ответов с помощью текущей (curr) переменной.
  // Каждый ответ добавляется с помощью функции "onclick".
  
    var answers = allQuestions[Object.keys(allQuestions)[curr]];
    
    answerArea.innerHTML = '';
    
    for (var i = 0; i < answers.length -1; i += 1) {
      var createDiv = document.createElement('div'),
          text = document.createTextNode(answers[i]);
      
      createDiv.appendChild(text);      
      createDiv.addEventListener("click", checkAnswer(i, answers));
      
      
      answerArea.appendChild(createDiv);
    }

  }
  
  function checkAnswer(i, arr) {
    // Эта функция запускается, когда кликаешь на один из ответов
    // Проверяет правда ли что givenAnswer совпадает с правильным ответом
    // После этого проверяет: это последний вопрос?
    // После этого очищает answerArea и дает знать, что тест завершен.
    
    return function () {
      var givenAnswer = i,
          correctAnswer = arr[arr.length-1];
      
      if (givenAnswer === correctAnswer) {
        addChecker(true);             
      } else {
        addChecker(false);                        
      }
      
      if (current < Object.keys(allQuestions).length -1) {
        current += 1;
        
        loadQuestion(current);
        loadAnswers(current);
        loadImages(current);

      } else {
        questionArea.innerHTML = 'Конец викторины';
        answerArea.innerHTML = 'Ваш результат: ';
      }
                              
    };
  }
  
  function addChecker(bool) {
  // Эта функция добавляет div элемент на страницу.
  // Дает возможность проверить, правильный ответ или нет.
  
    var createDivR = document.createElement('div'),
        txtR       = document.createTextNode('Верно');
    var createDivW = document.createElement('div'),   
        txtW       = document.createTextNode('Неверно');
    
    createDivR.appendChild(txtR);
    createDivW.appendChild(txtW);
    
    if (bool) {
      
      createDivR.className += 'correct';
      checker.appendChild(createDivR);

    } else {
      createDivW.className += 'false';
      checker.appendChild(createDivW);
    }
  }
  
  
  // Запускаем игру:
  loadQuestion(current);
  loadAnswers(current);
  loadImages(current);
  
};