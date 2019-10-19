## Popychanie piłeczki

Sterować kulką można przez wywołanie funkcji:
```js
moveRight(); // w prawo
moveLeft();  // w lewo
moveUp();    // w grę
moveDown();  // w dół
```

Każda z nich przyjmuje argument, liczbę, która określa jak mocno kulka ma być popchnięta:
```js
moveRight(1); // w prawo słabo
moveRight(5); // w prawo mocno
```

## Czytanie wychylenia

Urządzenie, które masz przed sobą, ma wbudowany czujnik wychylenia. Możemy z niego skorzystać, aby zbudować prawdziwą kulkową kierownicę!

Czujnik wychylenia cały czas przesyła odczyty do naszego programu. Żeby je odczytać wpisz w edytorze:
```js
onGravityChange((x, y, z) => {
  console.log(x, y, z);
  // tu masz dostęp do wychylenia: x, y i z
});
```

Spowoduje to stałe wypisywanie odczytów w konsoli (`shift` + `alt` + `i`).

Możesz za każdym razem jak wychylenie się zmieni, z
```js
onGravityChange((x, y, z) => {
  console.log(x, y, z);
  // tu masz dostęp do wychylenia: x, y i z
});
```

Stan przyciśnięcia guzika jest dostępny w zmiennej:
```js
isButtonDown
```

Można ją wykorzystać jako warunek
```js
if (isButtonDown) {
  // wykona się tylko wtedy, gdy przycisk wciśnięty
}
```

## Zadania

Napisz kod, który spowoduje, że:

* jak urządzenie będzie pochylone do przodu (wartość `x` większa od `0`), to kulka poruszy się do góry.
* jak urządzenie będzie pochylone do tyłu (wartość `x` mniejsza od `0`), to kulka poruszy się do dołu.
* jak urządzenie będzie pochylone na bok (wartość `y`), to kulka poruszy się w odpowiednią stronę.

### Na szóstkę

* Kulka ma się poruszać, tylko wtedy gdy wychylenie jest ponad połowę zakresu (powyżej 5)
* Napisz kod, który spowoduje, że im bardziej wychylone jest urządzenie, tym szybciej porusza się kulka
* Kulka ma poruszać się tylko wtedy gdy urządzenie jest wychylone oraz jednocześnie wciśnięty jest przycisk.
* Kulka ma poruszać się 2x szybciej niż normalnie, jak wcisniety jest przycisk

