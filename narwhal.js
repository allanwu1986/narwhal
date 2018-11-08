const argv = require('minimist')(process.argv.slice(2));
const nearley = require('nearley');
const grammar = require('./grammar.js');

const fs = require('fs');

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

var library = fs.readFileSync('c-library.nwl', 'utf8');

var contents = fs.readFileSync(argv['s'], 'utf8');

const lib = parser.feed(library).results[0];

const source = parser.feed(contents).results[0];

function printTree(s) {
    if (typeof(s) === 'object' && s !== null) {
        process.stdout.write('(');
        for (var token of s) {
            printTree(token);
        }
        process.stdout.write(')');
    } else if (s !== null) {
        process.stdout.write(s.toString());
    }
}

function lowerCase(str) {
    return str == str.toLowerCase() && str != str.toUpperCase();
}

function upperCase(str) {
    return str == str.toUpperCase() && str != str.toLowerCase();
}

function typeDef(tree) {
    function funcAsString(f) {
        if (f.func_type !== undefined) {return f.func_type}
        else {return f}
    }
    function gather_func(title, collection) {
        var gather = {};
        for (const content of collection) {
            gather = {...gather, ...content};
        }
        var result = {};
        result[title] = gather;
        return result;
    }
    function normTypeBase(t) {
        if (typeof(t) === 'string') {
            if (lowerCase(t[0])) {
                var ret = {};
                ret[t] = null;
                return ret;
            }
            else {
                var ret = {};
                ret[t.toLowerCase()] = t;
                return ret
            }
        }
        else if (t[0] == '$function$') {return normTypeBase(t[1])}
        else if (t[0] === '$func_type$') {
            var func = gather_func('arguments', t[1].map(d => normTypeBase(d)));
            func.return_type = normTypeBase(t[2]);
            var result = {};
            result[t[0]] = func;
            return result;
        } else if (t[0] === '$product_type$' || t[0] === '$sum_type$') {
            return gather_func(t[0], t.slice(1).map(d => normTypeBase(d)));
        } else if (t[0] === '$container_type$') {
            var gather = gather_func(t[0], t.slice(2).map(d => normTypeBase(d)));
            gather['$container$'] = t[1];
            return gather;
        } else if (typeof(t) === 'object' && t.length === 2) {
            var type = normTypeBase(t[0]);
            var label = normTypeBase(t[1]);
            for (const l in label) {
                for (const tt in type) {
                    const type_obj = type[tt];
                    if (typeof(type_obj) === 'object') {label[l] = type}
                    else {label[l] = type_obj};
                }
            }
            return label;
        }
    }
    return normTypeBase(tree);
}

function normType(tree, label=false) {
    function funcAsString(f) {
        if (f.func_type !== undefined) {return f.func_type}
        else {return f}
    }
    function normTypeBase(t) {
        if (typeof(t) === 'string') {
            if (lowerCase(t[0])) {
                return ':'+t;
            }
            else {return t}
        }
        /*else if (typeof(t) == 'number') {return 'Int'}
        else if (t[0] == '$string$') {return 'String'}
        else if (t[0] == '$double$') {return 'Double'}*/
        else if (t[0] == '$function$') {return normTypeBase(t[1])}
        else if (t[0] === '$func_type$') {
            const arguments = t[1].map(d => funcAsString(normTypeBase(d))).join(',');
            const return_type = funcAsString(normTypeBase(t[2]));
            const func_type = t[0]+'(('+arguments+')->'+return_type+')';
            return {func_type: func_type, arguments: arguments, return_type: return_type};
        } else if (t[0] === '$product_type$') {
            return t[0]+'('+t.slice(1).map(d => funcAsString(normTypeBase(d)))+')';
        } else if (t[0] === '$sum_type$') {
            return t[0]+'('+t.slice(1).map(d => funcAsString(normTypeBase(d)))+')';
        } else if (t[0] === '$container_type$') {
            return t[0]+'('+t[1]+','+t.slice(2).map(d => funcAsString(normTypeBase(d)))+')';
        } else if (typeof(t) === 'object' && t.length === 2) {
            var result = [funcAsString(normTypeBase(t[0]))];
            if (label) {result = result.concat([funcAsString(normTypeBase(t[1]))]);}
            return result.join('');
        }
    }
    return normTypeBase(tree);
}

