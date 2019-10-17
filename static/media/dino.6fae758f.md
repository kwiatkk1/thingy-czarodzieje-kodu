## Skakanie

Dinozaur podskoczy, gdy wywołasz funkcję
```js
jumpStart();
```

## Reakcja na wciśnięcie guzika

To co przekażesz jako argument do funkcji `onButtonPressed` zostanie wykonane,
gdy naciśniesz pczycisk na urządzeniu.

```js
const example = () => alert('Dino!');
onButtonPressed(example);
```

Niech dinozaur podskakuje po naciśnięciu przycisku!

## Reakcja na puknięcie
```js
const example = () => alert('Dino!');
onTap(example);
```

Niech dinozaur podskakuje po puknięciu w urządzenie!
