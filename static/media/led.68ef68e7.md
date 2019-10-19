## Sterowanie

Zmiana koloru (zdefiniowane):
```js
changeColor(1); // można przekazać od 1 do 7
```

Zmiana koloru (własne):
```js
customColor(red, green, blue);
// gdzie red, green i blue to liczby 0-255
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

## Odgłosy
```js
/**
 * @param {number} value 0-8
 **/
playSample(value);
```

## Przycisk
```js
onButtonPressed(async () => {
  /* tutaj Twój kod w reakcji na naciśnięcie przycisku */
});
```

## Zmienna
Można tworzyć i korzystać ze zmiennych
```js
let nazwaZmiennej = 1;

// zwiększenie wartości o jeden: 
nazwaZmiennej = nazwaZmiennej + 1;
```

## Warunek
Można ją wykorzystać jako warunek
```js
if (nazwaZmiennej > 1) {
  // wykona się tylko wtedy, gdy warunek jest spełniony
} else {
  // wykona się tylko wtedy, gdy warunek nie jest
}
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
* napisz program, który po naciśnięciu przycisku odegra inny dzwiek
