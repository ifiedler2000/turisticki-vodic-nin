(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    mobilniIzbornik();
    filterAtrakcija();
    filterTablice();
    kontaktForma();
    godinaUPodnozju();
  });

  // hamburger izbornik na mobitelu
  function mobilniIzbornik() {
    var prekidac = document.querySelector(".nav-prekidac");
    var navigacija = document.querySelector(".glavna-navigacija");
    if (!prekidac || !navigacija) return;

    prekidac.addEventListener("click", function () {
      var otvorena = navigacija.classList.toggle("otvorena");
      prekidac.setAttribute("aria-expanded", String(otvorena));
    });
  }

  // filtriranje kartica atrakcija po kategoriji
  function filterAtrakcija() {
    var filteri = document.querySelector("[data-filteri-atrakcije]");
    var kartice = document.querySelectorAll("[data-kategorija]");
    if (!filteri || kartice.length === 0) return;

    var gumbi = filteri.querySelectorAll(".filter-gumb");
    var poruka = document.querySelector("[data-nema-rezultata]");

    filteri.addEventListener("click", function (e) {
      var gumb = e.target.closest(".filter-gumb");
      if (!gumb) return;

      var odabrana = gumb.getAttribute("data-filter");
      gumbi.forEach(function (g) {
        g.setAttribute("aria-pressed", g === gumb ? "true" : "false");
      });

      var vidljivih = 0;
      kartice.forEach(function (kartica) {
        var kategorija = kartica.getAttribute("data-kategorija");
        var prikazi = odabrana === "sve" || kategorija.indexOf(odabrana) !== -1;
        kartica.hidden = !prikazi;
        if (prikazi) vidljivih++;
      });

      if (poruka) poruka.hidden = vidljivih !== 0;
    });
  }

  // filtriranje tablice prijevoza (info.html)
  function filterTablice() {
    var odabir = document.querySelector("[data-filter-prijevoz]");
    var redovi = document.querySelectorAll("[data-vrsta]");
    if (!odabir || redovi.length === 0) return;

    odabir.addEventListener("change", function () {
      var vrijednost = odabir.value;
      redovi.forEach(function (red) {
        var vrsta = red.getAttribute("data-vrsta");
        red.hidden = !(vrijednost === "sve" || vrsta === vrijednost);
      });
    });
  }

  // validacija kontakt forme
  function kontaktForma() {
    var forma = document.querySelector("[data-kontakt-forma]");
    if (!forma) return;

    var status = forma.querySelector("[data-forma-status]");

    var pravila = {
      ime: function (v) {
        if (!v.trim()) return "Molimo unesite ime i prezime.";
        if (v.trim().length < 2) return "Ime mora imati barem 2 znaka.";
        return "";
      },
      email: function (v) {
        if (!v.trim()) return "Molimo unesite e-mail adresu.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
          return "Unesite ispravnu e-mail adresu.";
        return "";
      },
      tema: function (v) {
        if (!v) return "Molimo odaberite temu upita.";
        return "";
      },
      poruka: function (v) {
        if (!v.trim()) return "Molimo upišite poruku.";
        if (v.trim().length < 10) return "Poruka mora imati barem 10 znakova.";
        return "";
      }
    };

    function provjeriPolje(polje) {
      var pravilo = pravila[polje.name];
      if (!pravilo) return true;

      var greska = pravilo(polje.value);
      var omot = polje.closest(".polje");
      var poljeGreske = omot ? omot.querySelector(".poruka-greske") : null;

      if (greska) {
        if (omot) omot.classList.add("polje--greska");
        if (poljeGreske) poljeGreske.textContent = greska;
        polje.setAttribute("aria-invalid", "true");
        return false;
      }

      if (omot) omot.classList.remove("polje--greska");
      if (poljeGreske) poljeGreske.textContent = "";
      polje.setAttribute("aria-invalid", "false");
      return true;
    }

    Object.keys(pravila).forEach(function (ime) {
      var polje = forma.elements[ime];
      if (!polje) return;
      polje.addEventListener("blur", function () {
        provjeriPolje(polje);
      });
      polje.addEventListener("input", function () {
        var omot = polje.closest(".polje");
        if (omot && omot.classList.contains("polje--greska")) provjeriPolje(polje);
      });
    });

    forma.addEventListener("submit", function (e) {
      e.preventDefault();
      var sveValjano = true;
      var prvoNeispravno = null;

      Object.keys(pravila).forEach(function (ime) {
        var polje = forma.elements[ime];
        if (polje && !provjeriPolje(polje)) {
          sveValjano = false;
          if (!prvoNeispravno) prvoNeispravno = polje;
        }
      });

      if (!sveValjano) {
        if (status) {
          status.textContent = "Obrazac sadrži pogreške. Molimo provjerite označena polja.";
          status.className = "forma-status forma-status--greska";
          status.hidden = false;
        }
        if (prvoNeispravno) prvoNeispravno.focus();
        return;
      }

      forma.reset();
      if (status) {
        status.textContent = "Hvala! Vaš upit je uspješno zaprimljen. Javit ćemo vam se uskoro.";
        status.className = "forma-status forma-status--uspjeh";
        status.hidden = false;
        status.focus();
      }
    });
  }

  // godina u podnožju
  function godinaUPodnozju() {
    var godina = new Date().getFullYear();
    document.querySelectorAll("[data-godina]").forEach(function (el) {
      el.textContent = String(godina);
    });
  }
})();
