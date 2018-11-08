// Generated automatically by nearley, version 2.15.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["TOP_LEVEL"], "postprocess": d => d[0]},
    {"name": "TOP_LEVEL$ebnf$1", "symbols": []},
    {"name": "TOP_LEVEL$ebnf$1", "symbols": ["TOP_LEVEL$ebnf$1", "LINE_OR_BLOCK"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "TOP_LEVEL", "symbols": ["TOP_LEVEL$ebnf$1"], "postprocess": d => d[0].map(c => c[0])},
    {"name": "FUNC_BLOCK", "symbols": ["FT", "_", "BLOCK"], "postprocess": d => ["$function$", d[0], d[2]]},
    {"name": "INLINE_BLOCK", "symbols": ["FT", "_", "INLINE"], "postprocess": d => ["$function$", d[0], d[2]]},
    {"name": "IF_ELSE_BLOCK$ebnf$1", "symbols": []},
    {"name": "IF_ELSE_BLOCK$ebnf$1", "symbols": ["IF_ELSE_BLOCK$ebnf$1", "EMPTY_LINE"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "IF_ELSE_BLOCK$ebnf$2", "symbols": []},
    {"name": "IF_ELSE_BLOCK$ebnf$2$subexpression$1$ebnf$1", "symbols": []},
    {"name": "IF_ELSE_BLOCK$ebnf$2$subexpression$1$ebnf$1", "symbols": ["IF_ELSE_BLOCK$ebnf$2$subexpression$1$ebnf$1", "EMPTY_LINE"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "IF_ELSE_BLOCK$ebnf$2$subexpression$1", "symbols": ["ELSE_IF_BLOCK", "IF_ELSE_BLOCK$ebnf$2$subexpression$1$ebnf$1"], "postprocess": d => d[0]},
    {"name": "IF_ELSE_BLOCK$ebnf$2", "symbols": ["IF_ELSE_BLOCK$ebnf$2", "IF_ELSE_BLOCK$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "IF_ELSE_BLOCK$ebnf$3", "symbols": ["ELSE_BLOCK"], "postprocess": id},
    {"name": "IF_ELSE_BLOCK$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "IF_ELSE_BLOCK", "symbols": ["IF_BLOCK", "IF_ELSE_BLOCK$ebnf$1", "IF_ELSE_BLOCK$ebnf$2", "IF_ELSE_BLOCK$ebnf$3"], "postprocess": d => ["#if-block", d[0]].concat(d[2]).concat([d[3]])},
    {"name": "IF_BLOCK$string$1", "symbols": [{"literal":"i"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "IF_BLOCK", "symbols": ["_", "IF_BLOCK$string$1", "_", "EXP", "_", "BLOCK"], "postprocess": d=> ["#if", d[3], d[5]]},
    {"name": "ELSE_IF_BLOCK$string$1", "symbols": [{"literal":"e"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ELSE_IF_BLOCK$string$2", "symbols": [{"literal":"i"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ELSE_IF_BLOCK", "symbols": ["_", "ELSE_IF_BLOCK$string$1", "_NL", "ELSE_IF_BLOCK$string$2", "_", "EXP", "_", "BLOCK"], "postprocess": d => ["#else_if", d[5], d[7]]},
    {"name": "ELSE_BLOCK$string$1", "symbols": [{"literal":"e"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ELSE_BLOCK", "symbols": ["_", "ELSE_BLOCK$string$1", "_", "BLOCK"], "postprocess": d => ["#else", d[3]]},
    {"name": "FOR_BLOCK$string$1", "symbols": [{"literal":"f"}, {"literal":"o"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FOR_BLOCK$string$2", "symbols": [{"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FOR_BLOCK", "symbols": ["_", "FOR_BLOCK$string$1", "_", "ID_LIST", "_", "FOR_BLOCK$string$2", "_", "EXP", "_", "BLOCK"], "postprocess": d => ["#for", d[3], d[7], d[9]]},
    {"name": "ID_LIST$ebnf$1", "symbols": []},
    {"name": "ID_LIST$ebnf$1", "symbols": ["ID_LIST$ebnf$1", "ID_REST"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ID_LIST", "symbols": ["ID", "ID_LIST$ebnf$1"], "postprocess": d => [d[0]].concat(d[1])},
    {"name": "ID_REST", "symbols": ["_", {"literal":","}, "_", "ID"], "postprocess": d => d[3]},
    {"name": "SWITCH_BLOCK$string$1", "symbols": [{"literal":"s"}, {"literal":"w"}, {"literal":"i"}, {"literal":"t"}, {"literal":"c"}, {"literal":"h"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "SWITCH_BLOCK", "symbols": ["_", "SWITCH_BLOCK$string$1", "_", "EXP", "_", "SWITCH_BODY"], "postprocess": d => ["#switch", d[3], d[5]]},
    {"name": "SWITCH_BODY$string$1", "symbols": [{"literal":"{"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "SWITCH_BODY$ebnf$1", "symbols": ["CASE_BLOCK"]},
    {"name": "SWITCH_BODY$ebnf$1", "symbols": ["SWITCH_BODY$ebnf$1", "CASE_BLOCK"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "SWITCH_BODY$ebnf$2", "symbols": ["DEFAULT_BLOCK"], "postprocess": id},
    {"name": "SWITCH_BODY$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "SWITCH_BODY$string$2", "symbols": [{"literal":"}"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "SWITCH_BODY", "symbols": ["SWITCH_BODY$string$1", "SWITCH_BODY$ebnf$1", "SWITCH_BODY$ebnf$2", "_", "SWITCH_BODY$string$2"], "postprocess": d => d[1].concat([d[2]])},
    {"name": "BLOCK$string$1", "symbols": [{"literal":"{"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BLOCK$ebnf$1", "symbols": ["LINE_OR_BLOCK"]},
    {"name": "BLOCK$ebnf$1", "symbols": ["BLOCK$ebnf$1", "LINE_OR_BLOCK"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "BLOCK$string$2", "symbols": [{"literal":"}"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BLOCK", "symbols": ["BLOCK$string$1", "BLOCK$ebnf$1", "_", "BLOCK$string$2"], "postprocess": d => d[1].map(c => c[0])},
    {"name": "LINE", "symbols": ["_", "EXP", "_", {"literal":"\n"}], "postprocess": d => d[1]},
    {"name": "LINE$subexpression$1", "symbols": [{"literal":"="}]},
    {"name": "LINE$subexpression$1$string$1", "symbols": [{"literal":"+"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LINE$subexpression$1", "symbols": ["LINE$subexpression$1$string$1"]},
    {"name": "LINE$subexpression$1$string$2", "symbols": [{"literal":"-"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LINE$subexpression$1", "symbols": ["LINE$subexpression$1$string$2"]},
    {"name": "LINE$subexpression$1$string$3", "symbols": [{"literal":"*"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LINE$subexpression$1", "symbols": ["LINE$subexpression$1$string$3"]},
    {"name": "LINE$subexpression$1$string$4", "symbols": [{"literal":"/"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LINE$subexpression$1", "symbols": ["LINE$subexpression$1$string$4"]},
    {"name": "LINE", "symbols": ["_", "EXP", "_", "LINE$subexpression$1", "_", "EXP", "_", {"literal":"\n"}], "postprocess": d => [d[3][0], d[1], d[5]]},
    {"name": "LINE$string$1", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"t"}, {"literal":"u"}, {"literal":"r"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LINE$subexpression$2", "symbols": ["EXP"]},
    {"name": "LINE$subexpression$2", "symbols": ["INLINE_BLOCK"]},
    {"name": "LINE", "symbols": ["_", "LINE$string$1", "__", "LINE$subexpression$2", "_", {"literal":"\n"}], "postprocess": d => ["$return$", d[3][0]]},
    {"name": "LINE", "symbols": ["_", "TYPE", "_", {"literal":"="}, "_", "TYPE_SIG", "_", {"literal":"\n"}], "postprocess": d => [d[3], d[1], d[5]]},
    {"name": "LINE", "symbols": ["_", "EXP", "_", {"literal":"="}, "_", "FUNC_BLOCK", "_"], "postprocess": d => [d[3], d[1], d[5]]},
    {"name": "LINE$subexpression$3", "symbols": ["INLINE_BLOCK"]},
    {"name": "LINE$subexpression$3", "symbols": ["FUNC_BLOCK"]},
    {"name": "LINE", "symbols": ["_", {"literal":"`"}, "INLINE_ID", {"literal":"`"}, "_", {"literal":"="}, "_", "LINE$subexpression$3", "_", {"literal":"\n"}], "postprocess": d => [d[5], d[2], d[7][0]]},
    {"name": "CASE_BLOCK$string$1", "symbols": [{"literal":"c"}, {"literal":"a"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CASE_BLOCK", "symbols": ["_", "CASE_BLOCK$string$1", "_", "LIT", "_", {"literal":":"}, "LINE_OR_FALLTHROUGH"], "postprocess": d => ["#case", d[3], d[6]]},
    {"name": "DEFAULT_BLOCK$string$1", "symbols": [{"literal":"d"}, {"literal":"e"}, {"literal":"f"}, {"literal":"a"}, {"literal":"u"}, {"literal":"l"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DEFAULT_BLOCK", "symbols": ["_", "DEFAULT_BLOCK$string$1", "_", {"literal":":"}, "LINE_OR_FALLTHROUGH"], "postprocess": d => ["#default", d[4]]},
    {"name": "LINE_OR_FALLTHROUGH$ebnf$1", "symbols": ["LINE_OR_BLOCK"]},
    {"name": "LINE_OR_FALLTHROUGH$ebnf$1", "symbols": ["LINE_OR_FALLTHROUGH$ebnf$1", "LINE_OR_BLOCK"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "LINE_OR_FALLTHROUGH", "symbols": ["LINE_OR_FALLTHROUGH$ebnf$1"], "postprocess": d => d[0].map(c => c[0])},
    {"name": "LINE_OR_FALLTHROUGH$string$1", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"l"}, {"literal":"t"}, {"literal":"h"}, {"literal":"r"}, {"literal":"o"}, {"literal":"u"}, {"literal":"g"}, {"literal":"h"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LINE_OR_FALLTHROUGH", "symbols": ["_", "LINE_OR_FALLTHROUGH$string$1", "_", {"literal":"\n"}], "postprocess": d => "$fallthrough$"},
    {"name": "LINE_OR_BLOCK", "symbols": ["LINE"]},
    {"name": "LINE_OR_BLOCK", "symbols": ["IF_ELSE_BLOCK"]},
    {"name": "LINE_OR_BLOCK", "symbols": ["FOR_BLOCK"]},
    {"name": "LINE_OR_BLOCK", "symbols": ["SWITCH_BLOCK"]},
    {"name": "LINE_OR_BLOCK", "symbols": ["EMPTY_LINE"]},
    {"name": "LINE_OR_BLOCK", "symbols": ["COMMENT"], "postprocess": d => d[0]},
    {"name": "COMMENT", "symbols": [{"literal":"#"}, "ANYTHING", {"literal":"\n"}], "postprocess": d => [null]},
    {"name": "EMPTY_LINE$subexpression$1", "symbols": ["_", {"literal":"\n"}]},
    {"name": "EMPTY_LINE", "symbols": ["EMPTY_LINE$subexpression$1"], "postprocess": d=> null},
    {"name": "EXP", "symbols": ["OR"], "postprocess": d => d[0]},
    {"name": "P", "symbols": [{"literal":"("}, "_", "EXP", "_", {"literal":")"}], "postprocess": d => d[2]},
    {"name": "P", "symbols": ["CALL"], "postprocess": d => d[0]},
    {"name": "P", "symbols": [{"literal":"["}, "LIST", {"literal":"]"}], "postprocess": d => ["$list$"].concat(d[1])},
    {"name": "P", "symbols": [{"literal":"{"}, "LIST", {"literal":"}"}], "postprocess": d => ["$set$"].concat(d[1])},
    {"name": "P", "symbols": [{"literal":"{"}, "HASH_LIST", {"literal":"}"}], "postprocess": d => ["$hash$"].concat(d[1])},
    {"name": "P", "symbols": ["ID"], "postprocess": d => d[0]},
    {"name": "P", "symbols": ["LIT"], "postprocess": d => d[0]},
    {"name": "CALL$subexpression$1", "symbols": ["ID"]},
    {"name": "CALL$subexpression$1", "symbols": ["TYPE"]},
    {"name": "CALL", "symbols": ["CALL$subexpression$1", {"literal":"("}, "LIST", {"literal":")"}], "postprocess": d => [d[0][0]].concat(d[2])},
    {"name": "LIST$ebnf$1", "symbols": ["EXP"], "postprocess": id},
    {"name": "LIST$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "LIST$ebnf$2", "symbols": []},
    {"name": "LIST$ebnf$2", "symbols": ["LIST$ebnf$2", "ARGS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "LIST", "symbols": ["_", "LIST$ebnf$1", "LIST$ebnf$2", "_"], "postprocess":  function(d) {
            if (d[1] !== null) {
                return [d[1]].concat(d[2])
            }
            else {return [null];}
        } },
    {"name": "ARGS", "symbols": ["_", {"literal":","}, "_", "EXP"], "postprocess": d => d[3]},
    {"name": "SUB", "symbols": ["SUB", {"literal":"["}, "_", "P", "_", {"literal":"]"}], "postprocess": d => ["$sub$", d[0], d[3]]},
    {"name": "SUB", "symbols": ["P"], "postprocess": d => d[0]},
    {"name": "DOT$subexpression$1", "symbols": ["ID"]},
    {"name": "DOT$subexpression$1", "symbols": ["CALL"]},
    {"name": "DOT", "symbols": ["DOT", {"literal":"."}, "DOT$subexpression$1"], "postprocess": d => [d[1], d[0], d[2][0]]},
    {"name": "DOT", "symbols": ["SUB"], "postprocess": d => d[0]},
    {"name": "UN$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "UN$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "UN$subexpression$1", "symbols": [{"literal":"!"}]},
    {"name": "UN$subexpression$1", "symbols": [{"literal":"~"}]},
    {"name": "UN", "symbols": ["UN$subexpression$1", "_", "UN"], "postprocess": d => [d[0][0], d[2]]},
    {"name": "UN", "symbols": ["DOT"], "postprocess": d => d[0]},
    {"name": "MD$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "MD$subexpression$1", "symbols": [{"literal":"/"}]},
    {"name": "MD", "symbols": ["MD", "_", "MD$subexpression$1", "_", "UN"], "postprocess": d => [d[2][0], d[0], d[4]]},
    {"name": "MD", "symbols": ["UN"], "postprocess": d => d[0]},
    {"name": "AS$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "AS$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "AS", "symbols": ["AS", "_", "AS$subexpression$1", "_", "MD"], "postprocess": d => [d[2][0], d[0], d[4]]},
    {"name": "AS", "symbols": ["MD"], "postprocess": d => d[0]},
    {"name": "CP$subexpression$1", "symbols": [{"literal":"<"}]},
    {"name": "CP$subexpression$1", "symbols": [{"literal":">"}]},
    {"name": "CP$subexpression$1$string$1", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CP$subexpression$1", "symbols": ["CP$subexpression$1$string$1"]},
    {"name": "CP$subexpression$1$string$2", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CP$subexpression$1", "symbols": ["CP$subexpression$1$string$2"]},
    {"name": "CP", "symbols": ["CP", "_", "CP$subexpression$1", "_", "AS"], "postprocess": d => [d[2][0], d[0], d[4]]},
    {"name": "CP", "symbols": ["AS"], "postprocess": d => d[0]},
    {"name": "EQ$subexpression$1$string$1", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "EQ$subexpression$1", "symbols": ["EQ$subexpression$1$string$1"]},
    {"name": "EQ$subexpression$1$string$2", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "EQ$subexpression$1", "symbols": ["EQ$subexpression$1$string$2"]},
    {"name": "EQ", "symbols": ["EQ", "_", "EQ$subexpression$1", "_", "CP"], "postprocess": d => [d[2][0], d[0], d[4]]},
    {"name": "EQ", "symbols": ["CP"], "postprocess": d => d[0]},
    {"name": "AND$string$1", "symbols": [{"literal":"&"}, {"literal":"&"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "AND", "symbols": ["AND", "_", "AND$string$1", "_", "EQ"], "postprocess": d => [d[2], d[0], d[4]]},
    {"name": "AND", "symbols": ["EQ"], "postprocess": d => d[0]},
    {"name": "OR$string$1", "symbols": [{"literal":"|"}, {"literal":"|"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OR", "symbols": ["OR", "_", "OR$string$1", "_", "AND"], "postprocess": d => [d[2], d[0], d[4]]},
    {"name": "OR", "symbols": ["AND"], "postprocess": d => d[0]},
    {"name": "HASH_LIST$ebnf$1", "symbols": ["HASH_ITEM"], "postprocess": id},
    {"name": "HASH_LIST$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "HASH_LIST$ebnf$2", "symbols": []},
    {"name": "HASH_LIST$ebnf$2", "symbols": ["HASH_LIST$ebnf$2", "HASH_REST"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "HASH_LIST", "symbols": ["_", "HASH_LIST$ebnf$1", "HASH_LIST$ebnf$2", "_"], "postprocess": d => [d[1]].concat(d[2])},
    {"name": "HASH_ITEM", "symbols": ["ID", "_", {"literal":":"}, "_", "EXP"], "postprocess": d => [d[0], d[4]]},
    {"name": "HASH_REST", "symbols": ["_", {"literal":","}, "_", "HASH_ITEM"], "postprocess": d=> d[3]},
    {"name": "TYPE_SIG", "symbols": ["FT"], "postprocess": d => d[0]},
    {"name": "TYPE_LABEL", "symbols": ["ID", "_", {"literal":":"}, "_"], "postprocess": d => d[0]},
    {"name": "ADT$ebnf$1", "symbols": ["TYPE_LABEL"], "postprocess": id},
    {"name": "ADT$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ADT", "symbols": ["ADT$ebnf$1", {"literal":"("}, "_", "TYPE_SIG", "_", {"literal":")"}], "postprocess":  function(d) {
            if (d[0] == null) {return d[3]}
            return [d[3], d[0][0]];
        } },
    {"name": "ADT$subexpression$1", "symbols": ["ARRAY_TYPE"]},
    {"name": "ADT$subexpression$1", "symbols": ["SET_TYPE"]},
    {"name": "ADT", "symbols": ["ADT$subexpression$1", "_", {"literal":"("}, "_", "TYPE_SIG", "_", {"literal":")"}], "postprocess": d => ["$container_type$", d[0][0], d[4]]},
    {"name": "ADT", "symbols": ["HASH_TYPE", "_", {"literal":"("}, "_", "TYPE_SIG", "_", {"literal":","}, "_", "TYPE_SIG", "_", {"literal":")"}], "postprocess": d => ["$container_type$", d[0], d[4], d[8]]},
    {"name": "ADT", "symbols": ["TYPE_DEC_BLOCK"], "postprocess": d => d[0]},
    {"name": "ADT", "symbols": ["TYPE"], "postprocess": d => d[0]},
    {"name": "ADT", "symbols": ["ID"], "postprocess": d => d[0]},
    {"name": "PT", "symbols": ["PT", "__", "ADT"], "postprocess": d => ["$product_type$", d[0], d[2]]},
    {"name": "PT", "symbols": ["ADT"], "postprocess": d => d[0]},
    {"name": "AT", "symbols": ["AT", "_", {"literal":"|"}, "_", "PT"], "postprocess": d => ["$sum_type$", d[0], d[4]]},
    {"name": "AT", "symbols": ["PT"], "postprocess": d => d[0]},
    {"name": "FT$string$1", "symbols": [{"literal":"-"}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FT", "symbols": [{"literal":"("}, "_", "FUNC_TYPE_LIST", "_", {"literal":")"}, "_", "FT$string$1", "_", "AT"], "postprocess": d => ["$func_type$", d[2], d[8]]},
    {"name": "FT", "symbols": ["AT"], "postprocess": d => d[0]},
    {"name": "FUNC_TYPE_LIST$ebnf$1", "symbols": ["FUNC_TYPE_ARG"], "postprocess": id},
    {"name": "FUNC_TYPE_LIST$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FUNC_TYPE_LIST$ebnf$2", "symbols": []},
    {"name": "FUNC_TYPE_LIST$ebnf$2$subexpression$1", "symbols": [{"literal":","}, "_", "FUNC_TYPE_ARG"], "postprocess": d => d[2]},
    {"name": "FUNC_TYPE_LIST$ebnf$2", "symbols": ["FUNC_TYPE_LIST$ebnf$2", "FUNC_TYPE_LIST$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "FUNC_TYPE_LIST", "symbols": ["FUNC_TYPE_LIST$ebnf$1", "_", "FUNC_TYPE_LIST$ebnf$2"], "postprocess":  function(d) {
            if (d[0] === null) {return []}
            else { return [d[0]].concat(d[2]).filter(c => c !== undefined).map(c => c[0]) }
        } },
    {"name": "FUNC_TYPE_ARG$subexpression$1$subexpression$1", "symbols": ["TYPE_LABEL", "FT"], "postprocess": d => [d[1], d[0]]},
    {"name": "FUNC_TYPE_ARG$subexpression$1", "symbols": ["FUNC_TYPE_ARG$subexpression$1$subexpression$1"]},
    {"name": "FUNC_TYPE_ARG$subexpression$1", "symbols": ["ID"]},
    {"name": "FUNC_TYPE_ARG", "symbols": ["FUNC_TYPE_ARG$subexpression$1"], "postprocess": d => d[0]},
    {"name": "TYPE_DEC_BLOCK$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"|"}]},
    {"name": "TYPE_DEC_BLOCK$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "TYPE_DEC_BLOCK$ebnf$1$subexpression$1", "symbols": ["TYPE_DEC_BLOCK$ebnf$1$subexpression$1$subexpression$1", "_"], "postprocess": d => d[0]},
    {"name": "TYPE_DEC_BLOCK$ebnf$1", "symbols": ["TYPE_DEC_BLOCK$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "TYPE_DEC_BLOCK$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "TYPE_DEC_BLOCK$string$1", "symbols": [{"literal":"{"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TYPE_DEC_BLOCK$ebnf$2", "symbols": ["TYPE_DEC_TYPES"]},
    {"name": "TYPE_DEC_BLOCK$ebnf$2", "symbols": ["TYPE_DEC_BLOCK$ebnf$2", "TYPE_DEC_TYPES"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "TYPE_DEC_BLOCK", "symbols": ["TYPE_DEC_BLOCK$ebnf$1", "TYPE_DEC_BLOCK$string$1", "TYPE_DEC_BLOCK$ebnf$2", "_", {"literal":"}"}], "postprocess":  function(d) {
            var type = "";
            if (d[0] === null || d[0] === "*") {type = "$product_type$"}
            else {type = "$sum_type$"}
            return [type].concat(d[2]);
        } },
    {"name": "TYPE_DEC_TYPES$subexpression$1", "symbols": ["TYPE_SIG"]},
    {"name": "TYPE_DEC_TYPES$subexpression$1", "symbols": ["TYPE_DEC_BLOCK"]},
    {"name": "TYPE_DEC_TYPES$ebnf$1", "symbols": ["EMPTY_LINE"]},
    {"name": "TYPE_DEC_TYPES$ebnf$1", "symbols": ["TYPE_DEC_TYPES$ebnf$1", "EMPTY_LINE"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "TYPE_DEC_TYPES", "symbols": ["_", "TYPE_LABEL", "TYPE_DEC_TYPES$subexpression$1", "TYPE_DEC_TYPES$ebnf$1"], "postprocess": d=> [d[2][0], d[1]]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [{"literal":" "}]},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [{"literal":"\t"}]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "_$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1$subexpression$1", "symbols": [{"literal":" "}]},
    {"name": "__$ebnf$1$subexpression$1", "symbols": [{"literal":"\t"}]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1$subexpression$1"]},
    {"name": "__$ebnf$1$subexpression$2", "symbols": [{"literal":" "}]},
    {"name": "__$ebnf$1$subexpression$2", "symbols": [{"literal":"\t"}]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "__$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "_NL$ebnf$1", "symbols": []},
    {"name": "_NL$ebnf$1$subexpression$1", "symbols": [{"literal":" "}]},
    {"name": "_NL$ebnf$1$subexpression$1", "symbols": [{"literal":"\t"}]},
    {"name": "_NL$ebnf$1$subexpression$1", "symbols": [{"literal":"\n"}]},
    {"name": "_NL$ebnf$1", "symbols": ["_NL$ebnf$1", "_NL$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_NL", "symbols": ["_NL$ebnf$1"]},
    {"name": "TYPE$ebnf$1", "symbols": []},
    {"name": "TYPE$ebnf$1", "symbols": ["TYPE$ebnf$1", /[A-Za-z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "TYPE", "symbols": [/[A-Z]/, "TYPE$ebnf$1"], "postprocess": d => d[0]+d[1].join('')},
    {"name": "ID$ebnf$1", "symbols": []},
    {"name": "ID$ebnf$1", "symbols": ["ID$ebnf$1", /[A-Za-z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ID", "symbols": [/[a-z_]/, "ID$ebnf$1"], "postprocess": d => d[0]+d[1].join('')},
    {"name": "LIT$subexpression$1", "symbols": ["NUM"]},
    {"name": "LIT$subexpression$1", "symbols": ["STR"]},
    {"name": "LIT$subexpression$1", "symbols": ["BOOL"]},
    {"name": "LIT", "symbols": ["LIT$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "STR", "symbols": [{"literal":"\""}, "STR_STUFFING", {"literal":"\""}], "postprocess": d => ["$string$", d[1]]},
    {"name": "BOOL$subexpression$1$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BOOL$subexpression$1", "symbols": ["BOOL$subexpression$1$string$1"]},
    {"name": "BOOL$subexpression$1$string$2", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BOOL$subexpression$1", "symbols": ["BOOL$subexpression$1$string$2"]},
    {"name": "BOOL", "symbols": ["BOOL$subexpression$1"], "postprocess": d => d[0]},
    {"name": "INLINE", "symbols": [{"literal":"`"}, "INLINE_STUFFING", {"literal":"`"}], "postprocess": d => ["$inline$", d[1]]},
    {"name": "STR_STUFFING$ebnf$1", "symbols": []},
    {"name": "STR_STUFFING$ebnf$1", "symbols": ["STR_STUFFING$ebnf$1", /[A-Za-z0-9,.\/<>?;':!@#$%^&*(_)+-=[\]{}|~` \t\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "STR_STUFFING", "symbols": ["STR_STUFFING$ebnf$1"], "postprocess": d => d[0].join('')},
    {"name": "ANYTHING$ebnf$1", "symbols": []},
    {"name": "ANYTHING$ebnf$1", "symbols": ["ANYTHING$ebnf$1", /[A-Za-z0-9,.\/<>?;"':!@#$%^&*(_)+-=[\]{}|~` \t]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ANYTHING", "symbols": ["ANYTHING$ebnf$1"]},
    {"name": "INLINE_STUFFING$ebnf$1", "symbols": []},
    {"name": "INLINE_STUFFING$ebnf$1", "symbols": ["INLINE_STUFFING$ebnf$1", /[A-Za-z0-9,.\/<>?;':"!@#$%^&*(_)+-=[\]{}|~ \t\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "INLINE_STUFFING", "symbols": ["INLINE_STUFFING$ebnf$1"], "postprocess": d => d[0].join('')},
    {"name": "INLINE_ID$ebnf$1", "symbols": []},
    {"name": "INLINE_ID$ebnf$1", "symbols": ["INLINE_ID$ebnf$1", /[A-Za-z0-9,.\/<>?;"':!@#$%^&*(_)+-=[\]{}|~]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "INLINE_ID", "symbols": ["INLINE_ID$ebnf$1"], "postprocess": d => d[0].join('')},
    {"name": "NUM$subexpression$1", "symbols": ["INT"]},
    {"name": "NUM$subexpression$1", "symbols": ["DOUBLE"]},
    {"name": "NUM", "symbols": ["NUM$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "INT$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "INT$ebnf$1", "symbols": ["INT$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "INT", "symbols": ["INT$ebnf$1"], "postprocess": d => parseInt(d[0].join(''), 10)},
    {"name": "EXPO$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "EXPO$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "EXPO", "symbols": [{"literal":"e"}, "EXPO$ebnf$1", "INT"], "postprocess":  function(d) {
            if (d[1] !== null) {return -d[2]}
            else {return d[2]}
        } },
    {"name": "DOUBLE$ebnf$1", "symbols": ["EXPO"], "postprocess": id},
    {"name": "DOUBLE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "DOUBLE", "symbols": ["INT", {"literal":"."}, "INT", "DOUBLE$ebnf$1"], "postprocess":  function(d) {
            let mantissa = d[0] + parseFloat("0."+d[2].toString(), 10);
            let double = ['$double$']
            if (d[3] === null) {return double.concat(mantissa)}
            else {return double.concat(mantissa * Math.pow(10, d[3]))}
        } },
    {"name": "ARRAY_TYPE$string$1", "symbols": [{"literal":"A"}, {"literal":"r"}, {"literal":"r"}, {"literal":"a"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ARRAY_TYPE", "symbols": ["ARRAY_TYPE$string$1"]},
    {"name": "SET_TYPE$string$1", "symbols": [{"literal":"S"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "SET_TYPE", "symbols": ["SET_TYPE$string$1"]},
    {"name": "HASH_TYPE$string$1", "symbols": [{"literal":"H"}, {"literal":"a"}, {"literal":"s"}, {"literal":"h"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "HASH_TYPE", "symbols": ["HASH_TYPE$string$1"]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
