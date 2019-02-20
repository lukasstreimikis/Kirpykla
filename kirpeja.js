var kirpeja = {
    patvirtinimas: false,
    searchTable: {
      sMonth: 0,
      sDay: 0,
      sTime: 0
    },
    newRes: {
      sMonth: 0,
      sDay: 0,
      sTime: 0,
      vardas: ""
    },
    patvirtinti: function (){
      if(!kirpeja.patvirtinimas)
      {
          var retVal = prompt("Prašome įvesti slaptažodį: ", "");

          if (retVal !== null)
          {
            if(retVal === "admin")
            {
              kirpeja.patvirtinimas = true;
              cal.pageCreated = false;
              kirpeja.createPage();
            }
            else
            {
              alert("Neteisingas slaptažodis!")
            }
          }
      }else {
        cal.pageCreated = false;
        kirpeja.createPage();
      }
    },
    createPage: function() {


        document.getElementById("page").innerHTML = "";

        kirpeja.searchTable.sMonth = cal.currentMth;
        kirpeja.searchTable.sDay = cal.currentDay;
        kirpeja.searchTable.sTime = -1;

        kirpeja.newRes.sMonth = cal.currentMth;
        kirpeja.newRes.sDay = cal.currentDay;
        kirpeja.newRes.sTime = -1;
        kirpeja.newRes.vardas = "";

        var page = document.getElementById('page');

        var firstContainer = document.createElement("div");
        firstContainer.classList.add("container", "bg-light", "px-0", "rounded", "pb-2", "mt-2", "w3-animate-opacity");

        var text2 = document.createElement("div");
        text2.classList.add("m-0", "text-light", "bg-green", "rounded-top", "py-2", "mb-3");
        text2.innerHTML = "<div class='ml-3'><b>Naujų rezervacijų įvedimas</b></div>"

        var container = document.createElement("div");
        container.classList.add("container", "bg-light", "px-0", "rounded", "pb-2", "mt-2", "mb-5", "w3-animate-opacity");

        var text = document.createElement("div");
        text.classList.add("m-0", "text-light", "bg-green", "rounded-top", "py-2", "mb-3");
        text.innerHTML = "<div class='ml-3'><b>Rezervacijų paieška/atšaukimas</b></div>"

        var select = document.createElement("select");
        select.classList.add("form-control");

        var overTable  = document.createElement("div");
        overTable.classList.add("mx-3");

        var table = document.createElement("table");
        table.classList.add("table");
        table.id = "search";
        var thead = document.createElement("thead");
        thead.classList.add("thead", "bg-green");
        thead.innerHTML = "<tr class='text-light'><th style='text-align: center;'>#</th><th style='text-align: center;'>Kliento vardas</th><th style='text-align: center;'>Rezervacijos laikas</th><th style='text-align: center;'>Atšaukti</th></tr>"

        var tbody = document.createElement("tbody");
        tbody.id = "paieskosRes";

        var alert3 = document.createElement("center");
        alert3.id = "alert3";

        table.appendChild(thead);
        table.appendChild(tbody);
        overTable.appendChild(table);

        container.appendChild(text);
        container.appendChild(kirpeja.createTimePicker());
        container.appendChild(overTable);
        container.appendChild(alert3);

        firstContainer.appendChild(text2);
        firstContainer.appendChild(kirpeja.createTimePicker2());

        page.appendChild(firstContainer);
        page.appendChild(container);

        kirpeja.updateTimePicker2();
        kirpeja.updateTime();
        kirpeja.updateTable();

        var optionValue = document.getElementById("laikas2");
        if(optionValue.length !== 0)
        {
          kirpeja.newRes.sTime = Number(optionValue.options[optionValue.selectedIndex].value);
        }else{
          kirpeja.newRes.sTime = -1;
        }

    },
    createTimePicker: function() {

      //menesis
      var inputGroup = document.createElement("div");
      inputGroup.classList.add("input-group");

      var inputGroupPrepend = document.createElement("div");
      inputGroupPrepend.classList.add("input-group-prepend");

      var label = document.createElement("label");
      label.classList.add("input-group-text", "far", "fa-calendar-alt");

      var select = document.createElement("select");
      select.classList.add("form-control");
      select.id = "month";
      select.addEventListener("change", function(){
        kirpeja.searchTable.sMonth = Number(this.options[this.selectedIndex].value);
        kirpeja.searchTable.sDay = 1;
        kirpeja.updateTimePicker();
      });

      var now = new Date(),
          nowMth = now.getMonth();

      for (var i = nowMth; i < 12; i++) {
            var opt = document.createElement("option");
            opt.value = i;
            opt.innerHTML = cal.mName[i];
            select.appendChild(opt);
      }

      //diena
      var inputGroupD = document.createElement("div");
      inputGroupD.classList.add("input-group");

      var inputGroupPrependD = document.createElement("div");
      inputGroupPrependD.classList.add("input-group-prepend");

      var labelD = document.createElement("label");
      labelD.classList.add("input-group-text", "far", "fa-calendar-check");

      var selectD = document.createElement("select");
      selectD.classList.add("form-control");
      selectD.id = "diena";
      selectD.addEventListener("change", function(){
        kirpeja.searchTable.sDay = Number(this.options[this.selectedIndex].value);
      });

      var now = new Date();
      var daysInMth = new Date(2019, kirpeja.searchTable.sMonth+1, 0).getDate()

      for (var c = 0; c < daysInMth; c++) {
            var optD = document.createElement("option");
            optD.value = c+1;
            optD.innerHTML = c+1;
            if (c==cal.currentDay-1) {
              optD.selected = true;
            }
            selectD.appendChild(optD);

      }

      //laikas
      var inputGroupL = document.createElement("div");
      inputGroupL.classList.add("input-group");

      var inputGroupPrependL = document.createElement("div");
      inputGroupPrependL.classList.add("input-group-prepend");

      var labelL = document.createElement("label");
      labelL.classList.add("input-group-text", "far", "fa-clock");

      var selectL = document.createElement("select");
      selectL.classList.add("form-control");
      selectL.addEventListener("change", function(){
        kirpeja.searchTable.sTime = Number(this.options[this.selectedIndex].value);
      });

      var now = new Date(),
          nowMth = now.getMonth();

      for (var i = -1; i < cal.laikai.length; i++) {

            var optL = document.createElement("option");
            optL.value = i;
            if(i === -1){
              optL.innerHTML = "visi";
            }
            else{
              optL.innerHTML = cal.laikai[i];
            }
            selectL.appendChild(optL);
      }



      inputGroupPrepend.appendChild(label);
      inputGroup.appendChild(inputGroupPrepend);
      inputGroup.appendChild(select);

      inputGroupPrependD.appendChild(labelD);
      inputGroupD.appendChild(inputGroupPrependD);
      inputGroupD.appendChild(selectD);

      inputGroupPrependL.appendChild(labelL);
      inputGroupL.appendChild(inputGroupPrependL);
      inputGroupL.appendChild(selectL);

      var data = document.createElement("div");
      data.classList.add("form-row", "mx-2");

      var data1 = document.createElement("div");
      data1.classList.add("col-md-4", "mb-3");
      var data2 = document.createElement("div");
      data2.classList.add("col-md-3", "mb-3");
      var data3 = document.createElement("div");
      data3.classList.add("col-md-3", "mb-3");
      var data4 = document.createElement("div");
      data4.classList.add("col-md-2", "mb-3");

      var button = document.createElement("button");
      button.classList.add("btn", "btn-secondary");
      button.innerHTML = "Ieškoti";
      button.addEventListener("click", kirpeja.updateTable);

      data1.appendChild(inputGroup);
      data2.appendChild(inputGroupD);
      data3.appendChild(inputGroupL);
      data4.appendChild(button);

      data.appendChild(data1);
      data.appendChild(data2);
      data.appendChild(data3);
      data.appendChild(data4);

      return data;

    },
    createTimePicker2: function() {

      //menesis
      var inputGroup = document.createElement("div");
      inputGroup.classList.add("input-group");

      var inputGroupPrepend = document.createElement("div");
      inputGroupPrepend.classList.add("input-group-prepend");

      var label = document.createElement("label");
      label.classList.add("input-group-text", "far", "fa-calendar-alt");

      var select = document.createElement("select");
      select.classList.add("form-control");
      select.id = "month2";
      select.addEventListener("change", function(){
        kirpeja.newRes.sMonth = Number(this.options[this.selectedIndex].value);
        if(kirpeja.newRes.sMonth == cal.currentMth){
          kirpeja.newRes.sDay = cal.currentDay;
        }else{
          kirpeja.newRes.sDay = 1;
        }
        kirpeja.updateTimePicker2();
        kirpeja.updateTime();
        var optionValue = document.getElementById("laikas2");
        if(optionValue.length !== 0)
        {
          kirpeja.newRes.sTime = Number(optionValue.options[optionValue.selectedIndex].value);
        }else{
          kirpeja.newRes.sTime = -1;
        }
      });

      var now = new Date(),
          nowMth = now.getMonth();

      for (var i = nowMth; i < 12; i++) {
            var opt = document.createElement("option");
            opt.value = i;
            opt.innerHTML = cal.mName[i];
            select.appendChild(opt);
      }

      //diena
      var inputGroupD = document.createElement("div");
      inputGroupD.classList.add("input-group");

      var inputGroupPrependD = document.createElement("div");
      inputGroupPrependD.classList.add("input-group-prepend");

      var labelD = document.createElement("label");
      labelD.classList.add("input-group-text", "far", "fa-calendar-check");

      var selectD = document.createElement("select");
      selectD.classList.add("form-control");
      selectD.id = "diena2";
      selectD.addEventListener("change", function(){
        kirpeja.newRes.sDay = Number(this.options[this.selectedIndex].value);
        kirpeja.updateTime();
        var optionValue = document.getElementById("laikas2");
        if(optionValue.length !== 0)
        {
          kirpeja.newRes.sTime = Number(optionValue.options[optionValue.selectedIndex].value);
        }else{
          kirpeja.newRes.sTime = -1;
        }

      });

      //laikas
      var inputGroupL = document.createElement("div");
      inputGroupL.classList.add("input-group");

      var inputGroupPrependL = document.createElement("div");
      inputGroupPrependL.classList.add("input-group-prepend");

      var labelL = document.createElement("label");
      labelL.classList.add("input-group-text", "far", "fa-clock");

      var selectL = document.createElement("select");
      selectL.classList.add("form-control");
      selectL.id = "laikas2";
      selectL.addEventListener("change", function(){
        kirpeja.newRes.sTime = Number(this.options[this.selectedIndex].value);
      });


      inputGroupPrepend.appendChild(label);
      inputGroup.appendChild(inputGroupPrepend);
      inputGroup.appendChild(select);

      inputGroupPrependD.appendChild(labelD);
      inputGroupD.appendChild(inputGroupPrependD);
      inputGroupD.appendChild(selectD);

      inputGroupPrependL.appendChild(labelL);
      inputGroupL.appendChild(inputGroupPrependL);
      inputGroupL.appendChild(selectL);

      var data = document.createElement("div");
      data.classList.add("form-row", "mx-3");

      var data1 = document.createElement("div");
      data1.classList.add("col-md-4", "mb-3");
      var data2 = document.createElement("div");
      data2.classList.add("col-md-4", "mb-3");
      var data3 = document.createElement("div");
      data3.classList.add("col-md-4", "mb-3");
      var data4 = document.createElement("div");
      //data4.classList.add("col-md-2", "mb-3");

      var button = '<div class="form-inline"><div class="form-group input-group ml-1 mr-sm-1 mb-2"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1"><i class="fas fa-user mr-2"></i> Kliento vardas:</span></div><input maxlength="30" oninput="kirpeja.input()" class="form-control" id="vardas"></div><button onclick="kirpeja.submit()" class="btn btn-secondary mb-2 ml-1">Išsaugoti</button><div class="ml-3" id="alertAround"><div id="alert"></div></div></div>';
      //var button = document.createElement("button");
    //  button.classList.add("btn", "btn-secondary");
      //button.innerHTML = "Ieškoti";
    //  button.addEventListener("click", kirpeja.updateTable);

      data1.appendChild(inputGroup);
      data2.appendChild(inputGroupD);
      data3.appendChild(inputGroupL);
      data4.innerHTML = button;

      data.appendChild(data1);
      data.appendChild(data2);
      data.appendChild(data3);
      data.appendChild(data4);

      return data;

    },
    updateTimePicker: function() {
      document.getElementById("diena").innerHTML = "";

      var now = new Date();
      var daysInMth = new Date("2019", kirpeja.searchTable.sMonth+1, 0).getDate();

      for (var c = 0; c < daysInMth; c++) {
            var optD = document.createElement("option");
            optD.value = c+1;
            optD.innerHTML = c+1;
            document.getElementById("diena").appendChild(optD);

      }
    },
    updateTimePicker2: function() {

      document.getElementById("diena2").innerHTML = "";

      var now = new Date();
      var daysInMth = new Date("2019", kirpeja.newRes.sMonth+1, 0).getDate();

      for (var c = 0; c < daysInMth; c++) {
            if(kirpeja.newRes.sMonth === cal.currentMth)
            {
              if(c >= cal.currentDay-1)
              {
                var optD = document.createElement("option");
                optD.value = c+1;
                optD.innerHTML = c+1;
                document.getElementById("diena2").appendChild(optD);
              }
            }
            else
            {
              var optD = document.createElement("option");
              optD.value = c+1;
              optD.innerHTML = c+1;
              document.getElementById("diena2").appendChild(optD);
            }

      }
    },
    updateTime: function() {
      document.getElementById("laikas2").innerHTML = "";
      var uzimtiLaikai = cal.uzimtiLaikai(kirpeja.newRes.sDay, kirpeja.newRes.sMonth);
      var timeCheker;
      var event = new Date();
      var laikasNow = event.toLocaleTimeString('it-IT', {hour: 'numeric', minute:'numeric', hour12: false, timeZone: "Europe/Vilnius" });

      for (var i = 0; i < cal.laikai.length; i++) {

        //tikrina ar pasirinkta sita diena ir menesis
        if(kirpeja.newRes.sDay == cal.currentDay && kirpeja.newRes.sMonth == cal.currentMth){
          timeCheker = new Date ('1/1/1999 ' + laikasNow) < new Date ('1/1/1999 ' + cal.laikai[i]);
        }else{
          timeCheker = true;
        }

        if( uzimtiLaikai.includes(cal.laikai[i]) === false && timeCheker)
        {

          var opt = document.createElement("option");
          opt.innerHTML = cal.laikai[i];
          opt.value = i;
          document.getElementById("laikas2").appendChild(opt);

        }

      }
        var optionValue = document.getElementById("laikas2");
        if(optionValue.length !== 0)
        {
          kirpeja.newRes.sTime = Number(optionValue.options[optionValue.selectedIndex].value);
        }else{
          kirpeja.newRes.sTime = -1;
        }
    },
    updateTable: function() {

      var search = document.getElementById('search');
      var searchTBody = document.getElementById('paieskosRes');
      var tbodyNew = document.createElement("tbody");
      tbodyNew.classList.add("w3-animate-opacity");
      tbodyNew.id = "paieskosRes";


      if(json.reservation.menesis[kirpeja.searchTable.sMonth].diena[kirpeja.searchTable.sDay]){

         var info = json.reservation.menesis[kirpeja.searchTable.sMonth].diena[kirpeja.searchTable.sDay];

         if(kirpeja.searchTable.sTime === -1)
         {
            info.sort(function(a, b) {
               return new Date('1/1/1999 '+ a.laikas) - new Date('1/1/1999 '+ b.laikas);
            });

            for(var i = 0; i < info.length; i++)
            {
              var tr = document.createElement("tr");

              var td = "<td style='text-align: center;'>" + (Number(i) + 1) + "</td><td style='text-align: center;'>"+ info[i].vardas +"</td><td style='text-align: center;'>" + info[i].laikas + "</td><td style='text-align: center;'><button type='button' laikas='" + info[i].laikas + "' onclick='kirpeja.atsaukti(this)' class='btn btn-secondary'>Atšaukti</button></td>" ;
              tr.innerHTML = td;
              tbodyNew.appendChild(tr);

            }
          }
          else{

            var ieskomasLaikas = new Date('1/1/1999 '+ cal.laikai[kirpeja.searchTable.sTime]).getTime();
            var esamiLaikai;

            for(var i = 0; i < info.length; i++)
            {
              esamiLaikai = new Date('1/1/1999 '+info[i].laikas).getTime();

              if(ieskomasLaikas === esamiLaikai)
              {
                var tr = document.createElement("tr");
                var td = '<td style="text-align: center;">' + 1 + '</td><td style="text-align: center;">'+ info[i].vardas +'</td><td style="text-align: center;">' + info[i].laikas + '</td><td style="text-align: center;"><button type="button" laikas="'+info[i].laikas+'" onclick="kirpeja.atsaukti(this)" class="btn btn-secondary">Atšaukti</button></td>';
                tr.innerHTML = td;
                tbodyNew.appendChild(tr);
              }
            }
          }
        }

        search.replaceChild(tbodyNew, searchTBody);

        var resSkaicius = document.getElementById('paieskosRes').getElementsByTagName("tr").length;
        console.log(resSkaicius);
        if(resSkaicius === 0){
          document.getElementById('alert3').innerHTML = "Nustatytais datos ir laiko parametrais rezervacijų nerasta!";
        }else{
          document.getElementById('alert3').innerHTML = "";
        }

    },
    atsaukti: function(info) {

      var laikas = info.getAttribute('laikas');
      var data = json.reservation.menesis[kirpeja.searchTable.sMonth].diena[kirpeja.searchTable.sDay];
      var newData = [];
      var ieskomasLaikas = new Date('1/1/1999 '+ laikas).getTime();
      for(var i = 0; i < data.length; i++ )
      {

        esamiLaikai = new Date('1/1/1999 '+ data[i].laikas).getTime();
        if(ieskomasLaikas !== esamiLaikai)
        {
          newData.push(data[i]);
        }
      }
      console.log(newData)
      json.reservation.menesis[kirpeja.searchTable.sMonth].diena[kirpeja.searchTable.sDay] = newData;
      kirpeja.updateTable();
      kirpeja.updateTime();
    },
    input: function(){
      var x = document.getElementById("vardas").value;
      kirpeja.newRes.vardas = x;
    },
    submit: function(){
      var menesis = kirpeja.newRes.sMonth;
      var diena = kirpeja.newRes.sDay;
      var laikas = kirpeja.newRes.sTime;
      var vardas = kirpeja.newRes.vardas;
      if(vardas === "" || laikas === -1){
        var around = document.getElementById('alertAround');
        var oldAlert = document.getElementById('alert');
        var newAlert = document.createElement("div");
        newAlert.classList.add("w3-animate-opacity", "text-danger");
        newAlert.id = "alert";
        newAlert.innerHTML = "Neįrašėte vardo arba visi laikai užimti!";
        around.replaceChild(newAlert, oldAlert);

      }else{
        var data = { vardas: vardas, laikas: cal.laikai[laikas]};
        var data2 = [];
        if(json.reservation.menesis[menesis].diena[diena]){
          data2 = json.reservation.menesis[menesis].diena[diena];
        }
        data2.push(data);
        json.reservation.menesis[menesis].diena[diena] = data2;

        var around = document.getElementById('alertAround');
        var oldAlert = document.getElementById('alert');
        var newAlert = document.createElement("div");
        newAlert.classList.add("w3-animate-opacity", "text-success");
        newAlert.id = "alert";
        newAlert.innerHTML = "Sėkmingai išsaugota!";
        around.replaceChild(newAlert, oldAlert);

        kirpeja.updateTime();
        kirpeja.updateTable();
      }
    }



}
