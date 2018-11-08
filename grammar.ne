main -> TOP_LEVEL {% d => d[0] %}

TOP_LEVEL -> LINE_OR_BLOCK:* {% d => d[0].map(c => c[0]) %}

# Function block

FUNC_BLOCK -> FT _ BLOCK {% d => ["$function$", d[0], d[2]] %}

# Inline block

INLINE_BLOCK -> FT _ INLINE {% d => ["$function$", d[0], d[2]] %}

# If-else blocks

IF_ELSE_BLOCK -> IF_BLOCK EMPTY_LINE:* (ELSE_IF_BLOCK EMPTY_LINE:* {% d => d[0] %}):* ELSE_BLOCK:? {% d => ["#if-block", d[0]].concat(d[2]).concat([d[3]]) %}

IF_BLOCK -> _ "if" _ EXP _ BLOCK {% d=> ["#if", d[3], d[5]] %}

ELSE_IF_BLOCK -> _ "else" _NL "if" _ EXP _ BLOCK {% d => ["#else_if", d[5], d[7]] %}

ELSE_BLOCK -> _ "else" _ BLOCK {% d => ["#else", d[3]] %}

# For block

FOR_BLOCK -> _ "for" _ ID_LIST _ "in" _ EXP _ BLOCK {% d => ["#for", d[3], d[7], d[9]] %}

ID_LIST -> ID ID_REST:* {% d => [d[0]].concat(d[1]) %}

ID_REST -> _ "," _ ID {% d => d[3] %}

# Switch block

SWITCH_BLOCK -> _ "switch" _ EXP _ SWITCH_BODY {% d => ["#switch", d[3], d[5]] %}

SWITCH_BODY -> "{\n" CASE_BLOCK:+ DEFAULT_BLOCK:? _ "}\n" {% d => d[1].concat([d[2]]) %}

# Block

BLOCK -> "{\n" LINE_OR_BLOCK:+ _ "}\n" {% d => d[1].map(c => c[0]) %}

# Lines of Code
LINE -> _ EXP _ "\n" {% d => d[1] %}
    | _ EXP _ ("=" | "+=" | "-=" | "*=" | "/=") _ EXP _ "\n" {% d => [d[3][0], d[1], d[5]] %}
    | _ "return" __ (EXP | INLINE_BLOCK) _ "\n" {% d => ["$return$", d[3][0]] %}
    | _ TYPE _ "=" _ TYPE_SIG _ "\n" {% d => [d[3], d[1], d[5]] %}
    | _ EXP _ "=" _ FUNC_BLOCK _ {% d => [d[3], d[1], d[5]] %}
    | _ "`" INLINE_ID "`" _ "=" _ (INLINE_BLOCK | FUNC_BLOCK) _ "\n" {% d => [d[5], d[2], d[7][0]] %}

CASE_BLOCK -> _ "case" _ LIT _ ":" LINE_OR_FALLTHROUGH {% d => ["#case", d[3], d[6]] %}

DEFAULT_BLOCK -> _ "default" _ ":" LINE_OR_FALLTHROUGH {% d => ["#default", d[4]] %}

LINE_OR_FALLTHROUGH -> LINE_OR_BLOCK:+ {% d => d[0].map(c => c[0]) %}
    | _ "fallthrough" _ "\n" {% d => "$fallthrough$" %}

LINE_OR_BLOCK -> LINE | IF_ELSE_BLOCK | FOR_BLOCK | SWITCH_BLOCK | EMPTY_LINE | COMMENT {% d => d[0] %}

COMMENT -> "#" ANYTHING "\n" {% d => [null] %}

EMPTY_LINE -> (_ "\n") {% d=> null %}

EXP -> OR {% d => d[0] %}

# Parentheses
P -> "(" _ EXP _ ")" {% d => d[2] %}
    | CALL {% d => d[0] %}
# List
    | "[" LIST "]" {% d => ["$list$"].concat(d[1]) %}
# Set
    | "{" LIST "}" {% d => ["$set$"].concat(d[1]) %}
# Hash list
    | "{" HASH_LIST "}" {% d => ["$hash$"].concat(d[1]) %}
    | ID {% d => d[0] %}
    | LIT {% d => d[0] %}

# Function Call
CALL -> (ID | TYPE) "(" LIST ")" {% d => [d[0][0]].concat(d[2]) %}

LIST -> _ EXP:? ARGS:* _ {% function(d) {
        if (d[1] !== null) {
            return [d[1]].concat(d[2])
        }
        else {return [null];}
    } %}

ARGS ->  _ "," _ EXP {% d => d[3] %}

# Subscript
SUB -> SUB "[" _ P _ "]" {% d => ["$sub$", d[0], d[3]] %}
    | P {% d => d[0] %}

# Dot something
DOT -> DOT "." (ID | CALL) {% d => [d[1], d[0], d[2][0]] %}
    | SUB {% d => d[0] %}

# Unary operators
UN -> ("-" | "+" | "!" | "~") _ UN {% d => [d[0][0], d[2]] %}
    | DOT {% d => d[0] %}

# Multiplication and division
MD -> MD _ ("*" | "/") _ UN {% d => [d[2][0], d[0], d[4]] %}
    | UN {% d => d[0] %}

# Addition and subtraction
AS -> AS _ ("+" | "-") _ MD {% d => [d[2][0], d[0], d[4]] %}
    | MD {% d => d[0] %}

