## Sterowanie

Zmiana koloru (zdefiniowane):
```js
changeColor(1); // można przekazać od 1 do 7
```

Zmiana koloru (własne):
```js
/**
 * @param {number} red 0-255
 * @param {number} green 0-255
 * @param {number} blue 0-255
 * @param {number} intensivity 0-100
 **/
customColor(red, green, blue);
```

Zmiana trybu pracy diody:
```js
changeMode("constant"); // stałe
changeMode("breathe");  // pulsowanie (ciągle)
changeMode("oneshot");  // pulsowanie (raz)
changeMode("off");      // wyłaczenie
```

Przy pulsowaniu, można ustawić intensywność/jasność diody:
```js
/**
 * @param {number} value 0-100
 **/
changeBrightness(intensivity);
```

## Opóźnienie

Możesz opóźnić wykonanie następnej komendy:
```js
await sleep(100);
```

## Przycisk
```js
onButtonPressed(async () => {
  /* tutaj Twój kod w reakcji na naciśnięcie przycisku */
});
```

## Pętla
```js
for (let i = 0; i < 7; i++) {
  changeColor(i);
  await sleep(100);
}
```

# Zadania

* napisz program, który po naciśnięciu przycisku 10 razy zmieni kolor diody (czerwona/niebieska)
