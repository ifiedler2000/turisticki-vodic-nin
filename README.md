# Nin - turistički vodič

Statička, višestranična web stranica koja predstavlja turistički vodič za
povijesni kraljevski grad **Nin** kraj Zadra. Sadrži pregled atrakcija s
filtriranjem po kategoriji, praktične informacije s pretraživom tablicom
prijevoza te kontakt obrazac s validacijom.

## Live demo

https://nin-vodic.netlify.app

## Stranice

- `index.html` - Naslovnica (uvod u destinaciju, hero i kratki teaseri)
- `atrakcije.html` - Grid kartica atrakcija s filterom po kategoriji
- `info.html` - Praktične informacije (prijevoz, smještaj, kontakti) + tablica s filterom
- `kontakt.html` - Kontakt obrazac za upit (HTML5 + JavaScript validacija)

## Tehnologije

- HTML5 (semantički elementi: `header`, `nav`, `main`, `footer`)
- CSS3 - Flexbox i Grid za raspored + CSS varijable (tokeni za boje i razmake)
- JavaScript (vanilla, bez biblioteka) - filtri, validacija forme, mobilna navigacija
- Google Analytics 4 (placeholder Measurement ID)
- Netlify (hosting)

## Struktura projekta

```
projekt/
  index.html
  atrakcije.html
  info.html
  kontakt.html
  css/style.css
  js/main.js
  img/                (SVG placeholder slike)
  README.md
  .gitignore
```

## Slike

Sve slike su SVG placeholderi u boji palete stranice (`img/`). Mogu se zamijeniti
pravim fotografijama Nina - dovoljno je zadržati ista imena datoteka ili
ažurirati `src` atribute u HTML-u i pripadajući `alt` opis.

## Kako pokrenuti (lokalno)

Projekt je statičan, pa nije potreban poslužitelj ni instalacija:

1. Preuzmi / kloniraj projekt.
2. Otvori datoteku `index.html` u web pregledniku (dvoklik), ili
3. (Opcionalno) pokreni lokalni poslužitelj radi čistih relativnih putanja, npr.
   `npx serve` ili VS Code ekstenzija "Live Server".

## Kako deployati na Netlify

1. Prijavi se na [Netlify](https://www.netlify.com/).
2. **Add new site -> Deploy manually** i povuci mapu `projekt/` u prozor, ili
   poveži Git repozitorij (**Import from Git**).
3. Kako se radi o statičnoj stranici, **build command** ostaje prazan, a
   **publish directory** postavi na korijen projekta (`projekt/` ili `.`).
4. Nakon deploya zamijeni placeholder `G-XXXXXXXXXX` u `<head>` svake HTML
   datoteke svojim stvarnim GA4 Measurement ID-om.

## Autor

Izradila: Ivana Fiedler — kolegij "Web tehnologije i analitika" (vlastiti projekt).