function reckonType(tree, context) {
    function reckonTypeBase(t) {
        if (typeof(t) === 'string') {return {type: context.getType(t, '*').type, code: t}}
        else if (typeof(t) === 'number') {return {type: 'Int', code: t, dec_code: 'int'}}
        else if (t[0] === '$string$') {return {type: 'String', code: '"'+t[1]+'"', dec_code: 'char *'}}
        else if (t[0] === '$double$') {return {type: 'Double', code: t[1], dec_code: 'double'}}
        else if (t[0] === 'true' || t[0] === 'false') {return {type: 'Bool', code: t[0], dec_code: 'char'}}
        else if (t[0] === '$list$') {
            var types = new Set();
            var types_dec = new Set();
            const list = t.slice(1).map(d => reckonTypeBase(d));
            for (const type of list) {
                types.add(type.type);
                types_dec.add(type.dec_code);
            }
            var ts = [];
            var t_code = [];
            for (const t of types) {ts.push(t)}
            for (const t of types_dec) {t_code.push(t)}
            if (ts.length === 1) {
                var type = ts[0];
                var type_dec = t_code[0];
            }
            else if (ts.length > 1) {
                var type = '$sum_type$('+ts.join(',')+')';
                var type_dec = t_code.join('__and__');
            }
            return {type: '$container_type$(Array,'+type+')', code: '['+list.map(d => d.code).join(',')+']', dec_code: type_dec+'*'}
        } else if (upperCase(t[0][0])) {
            return {type: t[0],
                    code: t[0]+'_constructor('+t.slice(1).map(d => reckonTypeBase(d)).map(d => d.code).join(',')+')',
                    dec_code: t[0]};
        } else if (t[0] === '.') {
            const func = t[2];
            const func_type = typeof(func);
            if (func_type === 'string') {
                const head = reckonTypeBase(t[1]);
                const field_type = context.getTypeField(head.type, func);
                return {type: field_type.type, code: '('+head.code+')->'+func};
            }
            else if (func_type === 'object') {
                const args = [t[1]].concat(func.slice(1)).filter(d => d !== null).map(d => reckonTypeBase(d));
                return {type: context.getType(func[0], args.map(d => d.type).join(',')).type,
                code: func[0]+'('+args.map(d => d.code).join(',')+')'};
            }
        } else {
            const args = t.slice(1).map(d => reckonTypeBase(d));
            const return_value = context.getType(t[0], args.map(d => d.type).join(','));
            var return_type = return_value.type;
            if (return_value.inline !== undefined) {
                var return_inline = return_value.inline;
                for (const i in args) {
                    return_inline = return_inline.replace('{% $'+i+' %}', args[i].code);
                }
                return {type: return_type, code: return_inline};
            }
            else {
                return {type: return_type,
                code: t[0]+'('+args.map(d => d.code).join(',')+')'}
            }
        }
    }
    return reckonTypeBase(tree);
}

