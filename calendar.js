var cal = {
  mName : ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"], // Month Names
  mName2 : ["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"],
  laikai: ["9:00", "9:15", "9:30", "9:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45",  "15:00", "15:15", "15:30", "15:45",  "16:00", "16:15", "16:30", "16:45",  "17:00", "17:15", "17:30", "17:45",  "18:00", "18:15", "18:30", "18:45",  "19:00", "19:15", "19:30", "19:45",  "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45"],
  uzimtiLaikai : function(d, m) {
    var uzimtiLaikai = [];
    if(json.reservation.menesis[m]){
        if( json.reservation.menesis[m].diena[d] ){
        var kiekis = json.reservation.menesis[m].diena[d].length;
        for (var b = 0; b < kiekis; b++) {
            uzimtiLaikai.push(json.reservation.menesis[m].diena[d][b].laikas);
        }
      }
    }
    return uzimtiLaikai;
  },
  reservationDone : false,
  reservationData : {
    vardas: "",
    diena: 0,
    menesis: 0,
    laikas: ""
  },
  reservationForm : function(){
    var rezervacija = document.getElementById("rezervacija");

    var rezervacijaTekstas = document.createElement("div");
    rezervacijaTekstas.id = "rezervacija2";

    rezervacijaTekstas.classList.add("container", "bg-light", "pt-0", "rounded", "pb-2", "pt-2", "mt-2", "w3-animate-opacity");
    rezervacijaTekstas.innerHTML = "<div class='d-inline-block align-middle'>Sveiki <b>" + cal.reservationData.vardas + "</b>!<br>Jūsų rezervacija atlikta " + cal.mName2[cal.reservationData.menesis] + " " + cal.reservationData.diena + " d. " + cal.reservationData.laikas + " valandą!</div>" ;

    var reservacijaCancel = document.createElement("div");
    reservacijaCancel.classList.add("float-right", "mt-1");
    reservacijaCancel.innerHTML = "<button class='btn btn-secondary'>Atšaukti rezervacija!</button>";
    reservacijaCancel.addEventListener("click", cal.reservationDelete);

    rezervacijaTekstas.appendChild(reservacijaCancel);

    rezervacija.appendChild(rezervacijaTekstas);
  },
  reservationDelete: function(){
    cal.reservationDone = false;
    var res = json.reservation.menesis[cal.reservationData.menesis].diena[cal.reservationData.diena];
    var rastiLaika = "";

    for(var e = 0; e < res.length; e++)
    {
      if(res[e].laikas == cal.reservationData.laikas)
      {
        rastiLaika = e;
      }
    }

    var newReser = [];

    for(var e = 0; e < res.length; e++)
    {
      if(e !== rastiLaika)
      {
        newReser.push(json.reservation.menesis[cal.reservationData.menesis].diena[cal.reservationData.diena][e]);
      }
    }

    json.reservation.menesis[cal.reservationData.menesis].diena[cal.reservationData.diena] = newReser;
    document.getElementById("rezervacija2").outerHTML = "";
    cal.list();

  },
  sDay : 0, // Current selected day
  sMth : 0, // Current selected month
  sYear : 0, // Current selected year
  currentDay : 0,
  currentMth : 0,
  createPage: function(){
      document.getElementById("page").innerHTML = "";

      // Sukuriami visi puslapio elementai
      var page = document.getElementById("page");

      var reserv = document.createElement("div");
      reserv.id = "rezervacija"

      var pasisveikinimas = document.createElement("div");
      pasisveikinimas.classList.add("container", "bg-light", "p-2", "rounded", "mt-2", "w3-animate-opacity")
      pasisveikinimas.id = "pasisveikinimas";
      pasisveikinimas.innerHTML = "<div class='text-dark text-justify p-2'><b>INFORMACIJA,</b><br>Kirpėja dažnai negali priimti rezervacijų telefonu, todėl jūsų patogumui sukūrėme rezervacijos kalendorių. Apačioje pateiktame kalendoriuje galite atlikti rezervaciją internetu. Pasirinkite norimą datą, pilkai pažymėtos datos jau yra praėjusios, o prie datų kur yra užrašas vietų nėrą reiškia, kad tą dieną visa užimta, visuose baltuose langeliuose galima atlikti rezervaciją. Paspaudos ant norimus datos išmes rezervacijos laukelį, įrašę savo vardą ir pasirinkę norimą laiką, paspauskit mygtuką rezervuoti. Sistema leidžia pasirinkti tik laikus kurie yra laisvi, jei ta dieną nėra laisvų laikų kurie jums tiktų prašome pasirinkti kitą dieną. Rezervacija galima atlikti tik vieną kartą, atlikus rezervacija atsiras viršuje langelis, kuris informuos jus apie atlikta rezervaciją ir jos laiką, apsigalvojus visada galima atšaukti rezervacija ir atlikti ją pakartotinai.</div>";

      var calendorOutside = document.createElement("div");
      calendorOutside.classList.add("container", "bg-light", "p-0", "rounded", "m-0", "w3-animate-opacity")

      var selector = document.createElement("div");
      selector.id = "selector";
      selector.classList.add("float-left", "mt-2");
      selector.setAttribute("style", "margin-left: 12px;");

      var inputGroup = document.createElement("div");
      inputGroup.classList.add("input-group");

      var inputGroupPrepend = document.createElement("div");
      inputGroupPrepend.classList.add("input-group-prepend");

      var label = document.createElement("label");
      label.classList.add("input-group-text", "fas", "fa-calendar-alt");

      var select = document.createElement("select");
      select.classList.add("form-control");
      select.id = "month";
      select.addEventListener("change", function(){
        cal.list();
      });

      inputGroupPrepend.appendChild(label);
      inputGroup.appendChild(inputGroupPrepend);
      inputGroup.appendChild(select);
      selector.appendChild(inputGroup);

      var tekstas = document.createElement("div");
      tekstas.classList.add("float-right", "h5", "mt-3", "mr-4");
      tekstas.innerHTML = "Rezervacijos kalendorius";

      var calendor = document.createElement("div");
      calendor.id = "container";
      calendor.classList.add("p-0", "my-2")

      calendorOutside.appendChild(selector);
      calendorOutside.appendChild(tekstas);
      calendorOutside.appendChild(calendor);

      var eventas = document.createElement("div");
      eventas.id = "event";

      page.appendChild(reserv);
      page.appendChild(pasisveikinimas);
      page.appendChild(calendorOutside);
      page.appendChild(eventas);

      // DATE NOW
      var now = new Date(),
          nowMth = now.getMonth(),
          nowYear = parseInt(now.getFullYear());

      // APPEND MONTHS
      var mth = document.getElementById("month");
      for (var i = nowMth; i < 12; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = cal.mName[i];
        if (i==nowMth) {
          opt.selected = true;
        }
        month.appendChild(opt);
      }


      cal.list();

      if(cal.reservationDone)
      {
        cal.reservationForm();
      }

  },
  list : function () {

    // BASIC CALCULATIONS
    cal.currentDay = new Date().getUTCDate();
    cal.currentMth = new Date().getMonth();
    cal.sMth = parseInt(document.getElementById("month").value); //paimama verte koks nustatytas menesis
    cal.sYear = 2019; //paimama verte kokie nustatyti metai

    var daysInMth = new Date(cal.sYear, cal.sMth+1, 0).getDate(), //apskaiciuojama kiek dienu menesyje
        startDay = new Date(cal.sYear, cal.sMth, 0).getDay(),     //apskaiciuojama kelintadieni prasideda menesis
        endDay = new Date(cal.sYear, cal.sMth, daysInMth-1).getDay(); //apskaiciuojama kelintadieni pasibaigia menesis


    // DRAWING CALCULATION
    // Determine the number of blank squares before start of month
    var squares = [];
    if (startDay != 0) {
      for (var i=0; i<startDay; i++) {
        squares.push("b");
      }
    }

    // Populate the days of the month
    for (var i=1; i<=daysInMth; i++) {
      squares.push(i);
    }

    // Determine the number of blank squares after end of month
    if (endDay != 6) {
      var blanks = endDay == 0 ? 6 : 6-endDay;
      for (var i=0; i<blanks; i++) {
        squares.push("b");
      }
    }

    // DRAW
    // Container & Table
    var container = document.getElementById("container"),
        cTable = document.createElement("table"),
        aroundTable = document.createElement("div");

    container.classList.add("w3-animate-opacity");
    aroundTable.classList.add("mx-1", "pb-3");
    cTable.id = "calendar";
    cTable.classList.add("m-0");

    container.innerHTML = "";
    aroundTable.appendChild(cTable);
    container.appendChild(aroundTable);

    // First row - Days
    var cRow = document.createElement("tr"),
        cCell = null,
        days = ["Pirm", "Ant", "Tre", "Ket", "Penk", "Šeš", "Sek"];
    for (var d of days) {
      cCell = document.createElement("td");
      cCell.innerHTML = d;
      cRow.appendChild(cCell);
    }
    cRow.classList.add("day");
    cTable.appendChild(cRow);


    // Days in Month
    var total = squares.length;

    cRow = document.createElement("tr");

    for (var i=0; i<total; i++) {
      cCell = document.createElement("td");
      if (squares[i]=="b") {
        cCell.classList.add("blank");
      } else {

        if(squares[i] < cal.currentDay && cal.sMth <= cal.currentMth) {
          cCell.classList.add("past");
        }
        else if (squares[i] == cal.currentDay && cal.sMth == cal.currentMth)  {
          cCell.classList.add("current");
        }
        else {
          cCell.classList.add("exist");
        }

        cCell.innerHTML = "<b><div class='ddd'>"+squares[i]+"</div></b>";

        var button = document.createElement("button");
        button.classList.add("btn", "btn-sm", "btn-outline-secondary", "mt-1", "rezervuotis");

        var att = document.createAttribute("diena");
        att.value = squares[i];
        button.setAttributeNode(att);

        button.innerHTML = "Rezervuotis";

        button.addEventListener("click", function(){
          cal.sDay = this.getAttribute("diena");
          cal.show(this);
        });

        var neraVietu = document.createElement("div");
        neraVietu.classList.add("text-danger");
        neraVietu.innerHTML = "Nėra vietų!";

        var uzimtiLaikai = cal.uzimtiLaikai(squares[i], cal.sMth);


        //tikrinam kiek laisvu laiku dar like siandien
        if(squares[i] == cal.currentDay && cal.sMth == cal.currentMth)
        {
          var event = new Date();
          var laikasNow = event.toLocaleTimeString('it-IT', {hour: 'numeric', minute:'numeric', hour12: false, timeZone: "Europe/Vilnius" });
          var skaicius = 0;
          var skaicius2 = 0;
          var uz = json.reservation.menesis[cal.sMth].diena[squares[i]];

          for(var c = 0; c < cal.laikai.length; c++)
          {
            if( new Date ('1/1/1999 ' + laikasNow) < new Date ('1/1/1999 ' + cal.laikai[c]) )
            {
              skaicius++;
            }
          }
          if(uz)
          {
            for(var d = 0; d < uz.length; d++)
            {
              if( new Date ('1/1/1999 ' + laikasNow) < new Date ('1/1/1999 ' + uz[d].laikas) )
              {

                skaicius2++;
              }
            }

          }

        }

        //tikriname ar nera atliktu jau rezervaciju
        if(!cal.reservationDone)
        {
          //tikrinam ar dar yra laisvu laiku
          if(squares[i] == cal.currentDay && cal.sMth == cal.currentMth)
          {
            if((skaicius - skaicius2) !== 0)
            {
              cCell.appendChild(button);
            }
            else {
              cCell.appendChild(neraVietu);
            }
          }
          else
          {
            if(uzimtiLaikai.length > 51)
            {
              cCell.appendChild(neraVietu);
            }
            else
            {
              if(squares[i] > cal.currentDay-1 || cal.sMth > cal.currentMth)
              {
                  cCell.appendChild(button);
              }
            }
          }
        }
        else{
        }

      }
      cRow.appendChild(cCell);
      if (i!=0 && (i+1)%7==0) {
        cTable.appendChild(cRow);
        cRow = document.createElement("tr");
      }

    }


  },

  show : function () {



      var form = document.createElement("div");
      form.classList.add("text-center");

      var formDate = document.createElement("div")
      formDate.innerHTML = "<h3>" + cal.mName2[cal.sMth] + " " + cal.sDay + " d. </h3>";

      var formName = document.createElement("div");
      formName.classList.add("form-group", "m-0", "text-left");
      formName.innerHTML = "<label>Vardas:</label><input maxlength='30' id='name' class='form-control'>";

      var formLaikai = document.createElement("div");
      formLaikai.classList.add("form-group", "m-0", "mt-2", "text-left");
      formLaikai.innerHTML = "<label>Galimi laisvi laikai:</label>";

      var formSelect = document.createElement("select");
      formSelect.id = "select";
      formSelect.classList.add("form-control");


      var uzimtiLaikai = cal.uzimtiLaikai(cal.sDay, cal.sMth);

      var event = new Date();

      var laikasNow = event.toLocaleTimeString('it-IT', {hour: 'numeric', minute:'numeric', hour12: false, timeZone: "Europe/Vilnius" });


      for (var i = 0; i < cal.laikai.length; i++) {

              var timeCheker;

              //tikrina ar pasirinkta sita diena ir menesis
              if(cal.sDay == cal.currentDay && cal.sMth == cal.currentMth){
                timeCheker = new Date ('1/1/1999 ' + laikasNow) < new Date ('1/1/1999 ' + cal.laikai[i]);
              }else{
                timeCheker = true;
              }

              //tikrina uzimtus laikus ir laikus kurie jau praejo
              if( uzimtiLaikai.includes(cal.laikai[i]) === false && timeCheker)
              {

                var opt = document.createElement("option");
                opt.innerHTML = cal.laikai[i];
                formSelect.appendChild(opt);

              }

      }

      var formButton = document.createElement("button");
      formButton.classList.add("btn", "btn-dark", "mt-3", "text-center");
      formButton.addEventListener("click", cal.save);
      formButton.innerHTML = "Rezervuoti!";

      form.appendChild(formDate);
      form.appendChild(formName);
      form.appendChild(formLaikai);
      form.appendChild(formSelect);
      form.appendChild(formButton);


    var eForm = document.createElement("div");

    eForm.classList.add("container", "bg-light", "pt-0", "rounded", "pb-2", "pt-2", "mt-2", "mb-2", "w3-animate-opacity");
    eForm.id = "form"
    eForm.appendChild(form);

    var container = document.getElementById("event");
    container.innerHTML = "";
    container.appendChild(eForm);

    window.scrollTo(0, document.body.scrollHeight);

  },

  save : function (evt) {

    var name = document.getElementById("name").value;
    var selectDate = document.getElementById("select").value;

    if(name !== ""){
      if(json.reservation.menesis[cal.sMth].diena[cal.sDay])
      {
        var sendData = {vardas: name, laikas: selectDate};
        var collect = json.reservation.menesis[cal.sMth].diena[cal.sDay];
        collect.push(sendData);
        json.reservation.menesis[cal.sMth].diena[cal.sDay] = collect;
      }
      else {
        var collect = json.reservation.menesis[cal.sMth].diena;
        var sendData = { [cal.sDay]: [{vardas: name, laikas: selectDate}] };
        var finalObj = Object.assign(collect, sendData)
        json.reservation.menesis[cal.sMth].diena = finalObj;
      }

    cal.reservationData.vardas = name;
    cal.reservationData.laikas = selectDate;
    cal.reservationData.diena = cal.sDay;
    cal.reservationData.menesis = cal.sMth;
    cal.reservationDone = true;

    cal.list();
    cal.reservationForm();
    document.getElementById("form").outerHTML = "";

    }else{
      document.getElementById('name').style.borderColor = "#dc3546";
      document.getElementById('name').placeholder = "Neįrašėte Vardo!";
    }


  }
};

window.addEventListener("load", function () {

  cal.createPage();

});
