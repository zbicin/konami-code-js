# konami-code.js
Konami Code implementation for JavaScript with touchscreen support.

## Demo
https://zbicin.github.io/konami-code-js

## How to use?
The [demo file in docs](docs/index.html) is pretty self explanatory and I totally recommend reading through it. However, if you are impatient:

```html
<script type="text/javascript" src="../lib/konami-code.min.js"></script>
<script type="text/javascript">
  function onKonamiCode() {
    console.log('konami code!');
  }
  function onKonamiCodeGesture(event) {
      console.log(event.detail.name);
  }
  document.addEventListener('konamiCode', onKonamiCode);
  document.addEventListener('konamiCodeGesture', onKonamiCodeGesture);
</script>
```
