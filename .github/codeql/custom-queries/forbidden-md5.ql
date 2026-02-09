/**
 * @name Forbidden MD5 Usage
 * @description Using MD5 is forbidden by company policy (POL-101).
 * @kind problem
 * @problem.severity error
 * @id js/forbidden-md5
 */

import javascript

from CallExpr call, StringLiteral algo
where
  call.getCalleeName() = "createHash" and
  algo = call.getArgument(0) and
  algo.getValue() = "md5"
select call, "This uses MD5, which is forbidden by Policy POL-101. Use SHA-256 instead."
