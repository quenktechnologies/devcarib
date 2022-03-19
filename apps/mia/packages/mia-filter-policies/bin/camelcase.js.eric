var camel = s =>
    [s[0].toUpperCase()]
        .concat(s
        .split(s[0])
        .slice(1)
        .join(s[0]))
        .join('')
        .replace(/(\-|_|\s)+(.)?/g, function(mathc, sep, c) {
        return (c ? c.toUpperCase() : '');
      });

console.log(camel(process.argv[2]));
