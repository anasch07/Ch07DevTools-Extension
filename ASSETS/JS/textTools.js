(function() {
    var commands, convert, convertors, doConvert, freq, freqToText, hashid, help, init, isAlNum, isAlpha, isDigit, isLower, param1, param2, sendResult, sortFreq, source, stripPunctuation, target, up;

    hashid = [
        {
            n: 'MySQL',
            s: '63cea4673fd25f46',
            c: function(hash,
                        hs) {
                return hash.length === hs.length && !isDigit(hash) && !isAlpha(hash) && isAlNum(hash);
            }
        },
        {
            n: 'MD5',
            s: 'ae11fd697ec92c7c98de3fac23aba525',
            c: function(hash,
                        hs) {
                return hash.length === hs.length && !isFigit(hash) && !isAlpha(hash) && isAlNum(hash);
            }
        },
        {
            n: 'ADLER-32',
            s: '4607',
            c: function(hash,
                        hs) {
                return hash.length === hs.length && !isAlpha(hash) && isAlNum(hash);
            }
        },
        {
            n: 'CRC-32',
            s: '3d08',
            c: function(hash,
                        hs) {
                return hash.length === hs.length && !isDigit(hash) && !isAlpha(hash) && isAlNum(hash);
            }
        },
        {
            m: 'CRC-32B',
            s: '0e5b',
            c: function(hash,
                        hs) {
                return hash.length === hs.length && !isDigit(hash) && !isAlpha(hash) && isAlNum(hash);
            }
        },
        {
            m: 'CRC-16-CCITT',
            s: 'b33fd057',
            c: function(hash,
                        hs) {
                return hash.length === hs.length && !isDigit(hash) && isAlpha(hash) && isAlNum(hash);
            }
        }
    ];

    stripPunctuation = function(array) {
        var el, k, len, nel, out;
        out = [];
        for (k = 0, len = array.length; k < len; k++) {
            el = array[k];
            nel = el.replace(/^[\s\xA0\.,-\/#!$%\^&\*;:{}=\-"'_`~()\+]+|[\s\xA0\.,-\/#!$%\^&\*;:{}=\-"'_`~()\+]+$/g, "");
            if (nel) {
                out.push(nel);
            }
        }
        return out;
    };

    freq = function(array) {
        var coll, el, k, len;
        coll = {};
        for (k = 0, len = array.length; k < len; k++) {
            el = array[k];
            if (!coll[el]) {
                coll[el] = 0;
            }
            coll[el]++;
        }
        return coll;
    };

    sortFreq = function(freq) {
        var arr, count, el;
        arr = [];
        for (el in freq) {
            count = freq[el];
            arr.push([el, count]);
        }
        arr.sort(function(a, b) {
            return b[1] - a[1];
        });
        return arr;
    };

    freqToText = function(freqArr) {
        var k, len, row, text;
        text = [];
        for (k = 0, len = freqArr.length; k < len; k++) {
            row = freqArr[k];
            text.push(row[0] + ' => ' + row[1]);
        }
        return text.join("\n");
    };

    isLower = function(hash) {
        return hash === hash.toLowerCase();
    };

    isDigit = function(hash) {
        return String(hash) === String(parseInt(hash, 10));
    };

    isAlpha = function(hash) {
        return -1 === hash.search(/[^A-Za-z]/);
    };

    isAlNum = function(hash) {
        return -1 === hash.search(/[^A-Za-z0-9]/);
    };

    sendResult = function(text) {
        return worker.postMessage({
            t: text
        });
    };

    commands = {
        uppercase: function(text) {
            return text.toUpperCase();
        },
        lowercase: function(text) {
            return text.toLowerCase();
        },
        titlecase: function(text) {
            var result;
            result = [];
            text.toLowerCase().split(' ').forEach(function(word) {
                return result.push(word.charAt(0).toUpperCase() + word.slice(1));
            });
            return result.join(' ');
        },
        countchars: function(text) {
            return text.length + ' characters';
        },
        countwords: function(text) {
            return text.split(/\s+/).length + ' words';
        },
        countlines: function(text) {
            return text.split("\n").length + ' lines';
        },
        rot13: function(text) {
            return text.replace(/[A-z]/g, function(chars) {
                return String.fromCharCode(chars.charCodeAt(0) + (chars.toUpperCase() <= "M" ? 13 : -13));
            });
        },
        sortlinesalpha: function(text) {
            return text.split("\n").sort().join("\n");
        },
        sortlinesalphaci: function(text) {
            return text.split("\n").sort(function(a, b) {
                if (a.toLowerCase() < b.toLowerCase()) {
                    return -1;
                } else {
                    return 1;
                }
            }).join("\n");
        },
        wordfreq: function(text) {
            return freqToText(sortFreq(freq(stripPunctuation(text.toLowerCase().split(/\s+/)))));
        },
        charfreq: function(text) {
            return freqToText(sortFreq(freq(text.split(''))));
        },
        columnextract: function(text, column) {
            var c, fields, k, len, row, rows;
            c = parseInt(column, 10);
            if (!c) {
                return 'Error: Please type column number';
            }
            c--;
            column = [];
            rows = text.split("\n");
            for (k = 0, len = rows.length; k < len; k++) {
                row = rows[k];
                fields = row.split("\t");
                if (fields[c] != null) {
                    column.push(fields[c]);
                }
            }
            return column.join("\n");
        },
        replace: function(text, find, replace) {
            return text.replace(find, replace);
        },
        replace_regexp: function(text, find, replace) {
            var re;
            re = new RegExp(find, 'g');
            return text.replace(re, replace);
        },
        replace_new_line: function(text, find) {
            var re;
            re = new RegExp(find, 'g');
            return text.replace(re, "\n");
        },
        jsonformat: function(text) {
            var e, o;
            try {
                o = JSON.parse(text);
                return JSON.stringify(o, null, 4);
            } catch (error) {
                e = error;
                return 'Error: ' + e;
            }
        },
        urlencode: function(text) {
            return encodeURIComponent(text);
        },
        urldecode: function(text) {
            return decodeURIComponent(text);
        },
        addlinenumbers: function(text) {
            var index, k, len, line, lines, num;
            lines = text.split("\n");
            num = 1;
            for (index = k = 0, len = lines.length; k < len; index = ++k) {
                line = lines[index];
                lines[index] = num + " " + line;
                num++;
            }
            return lines.join("\n");
        },
        splittext: function(text, separator) {
            return text.split(separator).join("\n");
        },
        trimlines: function(text) {
            return text.split("\n").map(function(el) {
                return el.trim();
            }).join("\n");
        },
        trimlines_start: function(text) {
            return text.split("\n").map(function(el) {
                return el.trimStart();
            }).join("\n");
        },
        trimlines_end: function(text) {
            return text.split("\n").map(function(el) {
                return el.trimEnd();
            }).join("\n");
        },
        reverse: function(text) {
            return text.split('').reverse().join('');
        },
        generate_numbers: function(text, from, to) {
            var fn, num, tn;
            fn = parseInt(from, 10);
            tn = parseInt(to, 10);
            return ((function() {
                var k, ref, ref1, results;
                results = [];
                for (num = k = ref = fn, ref1 = tn; (ref <= ref1 ? k <= ref1 : k >= ref1); num = ref <= ref1 ? ++k : --k) {
                    results.push(num);
                }
                return results;
            })()).join("\n");
        },
        unix_to_datetime: function(text) {
            return (new Date(parseInt(text, 10) * 1000)).toString();
        },
        check_hash: function(hash) {
            var k, len, result, tcase;
            result = [];
            for (k = 0, len = hashid.length; k < len; k++) {
                tcase = hashid[k];
                if (tcase.c(hash, tcase.s)) {
                    result.push(tcase.n);
                }
            }
            return result.join("\n");
        },
        prefix_suffix: function(text, prefix, siffix) {
            return text.split("\n").map(function(line) {
                return prefix + line + siffix;
            }).join("\n");
        },
        format_numbers: function(text) {
            var nf;
            nf = Intl.NumberFormat();
            return text.replace(new RegExp('([0-9]+)', 'g'), function(metch, num) {
                return nf.format(num);
            });
        },
        underscore: function(text) {
            return text.split('').map(function(ch) {
                return ch + '\u0332';
            }).join('');
        },
        strikeout: function(text) {
            return text.split('').map(function(ch) {
                return ch + '\u0336';
            }).join('');
        },
        shuffle: function(text) {
            var a, i, j, x;
            a = text.split("\n");
            i = a.length - 1;
            while (i > 0) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
                i--;
            }
            return a.join("\n");
        },
        remove_duplicate: function(text) {
            return Array.from(new Set(text.split('\n'))).join('\n');
        },
        remove_empty: function(text) {
            return text.split('\n').filter(function(l) {
                return l.trim();
            }).join('\n');
        },
        expand_template: function(text) {
            return text.replaceAll(/\[(.+?)\]/g, function(_, words) {
                var i, o;
                o = words.split('|');
                i = Math.floor(Math.random() * o.length);
                return o[i];
            });
        },
        indent_space: function(text, spaces) {
            var indent, spacesInt;
            spacesInt = spaces ? parseInt(spaces, 10) : 2;
            indent = ' '.repeat(spacesInt);
            return text.split('\n').map(function(line) {
                return indent + line;
            }).join('\n');
        },
        slugify: function(text) {
            return text.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
        },
        strip_nonalhanum: function(text) {
            return text.replace(/[\W_]+/g, '');
        }
    };

    sendResult = function(text) {
        target.value = text;
        return target.select();
    };

    doConvert = function(convertorName, ...args) {
        var convertor;
        convertor = commands[convertorName];
        if (convertor !== void 0) {
            sendResult(convertor(...args));
        } else {
            sendResult('Error: Not implemented');
        }
        return true;
    };

    window._gaq = window._gaq || [];

    source = document.getElementById('source');

    target = document.getElementById('target');

    convertors = document.querySelector('#convertors');

    convert = document.getElementById('convert');

    param1 = document.getElementById('param1');

    param2 = document.getElementById('param2');

    help = document.getElementById('help');

    up = document.getElementById('up');

    init = function() {
        var attachEvents, fillOperators;
        fillOperators = function() {
            // items = Array.from(document.querySelectorAll('#operations > p')).map (e)->
            //   id = e.getAttribute 'id'
            //   label = e.getElementsByTagName('b')[0].textContent
            //   '<option value="' +id+ '">' + label + '</option>'
            // convertors.innerHTML = items.join ''
            return convertors.dispatchEvent(new Event('change'));
        };
        attachEvents = function() {
            convert.addEventListener('click', function(event) {
                var convertor, text;
                event.preventDefault();
                text = source.value;
                convertor = convertors.value;
                doConvert(convertor, text, param1.value, param2.value);
                window._gaq.push(['_trackPageview', '/' + convertor + '.html']);
                return true;
            });
            up.addEventListener('click', function(event) {
                event.preventDefault();
                return source.value = target.value;
            });
            return convertors.addEventListener('change', function() {
                var handleParam, id;
                id = convertors.value;
                handleParam = function(param, index) {
                    var show;
                    show = document.getElementById(id).dataset['param' + index];
                    if (show) {
                        param.setAttribute('placeholder', show);
                        param.style.display = 'inline';
                    } else {
                        param.style.display = 'none';
                    }
                    return param.value = '';
                };
                handleParam(param1, 1);
                handleParam(param2, 2);
                return help.setAttribute('href', '#' + id);
            });
        };
        attachEvents();
        fillOperators();
        return true;
    };

    init();

    convertors = convertors || document.querySelector('#convertors');

    document.getElementById('source').focus();

    document.getElementById('convert').addEventListener('click', function() {
        var last;
        last = convertors.value;
        localStorage.setItem('last', last);
    });

    setTimeout((function() {
        var last;
        last = localStorage.getItem('last');
        if (last) {
            convertors.value = last;
            convertors.dispatchEvent(new Event('change'));
        }
    }), 1);

}).call(this);




//copy part


document.addEventListener('DOMContentLoaded',async ()=>{
    const copy=document.querySelector(".btn.btn-primary");
    const result=document.querySelector("#target");
    const help=document.querySelector("#help");
    copy.addEventListener("click",(e)=>{
        const copyFrom=document.createElement("textarea");
        copyFrom.textContent =result.value ;

        document.body.appendChild(copyFrom);
        copyFrom.select();
        document.execCommand('copy');
        copyFrom.blur();
        document.body.removeChild(copyFrom);
    })

    help.addEventListener("click",()=>{
        const hrefOfElement=document.querySelector("#help").getAttribute("href");
        let idElement=hrefOfElement.substring(1);
        const helpElementToSignal=document.getElementById(idElement);
        console.log(helpElementToSignal.classList);
        helpElementToSignal.classList.add('alert');
        helpElementToSignal.classList.add('alert-dismissible');
        helpElementToSignal.classList.add('alert-warning');
        console.log(idElement);
    })


})






