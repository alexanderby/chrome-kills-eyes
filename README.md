# chrome-kills-eyes
> Blink is not just a name of a rendering engine, it is also the most annoying browser bug ever.

This is a demonstration of white flashes that occur when navigating web sites with dark background.
### To see the issue you may:
1. Navigate to web page, that has a `<style>` defined at `<body>`.
2. Navigate to web page in another domain, when response with `<body>` comes before the stylesheet is loaded.
3. As a live example navigate from [hackaday.com](http://hackaday.com/) to [codepen.io](http://codepen.io/) and back.
No issues are seemed in FireFox, it doesn't update canvas until the stylesheet is loaded. 
**Chromium [Issue 1373](https://code.google.com/p/chromium/issues/detail?id=1373) is not dead** (like other issues [126341](https://code.google.com/p/chromium/issues/detail?id=126341), [409378](https://code.google.com/p/chromium/issues/detail?id=409378) etc).

### To launch this demo execute the next command:
```
$ node server
```

All the issues remain in Chrome 52.
![Chrome kiils your eyes](http://i.ytimg.com/vi/GstsvaYGwdc/maxresdefault.jpg "Chrome kiils your eyes")