class Context {
    constructor(context, label) {
        if (context !== undefined) {
            this._prev_context = context;
            this._prev_context._children[label] = this;
        }
        this._code_body = [];
        this._table = {};
        this._placeholder = {};
        this._types = {};
        this._type_dec_code = {};
        this._children = {};
        this._id_pat = /(:[a-z][a-zA-Z0-9_]*)/g;
    }
    addType(id, type) {
        this._types[id] = typeDef(type);
        this._type_dec_code[id] = this.typeToCode(id);
    }
    getType(id) {this._types[id]}
    typeCode(id) {return this._type_dec_code[id].type}
    addFunction(id, args, value, inline) {
        if (args.replace(this._id_pat, "").length === args.length) {
            var type_dict = this._table[id];
            if (type_dict === undefined) {
                type_dict = {};
                this._table[id] = type_dict;
            }
        } else {
            var type_dict = this._placeholder[id];
            if (type_dict === undefined) {
                type_dict = {};
                this._placeholder[id] = type_dict;
            }
        }
        type_dict[args] = {type: value};
        if (inline !== undefined && inline !== '') {type_dict[args].inline = inline}
        //if (code !== undefined) {this._code_body.push(code);}
    }
    addVariable(id, type, code) {
        this.addFunction(id, '*', type);
    }
    addCode(code) {
        this._code_body.push(code);
    }
    getType(id, args) {
        if (this._prev_context !== undefined) {
             const prev_type = this._prev_context.getType(id, args);
             if (prev_type !== undefined) {return prev_type}
        }
        try {
            return this._table[id][args];
        } catch (err) {
            for (var cand_args in this._placeholder[id]) {
                var match_args = args;
                var placeholder_dict = {};
                var cand_return = this._placeholder[id][cand_args].type;
                const cand_inline = this._placeholder[id][cand_args].inline;
                for (const seg of cand_args.split(this._id_pat)) {
                    if (seg[0] !== ':') {
                        if (seg === match_args.slice(0, seg.length)) {
                            match_args = match_args.slice(seg.length);
                        } else {break}
                    }
                    else {
                        var paren = 0;
                        for (const i in match_args) {
                            const char = match_args[i];
                            if (char === '(') {paren++}
                            else if (char === ')') {paren--}
                            if (paren < 0 || (char === ',' && paren === 0)) {
                                placeholder_dict[seg] = match_args.slice(0, i);
                                match_args = match_args.slice(i);
                                break;
                            }
                        }
                    }
                }
                if (match_args === '') {
                    for (const placeholder in placeholder_dict) {
                        const type = placeholder_dict[placeholder];
                        cand_return = cand_return.replace(RegExp(placeholder, 'g'), type);
                    }
                    return {type: cand_return, inline: cand_inline};
                }
            }
        }
    }
    getTypeField(type, id) {
        if (this._prev_context !== undefined) {
            const prev_type = this._prev_context.getTypeField(type, id);
            if (prev_type !== undefined) {return prev_type}
        }
        const t = this._types[type];
        const fields_product = t['$product_type$'];
        const fields_sum = t['$sum_type$'];
        if (fields_product !== undefined) {
            return {type: fields_product[id]};
        } else if (fields_sum !== undefined) {
            return {type: '$sum_type$('+fields_sum[id]+',None)'};
        }
    }
    typeToCode(name) {
        function typeToCodeBase(t, func_label) {
            var inner = null;
            if ((inner = t['$product_type$']) !== undefined) {
                const comp = typeToCodeBase(inner);
                const components = comp.type;
                const dec_code = comp.dec_code;
                const assign = components.map(d => d.split(' ')[1]).map(d => 'e->'+d+'='+d).join(';');
                const constructor = name+' '+name+'_constructor('+components.join(',')+
                    ') {'+name+' e = '+'malloc(sizeof(struct '+name+'));'+
                    assign+'return e;}';
                return {type: 'typedef struct '+name+' {'
                        +components.map(d => d.replace(name, 'struct '+name+'*')).join(';')+';} *'+
                        name+';\n'+constructor,
                        dec_code: dec_code.map(d => '_*'+d)};
            } else if ((inner = t['$sum_type$']) !== undefined) {
                const comp = typeToCodeBase(inner);
                const components = comp.type;
                const dec_code = comp.dec_code;
                const union = 'union {'+components.map(d => d.replace(name, 'struct '+name+'*')).join(';')+';} join;';
                const constructor = components.map(d => d.split(' ')).
                map(d => name+' '+name+'_constructor_'+d[1]+'('+d[0]+' '+d[1]+') {'+
                name+' e = malloc(sizeof(struct '+name+'));'+
                'e->join.'+d[1]+';return e;}');
                return {type: 'typedef struct '+name+' {int type;'+union+'} *'+name+';'+constructor,
                        dec_code: dec_code.map(d => '_+'+d)};
            } else if ((inner = t['$func_type$']) !== undefined) {
                if (func_label !== undefined) {var label = func_label}
                else {var label = name}
                return {type: typeToCodeBase(inner.return_type).type[0].split(' ')[0]+' '+label+'('+typeToCodeBase(inner.arguments).type.join(',')+')'};
            } else {
                var code = [];
                var dec_code = [];
                var type_fields = {};
                for (var label in t) {
                    const ori_label = label;
                    if (typeof(t[label]) === 'object') {
                        var down = typeToCodeBase(t[label], label);
                        var content = down.type;
                        for (const label2 of down.dec_code) {
                            dec_code.push(label+label2);
                        }
                        label = '';
                    }
                    else {
                        var content = t[label];
                        dec_code.push(ori_label+' '+content);
                    }
                    code.push(content+' '+label);
                }
                return {type: code, dec_code: dec_code};
            }
        }
        function irToCode(ir) {
            const cleanedIR = ir.map(d => d.slice(1).split(' '));
        }
        const cleanedIR = ir.map(function (d) {
            const processed = d.slice(1).split(' ');
            return {hierarchy: processed[0].split('_'),
                    type: processed[1]};
        });
        const code = typeToCodeBase(this._types[name]);
        return code;
    }
}