# Comparisons
CP -> CP _ ("<" | ">" | "<=" | ">=") _ AS {% d => [d[2][0], d[0], d[4]] %}
    | AS {% d => d[0] %}

# Equality
EQ -> EQ _ ("==" | "!=") _ CP {% d => [d[2][0], d[0], d[4]] %}
    | CP {% d => d[0] %}

# Logical
AND -> AND _ "&&"  _ EQ {% d => [d[2], d[0], d[4]] %}
    | EQ {% d => d[0] %}

OR -> OR _ "||"  _ AND {% d => [d[2], d[0], d[4]] %}
    | AND {% d => d[0] %}

# Hash list
HASH_LIST -> _ HASH_ITEM:? HASH_REST:* _ {% d => [d[1]].concat(d[2]) %}

HASH_ITEM -> ID _ ":" _ EXP {% d => [d[0], d[4]] %}

HASH_REST -> _ "," _ HASH_ITEM {% d=> d[3] %}

# Algebraic Data Types
TYPE_SIG -> FT {% d => d[0] %}

TYPE_LABEL -> ID _ ":" _ {% d => d[0] %}

ADT -> TYPE_LABEL:? "(" _ TYPE_SIG _ ")" {% function(d) {
        if (d[0] == null) {return d[3]}
        return [d[3], d[0][0]];
    } %}
    | (ARRAY_TYPE | SET_TYPE) _ "(" _ TYPE_SIG _ ")" {% d => ["$container_type$", d[0][0], d[4]] %}
    | HASH_TYPE _ "(" _ TYPE_SIG _ "," _ TYPE_SIG _ ")" {% d => ["$container_type$", d[0], d[4], d[8]] %}
    | TYPE_DEC_BLOCK {% d => d[0] %}
    | TYPE {% d => d[0] %}
    | ID {% d => d[0] %}

PT -> PT __ ADT {% d => ["$product_type$", d[0], d[2]] %}
    | ADT {% d => d[0] %}

AT -> AT _ "|" _ PT {% d => ["$sum_type$", d[0], d[4]] %}
    | PT {% d => d[0] %}

FT -> "(" _ FUNC_TYPE_LIST _ ")" _ "->" _ AT {% d => ["$func_type$", d[2], d[8]] %}
    | AT {% d => d[0] %}

FUNC_TYPE_LIST -> FUNC_TYPE_ARG:? _ ("," _ FUNC_TYPE_ARG {% d => d[2] %}):* {% function(d) {
        if (d[0] === null) {return []}
        else { return [d[0]].concat(d[2]).filter(c => c !== undefined).map(c => c[0]) }
    } %}

FUNC_TYPE_ARG -> ((TYPE_LABEL FT {% d => [d[1], d[0]] %}) | ID) {% d => d[0] %}

TYPE_DEC_BLOCK -> (("|" | "*") _ {% d => d[0] %}):? "{\n" TYPE_DEC_TYPES:+ _ "}" {% function(d) {
        var type = "";
        if (d[0] === null || d[0] === "*") {type = "$product_type$"}
        else {type = "$sum_type$"}
        return [type].concat(d[2]);
    } %}

TYPE_DEC_TYPES -> _ TYPE_LABEL (TYPE_SIG | TYPE_DEC_BLOCK) EMPTY_LINE:+ {% d=> [d[2][0], d[1]] %}

# Space
_ -> (" " | "\t"):*

__ -> (" " | "\t"):+

_NL -> (" " | "\t" | "\n"):*

TYPE -> [A-Z] [A-Za-z0-9_]:* {% d => d[0]+d[1].join('') %}

ID -> [a-z_] [A-Za-z0-9_]:* {% d => d[0]+d[1].join('') %}

LIT -> (NUM | STR | BOOL) {% d => d[0][0] %}

STR -> "\"" STR_STUFFING "\"" {% d => ["$string$", d[1]] %}

BOOL -> ("true" | "false") {% d => d[0] %}

INLINE -> "`" INLINE_STUFFING "`" {% d => ["$inline$", d[1]] %}

STR_STUFFING -> [A-Za-z0-9,./<>?;':!@#$%^&*(_)+-=[\]{}|~` \t\n]:* {% d => d[0].join('') %}

ANYTHING -> [A-Za-z0-9,./<>?;"':!@#$%^&*(_)+-=[\]{}|~` \t]:*

INLINE_STUFFING  -> [A-Za-z0-9,./<>?;':"!@#$%^&*(_)+-=[\]{}|~ \t\n]:* {% d => d[0].join('') %}

INLINE_ID -> [A-Za-z0-9,./<>?;"':!@#$%^&*(_)+-=[\]{}|~]:* {% d => d[0].join('') %}

NUM -> (INT | DOUBLE) {% d => d[0][0] %}

INT ->
    [0-9]:+ {% d => parseInt(d[0].join(''), 10) %}

EXPO ->
    "e" "-":? INT {% function(d) {
        if (d[1] !== null) {return -d[2]}
        else {return d[2]}
    } %}

DOUBLE ->
    INT "." INT EXPO:? {% function(d) {
        let mantissa = d[0] + parseFloat("0."+d[2].toString(), 10);
        let double = ['$double$']
        if (d[3] === null) {return double.concat(mantissa)}
        else {return double.concat(mantissa * Math.pow(10, d[3]))}
    } %}

ARRAY_TYPE -> "Array"

SET_TYPE -> "Set"

HASH_TYPE -> "Hash"