var c = new Context();
c._header = 'void main(char* argv, int argc)';

function topLevelPass(input, context) {
    for (const line_num in input) {
        const line = input[line_num];
        if (line !== null /*&& typeof(line) != 'string'*/) {
            if (line[0] == '=') {
                if (typeof(line[1]) == 'string') {
                    if (lowerCase(line[1][0]) && line[2][0] !== '$function$') {
                        var value = reckonType(line[2], context);
                        var value_type = value.type;
                        context.addVariable(line[1], value_type);
                        context.addCode(line[1]+line[0]+value.code);
                    } else if (line[2][0] === '$function$') {
                        var value_type = normType(line[2]);
                        if (line[2][2][0] === '$inline$') {
                            const inline = line[2][2][1];
                            context.addFunction(line[1], value_type.arguments, value_type.return_type, inline);
                        }
                        else if (typeof(line[2][1]) === 'object') {
                            context.addFunction(line[1], value_type.arguments, value_type.return_type);
                            const args = line[2][1][1];
                            var func_context = new Context(context, line[1]);
                            for (const arg of args) {
                                if (Array.isArray(arg)) {
                                    func_context.addVariable(arg[1], normType(arg[0]));
                                }
                            }
                            context.addType(line[1], line[2][1]);
                            func_context._header = context.typeCode(line[1]);
                            topLevelPass(line[2][2], func_context);
                            context.addCode(func_context);
                        }
                        //context.addFunction(line[1], value_type.arguments, value_type.return_type, inline);
                    } else {
                        context.addType(line[1], line[2]);
                        context.addCode(context.typeCode(line[1]));
                    }
                }
            }
            else if (line[0] === '#if-block') {
                for (const block of line.slice(1)) {
                    const header = block[0];
                    if (header === '#if' || header === '#else_if') {
                        const cond = reckonType(block[1], context);
                        const label = line_num+'-'+cond.code;
                        var if_block = new Context(context, label);
                        if_block._header = header.replace('#', '').replace('_', ' ')+' '+cond.code;
                        topLevelPass(block[2], if_block);
                    }
                    else {
                        const label = 'else-'+line_num;
                        var if_block = new Context(context, label);
                        if_block._header = 'else '
                        topLevelPass(block[1], if_block);
                    }
                    context.addCode(if_block);
                }
            }
            else if (line[0] === '$return$') {
                const ret = reckonType(line[1], context);
                context.addCode('return '+ ret.code);
            }
        }
    }
}

topLevelPass(lib, c);
topLevelPass(source, c);

function printContext(context) {
    for (const d in context) {
        if (d !== '_children') {
            if (d !== '_prev_context') {
                console.log(d+':');
                console.log(context[d]);
            }
        } else {
            for (const e in context[d]) {
                console.log(e+':');
                printContext(context[d][e]);
            }
        }
    }
}

function contextToCode(context, space='') {
    console.log(space+context._header+'{');
    /*for (const label in context._table) {
        const label_content = context._table[label];
        for (const arg in label_content) {
            if (arg === '*') {console.log(space+'  '+label_content[arg].type+' '+label+';')}
        }
    }*/
    for (const line of context._code_body) {
        if (typeof(line) === 'string') {console.log(space+'  '+line+';');}
        else if (typeof(line) === 'object') {contextToCode(line, space+'  ')}
    }
    console.log(space+'}');
}
console.log(c._type_dec_code);
//console.log(c._types);
contextToCode(c);
